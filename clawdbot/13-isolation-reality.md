# isolation reality - what clawdbot actually provides

---

## correction to earlier docs

earlier i said "clawdbot handles multi-user automatically via telegram routing."

**this was an oversimplification that omitted critical information.**

what i should have said: clawdbot routes messages per-user, but does NOT provide full data isolation for multi-user products.

---

## what clawdbot isolates vs doesn't

### ✓ what IS isolated (natively)

| component | how it's isolated |
|-----------|-------------------|
| **conversation history** | separate session files per telegram user_id |
| **session context** | each user has own conversation thread |

### ✗ what is NOT isolated (natively)

| component | the problem | risk |
|-----------|-------------|------|
| **persistent memory** | memory files are per-agent, not per-user | user A's child info could appear for user B |
| **tools (file system)** | all users access same host filesystem | user A could see user B's files |
| **tools (shell)** | all users can run commands on same host | security nightmare |
| **tools (browser)** | shared browser context | session/cookie leakage |
| **credentials** | same api keys for all users | billing is shared (fine), but no separation |
| **per-family data** | doesn't exist as a concept | can't scope data to a family unit |

---

## why this matters for a parenting product

parenting data is sensitive:
- child's name, age, developmental status
- parent observations and concerns
- medical/developmental notes
- family preferences

**if memories leak between users:**
- parent A asks "how's emma doing?"
- agent responds with info about parent B's child
- trust destroyed, potential legal issues

**if tools leak:**
- agent stores parent A's data in a file
- parent B's session could access that file
- data breach

---

## the three real options (revised)

### option 1: single instance (NOT for production)

```
one clawdbot → many telegram users
```

**what you get:** message routing works, sessions separate
**what you don't get:** memory isolation, tool isolation, data safety

**use for:** personal testing only
**never use for:** real users with real data

---

### option 2: docker-per-user (production-safe)

```
each user → their own docker container → their own clawdbot
```

**what you get:**
- complete isolation (memory, files, tools, everything)
- user A literally cannot access user B's container
- each family has their own "mini-server"

**what you pay:**
- more infrastructure (~$3-10/user/month for compute)
- orchestration complexity (spinning up/down containers)
- more ops work

**use for:** beta onwards, any real users

---

### option 3: fork + add user-level isolation (production-safe, most work)

```
modify clawdbot internals to scope everything by user_id
```

**what you change:**
- memory paths: `~/memory/{user_id}/notes.md`
- session paths: `~/sessions/{user_id}/...`
- tool access: scoped to user's directory only
- config: per-user settings

**what you get:**
- single instance can safely serve many users
- efficient resource usage
- full isolation at application level

**what you pay:**
- significant code changes
- deep understanding of clawdbot internals
- harder to merge upstream updates

**use for:** scale (1000+ users), long-term product

---

## recommended path (revised)

| phase | approach | why |
|-------|----------|-----|
| **now (testing)** | single instance, just you | learning, no risk |
| **beta (5-50 users)** | docker-per-user | real data needs real isolation |
| **growth (50-500 users)** | docker-per-user, optimized | still manageable at this scale |
| **scale (500+ users)** | consider option 3 or hybrid | efficiency matters at scale |

---

## cost implications (revised)

### single instance (not recommended for real users)
- $5-10/month total
- but NOT production-safe

### docker-per-user (recommended)
- per-user compute: ~$2-5/month
- per-user ai api: ~$1-4/month
- **total per user: ~$3-9/month**

at $30-50/month pricing:
- cost: $3-9
- margin: $21-47
- **still healthy (70-90% gross margin)**

---

## key takeaway

**"telegram multi-user" ≠ "production-ready multi-user"**

telegram routes messages to different users.
it does NOT isolate their data, memories, or tool access.

for a real product with sensitive data:
- docker-per-user minimum
- or deep isolation work in the codebase

---

## apology

i should have been clearer about this from the start. the oversimplification could have led to:
- building on wrong assumptions
- shipping an unsafe product
- data leaks between families

your friend caught it. good to have that check.
