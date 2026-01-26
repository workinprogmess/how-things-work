# local setup guide - telegram + clawdbot

---

## what we're setting up

```
your phone (telegram app)
        ↓
telegram cloud
        ↓
your mac (running clawdbot)
        ↓
claude api (anthropic)
        ↓
response back to your phone
```

---

## prerequisites

- mac (you have this)
- node.js 22+
- anthropic api key (for claude)
- telegram account (for creating bot)

---

## step 1: create a telegram bot

1. open telegram on your phone
2. search for `@BotFather`
3. start a chat with BotFather
4. send: `/newbot`
5. follow prompts:
   - give it a name: "My Parenting Test Bot" (display name)
   - give it a username: must end in `bot`, like `myparentingtest_bot`
6. BotFather will reply with your **bot token**
   - looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`
   - **save this token** (you'll need it)

---

## step 2: install clawdbot

open terminal and run:

```bash
# check node version (need 22+)
node --version

# if you don't have node 22+, install via nvm or brew
# brew install node@22

# install clawdbot globally
npm install -g clawdbot

# verify installation
clawdbot --version
```

---

## step 3: run onboarding wizard

clawdbot has a setup wizard that walks you through configuration:

```bash
clawdbot onboard
```

this will ask you about:
- workspace location
- which channels to enable (choose telegram)
- api keys

**alternatively, configure manually:**

```bash
# create config directory
mkdir -p ~/.clawdbot

# create config file
cat > ~/.clawdbot/clawdbot.json << 'EOF'
{
  "agent": {
    "model": "claude-sonnet-4-5-20250514",
    "name": "Parenting Assistant"
  },
  "channels": {
    "telegram": {
      "botToken": "YOUR_BOT_TOKEN_HERE"
    }
  }
}
EOF
```

replace `YOUR_BOT_TOKEN_HERE` with your actual bot token from BotFather.

---

## step 4: set up anthropic api key

you need an anthropic api key for claude.

1. go to: https://console.anthropic.com/
2. sign up / log in
3. go to api keys section
4. create a new key
5. save it

then set it as environment variable:

```bash
# add to your shell profile (~/.zshrc or ~/.bashrc)
export ANTHROPIC_API_KEY="sk-ant-api03-xxxxx"

# reload shell
source ~/.zshrc
```

---

## step 5: start the gateway

```bash
clawdbot gateway
```

you should see:
- gateway starting on port 18789
- telegram channel connecting
- "ready" message

---

## step 6: approve your telegram user

by default, clawdbot won't respond to unknown users (security feature).

1. open telegram on your phone
2. find your bot (search for the username you created)
3. send any message: "hello"
4. you'll get a pairing code (or silence)

in another terminal:

```bash
# list pending pairings
clawdbot pairing list --provider telegram

# approve your user
clawdbot pairing approve --provider telegram <code>
```

---

## step 7: test it!

send a message to your bot on telegram. you should get a response from claude.

---

## troubleshooting

### "command not found: clawdbot"
- make sure npm global bin is in your PATH
- try: `npx clawdbot gateway`

### "telegram connection failed"
- check your bot token is correct
- make sure no extra spaces/newlines in token

### "no response from bot"
- check pairing approval
- look at terminal output for errors

### "anthropic api error"
- verify ANTHROPIC_API_KEY is set
- check you have credits/valid subscription

---

## testing multi-user routing

once it works for you, test with another person:

1. have them message your bot on telegram
2. they'll need to be approved (pairing)
3. their conversation will be separate from yours (different session)

clawdbot automatically creates separate sessions per telegram user_id.

---

## configuration for multi-user

to explicitly enable per-user sessions:

```json
{
  "session": {
    "dmScope": "per-peer"
  },
  "channels": {
    "telegram": {
      "botToken": "YOUR_TOKEN",
      "dmPolicy": "open"
    }
  }
}
```

- `dmScope: "per-peer"` = each telegram user gets own session
- `dmPolicy: "open"` = accept all users (skip pairing approval)

**warning:** `dmPolicy: "open"` means anyone can message your bot and use your api credits. for testing, keep `dmPolicy: "pairing"` and manually approve users.

---

## next: adding parenting features

once basic chat works, you can add parenting-specific behavior:

1. **custom system prompt** - tell claude it's a parenting assistant
2. **skills** - add milestone tracking, recommendations
3. **memory** - clawdbot already has persistent memory

we'll cover these in the next doc.

---

## quick reference

| command | what it does |
|---------|--------------|
| `clawdbot gateway` | start the gateway (main process) |
| `clawdbot onboard` | run setup wizard |
| `clawdbot pairing list --provider telegram` | see pending approvals |
| `clawdbot pairing approve --provider telegram <code>` | approve a user |
| `clawdbot doctor` | diagnose issues |
| `clawdbot configure --section telegram` | reconfigure telegram |
