# costs, limits, and testing setup

---

## telegram for testing (10-50 users)

**yes, absolutely.** here's why it works:

clawdbot's telegram integration:
- uses official telegram bot api (not unofficial like whatsapp)
- free to use (no per-message costs from telegram)
- supports routing by telegram user id
- sessions automatically separate per user

**for 10-50 users, you need:**
1. one telegram bot (create via @BotFather)
2. one clawdbot instance running somewhere
3. configure routing so each telegram user gets their own session

**no orchestrator, no docker-per-user, no complex infrastructure.**

---

## scaling limits - what they actually mean

### limit 1: telegram api rate limits

| limit | what it means |
|-------|---------------|
| **30 messages/second overall** | your bot can send max 30 messages per second total |
| **1 message/second per chat** | to the same user, max 1 message per second |
| **20 messages/minute to groups** | if using group chats |

**what this means for you:**
- 30 messages/second = 1,800 messages/minute = 108,000 messages/hour
- with 50 users, each would need to send/receive 2,160 messages/hour to hit this
- **you won't hit telegram limits at small scale**

**when you'd hit it:**
- thousands of users all active simultaneously
- or sending bulk notifications to everyone at once

### limit 2: clawdbot single-instance limits

| resource | limit | what happens when exceeded |
|----------|-------|---------------------------|
| **memory** | depends on your server | if 50 users each have long conversations, sessions grow |
| **cpu** | depends on your server | ai processing takes cpu, concurrent users queue up |
| **file i/o** | depends on storage | session files read/written constantly |

**rough guidance:**
- 4gb ram server: comfortable for 50-100 light users
- 8gb ram server: comfortable for 100-200 light users
- "light" = a few messages per day, not constant chatting

### limit 3: ai api rate limits

anthropic (claude) has rate limits too:
- requests per minute
- tokens per minute
- depends on your api tier

**at small scale (50 users):** unlikely to hit these unless everyone chats simultaneously

---

## cost breakdown - detailed

### component 1: ai api (the big one)

**claude sonnet 4.5 pricing:**
- input: $3 per million tokens
- output: $15 per million tokens

**what's a token?**
- roughly 4 characters or 0.75 words
- "my daughter took her first steps today" = ~10 tokens

**estimating per user:**

| scenario | input tokens/day | output tokens/day |
|----------|------------------|-------------------|
| light user (2-3 messages) | 3,000 | 1,500 |
| medium user (5-10 messages) | 10,000 | 5,000 |
| heavy user (20+ messages) | 30,000 | 15,000 |

**monthly cost per user (sonnet 4.5):**

| usage | input cost | output cost | total |
|-------|------------|-------------|-------|
| light | $0.27 | $0.68 | ~$1/month |
| medium | $0.90 | $2.25 | ~$3/month |
| heavy | $2.70 | $6.75 | ~$10/month |

**cheaper option - haiku 4.5:**
- input: $1/million, output: $5/million
- light user: ~$0.30/month
- medium user: ~$1/month
- heavy user: ~$3/month

### component 2: server/infrastructure

**vps pricing (examples):**

| provider | ram | cost | users it can handle |
|----------|-----|------|---------------------|
| hetzner | 4gb | ~$5/month | 50-100 light |
| hetzner | 8gb | ~$10/month | 100-200 light |
| digitalocean | 4gb | ~$24/month | 50-100 light |
| railway/render | varies | ~$5-20/month | 50-100 light |

**per-user infrastructure cost:**
- at 50 users on $5/month vps = $0.10/user/month
- at 100 users on $10/month vps = $0.10/user/month

### component 3: other costs

| item | cost |
|------|------|
| domain | ~$12/year = $1/month |
| database (supabase free tier) | $0 |
| database (supabase pro) | $25/month |
| stripe fees | 2.9% + $0.30 per transaction |
| telegram | free |

### total cost per user

**realistic estimate (medium usage, sonnet):**

| component | cost/user/month |
|-----------|-----------------|
| ai api | $3-5 |
| infrastructure | $0.10-0.20 |
| database (shared) | $0.10-0.50 |
| **total** | **$3-6/month** |

**at $30-50/month pricing:**
- cost: $3-6
- margin: $24-47
- **gross margin: ~80-90%**

**at $10/month pricing (lower tier):**
- cost: $3-6
- margin: $4-7
- **still works but tighter**

### cost optimization options

1. **use haiku instead of sonnet** for simple queries
   - save 60-70% on api costs
   - trade-off: less capable responses

2. **prompt caching** (anthropic feature)
   - cache system prompts
   - save up to 90% on repeated content

3. **batch api** (if not real-time)
   - 50% discount
   - but responses are async

4. **hybrid model routing**
   - simple queries → haiku ($1/million)
   - complex queries → sonnet ($3/million)
   - save 40-50% overall

---

## revised cost estimate

my original $3-5/month was close but let me be more precise:

**conservative (medium usage, sonnet, with some optimization):**
- $2-4/month per active user

**realistic (accounting for light users bringing average down):**
- $1-3/month per active user

**your margin at $30/month:**
- cost: $1-4
- margin: $26-29
- **very healthy**

---

## summary: can we test with 10-50 users easily?

**yes.**

| requirement | how to handle |
|-------------|---------------|
| telegram | create one bot via @BotFather (free) |
| clawdbot | run one instance on a $5-10/month vps |
| ai | use your anthropic api key |
| routing | clawdbot handles per-user sessions automatically |
| cost for 50 users | ~$50-150/month (mostly ai api) |

**no orchestrator, no docker complexity, no container-per-user.**

just: one bot + one clawdbot + configure routing.
