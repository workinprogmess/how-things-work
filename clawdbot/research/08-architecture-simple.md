# clawdbot architecture - explained simply

---

## what is clawdbot, really?

imagine a middleman that sits between:
- **messaging apps** (telegram, discord, slack, etc.)
- **an ai brain** (claude, gpt, etc.)

this middleman is called the **gateway**.

```
you send a message on telegram
        ↓
    [GATEWAY]  ← the middleman, always running
        ↓
    [AI BRAIN] thinks and responds
        ↓
    [GATEWAY] sends response back
        ↓
you receive the reply on telegram
```

---

## the pieces, explained

### 1. gateway (the middleman)

**what it is:** a program that runs 24/7 on a computer. it's the "always on" part.

**what it does:**
- connects to telegram (or other apps)
- receives your messages
- sends them to the ai
- gets responses back
- sends responses to you

**analogy:** like a receptionist who sits at a desk all day, taking calls, passing messages to the right person, and relaying answers back.

**the single-user problem:** right now, this receptionist only works for ONE person. we need it to work for MANY people.

---

### 2. channels (the connections to apps)

**what it is:** code that knows how to talk to each messaging app.

**examples:**
- telegram channel = knows telegram's language
- discord channel = knows discord's language
- slack channel = knows slack's language

**analogy:** like having translators who each speak a different language. the telegram translator only speaks telegram. the discord translator only speaks discord.

**for us:** we'll use the telegram channel (or build our own app channel later).

---

### 3. agents (the ai workers)

**what it is:** a configured ai brain with specific instructions and memory.

**what it has:**
- a name/identity ("hi, i'm your parenting assistant")
- instructions (system prompt - "you help parents track milestones")
- memory (remembers past conversations)
- tools (can search web, read files, etc.)

**analogy:** like hiring an employee. you give them a job description, train them, and they remember what you've discussed before.

**clawdbot already supports multiple agents.** this is helpful for us.

---

### 4. sessions (the memory)

**what it is:** saved conversation history.

**what it stores:**
- past messages
- context ("you told me your child is 2 years old")
- preferences learned over time

**where it's saved:** files on the computer running the gateway.

**the single-user problem:** right now, all sessions belong to one owner. we need sessions per user.

---

### 5. routing (the traffic director)

**what it is:** rules that decide which messages go to which agent.

**example:**
- "messages from telegram user @alice → send to agent-alice"
- "messages from telegram user @bob → send to agent-bob"

**this already exists in clawdbot.** it's called "bindings".

---

## how messages flow (step by step)

```
1. parent sends "my kid took first steps today!" on telegram

2. telegram sends this to clawdbot's GATEWAY
   (gateway is connected to telegram, always listening)

3. gateway looks at ROUTING rules
   "this message is from user X, send to agent Y"

4. gateway sends message to the correct AGENT

5. agent looks at its SESSION (memory)
   "ah, this parent has a 14-month-old named emma"

6. agent uses its AI BRAIN to think of a response
   "that's amazing! first steps at 14 months is right on track..."

7. agent sends response back to gateway

8. gateway sends response through TELEGRAM CHANNEL

9. parent sees the reply on telegram
```

---

## the single-user problem, explained

clawdbot was built for ONE person running it for themselves.

**what this means:**
- one gateway = one owner
- all files saved in one place (`~/.clawdbot/`)
- one set of telegram credentials
- one config file

**what we need:**
- one gateway = many users
- each user's data saved separately
- each user has their own credentials (or we use a business account)
- each user has their own config/preferences

---

## the three approaches to multi-user

### approach 1: docker per-user

**what is docker?**
docker is like running a mini-computer inside your computer. each "container" is isolated - it can't see what's in other containers.

**the idea:**
give each user their own mini-computer running their own clawdbot.

