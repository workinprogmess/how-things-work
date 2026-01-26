# clawdbot community research - what others are doing/thinking

---

## summary

**you're not alone in thinking about this.** but no one has publicly launched a commercial multi-user fork yet.

this is actually validation: demand exists, execution gap exists.

---

## what i found

### 1. david cramer (zeeg) - sentry co-founder

built a **python clawdbot alternative with multi-user support** in ~3 hours.

from his tweet (jan 10, 2026):
> "because clawdbot was broken last night and i just like building shit, I started a much simpler and isolated Python personal agent this morning"

what he built:
- simple configuration
- basic extensibility
- cli ux to run, test, configure
- sandbox for command execution
- memory
- shell and web search

**notably: multi-user support** (mentioned in follow-up tweet)

couldn't find a public github repo yet - might be private or not released.

source: [zeeg's tweet](https://x.com/zeeg/status/2010089195982012761)

---

### 2. hacker news discussions

**people ARE building commercial variants:**

- someone built a **rental apartment screening bot** via facebook messenger
  - "did 9/10 on this task" - handling tenant inquiries, scheduling viewings

- someone built **company management system**
  - timesheets, adding/removing people, purchase orders

- someone built **"murmur"** - agent-to-agent messaging between friends' personal assistants
  - described as "truly magical (while crazy insecure)"

**security concerns dominate:**
- "300 open github issues" with "hundreds of high-risk issues"
- hardcoded unencrypted oauth credentials
- prompt injection vulnerabilities
- "i just displayed your config with sensitive tokens visible"

**skeptics exist:**
- "you can also just vibecode in an afternoon using regular claude code"
- "it's just an LLM call"
- concerns about "root access to a process that has access to the internet without any guardrails"

sources:
- [hn clawdbot discussion](https://news.ycombinator.com/item?id=46760237)
- [hn use cases thread](https://news.ycombinator.com/item?id=46747644)

---

### 3. x/twitter sentiment

**hype is real:**
- "clawdbot is exploding on google trends"
- "9,000 stars on GitHub in one day" (jan 26, 2026)
- comparisons to "your own personal jarvis"
- "will actually be the thing that nukes a ton of startups"

**the self-hostable angle matters:**
- "the fact that it's hackable and hostable on-prem will make sure tech like this DOMINATES conventional SaaS"

sources:
- [clawdbot official x](https://x.com/clawdbot)
- [brave tweet](https://x.com/brave/status/2015201576130957365)

---

### 4. what i didn't find

- **no public "multi-user SaaS fork" announced** - you'd be first (or among first)
- **no reddit discussions** - search came up empty
- **no commercial parenting-specific fork** - your niche is open
- **no pricing discussions** - people building for themselves, not charging others yet

---

### 5. ecosystem growing fast

- **565+ community skills** already built
- integrations: gmail, github, spotify, obsidian, 50+ more
- architecture docs available for study

source: [awesome-clawdbot-skills](https://github.com/VoltAgent/awesome-clawdbot-skills)

---

## what this means for you

| signal | interpretation |
|--------|----------------|
| david cramer built multi-user in 3 hours | it's tractable, not months of work |
| people building commercial variants | market exists, not just hobbyists |
| no public multi-user saas yet | first-mover opportunity |
| security concerns voiced loudly | you'll need to address this in marketing |
| "nukes startups" sentiment | people see the potential |

---

## risks confirmed

1. **whatsapp integration** - baileys is unofficial, business api is different
2. **security** - real concerns, you'll need to lock it down
3. **support burden** - power-user tool = config complexity

---

## opportunities confirmed

1. **no one has shipped multi-user commercially** - gap exists
2. **niche verticals wide open** - parenting, real estate, etc.
3. **community momentum** - 565+ skills, growing fast
4. **simpler forks emerging** - david cramer's approach validates "simplify + extend"

---

## next steps

1. **find david cramer's repo** - if he releases it, could be a better starting point than clawdbot itself
2. **dig into clawdbot codebase** - understand single-user assumptions
3. **prototype the multi-user wrapper** - one gateway per user via docker
4. **nail down whatsapp business api** - or start with telegram (easier)
