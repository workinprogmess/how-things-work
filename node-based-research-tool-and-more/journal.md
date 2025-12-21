# development journal

## 2025-12-18 12:15 - tldraw text selection struggles

### what we tried

we built a custom `ResearchNodeShape` using tldraw v4 sdk. the goal was to enable text selection inside the response area so users could highlight text and branch off into new nodes.

### approaches attempted

1. **`stopPropagation()` on react events** - didn't work because tldraw captures pointer events at the window/document level using capture phase listeners

2. **`editor.markEventAsHandled(e)`** - tldraw's official way to tell the editor to ignore an event. still didn't work.

3. **native event listeners with `{ capture: true }`** - attached pointerdown/pointermove/pointerup listeners directly to the dom element in capture phase. still didn't work.

4. **`pointerEvents: none/auto` toggling** - tried disabling pointer events when not in edit mode. no effect.

5. **`useIsEditing` hook + `canEdit()` override** - implemented tldraw's editing mode pattern. the yellow background appeared (confirming edit mode was active) but text selection still didn't work.

6. **combining multiple approaches** - tried all of the above together. no success.

### the core problem

tldraw is designed for drawing tools where shapes are manipulated as atomic units. it captures pointer events at the window/document level using capture phase listeners, processes them through its state machine, and then decides what to do. by the time our component sees the event, tldraw has already acted on it (started dragging, selecting shapes, etc.).

tldraw's own text/note shapes use special internal components (`RichTextLabel`, `useEditableRichText`) that are tightly coupled to their event system. these aren't easily reusable for our custom content-rich shapes.

### what worked

- custom shape rendering
- resize handles (`canResize()` + `onResize()`)
- edit mode detection (`canEdit()` + `useIsEditing`)
- zoom/pan of canvas
- creating shapes programmatically

### conclusion

tldraw is excellent for whiteboard/drawing applications but fights against content-rich shapes that need internal text selection. the architecture prioritizes shape-level interactions over content-level interactions.

### next steps

exploring alternative canvas libraries:
- **react flow / xyflow** - has explicit utility classes (`nodrag`, `nopan`, `nowheel`) designed for interactive content inside nodes
- **llm-canvas** - python + typescript tool specifically for llm conversation visualization
- **plain html/css with pan/zoom** - might be simpler for our content-focused use case

---

## 2025-12-18 12:15 - researching maxly.chat and alternatives

### maxly.chat

- built with next.js (react)
- supports 300+ ai models
- key feature: "branch off your conversations, and merge them back together at any time"
- uses canvas-based spatial organization rather than linear chat
- unknown which canvas library they use internally

### react flow / xyflow

promising for our use case because:
- explicit utility classes for interactive content:
  - `nodrag` - prevents node dragging, allows text selection
  - `nopan` - prevents viewport panning
  - `nowheel` - prevents zoom on scroll (for scrollable content inside nodes)
- custom nodes are just react components
- well-documented api for node data updates
- known issue: text selection canceled when cursor moves outside node, but `nodrag` class fixes this

### llm-canvas (github.com/LittleLittleCloud/llm-canvas)

- python backend + typescript frontend
- git-like branching metaphor (`canvas.checkout("branch_name")`)
- node-based conversation structure with `parent_node_id`
- zero external dependencies approach
- designed specifically for llm conversation flows

### decision

will try react flow next - it seems purpose-built for the kind of interactive node content we need, with explicit support for text selection inside nodes.

---

## 2025-12-18 12:30 - deep dive into llm canvas tools ecosystem

### tools landscape

researched the ecosystem of llm branching/canvas tools. key players:

1. **maxly.chat** - closed source, next.js, 300+ models, branch & merge conversations
2. **ryzome.ai** - ai-powered knowledge canvas, nodes with markdown/images, connection-based context
3. **forky** (github.com/ishandhanani/forky) - python cli, git-style branching
4. **gitchat** (github.com/DrustZ/GitChat) - **uses react flow**, node-based, supports rewiring history
5. **llm-canvas** (github.com/LittleLittleCloud/llm-canvas) - python + react, git-inspired api
6. **open-canvas** (github.com/langchain-ai/open-canvas) - langgraph-based, next.js, collaborative agents

### key finding: gitchat uses react flow

from gitchat's readme: "this project uses react flow for the flowchart functionality"

this confirms react flow is a viable choice for llm conversation branching interfaces. gitchat features:
- zoom and pan
- drag-to-connect nodes
- minimap for overview
- replicate nodes to create parallel branches
- auto-regenerate child llm responses when parent is edited

### llm-canvas architecture insights

built in 7 days (30,000+ lines). key design decisions:
- react frontend packaged as static assets in python backend
- git-like api: canvas = repo, thread = branch
- supports multimodal content (images, tree structures)
- zero external dependencies philosophy

### ryzome.ai approach

- nodes support markdown, images, pdfs, youtube embeds, web pages
- connections preserve contextual relationships
- ai understands full "context chain" not isolated prompts
- built with next.js + nextra docs

### open-canvas (langchain)

- monorepo: next.js frontend + langgraph agents backend
- content generation agent + reflection agent (for user memory)
- supports multiple llm providers (claude, gpt, llama, etc.)
- supabase auth, langsmith tracing

### react flow confirmation

multiple sources confirm react flow is the go-to library for this use case:
- explicit `nodrag`, `nopan`, `nowheel` classes for interactive content
- custom nodes are regular react components
- used by gitchat and other llm tools
- demo at reactflow-chat.vercel.app shows llm chat with node-based ui

### next step

build react flow prototype - it's proven in production llm tools and has explicit support for text selection inside nodes.
