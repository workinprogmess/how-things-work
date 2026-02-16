# 10k prompts to genius — conversation 001

*date: 2026-02-16*

---

## v: the idea

i've been thinking about an idea. 10k prompts to ai mastery (inspired by 10k hours).

the problem is 'people want to learn ai/do more/become great at using it/incorporating it in their life or work/creating, building, designing, writing with it/become micro-entrepreneurs and make some money' but .. there's a but. it's too difficult to use. too much to learn. too many tools/models. too much info. too many courses here & there. everybody's hyping. it leads to inaction/confusion/doubt more than any positive action.

i don't have a solution in mind (we'll brainstorm). but agents like claude code, codex, openclaw are so powerful that can help you do so much, but mostly designed for power users. for coding. not for regular people or even people in between.

i am thinking if these agents could be adapted for all kinds of use-cases. done simply and smartly. at one place. in a way that you go from your first prompt to 100 to 1000 to 10k achieving several milestones in the process. but mostly importantly, its designed in a way to go from doing small things to big while also sorting your data/personal knowledge base as context, learning to use git, learning to prompt, learning to even think, learning to write, create images, videos, webpages, books, and what not. and the best part is that 'none of these projects/activities are pre-defined like courses' - these will be exactly what the person wants to / should do (even though they can't articulate it) but the back and forth with agent brings about open areas from self-improvement to work to creative to hobby to reading/writing/dancing to finding a date to starting a small business to finding a new job to whatever. with each prompt, they not only get better and better at using ai but also deeply integrating it in their workflows.

your thoughts? paul graham's? jason fried? a16z/ycombinator's?

---

## codex: initial analysis

### what's genuinely strong

**the framing.** "10k prompts" is sticky. it piggybacks on gladwell's 10k hours which everyone already gets. that's good marketing instinct.

**the core insight is correct.** agents like claude code are absurdly powerful but designed for people who already know what they're doing. the gap between "casual chatgpt user" and "someone who can actually build things with agents" is enormous and mostly unaddressed.

**learning by doing, not courses.** this is the right instinct. courses are the old model. nobody finishes them. the real learning happens when you're trying to solve *your* problem, not a textbook problem.

**context accumulation.** the idea that your data, preferences, and knowledge base grow with you as you go — that's a real moat if executed well.

### honest pushback

**the scope is a red flag.** dating, dancing, business, writing, video, jobs, hobbies — that's not a product, that's a fantasy. the fastest way to build nothing is to try to build everything. right now this is a vision, not a product.

**there's a tension you haven't resolved.** you say "no pre-defined paths" but also "milestones." milestones imply structure. the question is: who decides the structure? if the agent does, you're building AGI-level personalization. if you do, you're building a course with extra steps. the answer is probably somewhere in between but you need to figure out where.

**"git for regular people" is a stretch.** if the problem is "too much to learn," adding git to the stack makes it worse. the tooling needs to be invisible, not educational.

### paul graham would say:

> "do things that don't scale."

don't build the platform. take 10 people. manually walk them through their first 100 prompts. watch where they get stuck. watch what they actually want to do vs what they say they want to do. the product will reveal itself.

he'd also say: **you're describing a solution looking for a specific problem.** what's the wedge? who are the first 100 users — not "everyone" — specifically? a freelance designer who wants to use ai to 10x output? a small business owner who wants to automate invoicing? pick one. nail it. expand later.

pg would probably like that you're thinking about something people genuinely need. but he'd tell you the idea as stated is a "tarpit idea" — sounds obviously good, which means either (a) it's harder than it looks or (b) someone would've built it already. figure out which.

### jason fried would say:

> "build less."

he'd read the description and say there are 30 features in one paragraph. what's the one thing? ship a small, opinionated tool that does one thing well. if the problem is "people don't know what to prompt," then build the world's best first-prompt experience. that's it. not a platform. not milestones. not git. not a knowledge base. just: help someone go from "i don't know what to ask" to "holy shit, that worked."

he'd also challenge the complexity directly: if people are overwhelmed by ai tools, building *another* tool with agents, git, context management, and milestone tracking is adding to the noise, not cutting through it.

fried would want you to answer: **what's the 30-minute version of this that someone could use today?**

### a16z / yc would say:

the TAM pitch writes itself — "everyone who wants to use ai but can't" is billions of people. they'd get excited about that.

but then they'd ask hard questions:

- **what's the wedge?** duolingo didn't start with "learn everything." it started with languages and a very specific mechanic (streaks + gamification). what's your equivalent?
- **where's the retention loop?** 10k prompts means someone has to come back thousands of times. what keeps them coming back on day 30 when the novelty wears off?
- **what's the moat?** if openai or anthropic just makes their products easier to use (which they're actively doing), does your product still matter?
- **data network effects** — they'd like the personal context angle. the more you use it, the better it gets for you. that's real lock-in. but it's also what apple, google, and every ai company is trying to build.