```
┌─────────────────────────────────────────┐
│           YOUR SERVER                    │
│                                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │ user 1  │  │ user 2  │  │ user 3  │  │
│  │ clawdbot│  │ clawdbot│  │ clawdbot│  │
│  │ (docker)│  │ (docker)│  │ (docker)│  │
│  └─────────┘  └─────────┘  └─────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

**do we need to change clawdbot's code?** NO. we just run multiple copies.

**pros:**
- simple to set up
- complete isolation (user A can't accidentally see user B's data)
- if one crashes, others keep running

**cons:**
- uses more resources (each copy needs memory/cpu)
- at 1000 users, you're running 1000 mini-computers
- costs more

**good for:** starting out, smaller user base (tens to hundreds)

---

### approach 2: shared gateway + routing layer

**the idea:**
run fewer gateways, but smarter. add a "traffic cop" in front that knows which user is which.

```
┌─────────────────────────────────────────────────┐
│           YOUR SERVER                            │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │           TRAFFIC COP (new code)          │   │
│  │    "user 1 → gateway A, user 2 → gateway B"│   │
│  └─────────────────┬────────────────────────┘   │
│                    │                             │
│      ┌─────────────┴─────────────┐              │
│      │                           │               │
│  ┌───▼───┐                   ┌───▼───┐          │
│  │Gateway│ (handles users    │Gateway│          │
│  │   A   │  1-500)           │   B   │          │
│  └───────┘                   └───────┘          │
│                                                  │
└─────────────────────────────────────────────────┘
```

**do we need to change clawdbot's code?** MAYBE SLIGHTLY. mostly we're adding new code around it.

**pros:**
- more efficient at scale
- fewer resources needed
- can handle more users per gateway

**cons:**
- more complex to build
- need to build the "traffic cop" ourselves
- if a gateway crashes, multiple users affected

**good for:** scaling up (hundreds to thousands of users)

---

### approach 3: fork and modify clawdbot's core

**what is forking?**
taking a copy of someone's code and making it your own. you can change anything.

**the idea:**
go into clawdbot's actual code and add "user_id" everywhere it's needed.

```
BEFORE (clawdbot today):
  save session → ~/.clawdbot/sessions/conversation.json

AFTER (our fork):
  save session → ~/.clawdbot/users/USER_123/sessions/conversation.json
```

**do we need to change clawdbot's code?** YES, significantly.

**pros:**
- cleanest solution
- built-in multi-user support
- most efficient long-term

**cons:**
- most work upfront
- need to understand clawdbot's code deeply
- when clawdbot releases updates, harder to merge them into our version

**good for:** if we're committed long-term and want full control

---

## which approach for us?

| approach | code changes to clawdbot | complexity | best for |
|----------|--------------------------|------------|----------|
| 1. docker per-user | NONE | low | starting out, <500 users |
| 2. shared + routing | minimal (wrapper code) | medium | scaling, 500-5000 users |
| 3. fork core | significant | high | 5000+ users, long-term |

**my recommendation:**
- start with **approach 1** (docker per-user)
- it works, it's simple, it gets you to market
- optimize to approach 2 when you hit scaling problems
- approach 3 only if you're committed for years

---

## telegram vs our own app

### option A: telegram

**how it works:**
- users message a telegram bot
- bot is connected to our gateway
- we use telegram's official bot api (free, easy)

**pros:**
- zero app development
- users don't need to install anything new
- telegram handles notifications, media, etc.

**cons:**
- dependent on telegram's rules
- limited UI (just chat, no custom screens)
- can't do rich experiences (graphs, dashboards)

### option B: our own app

**how it works:**
- build ios/android app
- app connects to our gateway via websocket
- we control everything

**pros:**
- full control over experience
- can build custom UI (milestone charts, recommendation cards)
- not dependent on any platform

**cons:**
- significant app development work (months)
- need to handle push notifications ourselves
- users need to download yet another app

### option C: hybrid

**the idea:**
- start with telegram (fast to market)
- add a web dashboard for rich features (milestone history, settings)
- later, build native app if needed

**this is probably the best path:**
1. telegram for daily chat interactions
2. web dashboard for viewing history, managing settings
3. native app later if demand warrants

---

## summary

**clawdbot gives us:**
- gateway (the always-on middleman) ✓
- channels (telegram connection) ✓
- agents (configurable ai workers) ✓
- sessions (conversation memory) ✓
- routing (traffic direction) ✓

**we need to add:**
- multi-user support (approach 1, 2, or 3)
- user accounts + authentication
- parenting-specific data model (children, milestones)
- parenting-specific skills (recommendations, check-ins)
- billing
- onboarding

**the path:**
1. docker per-user (no clawdbot code changes)
2. telegram for messaging
3. web dashboard for rich features
4. optimize architecture later as we scale

---

## glossary

| term | meaning |
|------|---------|
| gateway | the always-running program that connects everything |
| channel | code that talks to a specific app (telegram, discord) |
| agent | an ai worker with specific instructions and memory |
| session | saved conversation history |
| routing/bindings | rules for directing messages to the right agent |
| docker | technology for running isolated mini-computers |
| fork | taking a copy of code to modify it yourself |
| websocket | a way for apps to have ongoing two-way conversations with servers |
| api | a way for programs to talk to each other |
