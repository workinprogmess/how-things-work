# 10k prompts to genius — conversation 002

*date: 2026-02-17 → 2026-02-18*
*topic: designing the CLAUDE.md / system instructions*

---

## V: let's design the smallest unit

the smallest unit has five components:
- a. reoriented CLAUDE.md
- b. vault schema
- c. session protocol
- d. heartbeat cron
- e. weekly review

re-orienting claude.md makes the most sense. lets design that. along with session protocol (would it be a hook?).

questions:
1. claude code sometimes misses following claude.md. how do we ensure it follows?
2. on vault schema + heartbeat + weekly review — we want to go back to the onboarding approach. if we just apply a schema, it won't be from the person's pov but what we think is right. some parts may apply (person.md, patterns.md) but how the person works, what progress looks like, what their baseline is — that should be discovered.

---

## codex: ensuring claude.md compliance + emergent structure

### making claude.md stick

claude code misses instructions when:
- the CLAUDE.md is long (attention dilutes)
- instructions are buried in the middle/bottom
- they conflict with system prompt defaults
- the task is complex enough that the agent focuses on execution

strategies:
1. **keep it short and front-loaded.** most critical instructions at the top.
2. **make instructions specific, not aspirational.** "after every 3rd response, append 1-2 lines to who.md if you learned something new" beats "pay attention to what the user implies."
3. **self-check mechanism.** every 10 exchanges, the agent re-reads who.md and checks if it updated. leaves a trace so you can verify.
4. **hooks as enforcement.** a `Stop` hook could check if person.md was modified. can't force action but creates a visible signal.

most reliable approach: keep CLAUDE.md under 30-40 lines, ultra-specific, and test the first week — watch where it drifts and tighten.

### session protocol — hooks vs habits

claude code hooks:
- `PreToolUse` — before a tool runs
- `PostToolUse` — after a tool runs
- `Stop` — when agent stops
- `Notification` — when notifications fire

hooks run shell commands, not agent actions. can't tell the agent "update the vault" because the agent has already stopped.

**session start:** not needed as a hook. CLAUDE.md itself is read at session start, so the instruction "read who.md before your first response" IS the start protocol.

**session end options:**
- option a: make it a habit (80% reliable)
- option b: `/done` convention — explicit trigger
- option c: `Stop` hook that logs whether vault files changed (audit trail)

recommendation: option b primary, option c backup.

### vault schema should emerge, not be imposed

the revised approach:
- start with `/person/who.md` as the only pre-created file
- everything else emerges from conversation
- the CLAUDE.md doesn't say "create patterns.md and this-week.md" — it says:

```
as you work with this person, organize their context
using whatever structure fits how they think and work.
when you notice a natural grouping, create a file.
name it in the person's language.
```

the agent discovers: how V organizes thinking, what rhythm he works in, what progress means to him, where he stands today, what he actually wants.

---

## V: where does this conversation happen? + cron + telegram

questions:
1. where does the broad conversation happen? in the terminal overall, not inside a project/repo? cause conductor and other tools work inside a project.
2. on cron initiating an agent session — how does that work? let's set up daily so even if i don't initiate, claude does.
3. what would it take to connect claude code with telegram so work goes on when not on the system? would mac need to be always open?

---

## codex: architecture answers

### where — a dedicated vault directory

`~/workinprogmess-vault/` is already the vault. no need for a new directory. it gets its own `.claude/CLAUDE.md` with full personal-agent instructions. two layers:

| layer | location | scope |
|---|---|---|
| global | `~/.claude/CLAUDE.md` | lightweight listener everywhere |
| project | `~/workinprogmess-vault/.claude/CLAUDE.md` | full personal-agent mode |

when working in conductor on a project, global CLAUDE.md still feeds signals. when working inside the vault directory, full agent mode activates.

### cron — how it actually works

```bash
#!/bin/bash
# heartbeat.sh
cd ~/workinprogmess-vault
claude --print \
  --allowedTools "Read,Write,Edit,Glob,Grep" \
  -p "read vault, check repos, write briefing to
      everyday/YY.MM.DD.md"
```

```bash
# crontab
0 8 * * * ~/workinprogmess-vault/heartbeat.sh
```

cron fires → claude --print runs non-interactively → reads vault → writes briefing → exits. when V opens a session later, briefing is waiting.