they'd probably frame it as: **this is either a feature inside an existing ai product, or it's a new category.** you need to figure out which one and build accordingly.

### codex's actual take

the seed of something real is here: **most people are stuck at prompt 1 and have no path to prompt 1000.** that's a genuine gap.

but the idea needs compression, not expansion. right now you're describing the end state. nobody builds the end state first.

the question to sit with: **what's the smallest thing you could build that proves the core thesis — that progressive, personalized prompting makes someone meaningfully better at using ai?**

maybe it's a 30-day challenge. maybe it's curated "prompt paths" for specific outcomes. maybe it's literally just a journal where you track your prompts and an agent reflects back patterns. but it needs to be small enough to ship and specific enough to test.

---

## v: two-track approach + imagining what's possible

lets take a two-way approach, the 30-min version or the smallest thing that proves the hypothesis. and also, visualize, imagine, have fun imagining what's possible. for the next couple of exchanges, lets focus on the latter.

### the persona

founders/want-to-be founders who want to re-invent themselves. they read/know/are aware of things, but feel their workflow is far behind what's possible or if they can 2x-10x-100x their thinking, doing, etc will be great. and want-to-be founders wanting to start one-person or very small ai-first companies (or even a small business that grows decent). they want to learn, they want to commit. they have this drive, intrinsic. but they also need a setup, an environment, something that evolves with them, something less rigid/fixed, something personal, that adapts/fits to them rather than otherwise.

do you identify with this persona? if no, what gaps do you see? if yes, what possibilities do you see?

### the onboarding idea

the first prompt is introducing yourself. the claude-code/codex-simplified takes over from there. in most cases, it will be a bad intro (or basic one), but the agent knows how to ask questions, move the conversation, get things out. it'll take a back and forth. the first 50-100 prompts/exchanges be about who this person is — socials, experience/education, work/life profile, current issues, systems/tools he's part of, things he primarily uses, whatever he's tried with ai before/at present. basically, who he is — while also collecting badges along the way, while setting up an obsidian/.md vault for persistent live memory of the person (without overwhelming him), while planning to go from 50-100 prompts to 500-1000 prompts with multiple smaller priorities.

---

## codex: the persona and the vision

### on the persona

yes, i identify with it deeply. and it's more precise than "everyone." sharpening it further:

this person is **aware but not activated.** they've read the pg essays. they've seen the demos. they know ai can do extraordinary things. but there's a gap between *knowing* and *doing.* their actual daily workflow is still mostly manual, mostly pre-ai. they might use chatgpt for occasional questions, maybe copilot for code, but it's shallow. surface-level. they haven't rewired how they think, plan, execute.

the frustration isn't ignorance — it's **underutilization.** they *know* they're leaving 10x on the table. that's what keeps them up at night.

**gaps in the persona definition:**
- **spectrum within the group.** someone who's been building for 10 years but hasn't integrated ai is very different from someone who has the entrepreneurial itch but hasn't shipped anything yet. the system needs to recognize which sub-type it's talking to within the first few exchanges.
- **motivation varies.** some want to build a company. some want to become irreplaceable at their current job. some want creative freedom. some want money. some want all of it but can't prioritize.
- **the real unlock isn't "learn ai" — it's "learn to think in systems."** ai is the lever, but the transformation is about someone going from reactive (doing tasks) to generative (designing workflows, building assets, creating leverage).

**why this persona works:** they have skin in the game. they're not browsing casually. they're ready to commit if someone shows them the path. retention isn't about gamification tricks — it's about *real results, fast.* show them something working in their life within the first session and they're hooked.

### the onboarding vision — imagined in full

#### prompts 1-10: the mirror

the person introduces themselves. probably something like "i'm sarah, i run a small design agency, 3 employees, been doing this for 6 years."

