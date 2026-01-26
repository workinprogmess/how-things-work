# clawdbot → parenting agent: build plan

---

## what clawdbot gives us (free)

| capability | value |
|------------|-------|
| local-first gateway | control plane for everything |
| multi-channel inbox | whatsapp, telegram, discord, slack, imessage, etc. |
| multi-agent routing | isolated workspaces per agent |
| persistent memory | context across sessions |
| proactive scheduling | agent reaches out, not just responds |
| skills system | extensible capabilities |
| tool execution | browser, files, shell, apis |
| llm integration | claude, gpt, local models |

**this is 70-80% of the hard work.**

---

## gaps to fill

### gap 1: identity + roles

**what's needed:**
- user accounts (parent signs up)
- per-user authentication (magic link? oauth?)
- roles: parent (primary), caregiver (invited), child profile (data, not user)
- permissions: who can see/edit what
- multi-child support (families with 2-3 kids)

**technical shape:**
- auth layer (clerk? supabase auth? custom?)
- user → children → caregivers relationship model
- session binding: this whatsapp number = this parent

**effort:** medium (2-3 weeks)

---

### gap 2: data model + storage

**what's needed:**

```
user
├── children[]
│   ├── profile (name, dob, photo)
│   ├── milestones[] (date, type, notes, media)
│   ├── notes[] (parent observations, check-in responses)
│   ├── preferences (interests, sensitivities, allergies)
│   └── recommendations_history[]
├── settings
└── subscription

audit_log (who did what, when)
```

**considerations:**
- where to store? (postgres via supabase? planetscale?)
- media storage for photos/videos (s3? cloudflare r2?)
- gdpr/coppa compliance: data deletion, export, consent tracking
- encryption at rest for sensitive child data

**effort:** medium (2-3 weeks)

---

### gap 3: recommender layer

**what's needed:**
- product database (toys, books, activities)
  - source: affiliate apis? curated list? user-generated?
- personalization engine
  - input: child age, milestones, interests, parent preferences
  - output: ranked recommendations with reasoning
- safety filters
  - age-appropriate
  - allergy/sensitivity aware
  - no harmful content
- affiliate/monetization integration (optional)

**technical shape:**
- could be a clawdbot skill that queries a product db
- or external api (amazon product api, goodreads, etc.)
- llm-powered ranking based on child profile

**effort:** medium-high (3-4 weeks for mvp)

---

### gap 4: onboarding + billing + support

**onboarding:**
- first message flow: "hi! let's set up your family"
- guided child profile creation
- milestone baseline capture
- preferences collection
- connect additional caregivers

**billing:**
- stripe integration
- subscription tiers ($30/mo basic, $50/mo premium?)
- trial period
- payment failure handling

**support:**
- help commands within the chat
- escalation to human (email? intercom?)
- faq / knowledge base

**effort:** medium (2-3 weeks)

---

### gap 5: mobile-first ux

**reality check:**
clawdbot is power-user, config-heavy, terminal-native.

**what parents need:**
- zero config setup (sign up → add child → done)
- all interaction via messaging app (no separate app needed?)
- OR: companion app for settings, viewing history, media
- push notifications that work

**options:**
1. **messaging-only:** everything happens in whatsapp/telegram
   - pro: no app to build
   - con: limited ux for browsing recommendations, viewing history

2. **messaging + web dashboard:**
   - chat for daily interaction
   - web for settings, history, reports
   - easier to build than native app

3. **messaging + native app:**
   - best ux
   - highest effort (ios + android)

**recommendation:** start with #2 (messaging + web dashboard)

**effort:** medium (3-4 weeks for web dashboard mvp)

---

## total effort estimate

| gap | weeks |
|-----|-------|
| identity + roles | 2-3 |
| data model + storage | 2-3 |
| recommender layer | 3-4 |
| onboarding + billing | 2-3 |
| mobile-first ux (web dashboard) | 3-4 |
| **integration + testing** | 2-3 |
| **total** | **14-20 weeks** |

**realistic timeline:** 3-5 months for mvp with buffer

---

## what david cramer likely skipped

his "3 hours" was for:
- basic multi-user routing
- simple config
- memory
- cli ux

he did NOT build:
- billing
- onboarding flows
- domain-specific data models
- recommender systems
- compliance

so: multi-user routing = fast. full product = months.

---

## phase approach

### phase 0: foundation (weeks 1-2)
- fork clawdbot
- set up dev environment
- understand codebase structure
- identify single-user assumptions

### phase 1: multi-user core (weeks 3-6)
- auth layer
- user ↔ gateway binding
- basic data model (users, children)
- one gateway per user via docker (simplest approach)

### phase 2: parenting features (weeks 7-12)
- milestone tracking skill
- check-in proactive messages
- notes capture
- basic recommendations (curated list, not ai-ranked yet)

### phase 3: polish (weeks 13-16)
- onboarding flow
- billing integration
- web dashboard
- safety filters

### phase 4: launch (weeks 17-20)
- beta with 10-20 parents
- iterate on feedback
- public launch

---

## key decisions to make

1. **whatsapp business api or telegram first?**
   - telegram: easier, free, official api
   - whatsapp: where parents actually are, but harder + costs

2. **one gateway per user or shared gateway?**
   - per-user: simpler code, higher infra cost
   - shared: complex code, lower infra cost
   - recommendation: start per-user, optimize later

3. **auth provider?**
   - clerk: fast to implement, good ux
   - supabase: free tier, owns your db too
   - custom: most control, most work

4. **product data source?**
   - curated list (manual effort, high quality)
   - amazon api (automated, commission opportunity)
   - community-sourced (user reviews)

---

## next steps

1. **reach out to david cramer** - see if he'll share learnings/code
2. **clone clawdbot, explore codebase** - understand single-user depth
3. **decide: telegram or whatsapp first**
4. **prototype multi-user wrapper** - docker-compose with user isolation
5. **design data model** - children, milestones, notes schema

---

## sources
- clawdbot github: https://github.com/clawdbot/clawdbot
- clawdbot docs: https://docs.clawd.bot
- david cramer tweet: https://x.com/zeeg/status/2010089195982012761
