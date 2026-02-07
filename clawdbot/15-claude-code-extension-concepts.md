# claude code: skills vs plugins vs /commands vs hooks vs agents vs mcp

---

## the one-liner each

| concept | what it is |
|---------|-----------|
| **skill** | a recipe claude reads when it needs to do a specific task |
| **plugin** | a package that bundles skills + hooks + agents + mcp together |
| **/command** | a shortcut you type to trigger something explicitly |
| **hook** | a tripwire that fires automatically at specific moments |
| **agent** | a worker claude spawns to handle a subtask in isolation |
| **mcp** | a universal plug that connects claude to external tools/data |

---

## skill

**what:** a folder with a `SKILL.md` file (markdown + yaml frontmatter) that teaches claude *how* to do something specific.

**how it works:** claude reads the description, and when a task matches, it loads the full instructions. lazy-loaded — only pulled in when relevant, not sitting in context all the time.

**invocation:** automatic (claude decides) OR manual (as a /command)

**example — commit message formatter:**
```
~/.claude/skills/commit-skill/SKILL.md
---
name: commit
description: formats git commit messages following team conventions
---
when committing, use conventional commits format...
always include a "why" statement...
```
you just say "commit this" and claude loads the skill. or type `/commit`.

**example — code reviewer:**
```
a skill that knows your team's review checklist.
claude loads it automatically when you say "review this pr."
```

**where it works:** claude code, claude.ai, api — anywhere skills are supported.

---

## plugin

**what:** a distribution package. it bundles multiple things together — skills, hooks, agents, mcp servers — into one installable unit.

**how it works:** you install it, toggle it on/off. it's a container, not a capability itself.

**invocation:** n/a — it's the box, not the tool inside.

**example — "django-dev" plugin:**
```
django-dev/
├── skills/
│   ├── django-models/SKILL.md      (knows how to write models)
│   └── django-migrations/SKILL.md  (knows migration patterns)
├── agents/
│   └── django-tester/AGENT.md      (runs django tests)
└── hooks/
    └── pre-commit-lint.json        (runs ruff before every commit)
```
one install gives you all of that.

**where it works:** claude code only.

---

## /command (slash command)

**what:** an explicit shortcut you type to trigger an action. now merged into the skills system — every skill automatically becomes a /command too.

**how it works:** you type `/something`, claude runs it. no guessing, no matching — direct invocation.

**invocation:** manual (you type it).

**examples:**
- `/help` — show available commands (built-in)
- `/compact` — compress conversation to save context (built-in)
- `/init` — initialize a project with CLAUDE.md (built-in)
- `/commit` — triggers commit skill (custom, from a skill)
- `/review-pr 1234` — triggers pr review skill with args (custom)

**key nuance vs skills:** skills can activate *automatically* when claude thinks they're relevant. /commands only fire when *you* explicitly type them. same underlying thing, two invocation paths.

**where it works:** claude code only.

---

## hook

**what:** a shell command or llm prompt that fires automatically at a specific lifecycle event. think: git hooks, but for claude's actions.

**how it works:** you define triggers in json. when claude hits that moment (about to write a file, just finished a task, starting a session), the hook fires. deterministic — doesn't rely on claude "remembering" to do it.

**invocation:** automatic (event-driven). you don't call them — they fire on their own.

**lifecycle events:**
- `sessionstart` — when a new conversation begins
- `pretooluse` — *before* claude uses a tool (can block it)
- `posttooluse` — *after* claude uses a tool
- `stop` — when claude finishes its turn
- `notification` — when claude asks for permission

**example — auto-run tests after every change:**
```json
{
  "hooks": {
    "stop": [{
      "type": "command",
      "command": "npm test"
    }]
  }
}
```
every time claude finishes, tests run. no asking, no forgetting.

**example — block writes to production config:**
```json
{
  "hooks": {
    "pretooluse": [{
      "type": "command",
      "command": "if echo $TOOL_INPUT | grep -q 'production.yml'; then exit 1; fi",
      "matcher": "Write"
    }]
  }
}
```
if claude tries to write to `production.yml`, the hook blocks it.

**where it works:** claude code only.

---

## agent (subagent)

**what:** a separate claude instance that handles a subtask in its own isolated context. the main claude delegates work to it and gets a result back.