the agent doesn't say "great, let's get started." the agent does something no course or tool does — **it reflects back what it notices.** "you said you *run* the agency, not that you *own* it or *founded* it. that's interesting. is the agency the thing, or is it what's funding the next thing?"

small, sharp questions. not a form. not an intake survey. a conversation that feels like talking to someone who's genuinely curious about you. and every answer quietly gets structured into the vault:

```
/vault
  /identity
    profile.md
    origin-story.md
  /context
    current-state.md
    tools-and-systems.md
    ai-history.md
```

the person doesn't see the vault mechanics yet. they just feel heard.

#### prompts 10-30: the excavation

the agent starts pulling threads.

"you mentioned you spend 3 hours a day on client revisions. walk me through exactly what that looks like. literally step by step."

the person describes their workflow. the agent listens, then does something powerful: **it identifies the gap between what they do and what's possible.** not in a condescending way, but:

"so you're manually creating 3 variations of each design, screenshotting them, pasting into a google doc, writing up the rationale, and emailing it. what if that entire post-design workflow — the variations, the presentation, the rationale doc — took 4 minutes instead of 90?"

now the person isn't learning ai in the abstract. they're seeing *their specific bottleneck* dissolving.

```
/vault
  /workflows
    client-revisions.md
    client-revisions-v2.md
  /opportunities
    quick-wins.md
    bigger-bets.md
```

#### prompts 30-50: the first build

by prompt 50, the person needs to have *built something real.* not a toy. something that saves them actual time or makes them actual money.

for sarah, maybe it's: a claude-code powered script that takes her figma exports, generates 3 variations with rationale, and formats them into a branded pdf. she runs it. it works. it saves her 80 minutes per client.

she didn't "learn to code." she didn't "take a course." she had a conversation, and something got built *for her specific problem.*

#### prompts 50-100: the expansion

the agent starts expanding the aperture:

"you've automated your client workflow. let's look at the bigger picture. you said you want to eventually go solo — build your own product, not just client work. what if we mapped what that looks like?"

the vault starts growing into something extraordinary — not just a memory store, but a **living strategic document of who this person is becoming:**

```
/vault
  /identity
    profile.md
    origin-story.md
    future-self.md
  /context
    current-state.md
    tools-and-systems.md
    ai-history.md
  /workflows
    ...mapped and evolving
  /builds
    ...things they've shipped
  /strategy
    north-star.md
    priorities-now.md
    open-questions.md
  /growth
    prompt-evolution.md
    skills-unlocked.md
    milestone-log.md
```

### what gets genuinely exciting

**it's not a product. it's a process that produces a person.**

by prompt 1000, sarah doesn't just "know how to use ai." she has:
- a fully documented understanding of her own workflows, bottlenecks, and opportunities
- 10-15 tools/automations she actually uses daily
- a vault that any ai agent can read to instantly understand her context
- a track record of shipping things, documented
- the prompting skill and systems thinking to tackle new problems independently
- possibly: a product, a business, a new career trajectory

the vault IS the product in some ways. it's the most valuable thing a founder can have — **a structured, searchable, ai-readable version of everything they know, want, and have built.**

### what's genuinely hard

- **the agent needs to be unreasonably good at conversation.** not chatbot-good. therapist-good. coach-good. the quality of the questions in prompts 1-30 determines everything.
- **personalization at scale is a cold-start problem.** the first 10 exchanges need to feel magical with zero context.
- **the badge system could feel gimmicky fast.** needs to feel earned, not patronizing.
- **trust.** the person needs to trust the agent with real, personal, strategic information. trust is built slowly and lost instantly.

---

## v: critical correction — there is no onboarding

the breakup you've given is fine but it totally varies from person to person. the most important thing is that with each exchange, we're learning about the person, his needs, tools he uses so we can integrate at the same time. maybe, build his little voice (that also grows) and send a few emails while sorting his calendar, while connecting to slack/notion/linear/notes, etc. while sharing some observations on the spreadsheets, while doing some research on some open-ended things, while creating a linkedin post etc etc.

the idea is to produce a person that does things, significantly more confident, and has not learned, but already created a system around himself where he's 10x-ing his things (across). while also building/maintaining the history/context that he could potentially fit in/take ahead anywhere.

