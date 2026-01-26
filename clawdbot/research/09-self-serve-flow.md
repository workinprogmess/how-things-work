# self-serve flow - how parents experience it

---

## the parent's experience (what they see)

```
1. parent hears about your product
   "there's this ai assistant that helps track my kid's milestones"

2. parent goes to your website
   yourproduct.com

3. parent clicks "get started"
   enters: email, child's name, child's birthday

4. parent gets a link to telegram bot
   "click here to start chatting with your assistant"

5. parent opens telegram, clicks link
   telegram opens, shows your bot

6. parent sends first message
   "hi"

7. bot responds
   "hi! i'm your parenting assistant. i see emma is 14 months old.
    would you like to tell me about any milestones she's hit recently?"

8. parent uses it like any chat
   no setup. no technical anything. just messaging.
```

**that's it.** parent never knows about docker, gateways, servers, anything.

---

## what happens behind the scenes

```
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR INFRASTRUCTURE                           │
│                    (parents never see this)                      │
│                                                                  │
│  ┌──────────────┐                                               │
│  │  YOUR WEBSITE │  ← parent signs up here                      │
│  │  + DATABASE   │                                               │
│  └──────┬───────┘                                               │
│         │                                                        │
│         │ 1. new signup detected                                │
│         ▼                                                        │
│  ┌──────────────┐                                               │
│  │ ORCHESTRATOR │  ← your code that manages everything          │
│  │   (new code) │                                               │
│  └──────┬───────┘                                               │
│         │                                                        │
│         │ 2. spin up new docker container for this user         │
│         ▼                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   DOCKER HOST                             │   │
│  │                                                           │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐     │   │
│  │  │ user 1  │  │ user 2  │  │ user 3  │  │ NEW     │     │   │
│  │  │ clawdbot│  │ clawdbot│  │ clawdbot│  │ USER    │     │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘     │   │
│  │                                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│         │                                                        │
│         │ 3. container connects to telegram                     │
│         ▼                                                        │
│  ┌──────────────┐                                               │
│  │   TELEGRAM   │  ← parent chats here                          │
│  │   (external) │                                               │
│  └──────────────┘                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## step by step: what your system does

### step 1: parent signs up on website

**what happens:**
- parent enters email, child info
- your database saves: `{user_id: 123, email: "parent@email.com", child: "emma", dob: "2024-11-01"}`
- payment processed (stripe)

**what you build:** simple signup page + database

---

### step 2: orchestrator creates their environment

**what is an orchestrator?**
code you write that automatically sets up new users.

**what it does:**
```
1. sees new user in database
2. creates a new docker container for them
3. configures it with:
   - their user_id
   - their child's info (for the ai to know)
   - connection to your shared telegram bot
4. starts the container
5. marks user as "ready" in database
```

**what you build:** a script/service that watches for new signups and provisions containers

---

### step 3: container connects to telegram

**how telegram bots work (simple version):**

you create ONE bot on telegram (let's call it @YourParentingBot).

when ANY user messages this bot, telegram sends the message to YOUR server.

your server looks at who sent it, routes to the right container.

```
parent A messages @YourParentingBot
    ↓
telegram sends to your server: "user A said 'hi'"
    ↓
your router: "user A → container A"
    ↓
container A (clawdbot) processes, responds
    ↓
response goes back through @YourParentingBot to parent A
```

**key insight:** you have ONE telegram bot, but MANY containers behind it. the routing happens on your side.

---

### step 4: parent chats normally

from parent's perspective:
- they message a telegram bot
- they get responses
- that's it

they don't know:
- there's a container running for them
- there's complex routing happening
- there's an orchestrator managing everything

**it just works.**

---

## the pieces you need to build

| piece | what it does | complexity |
|-------|--------------|------------|
| **website + signup** | collect user info, process payment | low (use stripe, any web framework) |
| **database** | store users, children, subscriptions | low (postgres, supabase) |
| **orchestrator** | spin up/down containers per user | medium |
| **telegram router** | route messages to correct container | medium |
| **clawdbot containers** | the actual ai assistant (pre-built) | low (just configure) |
| **parenting skills** | milestone tracking, recommendations | medium |

---

## simplified architecture

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   PARENT                                                     │
│     │                                                        │
│     │ signs up                                              │
│     ▼                                                        │
│   ┌─────────────────┐                                       │
│   │    WEBSITE      │ ──────► DATABASE                      │
│   │  (signup/pay)   │         (users, children, subs)       │
│   └─────────────────┘                                       │
│                                                              │
│   PARENT                                                     │
│     │                                                        │
│     │ sends telegram message                                │
│     ▼                                                        │
│   ┌─────────────────┐         ┌─────────────────┐           │
│   │    TELEGRAM     │ ──────► │     ROUTER      │           │
│   │  @YourBot       │         │  (your code)    │           │
│   └─────────────────┘         └────────┬────────┘           │
│                                        │                     │
│                          ┌─────────────┼─────────────┐      │
│                          │             │             │       │
│                          ▼             ▼             ▼       │
│                    ┌─────────┐   ┌─────────┐   ┌─────────┐  │
│                    │container│   │container│   │container│  │
│                    │ user 1  │   │ user 2  │   │ user 3  │  │
│                    └─────────┘   └─────────┘   └─────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## what clawdbot gives us vs what we build

**clawdbot (free, pre-built):**
- gateway (the always-on process)
- telegram channel (connection to telegram)
- agent framework (ai with memory)
- session management (conversation history)
- skills system (extensible capabilities)

**we build:**
- website + signup
- database (users, children)
- orchestrator (spin up containers)
- router (telegram messages → right container)
- parenting skills (milestones, recommendations)
- billing (stripe integration)

---

## cost estimate (rough)

**per user:**
- docker container: ~100-200mb ram, minimal cpu when idle
- at $0.01/gb-hour, ~$0.72-1.44/month per user just for memory
- plus cpu, storage, bandwidth

**at $30-50/month pricing:**
- infrastructure cost per user: ~$3-5/month
- margin: ~$25-45/month per user
- healthy economics

**scaling:**
- 100 users: ~$300-500/month infra
- 1000 users: ~$3000-5000/month infra
- this is when you'd consider optimizing to approach 2

---

## alternative: shared telegram bot without per-user containers

even simpler approach (approach 2 lite):

instead of container-per-user, run ONE clawdbot instance that handles all users, but:
- route by telegram user id
- store sessions per telegram user
- clawdbot's `bindings` feature already supports this

**tradeoff:**
- simpler infrastructure
- less isolation (bugs affect everyone)
- might hit clawdbot's limits at scale

**this might actually be the best starting point.**

---

## recommendation: start even simpler

**phase 1 (mvp):**
- ONE clawdbot instance
- use clawdbot's built-in routing (bindings by telegram peer id)
- sessions already separate per user automatically
- add your parenting skills

**phase 2 (if needed):**
- move to container-per-user when you need more isolation
- or when you hit scaling limits

**this means:** you might not even need the orchestrator at first. just configure one clawdbot properly.

---

## summary

**parent experience:**
1. sign up on website
2. click link to telegram bot
3. start chatting
4. that's it

**your infrastructure:**
1. website collects signups
2. system provisions their environment (container or shared)
3. telegram messages route to right place
4. clawdbot handles the ai part

**parents never see any complexity.** they just chat.
