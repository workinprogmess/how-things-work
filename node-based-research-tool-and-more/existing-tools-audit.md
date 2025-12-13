# Existing Tools Audit: Node-Based Infinite Canvas Research

> Research for building a node-based infinite canvas research tool with multimodality and LLM integration.

---

## Table of Contents

1. [Canvas/Spatial Tools](#1-canvasspatial-tools)
   - [Heptabase](#11-heptabase)
   - [tldraw](#12-tldraw)
   - [Obsidian Canvas](#13-obsidian-canvas)
   - [Kinopio](#14-kinopio)
   - [Miro](#15-miro)
   - [Scapple](#16-scapple)
   - [AFFiNE](#17-affine)
   - [Excalidraw](#18-excalidraw)
2. [AI-Native Tools](#2-ai-native-tools)
   - [Napkin AI](#21-napkin-ai)
   - [Perplexity Pages](#22-perplexity-pages)
   - [ChatGPT Canvas](#23-chatgpt-canvas)
   - [Lex](#24-lex)
   - [Cursor](#25-cursor-ai-code-editor)
3. [Technical Deep Dive: Rendering & Performance](#3-technical-deep-dive-rendering--performance)
4. [Feature Matrix Comparison](#4-feature-matrix-comparison)
5. [Key Learnings for Our Tool](#5-key-learnings-for-our-tool)
6. [Sources](#6-sources)

---

## 1. Canvas/Spatial Tools

### 1.1 Heptabase

**What it is:** Visual knowledge base for students, researchers, and lifelong learners. Currently the most developed app in the visual note-taking space.

**Core Model:**
- Card-based system on infinite canvas
- Cards live in a central "Cards" repository — can be reused across multiple whiteboards without duplication
- Bi-directional links between cards
- Free-form whiteboard with connection lines forming neural web-like structures

**Key Features:**
| Feature | Details |
|---------|---------|
| Canvas | Infinite, zoomable whiteboard |
| Cards | Reusable across boards, no duplication |
| PDF Integration | Drag & drop highlights from PDF to canvas; clicking opens original location |
| Readwise Sync | Exceptional integration for highlights |
| Project Management | Kanban views built-in |
| Templates | Slash command for instant template access |
| Cloud Sync | Built-in, multi-device |

**AI Roadmap (2024-2025):**
- "Chat: Ask AI questions using the entire knowledge base as context"
- Web tab integration
- Moving toward AI as active thinking partner

**Strengths:**
- Fast iteration, solid PDF annotation, powerful search
- Bridges PKM-style notes with whiteboard flexibility
- Excellent for research-focused work and structured thinking

**Weaknesses:**
- Subscription only ($11.99/month), no free tier
- Cloud-dependent (data on their servers)

**Relevance to Our Tool:** High. Heptabase's card-reuse model and PDF integration are directly applicable. Their approach to making cards "live" in a repository while appearing on multiple canvases solves duplication issues.

---

### 1.2 tldraw

**What it is:** Open-source infinite canvas SDK for React. Powers tldraw.com and many third-party apps.

**Core Architecture:**
- React-based component library
- In-memory reactive database for state management
- "Editor" god object controls the canvas
- Monorepo with yarn workspaces + lazyrepo for task orchestration

**Key Technical Features:**
| Feature | Details |
|---------|---------|
| Rendering | Canvas API + WebGL shaders for backgrounds |
| Shapes | Custom React components for interactive shapes |
| Embedding | Videos, images, entire websites on canvas |
| Camera | Full programmatic control for pan/zoom/slideshows |
| Multiplayer | WebSocket + Cloudflare Durable Objects |
| Persistence | Automatic, production-ready backend |

**Extension Points:**
- Custom shapes and tools via React
- UI overrides for menus/toolbars
- TldrawEditor component for minimal engine without default UI
- Canvas SDK for custom widgets

**Licensing:** Free with "Made with tldraw" watermark; business license to remove.

**Relevance to Our Tool:** Very High. tldraw is a candidate foundation. Its React integration, extensibility model, and production-ready sync are exactly what we need. Can embed custom node components.

---

### 1.3 Obsidian Canvas

**What it is:** Core plugin in Obsidian for visual, non-linear note organization.

**Core Model:**
- Double-click creates "cards" (unnamed text notes, not .md files by default)
- Cards can be converted to files
- Drag-and-drop notes from vault onto canvas
- Connections via lines/arrows

**Key Features:**
| Feature | Details |
|---------|---------|
| Node Types | Text cards, notes from vault, images, PDFs, videos, websites |
| Web Embeds | URLs become interactive browser windows within canvas |
| Integration | Deep integration with Obsidian vault/knowledge base |
| Storage | Local-first, markdown-based |

**Enhanced Plugins:**
- Advanced Canvas: Graph view integration, flowcharts, presentations
- Mindmap plugins for hierarchical views

**Strengths:**
- Integrated with existing knowledge base
- Local-first, you own your data
- Rich media embedding (including live websites)

**Weaknesses:**
- Requires Obsidian ecosystem
- Cards are second-class citizens vs. vault notes
- No built-in collaboration

**Relevance to Our Tool:** Medium. The website embedding feature is notable. Integration with existing knowledge base is a pattern to consider.

---

### 1.4 Kinopio

**What it is:** Playful spatial thinking tool for collecting and connecting thoughts. Independent/organic software.

**Design Philosophy:**
- "What's the fastest way to get an idea down spatially without thinking about it?"
- No toolbars — drag an image, it becomes part of canvas
- Inspired by modular synthesizers — "patch cables" connecting ideas

**Key Features:**
| Feature | Details |
|---------|---------|
| Cards | 100 free, unlimited with subscription |
| Connections | Drag one note onto another to connect |
| Media | Images, GIFs, MP3s, YouTube, Spotify embeds |
| Tags | Backlinked [[tags]] |
| Drawing | Freehand anywhere |
| Collaboration | Real-time, space groups |
| Export | PDF, open API |

**Pricing:** Free for 100 cards; paid by users, not VC-funded.

**Strengths:**
- Playful, personality-driven design encourages engagement
- Friction-free note creation
- Good for "sense-making" phase of thinking

**Weaknesses:**
- Limited features vs. comprehensive whiteboard tools
- Not enterprise-integrated
- Can be overwhelming for new users

**Relevance to Our Tool:** Medium. The "fastest path to capture" philosophy is important. Their patch-cable metaphor for connections is elegant.

---

### 1.5 Miro

**What it is:** Enterprise collaborative whiteboard. The incumbent in the space.

**Core Features:**
| Feature | Details |
|---------|---------|
| Canvas | Infinite, zoomable |
| Widgets | Dot voting, polling, people widget, story points |
| Diagrams | AI-generated from notes |
| Integrations | 150+ apps (Google, Microsoft, Slack, Jira, Figma, etc.) |
| Display Support | Large HDTVs, Surface Hub, Zoom Rooms |

**2024 Updates — Intelligent Canvas:**
- AI-powered workflows
- Diagram mode for faster flowchart creation
- Canvas SDK for custom widgets via JavaScript/React
- Layer support improvements

**Performance Reality:**
> "Large dashboards can sometimes slow down, affecting user experience."
> "The platform can be slow with large files or many users collaborating simultaneously."

**Strengths:**
- Enterprise-ready, massive integration ecosystem
- Meeting facilitation features
- Template library

**Weaknesses:**
- Performance degrades at scale
- Limited offline functionality
- Mobile experience inferior to desktop

**Relevance to Our Tool:** Low-Medium. Miro's widget system and AI diagram generation are interesting. Their performance issues at scale are a warning.

---

### 1.6 Scapple

**What it is:** Minimalist brainstorming tool from Literature & Latte (Scrivener makers).

**Core Philosophy:**
- Virtual sheet of paper — notes anywhere, connect by drag-and-drop
- No forced hierarchy (unlike most mind-mapping tools)
- Any note can connect to any other note

**Key Features:**
| Feature | Details |
|---------|---------|
| Note Creation | Double-click anywhere |
| Connections | Drag-and-drop, no forced hierarchy |
| Zoom | Infinite canvas growth |
| Media | PDF and image import |
| Export | Integrates with Scrivener |

**Pricing:** $20.99 one-time (or $16.79 edu).

**Strengths:**
- Extreme simplicity — "just enough functionality to not distract"
- Flexibility — doesn't restrict workflow
- Stable, reliable

**Weaknesses:**
- Desktop only (no mobile/web)
- No collaboration
- Straight-line connectors only (no bézier curves)

**Relevance to Our Tool:** Low. The "no forced hierarchy" principle is valuable. Their simplicity is admirable but we need more features.

---

### 1.7 AFFiNE

**What it is:** Open-source, local-first alternative to Notion + Miro. Privacy-focused.

**Core Architecture:**
- Local-first: data saved locally, cloud sync optional
- Built with Rust + TypeScript
- Single command line deployment

**Key Features:**
| Feature | Details |
|---------|---------|
| Modes | Paper Mode (document) + Edgeless Mode (whiteboard) per page |
| Blocks | Rich text, sticky notes, web embeds, databases, shapes, slides |
| One-Click Convert | Any block can transform to another type |
| Cross-Platform | Web, Desktop (Mac/Win/Linux), Mobile (iOS/Android) |
| Self-Host | Full self-hosting support |
| Collaboration | Real-time sync when enabled |

**Strengths:**
- True local-first with optional cloud
- Open source, self-hostable
- Document + whiteboard in one

**Weaknesses:**
- Less mature than Notion/Miro
- Smaller ecosystem

**Relevance to Our Tool:** High. AFFiNE's local-first architecture and document/whiteboard duality are directly applicable. The one-click block conversion is clever.

---

### 1.8 Excalidraw

**What it is:** Open-source virtual whiteboard with hand-drawn aesthetic. End-to-end encrypted collaboration.

**Core Architecture:**
- Dual canvas architecture: one for interactivity, one as background (performance optimization)
- Culling: only renders visible elements
- PWA with offline support
- Local-first with autosave to browser

**Performance Data:**
| Element Count | Performance |
|---------------|-------------|
| 4k-8k objects | Works well |
| 8k+ objects | Starts to struggle |
| 14k-24k objects | Unusable (~10 FPS) |

**Suggested Improvements (from issues):**
- WebGL via Pixi.js for rendering boost
- Binary formats (FlatBuffers) instead of JSON for large files
- Web Workers for intensive computation

**Key Features:**
- Hand-drawn visual style
- Shape libraries
- Arrow-binding & labeled arrows
- Export PNG/SVG
- End-to-end encryption for collaboration

**Relevance to Our Tool:** Medium-High. Their dual-canvas architecture and culling strategy are important patterns. Their performance ceiling (8k elements) is a benchmark to exceed.

---

## 2. AI-Native Tools

### 2.1 Napkin AI

**What it is:** Visual AI for turning text into diagrams, charts, and infographics.

**Core Workflow:**
1. Paste text into Napkin
2. Click spark icon on any paragraph
3. AI generates multiple visual options
4. Customize colors, shapes, fonts, icons

**Key Features:**
| Feature | Details |
|---------|---------|
| Visual Types | 30+ (mind maps, flowcharts, Venn, bar/pie charts, etc.) |
| Elastic Design | Diagrams auto-adjust as text evolves |
| Brand Styles | Upload brand colors/fonts, reuse across visuals |
| Export | PNG, SVG, PDF, PowerPoint |
| Integrations | Google Docs/Slides, MS Office, Notion, Slack, Medium, etc. |

**Growth:** 5M+ users, $1.7M ARR with 15-person team (2025).

**Pricing:** Free (500 weekly credits), Plus ($10k monthly credits), Pro ($30k monthly).

**Strengths:**
- Speed — text to diagram in seconds
- Elastic design (auto-adjusting)
- Strong export/integration

**Weaknesses:**
- Visuals can feel repetitive
- Struggles with nebulous/unclear text
- Optimized for clarity, not artistic variation

**Relevance to Our Tool:** Medium. The "spark icon" interaction pattern for AI invocation is excellent. Auto-adjusting visuals as content changes is a feature to consider.

---

### 2.2 Perplexity Pages

**What it is:** Tool for transforming research into formatted, shareable articles.

**Core Workflow:**
1. Search/research a topic
2. Pages structures it into a well-formatted article
3. Customize tone, structure, add visuals
4. Publish to Perplexity library or share link

**Key Features:**
| Feature | Details |
|---------|---------|
| Tone | Customizable for audience (general vs. expert) |
| Structure | Add, rearrange, remove sections |
| Visuals | AI-generated, uploaded, or sourced online |
| Interactivity | Readers can ask follow-up questions |
| Conversion | Turn chat threads into pages |

**Target Users:** Educators, researchers, hobbyists sharing knowledge.

**Relevance to Our Tool:** Medium. The "readers can ask follow-up questions" feature is interesting for our export/share functionality. Converting threads to pages = converting nodes to documents.

---

### 2.3 ChatGPT Canvas

**What it is:** OpenAI's side-panel interface for writing and coding projects.

**Core Model:**
- Separate workspace beside chat window
- Direct text/code editing
- Inline suggestions from AI
- Highlight sections for targeted focus

**Writing Shortcuts:**
- Suggest edits (inline)
- Adjust length
- Change reading level (Kindergarten → Graduate School)
- Add final polish (grammar, clarity)

**Coding Shortcuts:**
- Review code (inline suggestions)
- Add logs/comments
- Fix bugs
- Port to other languages

**Technical Details:**
- Powered by modified GPT-4o (trained with o1 data)
- 83% more reliable at detecting when to activate canvas
- Python runs in browser via Pyodide (WebAssembly)
- Can make network requests (unlike Code Interpreter)

**Relevance to Our Tool:** High. The "reading level" slider is a great UX pattern. Inline suggestions with accept/reject is exactly what we need for node editing. The selective highlighting for targeted AI focus is important.

---

### 2.4 Lex

**What it is:** Minimalist word processor with AI writing assistance.

**Core Features:**
| Feature | Details |
|---------|---------|
| AI Checks | Grammar, brevity, clichés, readability, passive voice, confidence, repetition |
| Ask Lex | Sidebar assistant with preset prompts |
| Collaboration | Live co-editing, commenting |
| Versions | Save document versions |
| Export | PDF, Markdown, Word, HTML, LaTeX |
| Models | GPT-3.5 (free), GPT-4.1 + Claude Opus/Sonnet (Pro) |

**AI Check Workflow:**
1. Run checks
2. Issues highlighted in pink
3. Click to see AI suggestion
4. Accept/reject with one click

**Relevance to Our Tool:** Medium. The AI check system (highlight → suggestion → accept/reject) is a clean pattern. Their model selection approach is worth noting.

---

### 2.5 Cursor (AI Code Editor)

**What it is:** AI-powered IDE built as a VS Code fork with deep LLM integration.

**Architecture:**
- Modified VS Code fork (retains plugin ecosystem)
- In-house embeddings/AST for "knowing your codebase"
- Static system prompt + tool descriptions for prompt caching
- Agent mode: LLM runs multiple times until user-facing response

**LLM Integration Patterns:**
| Pattern | Details |
|---------|---------|
| Prompt Caching | Static prompts → reduced cost + latency |
| Streaming UX | Visual indicators while tool calls stream |
| Autonomy Slider | Tab completion → Cmd+K edits → Full agent |
| Tool Results | Client computes tool results, feeds back to agent |
| Project Rules | Named instruction sets, fetched on demand |

**Key Insight:**
> "The entire system prompt and tool descriptions are static... this is critical for agents which make an LLM call on every tool use."

**Relevance to Our Tool:** Very High. Cursor's architecture patterns are directly applicable:
- Prompt caching strategy
- Autonomy slider (how much AI control)
- Tool-based agent architecture
- Static system prompts for latency

---

## 3. Technical Deep Dive: Rendering & Performance

### WebGL vs Canvas2D

| Aspect | Canvas2D | WebGL |
|--------|----------|-------|
| Initial Load | ~15ms (faster) | ~40ms |
| Re-render (pan/zoom) | Up to 1.2ms | ~0.01ms (much faster) |
| Memory | ~4MB for 1024x1024 | 5-10x more |
| Batching | No batching (individual API calls) | Efficient batching via GPU |
| Matrix Transforms | Per-element CPU | GPU-accelerated |

**Key Findings:**
- WebGL excels at pan/zoom interactions due to GPU matrix transforms
- Canvas2D limited by CPU — each primitive requires individual API call
- Performance varies by OS/browser (Mac Chrome sometimes favors Canvas2D)
- WebGL shader compilation adds startup latency (~3ms each)

**Recommendations:**
1. **For 100+ nodes with pan/zoom:** WebGL recommended
2. **Hybrid approach:** DOM for focused editing, Canvas for overview
3. **Cache WebGL programs:** Compile shaders at app start
4. **Consider libraries:** PixiJS for WebGL abstraction

### Performance Benchmarks (from Excalidraw)

| Scale | Performance |
|-------|-------------|
| < 4k elements | Smooth |
| 4k-8k elements | Good |
| 8k-14k elements | Degraded |
| 14k+ elements | Unusable |

**Optimization Strategies:**
1. **Culling:** Only render visible elements
2. **Virtualization:** Hybrid DOM/Canvas approach
3. **Web Workers:** Offload computation from main thread
4. **Binary formats:** FlatBuffers instead of JSON for large data
5. **Dual canvas:** Separate interactive + background layers

---

## 4. Feature Matrix Comparison

| Feature | Heptabase | tldraw | Obsidian | Kinopio | Miro | AFFiNE | Excalidraw |
|---------|-----------|--------|----------|---------|------|--------|------------|
| Infinite Canvas | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Node Branching | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| LLM Integration | 🔜 | ❌ | Plugin | ❌ | ✅ | 🔜 | ❌ |
| Local-First | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| Open Source | ❌ | ✅ | ❌ | Partial | ❌ | ✅ | ✅ |
| Collaboration | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| PDF Annotation | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Web Embedding | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Custom Shapes | ❌ | ✅ | Plugin | ❌ | ✅ | ✅ | ✅ |
| Export PDF | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |

**Gap Analysis:** No existing tool combines:
- Infinite canvas + Node branching with context inheritance
- LLM-first architecture + Local-first storage
- Tree/DAG structure visualization + Export to linear document

---

## 5. Key Learnings for Our Tool

### Architecture Decisions

| Decision | Recommendation | Source |
|----------|----------------|--------|
| Rendering | WebGL (PixiJS) for canvas, DOM for focused node editing | Excalidraw, tldraw |
| State | In-memory reactive database | tldraw |
| Storage | Local-first (IndexedDB) + optional cloud sync | AFFiNE |
| LLM Calls | Static system prompts + prompt caching | Cursor |
| Streaming | SSE with visual indicators during tool calls | Cursor |

### UX Patterns to Adopt

| Pattern | Source | Application |
|---------|--------|-------------|
| Spark icon for AI invocation | Napkin | Click on node to branch with AI |
| Inline suggestions with accept/reject | Lex, ChatGPT Canvas | Edit suggestions in nodes |
| Reading level slider | ChatGPT Canvas | Adjust response complexity |
| Autonomy slider | Cursor | Control AI independence per node |
| Highlight for targeted focus | ChatGPT Canvas | Select text to branch |
| Card repository (reuse without duplication) | Heptabase | Node storage model |
| Dual mode (document/canvas) | AFFiNE | View node as doc or in canvas |

### Performance Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| First token latency | < 500ms | Cursor benchmark |
| Canvas re-render (pan/zoom) | < 16ms (60fps) | Smooth feel |
| Node creation | < 100ms (optimistic UI) | Instant feedback |
| Element ceiling | > 10k nodes | Exceed Excalidraw's 8k |
| Initial load | < 2s | tldraw benchmark |

### Features Our Tool Should Have (That Others Don't)

1. **Context-aware branching:** Select text → branch → new node inherits context chain
2. **Tree/DAG visualization:** See the shape of your research as it grows
3. **Multi-node synthesis:** Select multiple nodes → AI summarizes/synthesizes
4. **Export with lineage:** PDF that preserves the path through the tree
5. **Model per node:** Different LLMs for different purposes in same canvas
6. **Collaborative best response:** Multi-model voting (advanced feature)

---

## 6. Sources

### Canvas/Spatial Tools
- [Heptabase](https://heptabase.com/)
- [Heptabase Review - eryinote](https://eryinote.com/post/1083)
- [tldraw SDK](https://tldraw.dev/)
- [tldraw GitHub](https://github.com/tldraw/tldraw)
- [Obsidian Canvas](https://obsidian.md/canvas)
- [Obsidian Canvas Help](https://help.obsidian.md/plugins/canvas)
- [Kinopio](https://kinopio.club)
- [Kinopio GitHub](https://github.com/kinopio-club/kinopio-client)
- [Miro Intelligent Canvas](https://miro.com/blog/24-updates-for-2024/)
- [Scapple](https://www.literatureandlatte.com/scapple/overview)
- [Scapple Review - TechRadar](https://www.techradar.com/reviews/scapple-mind-mapping-software)
- [AFFiNE](https://affine.pro/)
- [AFFiNE GitHub](https://github.com/toeverything/AFFiNE)
- [Excalidraw GitHub](https://github.com/excalidraw/excalidraw)
- [Excalidraw Performance Issue #8136](https://github.com/excalidraw/excalidraw/issues/8136)

### AI-Native Tools
- [Napkin AI](https://www.napkin.ai)
- [Napkin AI Review - Skywork](https://skywork.ai/skypage/en/Napkin-AI-Review-2025-From-Text-to-Stunning-Visuals-in-Seconds/1973805431510855680)
- [Perplexity Pages](https://www.perplexity.ai/hub/blog/perplexity-pages)
- [ChatGPT Canvas - OpenAI](https://openai.com/index/introducing-canvas/)
- [ChatGPT Canvas Help](https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it)
- [Lex](https://lex.page/)
- [Cursor](https://cursor.com/)
- [How Cursor Works - sshh.io](https://blog.sshh.io/p/how-cursor-ai-ide-works)

### Technical References
- [2D vs WebGL Canvas Performance - semisignal](https://semisignal.com/a-look-at-2d-vs-webgl-canvas-performance/)
- [WebGL vs Canvas Comparison](https://2dgraphs.netlify.app/)
- [Canvas2DtoWebGL](https://github.com/jagenjo/Canvas2DtoWebGL)
- [Past and Future of HTML Canvas](https://demyanov.dev/past-and-future-html-canvas-brief-overview-2d-webgl-and-webgpu)

---

*Last updated: December 2024*
