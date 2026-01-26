# clawdbot codebase exploration

---

## architecture overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         GATEWAY                                  │
│  (single control plane - ws://127.0.0.1:18789)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ WhatsApp │  │ Telegram │  │ Discord  │  │ Slack    │  ...    │
│  │ (Baileys)│  │ (grammY) │  │(discord.js)│ │ (Bolt)  │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│       │             │             │             │                │
│       └─────────────┴─────────────┴─────────────┘                │
│                           │                                      │
│                    ┌──────▼──────┐                              │
│                    │   ROUTING   │                              │
│                    │  (bindings) │                              │
│                    └──────┬──────┘                              │
│                           │                                      │
│            ┌──────────────┼──────────────┐                      │
│            │              │              │                       │
│       ┌────▼────┐   ┌─────▼────┐   ┌────▼────┐                 │
│       │ Agent 1 │   │ Agent 2  │   │ Agent 3 │                 │
│       │(default)│   │(isolated)│   │(sandbox)│                 │
│       └────┬────┘   └────┬─────┘   └────┬────┘                 │
│            │             │              │                        │
│       ┌────▼────┐   ┌────▼────┐   ┌────▼────┐                  │
│       │ Session │   │ Session │   │ Session │                  │
│       │  Store  │   │  Store  │   │  Store  │                  │
│       └─────────┘   └─────────┘   └─────────┘                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## key directories (src/)

| directory | purpose |
|-----------|---------|
| `gateway/` | websocket control plane, api layer |
| `channels/` | multi-channel connectors (whatsapp, telegram, discord, slack, etc.) |
| `agents/` | agent implementations |
| `sessions/` | session management |
| `routing/` | message routing logic |
| `config/` | configuration management |
| `security/` | auth and security |
| `memory/` | data persistence |
| `pairing/` | user pairing (cross-device?) |

---

## where "single-user" lives

### 1. gateway binding
- binds to `127.0.0.1:18789` (localhost only)
- "one gateway per host" assumption
- for multi-user: need gateway-per-user OR shared gateway with user routing

### 2. session storage
- stored at `~/.clawdbot/agents/<agentId>/sessions/*.jsonl`
- no user_id in path - assumes single owner
- for multi-user: need `~/.clawdbot/users/<userId>/agents/<agentId>/sessions/`

### 3. credentials
- stored at `~/.clawdbot/credentials/`
- whatsapp web session = tied to one phone number
- for multi-user: each user needs own whatsapp credentials

### 4. configuration
- single config file: `~/.clawdbot/clawdbot.json`
- for multi-user: config-per-user OR shared config with user overrides

---

## multi-user-relevant configs

### session.dmScope
controls how DMs are bucketed:
- `main` - all DMs go to one session
- `per-peer` - separate session per contact
- `per-channel-peer` - separate per channel+contact

**for multi-user:** this already supports isolation, but at channel level, not user level

### agents.list[]
each agent can have:
- `id` - stable identifier
- `workspace` - per-agent memory directory
- `sandbox` mode
- `tools` allow/deny

**for multi-user:** could map user → agent, each user gets own agent config

### bindings[]
routes inbound messages by:
- `channel`
- `accountId`
- `peer`
- `guildId`, `teamId`

**for multi-user:** could route by `accountId` or `peer` to different agents

### session.identityLinks
consolidates same person across channels:
```json
"alice": ["telegram:123456789", "discord:987654321"]
```

**for multi-user:** this is user-facing, not system-level multi-tenancy

---

## multi-user wrapper approach

### option A: one gateway per user (docker)

```yaml
# docker-compose.yml
services:
  user_123:
    image: clawdbot
    environment:
      - CLAWDBOT_CONFIG_PATH=/data/user_123/config.json
      - CLAWDBOT_STATE_DIR=/data/user_123/state
    ports:
      - "18789:18789"  # each user gets unique port
    volumes:
      - ./users/123:/data/user_123

  user_456:
    image: clawdbot
    environment:
      - CLAWDBOT_CONFIG_PATH=/data/user_456/config.json
      - CLAWDBOT_STATE_DIR=/data/user_456/state
    ports:
      - "18790:18789"
    volumes:
      - ./users/456:/data/user_456
```

**pros:**
- clean isolation
- no code changes to clawdbot
- security: users can't access each other's data

**cons:**
- resource heavy (~100-200mb ram per gateway?)
- port management complexity
- scaling: 1000 users = 1000 containers

### option B: shared gateway + user routing layer

```
┌─────────────┐
│   PROXY     │  ← receives messages, identifies user
│  (new code) │
└──────┬──────┘
       │
       ▼ routes to correct gateway
┌──────────────────────────────────┐
│  GATEWAY POOL (scaled as needed) │
│  ┌────────┐ ┌────────┐ ┌───────┐│
│  │Gateway1│ │Gateway2│ │Gateway3││
│  │(users  │ │(users  │ │(users ││
│  │ 1-100) │ │101-200)│ │201-300)││
│  └────────┘ └────────┘ └────────┘│
└──────────────────────────────────┘
```

**pros:**
- more efficient at scale
- shared resources

**cons:**
- requires proxy/routing layer (new code)
- complex user→gateway mapping
- need to handle gateway failover

### option C: fork and add user_id to core paths

modify clawdbot internals:
- session paths include user_id
- config includes user_id scoping
- credentials stored per user_id

**pros:**
- cleanest long-term
- native multi-tenancy

**cons:**
- significant code changes
- harder to pull upstream updates
- need deep understanding of codebase

---

## whatsapp business api consideration

clawdbot uses **baileys** (unofficial whatsapp web library)

for business:
- need **whatsapp cloud api** (official)
- different auth flow (not QR code scanning)
- template messages required for initiating conversations
- per-message costs

**implication:** might need to swap out `channels/whatsapp/` implementation entirely

---

## recommended exploration next

1. look at `src/sessions/` - understand session data model
2. look at `src/gateway/` - understand how connections are managed
3. look at `src/channels/whatsapp/` - understand baileys integration
4. look at `src/config/` - understand config loading
5. check if there's any `user` or `owner` concept already

---

## sources
- https://github.com/clawdbot/clawdbot
- https://docs.clawd.bot/gateway
- https://docs.clawd.bot/gateway/configuration
