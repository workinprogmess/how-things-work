# clarifications

---

## q1: one clawdbot instance can power 50+ users?

**yes.**

one clawdbot gateway can handle multiple users because:
- it routes messages by telegram user id
- each user gets their own session (separate files)
- the gateway is just a traffic manager

**the limit is your server resources:**
- 4gb ram vps: ~50-100 light users comfortably
- 8gb ram vps: ~100-200 light users
- "light" = few messages per day, not constant chatting

**what happens when you exceed:**
- responses get slower (cpu contention)
- memory fills up (sessions grow)
- not a crash, just degradation

---

## q2: claude max subscription vs anthropic api?

**short answer:** you CAN use your max subscription, but for multi-user/commercial, you SHOULD use api.

### the difference

| | claude max subscription | anthropic api |
|---|---|---|
| **cost** | $100-200/month flat | pay per token |
| **access** | via oauth/setup-token | via api key |
| **limits** | shared usage limits | pay for what you use |
| **terms** | consumer terms (personal use) | commercial terms |
| **data** | may be used for training | not used for training |
| **for production** | not recommended | recommended |

### using max subscription with clawdbot

**technically possible:**
- clawdbot supports `setup-token` which can use your claude max credentials
- command: `clawdbot setup-token` (requires claude cli installed)

**but here's the problem:**

1. **terms of service**
   - max subscription is for personal use
   - serving 50 other users = likely violates terms
   - anthropic could revoke access

2. **shared limits**
   - your max subscription has usage caps
   - 50 users could burn through limits fast
   - then you AND your users get rate limited

3. **data training**
   - consumer subscriptions (max) allow anthropic to use data for training
   - your users' parenting data could be used
   - api is not subject to this

### recommendation

**for testing (just you):** use max subscription, it's fine

**for testing with others (5-50 users):** use api
- api has no usage caps (just pay for what you use)
- clear commercial terms
- no data training concerns

**cost comparison for 50 users:**
- max subscription: $100-200/month (but might violate terms)
- api: ~$50-200/month (depending on usage, fully legit)

**just use the api.** it's actually not much more expensive and you avoid legal/ethical gray areas.

---

## q3: sessions and conversation history

### how it works

each telegram user gets their own session file:
```
~/.clawdbot/agents/default/sessions/
├── telegram_12345.jsonl  ← user A's history
├── telegram_67890.jsonl  ← user B's history
└── telegram_11111.jsonl  ← user C's history
```

**they cannot mix up.** completely separate files.

### will it lag with long conversations?

**clawdbot handles this automatically with "compaction":**

1. conversations grow over time
2. when context approaches 80% of limit (~160k of 200k tokens)
3. clawdbot automatically:
   - summarizes older messages
   - keeps recent messages verbatim
   - preserves system prompt
4. conversation continues seamlessly

**you don't need to do anything.** it's built-in.

### what about remembering everything?

**clawdbot has a memory system:**

1. **session memory** - the conversation history (auto-managed)
2. **persistent memory** - important facts saved to files

when compaction happens:
- before summarizing, clawdbot can write important info to persistent memory
- this survives compaction
- next conversation can reference it

**example:**
```
conversation 1: "my daughter emma is 14 months old"
→ saved to memory file: "emma, dob: 2024-11-01"

conversation 500 (after many compactions): "how's emma doing?"
→ clawdbot reads memory file, knows who emma is
```

### will there be lag?

**at small scale (50 users): no noticeable lag**

lag would only occur if:
- many users send messages simultaneously (all waiting for ai response)
- server runs out of memory
- api rate limits hit

**at 50 light users:** these won't happen.

---

## q4: what to call the telegram bot?

this is a branding decision. some thoughts:

### naming patterns

| type | example | vibe |
|------|---------|------|
| descriptive | @ParentingBuddyBot | clear what it does |
| cute | @LittleStepsBot | friendly, approachable |
| personal | @EmmaHelperBot | feels personal (but generic is better for multi-user) |
| short | @ParentPalBot | easy to type |
| brandable | @KinduBot, @NestlingBot | unique, can trademark |

### constraints

- must end in `bot` (telegram requirement)
- must be unique (not taken)
- 5-32 characters

### suggestions for parenting assistant

- @MilestoneBot
- @ParentPalBot
- @TinyStepsBot
- @GrowthBuddyBot
- @KiddoTrackBot
- @NurtureBot

### what to use for testing

for now, just use something temporary:
- @MyParentTestBot
- @DevParentBot

you can create multiple bots. use a test bot now, create the "real" branded bot later.

---

## summary

| question | answer |
|----------|--------|
| one instance for 50 users? | yes, easily on $5-10/month vps |
| max subscription? | can use for personal testing, use api for multi-user |
| sessions lag/mix? | no lag at 50 users, auto-compaction handles long history, separate files per user |
| bot name? | pick something temporary for testing, brand it later |
