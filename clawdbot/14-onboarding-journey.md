# clawdbot onboarding journey - what we learned

---

## summary

successfully set up clawdbot with telegram bot (@mimimirararabot) running locally on mac, using openai as the model provider.

---

## issues encountered & solutions

### issue 1: npm permission error

**error:** `EACCES: permission denied, mkdir '/usr/local/lib/node_modules/clawdbot'`

**solution:** use `npx` instead of global install:
```bash
npx clawdbot gateway
```

---

### issue 2: node version too old

**error:** `Detected: node v21.7.1 (needs: >=22.0.0)`

**solution:** upgrade node:
```bash
brew install node@22
brew link node@22 --force --overwrite
```

---

### issue 3: gateway already running

**error:** `Gateway failed to start: gateway already running (pid 98120)`

**solution:** stop existing gateway:
```bash
npx clawdbot gateway stop
# or: kill <pid>
```

---

### issue 4: missing api keys (no response from bot)

**symptom:** messages sent but "(no output)" returned

**error in logs:** `HTTP 401 authentication_error: Invalid bearer token`

**cause:** auth profiles configured but no actual credentials stored

**what we tried:**
1. `claude setup-token` - command doesn't exist in clawdbot
2. `npx clawdbot setup-token` - unknown command
3. `npx clawdbot configure --section auth` - invalid section
4. `npx clawdbot auth login` - unknown command

**what worked:** configure the model section and use a provider with valid credentials:
```bash
npx clawdbot configure --section model
```

---

### issue 5: claude max subscription doesn't work directly

**what we learned:**
- claude max (consumer subscription) cannot be used with clawdbot via oauth
- anthropic blocked external use of claude code oauth tokens (github issue #559)
- for clawdbot, you need either:
  - anthropic api key (pay-per-use)
  - or use a different provider (openai, google)

**our workaround:** switched to openai which had working oauth credentials from codex cli

---

### issue 6: wrong primary model

**symptom:** 401 errors despite openai being configured

**cause:** primary model was still set to `anthropic/claude-sonnet-4-5`

**solution:** edit `~/.clawdbot/clawdbot.json`:
```json
"primary": "openai/gpt-5.2-codex",
```

then restart gateway.

---

### issue 7: telegram pairing command flags

**wrong:**
```bash
npx clawdbot pairing approve --provider telegram <CODE>
npx clawdbot pairing approve --profile telegram CODE
```

**correct:**
```bash
npx clawdbot pairing approve --channel telegram CODE
```

(no angle brackets around the code)

---

## final working setup

### config file: `~/.clawdbot/clawdbot.json`

key sections:
```json
{
  "auth": {
    "profiles": {
      "openai-codex:default": {
        "provider": "openai-codex",
        "mode": "oauth"
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "openai/gpt-5.2-codex"
      }
    }
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "dmPolicy": "pairing",
      "botToken": "YOUR_BOT_TOKEN"
    }
  }
}
```

### commands to start

```bash
# start the gateway
npx clawdbot gateway

# in another terminal, approve telegram pairing when someone messages
npx clawdbot pairing list --channel telegram
npx clawdbot pairing approve --channel telegram <CODE>
```

### what's running

- gateway: ws://127.0.0.1:18789
- web ui: http://127.0.0.1:8791
- telegram bot: @mimimirararabot

### where conversations appear

all three show the same conversation:
1. **telegram** - where user chats
2. **web ui** - dashboard view
3. **terminal** - gateway logs

---

## onboarding workflow (step by step)

### 1. create telegram bot
- message @BotFather on telegram
- `/newbot` → give name → give username (must end in `bot`)
- save the bot token

### 2. install/run clawdbot
```bash
# check node version (need 22+)
node --version

# run onboard wizard
npx clawdbot onboard
```

### 3. during onboard
- security warning → type `Y` to continue
- choose `quickstart`
- choose `npm` for skills package manager
- select models (make sure to include one you have credentials for)
- configure telegram with your bot token

### 4. configure auth
if no credentials are working:
```bash
npx clawdbot configure --section model
```
choose a provider where you have valid credentials (api key or oauth)

### 5. start gateway
```bash
npx clawdbot gateway
```

### 6. approve telegram users
when someone messages your bot:
```bash
npx clawdbot pairing approve --channel telegram <CODE>
```

### 7. test
- send message on telegram
- should see response on telegram + web ui + terminal

---

## key learnings

1. **claude max subscription doesn't work** - need api key or different provider
2. **openai codex oauth works** - if you have codex cli set up
3. **primary model matters** - even if auth is configured, wrong primary = 401 errors
4. **pairing uses --channel flag** - not --provider or --profile
5. **conversations mirror everywhere** - telegram, web ui, terminal all show same chat

---

## next steps (for tomorrow)

1. explore clawdbot features and customization
2. add parenting-specific prompts/skills
3. switch to claude/anthropic (get api key)
4. plan docker-per-user setup for multi-user
5. design the parenting assistant experience
