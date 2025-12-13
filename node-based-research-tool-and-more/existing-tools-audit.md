# existing tools audit: node-based infinite canvas research

> research for building a node-based infinite canvas research tool with multimodality and llm integration.

---

## table of contents

1. [canvas/spatial tools](#1-canvasspatial-tools)
   - [heptabase](#11-heptabase)
   - [tldraw](#12-tldraw)
   - [obsidian canvas](#13-obsidian-canvas)
   - [kinopio](#14-kinopio)
   - [miro](#15-miro)
   - [scapple](#16-scapple)
   - [affine](#17-affine)
   - [excalidraw](#18-excalidraw)
2. [ai-native tools](#2-ai-native-tools)
   - [napkin ai](#21-napkin-ai)
   - [perplexity pages](#22-perplexity-pages)
   - [chatgpt canvas](#23-chatgpt-canvas)
   - [lex](#24-lex)
   - [cursor](#25-cursor-ai-code-editor)
3. [technical deep dive: rendering & performance](#3-technical-deep-dive-rendering--performance)
4. [feature matrix comparison](#4-feature-matrix-comparison)
5. [key learnings for our tool](#5-key-learnings-for-our-tool)
6. [sources](#6-sources)

---

## 1. canvas/spatial tools

### 1.1 heptabase

**what it is:** visual knowledge base for students, researchers, and lifelong learners. currently the most developed app in the visual note-taking space.

**core model:**
- card-based system on infinite canvas
- cards live in a central "cards" repository — can be reused across multiple whiteboards without duplication
- bi-directional links between cards
- free-form whiteboard with connection lines forming neural web-like structures

**key features:**
| feature | details |
|---------|---------|
| canvas | infinite, zoomable whiteboard |
| cards | reusable across boards, no duplication |
| pdf integration | drag & drop highlights from pdf to canvas; clicking opens original location |
| readwise sync | exceptional integration for highlights |
| project management | kanban views built-in |
| templates | slash command for instant template access |
| cloud sync | built-in, multi-device |

**ai roadmap (2024-2025):**
- "chat: ask ai questions using the entire knowledge base as context"
- web tab integration
- moving toward ai as active thinking partner

**strengths:**
- fast iteration, solid pdf annotation, powerful search
- bridges pkm-style notes with whiteboard flexibility
- excellent for research-focused work and structured thinking

**weaknesses:**
- subscription only ($11.99/month), no free tier
- cloud-dependent (data on their servers)

**relevance to our tool:** high. heptabase's card-reuse model and pdf integration are directly applicable. their approach to making cards "live" in a repository while appearing on multiple canvases solves duplication issues.

---

### 1.2 tldraw

**what it is:** open-source infinite canvas sdk for react. powers tldraw.com and many third-party apps.

**core architecture:**
- react-based component library
- in-memory reactive database for state management
- "editor" god object controls the canvas
- monorepo with yarn workspaces + lazyrepo for task orchestration

**key technical features:**
| feature | details |
|---------|---------|
| rendering | canvas api + webgl shaders for backgrounds |
| shapes | custom react components for interactive shapes |
| embedding | videos, images, entire websites on canvas |
| camera | full programmatic control for pan/zoom/slideshows |
| multiplayer | websocket + cloudflare durable objects |
| persistence | automatic, production-ready backend |

**extension points:**
- custom shapes and tools via react
- ui overrides for menus/toolbars
- tldraweditor component for minimal engine without default ui
- canvas sdk for custom widgets

**licensing:** free with "made with tldraw" watermark; business license to remove.

**relevance to our tool:** very high. tldraw is a candidate foundation. its react integration, extensibility model, and production-ready sync are exactly what we need. can embed custom node components.

---

### 1.3 obsidian canvas

**what it is:** core plugin in obsidian for visual, non-linear note organization.

**core model:**
- double-click creates "cards" (unnamed text notes, not .md files by default)
- cards can be converted to files
- drag-and-drop notes from vault onto canvas
- connections via lines/arrows

**key features:**
| feature | details |
|---------|---------|
| node types | text cards, notes from vault, images, pdfs, videos, websites |
| web embeds | urls become interactive browser windows within canvas |
| integration | deep integration with obsidian vault/knowledge base |
| storage | local-first, markdown-based |

**enhanced plugins:**
- advanced canvas: graph view integration, flowcharts, presentations
- mindmap plugins for hierarchical views

**strengths:**
- integrated with existing knowledge base
- local-first, you own your data
- rich media embedding (including live websites)

**weaknesses:**
- requires obsidian ecosystem
- cards are second-class citizens vs. vault notes
- no built-in collaboration

**relevance to our tool:** medium. the website embedding feature is notable. integration with existing knowledge base is a pattern to consider.

---

### 1.4 kinopio

**what it is:** playful spatial thinking tool for collecting and connecting thoughts. independent/organic software.

**design philosophy:**
- "what's the fastest way to get an idea down spatially without thinking about it?"
- no toolbars — drag an image, it becomes part of canvas
- inspired by modular synthesizers — "patch cables" connecting ideas

**key features:**
| feature | details |
|---------|---------|
| cards | 100 free, unlimited with subscription |
| connections | drag one note onto another to connect |
| media | images, gifs, mp3s, youtube, spotify embeds |
| tags | backlinked [[tags]] |
| drawing | freehand anywhere |
| collaboration | real-time, space groups |
| export | pdf, open api |

**pricing:** free for 100 cards; paid by users, not vc-funded.

**strengths:**
- playful, personality-driven design encourages engagement
- friction-free note creation
- good for "sense-making" phase of thinking

**weaknesses:**
- limited features vs. comprehensive whiteboard tools
- not enterprise-integrated
- can be overwhelming for new users

**relevance to our tool:** medium. the "fastest path to capture" philosophy is important. their patch-cable metaphor for connections is elegant.

---

### 1.5 miro

**what it is:** enterprise collaborative whiteboard. the incumbent in the space.

**core features:**
| feature | details |
|---------|---------|
| canvas | infinite, zoomable |
| widgets | dot voting, polling, people widget, story points |
| diagrams | ai-generated from notes |
| integrations | 150+ apps (google, microsoft, slack, jira, figma, etc.) |
| display support | large hdtvs, surface hub, zoom rooms |

**2024 updates — intelligent canvas:**
- ai-powered workflows
- diagram mode for faster flowchart creation
- canvas sdk for custom widgets via javascript/react
- layer support improvements

**performance reality:**
> "large dashboards can sometimes slow down, affecting user experience."
> "the platform can be slow with large files or many users collaborating simultaneously."

**strengths:**
- enterprise-ready, massive integration ecosystem
- meeting facilitation features
- template library

**weaknesses:**
- performance degrades at scale
- limited offline functionality
- mobile experience inferior to desktop

**relevance to our tool:** low-medium. miro's widget system and ai diagram generation are interesting. their performance issues at scale are a warning.

---

### 1.6 scapple

**what it is:** minimalist brainstorming tool from literature & latte (scrivener makers).

**core philosophy:**
- virtual sheet of paper — notes anywhere, connect by drag-and-drop
- no forced hierarchy (unlike most mind-mapping tools)
- any note can connect to any other note

**key features:**
| feature | details |
|---------|---------|
| note creation | double-click anywhere |
| connections | drag-and-drop, no forced hierarchy |
| zoom | infinite canvas growth |
| media | pdf and image import |
| export | integrates with scrivener |

**pricing:** $20.99 one-time (or $16.79 edu).

**strengths:**
- extreme simplicity — "just enough functionality to not distract"
- flexibility — doesn't restrict workflow
- stable, reliable

**weaknesses:**
- desktop only (no mobile/web)
- no collaboration
- straight-line connectors only (no bézier curves)

**relevance to our tool:** low. the "no forced hierarchy" principle is valuable. their simplicity is admirable but we need more features.

---

### 1.7 affine

**what it is:** open-source, local-first alternative to notion + miro. privacy-focused.

**core architecture:**
- local-first: data saved locally, cloud sync optional
- built with rust + typescript
- single command line deployment

**key features:**
| feature | details |
|---------|---------|
| modes | paper mode (document) + edgeless mode (whiteboard) per page |
| blocks | rich text, sticky notes, web embeds, databases, shapes, slides |
| one-click convert | any block can transform to another type |
| cross-platform | web, desktop (mac/win/linux), mobile (ios/android) |
| self-host | full self-hosting support |
| collaboration | real-time sync when enabled |

**strengths:**
- true local-first with optional cloud
- open source, self-hostable
- document + whiteboard in one

**weaknesses:**
- less mature than notion/miro
- smaller ecosystem

**relevance to our tool:** high. affine's local-first architecture and document/whiteboard duality are directly applicable. the one-click block conversion is clever.

---

### 1.8 excalidraw

**what it is:** open-source virtual whiteboard with hand-drawn aesthetic. end-to-end encrypted collaboration.

**core architecture:**
- dual canvas architecture: one for interactivity, one as background (performance optimization)
- culling: only renders visible elements
- pwa with offline support
- local-first with autosave to browser

**performance data:**
| element count | performance |
|---------------|-------------|
| 4k-8k objects | works well |
| 8k+ objects | starts to struggle |
| 14k-24k objects | unusable (~10 fps) |

**suggested improvements (from issues):**
- webgl via pixi.js for rendering boost
- binary formats (flatbuffers) instead of json for large files
- web workers for intensive computation

**key features:**
- hand-drawn visual style
- shape libraries
- arrow-binding & labeled arrows
- export png/svg
- end-to-end encryption for collaboration

**relevance to our tool:** medium-high. their dual-canvas architecture and culling strategy are important patterns. their performance ceiling (8k elements) is a benchmark to exceed.

---

## 2. ai-native tools

### 2.1 napkin ai

**what it is:** visual ai for turning text into diagrams, charts, and infographics.

**core workflow:**
1. paste text into napkin
2. click spark icon on any paragraph
3. ai generates multiple visual options
4. customize colors, shapes, fonts, icons

**key features:**
| feature | details |
|---------|---------|
| visual types | 30+ (mind maps, flowcharts, venn, bar/pie charts, etc.) |
| elastic design | diagrams auto-adjust as text evolves |
| brand styles | upload brand colors/fonts, reuse across visuals |
| export | png, svg, pdf, powerpoint |
| integrations | google docs/slides, ms office, notion, slack, medium, etc. |

**growth:** 5m+ users, $1.7m arr with 15-person team (2025).

**pricing:** free (500 weekly credits), plus ($10k monthly credits), pro ($30k monthly).

**strengths:**
- speed — text to diagram in seconds
- elastic design (auto-adjusting)
- strong export/integration

**weaknesses:**
- visuals can feel repetitive
- struggles with nebulous/unclear text
- optimized for clarity, not artistic variation

**relevance to our tool:** medium. the "spark icon" interaction pattern for ai invocation is excellent. auto-adjusting visuals as content changes is a feature to consider.

---

### 2.2 perplexity pages

**what it is:** tool for transforming research into formatted, shareable articles.

**core workflow:**
1. search/research a topic
2. pages structures it into a well-formatted article
3. customize tone, structure, add visuals
4. publish to perplexity library or share link

**key features:**
| feature | details |
|---------|---------|
| tone | customizable for audience (general vs. expert) |
| structure | add, rearrange, remove sections |
| visuals | ai-generated, uploaded, or sourced online |
| interactivity | readers can ask follow-up questions |
| conversion | turn chat threads into pages |

**target users:** educators, researchers, hobbyists sharing knowledge.

**relevance to our tool:** medium. the "readers can ask follow-up questions" feature is interesting for our export/share functionality. converting threads to pages = converting nodes to documents.

---

### 2.3 chatgpt canvas

**what it is:** openai's side-panel interface for writing and coding projects.

**core model:**
- separate workspace beside chat window
- direct text/code editing
- inline suggestions from ai
- highlight sections for targeted focus

**writing shortcuts:**
- suggest edits (inline)
- adjust length
- change reading level (kindergarten → graduate school)
- add final polish (grammar, clarity)

**coding shortcuts:**
- review code (inline suggestions)
- add logs/comments
- fix bugs
- port to other languages

**technical details:**
- powered by modified gpt-4o (trained with o1 data)
- 83% more reliable at detecting when to activate canvas
- python runs in browser via pyodide (webassembly)
- can make network requests (unlike code interpreter)

**relevance to our tool:** high. the "reading level" slider is a great ux pattern. inline suggestions with accept/reject is exactly what we need for node editing. the selective highlighting for targeted ai focus is important.

---

### 2.4 lex

**what it is:** minimalist word processor with ai writing assistance.

**core features:**
| feature | details |
|---------|---------|
| ai checks | grammar, brevity, clichés, readability, passive voice, confidence, repetition |
| ask lex | sidebar assistant with preset prompts |
| collaboration | live co-editing, commenting |
| versions | save document versions |
| export | pdf, markdown, word, html, latex |
| models | gpt-3.5 (free), gpt-4.1 + claude opus/sonnet (pro) |

**ai check workflow:**
1. run checks
2. issues highlighted in pink
3. click to see ai suggestion
4. accept/reject with one click

**relevance to our tool:** medium. the ai check system (highlight → suggestion → accept/reject) is a clean pattern. their model selection approach is worth noting.

---

### 2.5 cursor (ai code editor)

**what it is:** ai-powered ide built as a vs code fork with deep llm integration.

**architecture:**
- modified vs code fork (retains plugin ecosystem)
- in-house embeddings/ast for "knowing your codebase"
- static system prompt + tool descriptions for prompt caching
- agent mode: llm runs multiple times until user-facing response

**llm integration patterns:**
| pattern | details |
|---------|---------|
| prompt caching | static prompts → reduced cost + latency |
| streaming ux | visual indicators while tool calls stream |
| autonomy slider | tab completion → cmd+k edits → full agent |
| tool results | client computes tool results, feeds back to agent |
| project rules | named instruction sets, fetched on demand |

**key insight:**
> "the entire system prompt and tool descriptions are static... this is critical for agents which make an llm call on every tool use."

**relevance to our tool:** very high. cursor's architecture patterns are directly applicable:
- prompt caching strategy
- autonomy slider (how much ai control)
- tool-based agent architecture
- static system prompts for latency

---

## 3. technical deep dive: rendering & performance

### webgl vs canvas2d

| aspect | canvas2d | webgl |
|--------|----------|-------|
| initial load | ~15ms (faster) | ~40ms |
| re-render (pan/zoom) | up to 1.2ms | ~0.01ms (much faster) |
| memory | ~4mb for 1024x1024 | 5-10x more |
| batching | no batching (individual api calls) | efficient batching via gpu |
| matrix transforms | per-element cpu | gpu-accelerated |

**key findings:**
- webgl excels at pan/zoom interactions due to gpu matrix transforms
- canvas2d limited by cpu — each primitive requires individual api call
- performance varies by os/browser (mac chrome sometimes favors canvas2d)
- webgl shader compilation adds startup latency (~3ms each)

**recommendations:**
1. **for 100+ nodes with pan/zoom:** webgl recommended
2. **hybrid approach:** dom for focused editing, canvas for overview
3. **cache webgl programs:** compile shaders at app start
4. **consider libraries:** pixijs for webgl abstraction

### performance benchmarks (from excalidraw)

| scale | performance |
|-------|-------------|
| < 4k elements | smooth |
| 4k-8k elements | good |
| 8k-14k elements | degraded |
| 14k+ elements | unusable |

**optimization strategies:**
1. **culling:** only render visible elements
2. **virtualization:** hybrid dom/canvas approach
3. **web workers:** offload computation from main thread
4. **binary formats:** flatbuffers instead of json for large data
5. **dual canvas:** separate interactive + background layers

---

## 4. feature matrix comparison

| feature | heptabase | tldraw | obsidian | kinopio | miro | affine | excalidraw |
|---------|-----------|--------|----------|---------|------|--------|------------|
| infinite canvas | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| node branching | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| llm integration | 🔜 | ❌ | plugin | ❌ | ✅ | 🔜 | ❌ |
| local-first | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| open source | ❌ | ✅ | ❌ | partial | ❌ | ✅ | ✅ |
| collaboration | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| pdf annotation | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| web embedding | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| custom shapes | ❌ | ✅ | plugin | ❌ | ✅ | ✅ | ✅ |
| export pdf | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |

**gap analysis:** no existing tool combines:
- infinite canvas + node branching with context inheritance
- llm-first architecture + local-first storage
- tree/dag structure visualization + export to linear document

---

## 5. key learnings for our tool

### architecture decisions

| decision | recommendation | source |
|----------|----------------|--------|
| rendering | webgl (pixijs) for canvas, dom for focused node editing | excalidraw, tldraw |
| state | in-memory reactive database | tldraw |
| storage | local-first (indexeddb) + optional cloud sync | affine |
| llm calls | static system prompts + prompt caching | cursor |
| streaming | sse with visual indicators during tool calls | cursor |

### ux patterns to adopt

| pattern | source | application |
|---------|--------|-------------|
| spark icon for ai invocation | napkin | click on node to branch with ai |
| inline suggestions with accept/reject | lex, chatgpt canvas | edit suggestions in nodes |
| reading level slider | chatgpt canvas | adjust response complexity |
| autonomy slider | cursor | control ai independence per node |
| highlight for targeted focus | chatgpt canvas | select text to branch |
| card repository (reuse without duplication) | heptabase | node storage model |
| dual mode (document/canvas) | affine | view node as doc or in canvas |

### performance targets

| metric | target | rationale |
|--------|--------|-----------|
| first token latency | < 500ms | cursor benchmark |
| canvas re-render (pan/zoom) | < 16ms (60fps) | smooth feel |
| node creation | < 100ms (optimistic ui) | instant feedback |
| element ceiling | > 10k nodes | exceed excalidraw's 8k |
| initial load | < 2s | tldraw benchmark |

### features our tool should have (that others don't)

1. **context-aware branching:** select text → branch → new node inherits context chain
2. **tree/dag visualization:** see the shape of your research as it grows
3. **multi-node synthesis:** select multiple nodes → ai summarizes/synthesizes
4. **export with lineage:** pdf that preserves the path through the tree
5. **model per node:** different llms for different purposes in same canvas
6. **collaborative best response:** multi-model voting (advanced feature)

---

## 6. sources

### canvas/spatial tools
- [heptabase](https://heptabase.com/)
- [heptabase review - eryinote](https://eryinote.com/post/1083)
- [tldraw sdk](https://tldraw.dev/)
- [tldraw github](https://github.com/tldraw/tldraw)
- [obsidian canvas](https://obsidian.md/canvas)
- [obsidian canvas help](https://help.obsidian.md/plugins/canvas)
- [kinopio](https://kinopio.club)
- [kinopio github](https://github.com/kinopio-club/kinopio-client)
- [miro intelligent canvas](https://miro.com/blog/24-updates-for-2024/)
- [scapple](https://www.literatureandlatte.com/scapple/overview)
- [scapple review - techradar](https://www.techradar.com/reviews/scapple-mind-mapping-software)
- [affine](https://affine.pro/)
- [affine github](https://github.com/toeverything/AFFiNE)
- [excalidraw github](https://github.com/excalidraw/excalidraw)
- [excalidraw performance issue #8136](https://github.com/excalidraw/excalidraw/issues/8136)

### ai-native tools
- [napkin ai](https://www.napkin.ai)
- [napkin ai review - skywork](https://skywork.ai/skypage/en/Napkin-AI-Review-2025-From-Text-to-Stunning-Visuals-in-Seconds/1973805431510855680)
- [perplexity pages](https://www.perplexity.ai/hub/blog/perplexity-pages)
- [chatgpt canvas - openai](https://openai.com/index/introducing-canvas/)
- [chatgpt canvas help](https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it)
- [lex](https://lex.page/)
- [cursor](https://cursor.com/)
- [how cursor works - sshh.io](https://blog.sshh.io/p/how-cursor-ai-ide-works)

### technical references
- [2d vs webgl canvas performance - semisignal](https://semisignal.com/a-look-at-2d-vs-webgl-canvas-performance/)
- [webgl vs canvas comparison](https://2dgraphs.netlify.app/)
- [canvas2dtowebgl](https://github.com/jagenjo/Canvas2DtoWebGL)
- [past and future of html canvas](https://demyanov.dev/past-and-future-html-canvas-brief-overview-2d-webgl-and-webgpu)

---

*last updated: december 2024*
