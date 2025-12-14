# what we're building

> a node-based infinite canvas tool for deep learning through exploration

---

## the core insight

when learning something deeply, questions spawn questions. currently, you either:
- **chase the rabbit hole** → lose original context
- **stay on track** → leave gaps in understanding

**this tool solves that:** branch off, explore the tangent *with context*, come back. the tree *is* your understanding.

---

## who is this for

- **primary user:** you (solo learner)
- **use case:** deep learning — understanding something so thoroughly that you *own* the knowledge
- **not (yet):** collaboration, team use, real-time multiplayer

---

## the core mechanic

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌─────────────┐                                          │
│   │ how do      │                                          │
│   │ llms work?  │  ← root node (starting question)         │
│   └──────┬──────┘                                          │
│          │                                                  │
│    ┌─────┴─────┐                                           │
│    ▼           ▼                                           │
│ ┌──────┐   ┌──────┐                                        │
│ │tokens│   │neural│                                        │
│ │      │   │ nets │                                        │
│ └──┬───┘   └──┬───┘                                        │
│    │          │                                            │
│    ▼          ├────────┐                                   │
│ ┌──────┐   ┌──────┐ ┌──────┐                              │
│ │ bpe  │   │back- │ │trans-│                              │
│ │      │   │ prop │ │former│  ← you're here               │
│ └──────┘   └──────┘ └──────┘    reading about transformers │
│                        │                                   │
│                        ▼                                   │
│                     ┌──────┐                               │
│                     │ ???? │  ← about to branch            │
│                     │      │    (highlighted "attention")  │
│                     └──────┘                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**interaction flow:**
1. you're reading the "transformer" node
2. you see "attention" and don't fully get it
3. you highlight "attention"
4. new node branches off: "what is attention in transformers?"
5. llm responds *with context* — knows the full path you took
6. you keep exploring or branch again

---

## context model

when you branch, what context does the llm see?

| layer | what's included | purpose |
|-------|-----------------|---------|
| **highlighted text** | the exact text you selected | the specific question |
| **parent node** | full content of immediate parent | immediate context |
| **path summary** | summarized path from root to here | broader context |

**example:**
```
root: "how do llms work?"
  └→ "neural networks basics"
      └→ "transformer architecture"
          └→ [you highlight "attention"]

llm sees:
- highlighted: "attention"
- parent: full "transformer architecture" explanation
- path summary: "user is learning how llms work,
                 started from neural net basics,
                 now exploring transformer architecture"
```

---

## tree structure (v1)

- **strict tree:** one parent per node
- **multi-parent (dag):** later feature, not v1
- **merging branches:** later feature, not v1
- **central node repository:** nice to have, not v1

**v1 keeps it simple:** pure tree, clean mental model

---

## navigation

how do you find your way in 200+ nodes?

| method | what it does | v1 priority |
|--------|--------------|-------------|
| **search** | find nodes by content | must have |
| **breadcrumbs** | show path from root to current | must have |
| **collapse/expand** | hide branches you're not working on | must have |
| **minimap** | zoomed-out overview in corner | nice to have |
| **bookmarks/pins** | mark frequently visited nodes | nice to have |
| **recents** | "what was i looking at yesterday?" | nice to have |

---

## the "aha" moments

**small aha:**
> "i can finally dig into webgl without losing my train of thought about canvas tools"

the ability to branch off on something you don't understand, explore it fully, and still have the original context waiting.

**big aha:**
> "i have 200 nodes and i genuinely understand this whole domain now"

the tree *is* your understanding. looking at it, you can see how everything connects. you couldn't get this from a linear chat or a static document.

---

## exploring vs thinking

two modes that might eventually diverge:

| aspect | exploring (v1 focus) | thinking (future) |
|--------|----------------------|-------------------|
| goal | understand what exists | create something new |
| direction | llm → you (knowledge transfer) | you ↔ llm (collaborative) |
| llm role | teacher, explainer | advisor, consultant |
| your role | student, questioner | architect, decision-maker |
| branching trigger | "i don't understand X" | "what if we did X?" |
| end state | "i get it now" | a plan/design/decision |
| node content | explanations | options, decisions, reasoning |

**for v1:** focus on exploring. same mechanics may support thinking later.

---

## technical constraints (v1)

| aspect | v1 approach |
|--------|-------------|
| **model** | single model (claude/gemini/chatgpt) |
| **content type** | text only |
| **storage** | local-first, cloud sync later |
| **projects** | separate projects (not one mega-canvas) |
| **scale target** | 100s of nodes per project, butter smooth |
| **context handling** | path summarization (rag later if needed) |

---

## context window strategy

**the problem:**
- 200 nodes × 500 tokens avg = 100k tokens
- fits in context, but: expensive, slow, noisy

**v1 approach — path summarization:**
1. always include: highlighted text + parent node (full)
2. summarize: path from root to parent
3. result: focused context, not overwhelming

**future approach — embeddings + retrieval:**
1. embed each node as vector
2. on query, find most relevant nodes across tree
3. include only relevant nodes (not whole tree)

---

## output / what you're left with

when you're "done" exploring a topic:

| output | what it is | v1 priority |
|--------|------------|-------------|
| **the canvas itself** | revisitable, explorable | must have |
| **export to pdf** | linear document from selected path | nice to have |
| **export to markdown** | portable text format | nice to have |
| **shareable link** | others can explore your tree | future |
| **blog/essay generation** | ai synthesizes tree into prose | future |

**v1 focus:** the canvas *is* the artifact. export comes later.

---

## open questions

things we haven't decided:

1. **how do you start?**
   - blank canvas + type a question?
   - prompt: "what do you want to learn about?"
   - paste existing content to branch from?

2. **can you edit nodes after creation?**
   - regenerate response?
   - manually edit text?
   - both?

3. **what does a node look like?**
   - just text?
   - collapsible sections?
   - metadata (timestamp, model used)?

4. **how do you branch?**
   - highlight text + button?
   - highlight text + keyboard shortcut?
   - right-click menu?

5. **what happens to orphaned branches?**
   - you branch from a node, then realize the parent was wrong
   - delete parent = delete children?
   - archive vs delete?

---

## mvp definition

the smallest thing that's still useful:

- [ ] infinite canvas with pan/zoom
- [ ] create root node (starting question)
- [ ] llm responds in node
- [ ] highlight text to branch
- [ ] new node inherits context (parent + path summary)
- [ ] collapse/expand branches
- [ ] search across nodes
- [ ] breadcrumb navigation
- [ ] local persistence (survives refresh)
- [ ] one project at a time

**not mvp:**
- multiple projects
- cloud sync
- export
- collaboration
- multi-model
- images/media
- rag/embeddings

---

*last updated: december 2024*