mac needs to be on for cron. alternative: launchd (handles sleep/wake better). or: claude code on a cloud server, always on.

### telegram — three options

- **option a (local):** telegram bot → mac → claude code CLI → full power. mac must be on.
- **option b (cloud):** telegram bot → cloud server → claude API → lighter but always available. vault syncs via git.
- **option b+ (cloud with claude code):** install claude code on cloud server. full power, always on.

for dry-run: option a. production: option b+.

### claude api vs claude code

claude code = CLI application with bash, file system, mcp, sub-agents (runs locally).
claude api = raw http endpoint. same brain, but YOU define what tools exist.

for building for other users: claude api + agent sdk. rebuild the tool layer for the specific use case. the behavior design (CLAUDE.md) transfers directly to agent sdk system prompts.

agent sdk + api to match claude code: ~2-4 weeks to MVP for a specific use case. you don't rebuild all of claude code — just the subset needed.

---

## V: detailed feedback on the CLAUDE.md draft

### on vault structure

looked at the two vault structures from conversation-001. liked `/person` as a folder with who.md, how-they-think.md, energy-map.md — gives something real to work with. other structure should emerge from conversations.

### on continuous updates

person updates can be continuous, but should we use a background agent so regular conversation isn't affected? other docs (clarity, weekly, whatever) — update at end via cron? the daily cron makes sense: update docs from all threads today.

### on heartbeat

needs to be personalized. V needs less help on gmail/calendar and more on:
- writing/publishing
- researching
- unfinished projects/tasks (finishing/building)
- personal todos

### on agent sdk + api

how far/close to claude code experience? some work, not a whole lot. ~2-4 weeks to MVP. the behavior design transfers directly.

---

## codex: first CLAUDE.md draft

[see claude-md-v1.md for the first complete draft]

---

## V: edits to the first draft

- who.md is the only doc to start, everything goes there. but shouldn't patterns, energy, etc form their own docs eventually? keep patterns separate from who.
- "surface naturally" — what does that actually mean mechanically? can claude do this?
- "do not reorganize unless asked to" — add the exception
- what kind of files/structure might emerge? need examples.
- "actively discover" questions are good but should hint at what docs they produce. "where does he stand today" should set a baseline for measuring progress.
- initial attempt to learn about the person is missing. should be active curiosity, not just passive listening.
- proactive observations — during a session, claude is focused on the task. when does it notice patterns? during self-check? during daily cron? via telegram?
- "what V needs help with" — give examples but ask claude to build understanding, not pre-list.
- briefing — it's produced by cron, surfaced at session start. clarify this flow.

---

## codex: addressing each edit

### claude's ability to surface naturally

honest answer: claude can do this, but inconsistently. when it reads who.md at session start and it contains patterns, claude will hold that context. when a relevant moment comes up, it can weave it in. but if the task is complex, claude might forget.

the self-check is the safety net. a shorter, sharper who.md (40 lines vs 200) stays more active in context.

it's a capability, not a guarantee. the design compensates for inconsistency.

### the example patterns were hypothetical

100% made up as examples. no data on V's actual patterns. the agent discovers real ones over time.

### self-check record

good idea: `person/observations.md` where claude logs self-check thoughts. serves as audit trail, memory for observations that didn't fit into conversation, and fuel for morning briefings.

### briefing when V starts with specific intent

approach a (recommended): brief footnote at start. "on it. morning briefing flagged two things — parking those for after." one line, then work.

approach b: don't mention it. briefing carries forward to tomorrow. nothing lost.

---

## codex: revised CLAUDE.md (v2)

[see claude-md-v2.md for the revised draft]

key changes from v1:
- "thinking partner" framing instead of "personal agent"
- active learning/curiosity section for early sessions
- who.md as trunk, themes graduate to own files when 10-15+ lines
- examples of docs that might emerge (patterns, how-V-works, baseline, voice)
- self-check logs to observations.md with timestamps
- baselines section — progress measured against starting points
- briefings in everyday/ not a separate folder
- V always uppercase
- footnotes on who.md updates linking to source threads
- progress section with weekly snapshots and example metrics
- todos.md as single view across all projects
- proactive observations happen in-session (self-check) and in briefings (cron)
- tighter wording throughout

---

## V: final feedback

- document the conversation and CLAUDE.md versions
- notes and further questions incoming

*— conversation continues —*