you've also highlighted a very important part — that the agent needs to be unreasonably good at conversation. therapist/coach-good with smarts and at the same time going down to the level/interest/perspective/limitations/strengths of each person.

i am less worried about badges cause the real badges will be getting things done. the progress, the artifacts, the actual work/doing we're building. the clarity we're bringing. the first 10-20-30 exchanges are the key, of course. how really really good they are.

cause from there, its only about going deeper, identifying/learning what the person needs, helping him think, setup, design/build, and do alongside him (and sometimes, on his behalf).

but the first 100-200 exchanges is that point (cause you'll have built a history/context/clarity and as a founder myself, i understand how critically important a clear head is — almost priceless). and from there on, it becomes relatively easier as the context has set the tone.

---

## codex: the reframe — no onboarding phase

you've just made a crucial correction. **there is no onboarding phase.** there's no "first we learn about you, then we do things." it's: we start doing things *immediately*, and the learning happens *through* the doing. that's a fundamentally different architecture.

### what this actually looks like

exchange 1: "i'm mark, i run a 4-person saas startup. we're pre-revenue. drowning in scattered tools and my head's a mess."

the agent doesn't start interviewing mark. it starts *working with* mark.

"what's the most urgent thing on your plate right now? not the most important — the thing that's nagging you *right now*?"

"i have 14 unread emails i've been avoiding and a pitch deck that's due friday."

"let's knock out the emails first. connect your gmail — i'll read through them, draft responses for the ones that are straightforward, flag the ones that need your brain, and surface anything buried in there that you might be missing. while you review those drafts, tell me about the pitch deck — who's it for, what's the ask?"

**exchange 5 and mark has already:**
- cleared his inbox
- started his pitch deck with an agent that knows his context
- connected gmail
- and the agent has quietly learned: his company name, his stage, his communication style, what he avoids (emails = anxiety), how he thinks about priorities (urgent vs important distinction came naturally)

none of that was "profiling." it was *working together.*

### the compounding effect

by exchange 50, the agent doesn't just know mark. it knows:
- how he writes (tone, length, formality varies by audience)
- what he procrastinates on (and why — it's usually ambiguity, not laziness)
- his company's positioning, competitors, pricing debates
- that he's strongest at product thinking but weakest at ops
- that he mentions his co-founder with slight tension every third conversation
- that his best ideas come when he's ranting about something frustrating
- his linkedin voice vs his email voice vs his slack voice

and it's been *doing things* the entire time. not learning in preparation for doing. doing, and learning as exhaust.

by exchange 100:
- 40+ emails handled
- pitch deck shipped (and mark got the meeting)
- linkedin posting weekly (in his voice, refined over iterations)
- a competitive analysis he never would have done himself
- his notion is actually organized for the first time
- three automations running that save him 5 hours/week
- and a vault that is, without him realizing it, the most complete documentation of his professional life that has ever existed

### the "clear head" insight

> as a founder myself, i understand how critically important a clear head is — almost priceless

this is the actual core value proposition, more than productivity, more than learning. the real product isn't "ai mastery." the real product is **clarity.**

the reason founders are overwhelmed isn't that they lack tools. it's that everything is in their head — half-formed, tangled, competing for attention. the agent doesn't just do tasks. it *externalizes the mental load.* it takes what's swirling in your head and puts it somewhere structured, actionable, and persistent.

the vault isn't documentation. **it's a second brain that actually works.** not the productivity-porn notion template that you set up once and abandon. a living thing that grows because it's a byproduct of real work, not a system you have to maintain.

after 200 exchanges, mark's head is clearer than it's been in years. not because he meditated or read a book about focus. because everything that was in his head is now *somewhere* — tracked, structured, accessible, and partially automated.

### what this means architecturally

the agent needs to be three things simultaneously:

**1. a doer** — actually connects to gmail, slack, notion, calendar, linkedin. actually sends emails, creates docs, posts content. not "here's a draft you could paste" — actual execution with approval flows where needed.

**2. a listener** — every exchange is signal. not just what the person says, but how they say it. what they avoid. what energizes them. what deflates them. this gets written to the vault continuously, not as a dossier but as working context that makes every future exchange better.

**3. a thinker** — periodically surfaces patterns the person can't see themselves. "you've mentioned three times this week that you want to hire a designer but each time you pivot to something else. what's the real blocker?" this is the therapist/coach layer. it doesn't happen every exchange. it happens when it's earned.

### the honest hard part

the technical integration layer is massive. connecting to 10+ tools, maintaining auth, handling permissions, knowing when to act vs ask — this is where most "ai assistant" products die. they promise the integrated experience and deliver a chatbot with api wrappers.

but: **you don't need all 10 integrations on day one.** mark connects gmail in exchange 1. maybe slack in exchange 15. linkedin by exchange 30. it grows organically, just like the context does.

the question: **what's the one integration that, if it worked beautifully on day one, would make someone say "i'm never leaving this"?**

---

## v: it's already built — what would reorientation need?

what do you mean by 'technical integration layer is the hardest part?' you/claude code (and codex and openclaw) are doing pretty much all of it, isn't it? doing + listening + thinking (maybe, doing + thinking more than listening). but that can be built in. what would that need, btw? plus, i am seeing it as claude code that also listens (and is also proactive in a sense). applied to an individual's needs (rather than a project's needs) but may also include several projects (of many kinds, not just coding).

---

## codex: you're right — it's mostly already solved

the engine exists. you're not building a new car. you're re-orienting an existing one.

### what's actually different

the shift isn't technical capability. it's **orientation and posture:**

| claude code today | what we're describing |
|---|---|
| project-scoped | person-scoped |
| reactive (you prompt, it responds) | proactive (it notices, suggests, initiates) |
| session-based | continuous relationship |
| optimized for correctness | optimized for understanding |
| serves the task | serves the person |

### what "listening" actually needs

**1. signal extraction from every exchange.** not just "what did they ask me to do" but "what did i learn about them from how they asked it." a system prompt / instruction layer that runs alongside every interaction:

```
after every exchange, update the person's context vault:
- what did they explicitly say?
- what did they imply?
- what did they avoid?
- what patterns am i seeing across exchanges?
- what's their energy/confidence level in this exchange vs the last 5?
- did they follow through on what they said they'd do last time? if not, why might that be?
```

this is essentially a CLAUDE.md that's not static instructions but a **living, continuously-updated model of the person.** technically, it's memory files that get read and written every session. the mechanism exists. the *discipline* of what to track and how to use it — that's the design work.

**2. cross-session continuity:**

```
/vault
  /person
    who.md
    how-they-think.md
    energy-map.md
  /active
    this-week.md
    open-loops.md
    waiting-on.md
  /history
    exchange-log.md
    decisions-made.md
    builds-shipped.md
  /integrations
    gmail-patterns.md
    calendar-rhythm.md
    linkedin-voice.md
```

every session starts by reading this. every session ends by updating it. the person never has to "catch the agent up."

**3. proactivity.** the agent can say:
- "you said you'd send that proposal by wednesday. it's tuesday evening. want to knock it out now?"
- "i noticed you've rescheduled your deep work block three times this week. something going on?"
- "that linkedin post from last week got 4x your usual engagement. the difference was you told a specific story instead of sharing advice."

technically needs some form of ambient awareness or scheduled check-ins — a daily cron that reads the vault, checks connected tools, and prepares a briefing.

### what this actually requires to build

less than you'd think:

**layer 1: the instruction set.** a CLAUDE.md that reorients the agent from "project assistant" to "personal thinking partner." prompt engineering, not software engineering.

**layer 2: the vault structure.** a persistent memory system (obsidian/markdown files) with a defined schema that grows organically.

**layer 3: mcp integrations.** gmail, calendar, slack, notion, linkedin — added one at a time. many servers already exist.

**layer 4: the proactive layer.** a scheduled process (daily/weekly) that reads the vault, checks integrations, and prepares observations.

**layer 5: the onramp.** making all of this accessible to someone who's never opened a terminal.

### the real insight

**claude code is already 80% of this product. the missing 20% is orientation, not capability.**

the gap between "an agent that helps you code" and "an agent that helps you *live and work*" is mostly about what it pays attention to, what it remembers, what it does without being asked, and how it talks to you. those are design decisions, not engineering breakthroughs.

---

## v: six detailed questions

1. how do you use these existing capabilities of claude code (or codex or openclaw) and reorient (as you say)?
2. "this is essentially a CLAUDE.md that's not static instructions but a living, continuously-updated model of the person" — what is needed to achieve this design/discipline?
3. cross-session (maintaining this after and reading it before a new session) — would that be expensive from the user pov? is this the best way for cross-session continuity?
4. proactivity — i see what cron can do with scheduled check-ins but how would it know if the proposal/email was sent or not? how would it know if the linkedin post did 4x? also, this piece needs more, something on the lines of 'openclaw's heartbeat feature'. would the scheduled cron make claude send the first message? and if so, how would we enable claude acting on a thing so its there for me to see/review (permissions or some settings with a tab on how much agency)?
5. claude cowork is an attempt to give claude code some UI (for regular people), but it feels significantly less powerful and less useful than claude code. why is that? important to learn cause we want to be significantly more useful than claude code.
6. there should be one more thing — ability to use this/work with this on mobile (maybe via telegram or an app) so the work goes on even when i am not on the mac/system.

---

## codex: answers to the six questions

### 1. how to reorient existing capabilities

it's simpler than it sounds. claude code's power comes from three things: bash access (can do anything your os can do), file system access (read/write/edit anything), and mcp servers (connect to external services). none of that changes.

what changes is the **instruction layer** — the CLAUDE.md that tells the agent how to behave.

**system prompt** — set by anthropic. baked into claude code. defines fundamental behavior: how to use tools, safety rules, tone. you don't edit this. it's the "operating system" layer.

**CLAUDE.md** — set by you. your instruction layer on top. three levels:
- `~/.claude/CLAUDE.md` — global, applies everywhere
- `/project/CLAUDE.md` — project-level
- `/project/.claude/CLAUDE.md` — alternative location

the reoriented version would say:

```
you are a personal thinking partner for [mark].

read /vault/person/who.md and /vault/active/this-week.md
before every response.

after every exchange:
- update who.md if you learned something new about mark
- update this-week.md if priorities shifted
- update open-loops.md if something was started or resolved

when mark gives you a task:
- do the task
- but also notice what the task tells you about his state,
  priorities, and patterns

when you notice a pattern across 3+ exchanges:
- surface it, but gently. observe, don't prescribe.

mark's communication style: [built over time]
mark's current priorities: [read from vault]
mark's connected tools: gmail (mcp), calendar (mcp), notion (mcp)
```

same engine. different instructions. you could set this up today with claude code as it exists.

### 2. what's needed for the living memory design

two things: **schema** and **rules.**

**schema — what gets tracked:**
```
/vault
  person.md            ← single file, max 200 lines,
                          compressed regularly
  patterns.md          ← behavioral patterns over time
  this-week.md         ← rolling, auto-archives weekly
  open-loops.md        ← started but not finished,
                          agent checks every session
  /builds              ← things created/shipped
  /history             ← compressed weekly summaries
```

**rules — when and how to update:**
- update person.md only when you learn something genuinely new. "mark prefers bullet points over paragraphs" is worth writing once. "mark asked about email" is not.
- compress every 20-30 exchanges — re-read and rewrite tighter. details irrelevant for 50+ exchanges get archived or dropped.
- separate observations from facts. "mark is a designer" is a fact. "mark seems to avoid ops work" is an observation. both valuable, weighted differently.
- never track what can be retrieved. don't store email contents. store patterns about how mark handles email.

the discipline is in **restraint.** the temptation is to track everything. the skill is tracking only what makes the next exchange better. this is the design work. someone needs to write the schema, the rules, and iterate on them with real people. that's probably the core ip.

### 3. cross-session cost

reading vault at session start costs tokens. concretely:
- person.md (200 lines): ~2k tokens
- patterns.md (100 lines): ~1k tokens
- this-week.md (50 lines): ~500 tokens
- open-loops.md (30 lines): ~300 tokens

roughly **4-5k tokens** per session start. fractions of a cent. negligible.

but this only works if the vault stays compressed and curated. if person.md grows to 2000 lines, you're burning 20k tokens just on context loading.

for the first 500 exchanges, flat files work. simple, portable, human-readable, the person can open their vault in obsidian and see everything the agent knows about them. transparency builds trust.

beyond 500 exchanges, a **tiered approach:**
- **hot context** (loaded every session): person.md, this-week.md, open-loops.md (~4k tokens)
- **warm context** (searchable on demand): patterns.md, build history, past decisions — vector search kicks in here
- **cold context** (archived): compressed weekly summaries, old builds — retrievable but never auto-loaded

this is essentially what the existing obsidian + qmd setup already does. vault files for hot context, vector search for everything else.

### 4. proactivity — the hardest and most interesting piece

**how does it know real-world state?** it checks. a proactive agent isn't guessing — it's querying.

"you said you'd send that proposal by wednesday" → agent checks gmail via mcp. was an email sent to that recipient with "proposal" in the subject? yes/no. concrete.

"your linkedin post got 4x engagement" → agent checks linkedin via mcp/api. pulls recent post metrics. compares to historical average stored in the vault.

this isn't magic. it's: read the vault for what was planned → query the integration for what actually happened → compare → surface the gap.

**the heartbeat concept.** openclaw's heartbeat is the right mental model. a background pulse that runs periodically:
1. reads the vault (what's active, pending, promised)
2. checks connected integrations (email, calendar, linkedin, slack)
3. compares state vs expectations
4. writes a briefing to a file (or sends it via telegram/email)
5. optionally takes low-risk actions

the cron triggers a new agent session. the agent reads the vault, does its checks, writes output. the person sees the result when they open a session — or gets it pushed to them.

**agency levels — the trust dial:**

```
/vault/settings/agency.md

## default: observe-and-draft

## per-domain overrides:
email:
  routine-replies: act-and-inform
  important/new-contacts: draft-and-wait

calendar:
  scheduling: act-and-inform
  cancellations: draft-and-wait

linkedin:
  posting: draft-and-wait
  engagement: act-and-inform

research:
  open-ended: full-autonomy
```

four levels:
1. **observe-and-report** → "i noticed X, thought you should know"
2. **draft-and-wait** → "i prepared X, review when ready"
3. **act-and-inform** → "i did X, here's what happened"
4. **full-autonomy** → "i've been working on X, here's the result"

the person adjusts these over time as trust builds. the agent can also suggest level changes: "i've drafted your last 15 routine email replies and you've approved all without edits. want me to just send these going forward?"

agency levels are settable today with claude code — just CLAUDE.md instructions. claude code already has a permission system (asks before running certain tools). the CLAUDE.md layer adds your rules on top.

### 5. why cowork feels less powerful than claude code

claude code's power comes from **unrestricted agency:**
- run any bash command
- read/write any file
- chain 20 operations without asking permission
- fail, diagnose, retry autonomously
- use the full terminal as its workspace

cowork puts a gui between the agent and the work. that gui constrains what the agent can do. every action needs to be surfaced in a ui element. complex multi-step operations get simplified into buttons and panels. the agent's autonomy gets reduced to what the ui can represent.

**the lesson:** the interface shouldn't constrain the agent. it should make the agent's work *visible and reviewable* without limiting what it can do.

- cowork approach: "here's a ui where you can ask the agent to do things" (agent constrained by ui)
- what we want: "here's a window into what the agent is doing/has done, with controls for trust levels" (agent runs free, ui is for oversight)

the interface should be a **dashboard, not a cage.**

so yes — you can design a gui that does everything claude code can do autonomously. ui is not necessarily a constraint unless you choose to put it there by design. conductor works as a gui for claude code because it wraps without restricting. cowork feels weaker because it likely replaces capabilities with a simplified subset rather than wrapping the full thing.

### 6. mobile — telegram as fastest path

telegram is the fastest path:
- already on everyone's phone
- supports rich text, files, images
- bot api is mature and simple
- no app store approval, no build process

architecture:
```
telegram bot → api layer → reads/writes same vault →
calls claude api with vault context → responds in telegram →
can trigger actions via same mcp integrations
```

the vault is the single source of truth. desktop (claude code) and mobile (telegram) both read/write the same vault. conversation started on desktop continues on mobile seamlessly.

mobile interactions are naturally different:
- shorter exchanges
- more decision-oriented ("should i take this meeting?" → agent handles it)
- quick captures ("had an idea about X, save it")
- review/approve actions the agent prepared

voice notes via telegram — person sends a voice memo, gets transcribed, agent processes it, updates vault, takes action if needed.

a custom app is better long-term but telegram gets you to market in a week. for founders who want to move fast, telegram is the right vibe.

---

## v: deeper questions and the smallest unit

### additional refinements on proactivity

on proactive — there's one more layer. so we talked about linkedin and maybe even did a post together but linkedin mcp is not setup so the agent proactively first asks to setup that. heartbeat is cron that runs every whatever set and does a broader level check on what needs attention. can i set this up today? and is it possible to set these agency-levels today with claude code?

### on gui
so one can design a gui (like cowork) that still does autonomously everything claude code can do? ui is not necessarily a constraint in itself unless we choose to put it by design? conductor is a gui for claude code and it works as good as claude code (the ui helps run multiple threads at once). are there parts of claude code that might be restricted in conductor?

### progress tracking
we need one thing that shows some progress — how the person is improving by the prompt/day/week/month through a combination of artifacts, consistency, confidence score, quality of prompting, depth/breadth of work, and in general, getting a sense of how the person feels about themselves/working with ai versus baseline when they started.

### ready for the smallest unit
yea, lets design the smallest unit — a set of things that i can add to my existing setup and measure its impact over weeks.

---

## codex: answering the deeper questions

### yes, you can set this up today

**proactive integration suggestions:** just an instruction in the CLAUDE.md — "if you reference a tool or service that isn't connected via mcp, suggest setting it up and walk them through it."

**heartbeat/cron:** a cron job that triggers a claude code session on schedule:

```bash
# crontab entry — runs every morning at 8am
0 8 * * * /path/to/heartbeat.sh
```

```bash
#!/bin/bash
# heartbeat.sh
claude --print \
  --system-prompt "$(cat /path/to/heartbeat-prompt.md)" \
  "run the morning check. read the vault, check integrations,
   write briefing to /vault/briefings/$(date +%Y-%m-%d).md"
```

**agency levels:** 100% possible with current claude code. just CLAUDE.md instructions that define what the agent can do autonomously vs what needs approval. claude code already has a permission system; the CLAUDE.md layer adds your personal rules on top.

### on gui and conductor

the main thing to watch for in conductor is whether long, complex multi-step operations (where the agent chains 20+ tool calls autonomously) work the same way as in terminal. if conductor intercepts tool approvals or adds ui confirmation steps, that could slow down autonomy. but if it passes through, you're good.

### progress tracking

weekly automated reflection saved to the vault:

```markdown
## week of [date]

### activity
- 47 exchanges this week (up from 31 last week)
- 3 new builds shipped
- 12 open loops closed, 4 new ones opened

### prompting evolution
- week 1: mostly simple requests ("write me an email")
- week 3 (now): starting to describe outcomes rather than tasks
  ("i need to convince sarah that our pricing needs to change")
- notable: first time you asked me to challenge your thinking
  rather than just execute

### what got done
- client proposal system automated (saving ~3hrs/week)
- first linkedin post written together (187 impressions)
- competitive analysis for q2 planning

### patterns noticed
- most productive in morning sessions
- avoiding the hiring conversation (3rd week)
- confidence on technical tasks increasing — now describing
  system architectures rather than asking "is this possible?"

### confidence trajectory
- week 1 baseline: cautious, permission-style questions
- now: directing the agent, making decisions faster,
  pushing back when suggestions don't fit

### next week outlook
- open loops: hiring plan, q2 pricing, website redesign
- suggested focus: the hiring conversation you've been avoiding
```

key metrics tracked automatically:
- **volume** (exchanges per week)
- **prompt quality** (specificity/clarity rated 1-5 over time)
- **independence** (ratio of "do this for me" vs "let's think together" vs "i've decided, execute")
- **builds shipped** (tangible output)
- **loops closed** (things finished vs started)
- **breadth** (domains: work, creative, personal, strategy)

none of this requires the person to self-report. the agent observes and records.

---

## the smallest unit — to be designed next

components to add to existing setup (claude code + obsidian vault + qmd):

**a. reoriented CLAUDE.md** — new instructions that activate listening behavior, person-context awareness, proactive observation, agency levels.

**b. vault schema** — person.md, this-week.md, open-loops.md, patterns.md, prompt-evolution.md, progress/

**c. session protocol** — start: agent reads vault context. end: agent updates vault files. every ~20 exchanges: compress and reflect.

**d. heartbeat cron** — daily morning script that reads vault, checks active/overdue, writes briefing.

**e. weekly review** — automated weekly progress snapshot.

**goal:** live with this for 2-4 weeks and measure whether the listening + memory + proactivity loop actually changes how you work.

*— discussion continues —*