**how it works:** main claude says "i need X researched" → spawns a subagent → subagent works in its own context window → returns a summary. keeps the main conversation clean.

**invocation:** automatic (claude delegates) or you can define custom agents.

**example — built-in agents:**
- `explore` — quickly searches/navigates a codebase
- `plan` — designs implementation strategy before coding

**example — custom "security-auditor" agent:**
```
~/.claude/agents/security-auditor/AGENT.md
---
name: security-auditor
description: reviews code changes for security vulnerabilities
tools: [Read, Grep, Glob]
---
you are a security auditor. check for:
- sql injection, xss, command injection
- hardcoded secrets
- insecure dependencies
```
when claude writes code, it can delegate a security review to this agent. the agent works separately, returns findings.

**why not just a skill?** a skill gives claude *instructions*. an agent gives claude a *worker* — separate context, separate tools, separate focus. skills teach, agents do.

**where it works:** claude code only.

---

## mcp (model context protocol)

**what:** an open standard protocol that connects claude to external systems — databases, apis, browsers, anything. like usb but for ai tools.

**how it works:** an mcp server runs (locally or remote), exposes tools/resources. claude connects to it and those tools appear in claude's toolkit. claude can then call them like any built-in tool.

**invocation:** available to claude as tools. claude decides when to use them based on the task.

**example — github mcp server:**
```json
// in claude code settings
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "..." }
    }
  }
}
```
now claude can create issues, review prs, search repos — all through the mcp tools.

**example — postgres mcp server:**
```
claude can query your database directly.
"how many users signed up last week?" → claude calls the db tool → gets the answer.
```

**example — browser automation (like what we have right now):**
```
the claude-in-chrome mcp gives claude tools like:
read_page, navigate, click, screenshot, javascript_exec
```

**where it works:** claude code, claude.ai, any mcp-compatible client. it's an open standard.

---

## how they all connect

```
plugin (the box)
├── skills (the recipes claude reads)
│   └── also available as /commands (explicit shortcuts)
├── agents (the workers claude delegates to)
├── hooks (the tripwires that fire automatically)
└── mcp servers (the plugs to external systems)
```

---

## use-case walkthrough: "implement the feature from jira-1234"

```
1. mcp        → fetches ticket details from jira
2. skill      → "product spec writer" activates (matches context)
3. agent      → "architect" subagent designs the solution
4. hook       → pretooluse validates file paths before writes
5. [claude]   → implements the code
6. hook       → stop event runs tests automatically
7. /command   → you type /commit to format the message
8. mcp        → updates jira ticket status to "done"
```

---

## use-case walkthrough: "review this pr for our team"

```
1. /command   → you type /review-pr 456
2. mcp        → github mcp fetches pr diff and comments
3. skill      → "code review checklist" loads team conventions
4. agent      → "security-auditor" checks for vulnerabilities
5. agent      → "perf-reviewer" checks for performance issues
6. [claude]   → synthesizes all findings into review
7. hook       → posttooluse logs the review to team dashboard
8. mcp        → posts review comments on github
```

---

## use-case walkthrough: clawdbot parenting agent context

if you were building skills/plugins for your clawdbot-based parenting agent:

```
- skill:    "milestone-tracker" — knows child development milestones by age
- skill:    "toy-recommender" — knows how to match toys to developmental stage
- agent:    "research-agent" — spawns to deep-dive a topic (school comparison, etc)
- hook:     "safety-filter" — blocks any response that contains unsafe content
- mcp:      "child-profile-db" — connects to per-family data store
- plugin:   "parenting-toolkit" — bundles all of the above into one install
```

---

## quick reference

| | who triggers it? | where defined? | isolation? | works outside claude code? |
|-|-----------------|---------------|-----------|---------------------------|
| **skill** | claude (auto) or user (/cmd) | SKILL.md | no (shares context) | yes (claude.ai, api) |
| **plugin** | n/a (container) | directory structure | n/a | no |
| **/command** | user (explicit) | merged into skills | no | no |
| **hook** | system (event-driven) | json config | no | no |
| **agent** | claude (delegation) | AGENT.md | yes (own context) | no |
| **mcp** | claude (tool calls) | server config | yes (own process) | yes (open standard) |
