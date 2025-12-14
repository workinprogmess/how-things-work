# concepts glossary: node-based canvas research

> explanations of technical concepts from the tools audit

---

## table of contents

1. [heptabase concepts](#1-heptabase-concepts)
2. [tldraw concepts](#2-tldraw-concepts)
3. [obsidian concepts](#3-obsidian-concepts)
4. [kinopio concepts](#4-kinopio-concepts)
5. [scapple concepts](#5-scapple-concepts)
6. [affine concepts](#6-affine-concepts)
7. [excalidraw concepts](#7-excalidraw-concepts)
8. [napkin concepts](#8-napkin-concepts)
9. [chatgpt canvas concepts](#9-chatgpt-canvas-concepts)
10. [cursor concepts](#10-cursor-concepts)
11. [technical deep dive concepts](#11-technical-deep-dive-concepts)

---

## 1. heptabase concepts

### central/reusable card repository

**what it is:** instead of each canvas owning its cards, all cards live in one central place. when you put a card on a canvas, you're placing a *reference* to it, not a copy.

**why it matters:**
- edit a card once → updates everywhere it appears
- no duplicate content to maintain
- cards can exist independently of any canvas
- you can see "where is this card used?" across all your boards

**analogy:** think of it like a photo library vs. photo albums. your photos live in one library, and albums just reference them. delete from album ≠ delete from library.

**for our tool:** this is a strong pattern. nodes should live in a repository, and canvases reference them. this also enables features like "show me all nodes about X across all my projects."

---

## 2. tldraw concepts

### 2.1 sdk vs api

**sdk (software development kit):**
- a complete toolkit with pre-built components, libraries, documentation
- you build *on top of* it
- like getting a lego set with instructions

**api (application programming interface):**
- a set of rules for how to talk to a service
- you make *requests to* it
- like a menu at a restaurant — you can order, but you don't get the kitchen

**tldraw as sdk:**
- they give you the entire canvas engine as components
- you embed it in your app and customize it
- you're not calling their servers — you're running their code locally

**example:**
```
api approach: fetch("https://maps.google.com/api/directions?from=a&to=b")
sdk approach: import { Map } from 'google-maps-sdk'; <Map center={...} />
```

---

### 2.2 react-based component library

**what react is:**
- a javascript framework for building user interfaces
- you build UIs as "components" (reusable pieces)
- components react to data changes automatically

**what "react-based component library" means:**
- tldraw gives you react components: `<Tldraw />`, `<Canvas />`, etc.
- you drop them into your react app like any other component
- they handle all the canvas logic internally

**if it wasn't react-based:**
- you'd need to write glue code to connect it to your ui framework
- or you'd be stuck with vanilla javascript (more manual work)
- or you'd have framework mismatch issues (vue app + react library = pain)

**why it matters for us:**
- if we build in react, tldraw slots right in
- if we use something else (svelte, vue), we'd need adapters or a different foundation

---

### 2.3 in-memory reactive database

let's break this into parts:

**in-memory:**
- data lives in ram, not on disk
- super fast reads/writes (nanoseconds vs milliseconds)
- disappears when you close the app (unless you save it)

**reactive:**
- when data changes, things that depend on it update automatically
- you don't manually tell the ui "hey, this changed, re-render"
- the system "reacts" to changes

**database:**
- structured storage with queries
- not just random variables — organized data you can search/filter

**combined meaning:**
- tldraw keeps all canvas state (shapes, positions, selections) in a fast, in-memory store
- when you move a shape, the store updates, and the canvas automatically re-renders
- no manual "refresh" calls needed

**analogy:** imagine a spreadsheet where changing one cell instantly updates all formulas that reference it. that's reactive. now imagine that spreadsheet is insanely fast because it's all in memory.

---

### 2.4 "editor" god object

**god object:**
- a single object that knows/controls everything
- often considered an anti-pattern in software design (too much responsibility)
- but sometimes pragmatic for complex systems

**tldraw's editor:**
- one big object that controls the entire canvas
- `editor.createShape()`, `editor.deleteShape()`, `editor.zoomIn()`
- knows about all shapes, selection state, camera position, history, etc.

**why they do it:**
- canvas operations are deeply interconnected
- creating a shape affects selection, history, rendering, bounds, etc.
- having one coordinator simplifies these interactions

**trade-off:**
- easier to use (one object to learn)
- harder to extend (everything goes through this one bottleneck)

---

### 2.5 monorepo with yarn workspaces + lazyrepo

**monorepo:**
- one repository containing multiple projects/packages
- instead of: repo-a, repo-b, repo-c
- you have: big-repo/packages/a, big-repo/packages/b, big-repo/packages/c

**why monorepo:**
- share code between packages easily
- atomic commits across multiple packages
- consistent tooling/config

**yarn workspaces:**
- yarn is a package manager (like npm)
- workspaces let you manage multiple packages in one repo
- `yarn install` in root installs dependencies for all packages

**lazyrepo:**
- a task runner for monorepos
- runs build/test tasks only for packages that changed
- "lazy" = doesn't redo work unnecessarily

**example:**
```
tldraw/
  packages/
    editor/      <- the core editor
    tldraw/      <- the full component
    sync/        <- multiplayer stuff
    primitives/  <- basic utilities
```

---

### 2.6 webgl and webgl shaders

**webgl:**
- "web graphics library"
- lets browsers use the gpu (graphics card) for rendering
- much faster than cpu-based drawing for complex graphics

**why gpu is faster:**
- cpu: good at complex sequential tasks (one thing at a time, but smart)
- gpu: good at simple parallel tasks (thousands of simple things at once)
- drawing pixels = massively parallel = gpu wins

**shaders:**
- small programs that run on the gpu
- tell the gpu *how* to render each pixel
- written in a special language (glsl)

**types of shaders:**
- vertex shader: positions shapes in space
- fragment shader: colors each pixel

**tldraw's use:**
- main shapes: rendered with canvas 2d (simpler)
- backgrounds: can use webgl shaders for fancy effects (gradients, animations)

**analogy:** cpu is like one brilliant chef. gpu is like 1000 line cooks who can only follow simple recipes. for making 1000 identical salads, you want the line cooks.

---

### 2.7 websocket + cloudflare durable objects

**websocket:**
- a persistent, two-way connection between browser and server
- unlike http (request → response → done), websocket stays open
- server can push updates to client anytime

**why websocket for multiplayer:**
- user a moves a shape → server gets update instantly
- server pushes update to user b instantly
- no polling ("hey server, anything new? no? ok i'll ask again in 1 second")

**cloudflare durable objects:**
- cloudflare is a cloud/edge computing platform
- durable objects = tiny stateful servers that live at the edge
- each document/room gets its own durable object

**how it works:**
```
user a in tokyo ──┐
                  ├──→ durable object (stores doc state) ──→ persisted
user b in london ─┘
```

**why "durable":**
- the object persists even when no one is connected
- state survives restarts
- unlike regular serverless functions that are stateless

---

### 2.8 production-ready backend

**what it means:**
- not a demo/prototype — actually works at scale
- handles real users, real traffic, real edge cases
- includes: error handling, monitoring, security, persistence

**tldraw's backend provides:**
- websocket connection management
- automatic document persistence (saves your work)
- asset management (images, files)
- conflict resolution (two people edit same thing)

**why it's useful:**
- building multiplayer from scratch is *hard*
- tldraw did the hard work already
- you focus on your app, not reinventing sync infrastructure

---

### 2.9 "tldraw is a candidate foundation"

**what i meant:**
- we could build our tool *on top of* tldraw
- use their canvas engine, extend it with our node/branching logic
- vs. building canvas rendering from scratch

**pros:**
- battle-tested pan/zoom/rendering
- multiplayer already solved
- active development/community

**cons:**
- we're dependent on their design decisions
- might fight against their assumptions
- business license needed to remove watermark

**alternatives:**
- build on excalidraw (also open source)
- build on affine's blocksuite
- build from scratch (maximum control, maximum effort)

---

## 3. obsidian concepts

### integration with existing knowledge base

**what obsidian is:**
- a note-taking app based on markdown files
- you have a "vault" = a folder of .md files
- notes link to each other with [[wiki-style]] links

**what "integration with existing knowledge base" means:**
- obsidian canvas can pull in notes from your vault
- you're not starting fresh — your years of notes are available
- drag a note onto canvas → it's there, linked to the original

**why it matters:**
- cold start problem: new tools are empty, feel useless
- obsidian solves this: you already have content
- canvas becomes a *view* of existing knowledge, not a separate silo

**for our tool:**
- should we integrate with existing note systems?
- or be self-contained?
- trade-off: integration = more useful but more complex

---

## 4. kinopio concepts

### modular synthesizers / "patch cables"

**what a modular synthesizer is:**
- electronic music instrument made of separate modules
- oscillators, filters, envelopes, etc.
- you connect them with physical cables to create sounds

**the key insight:**
- no fixed signal path — you decide how things connect
- same modules, infinite configurations
- visual, tangible, experimental

**"patch cables" in kinopio:**
- ideas are modules
- connections are patch cables
- you're "patching" thoughts together

**visual:**
```
┌─────────┐         ┌─────────┐
│ idea a  │────────→│ idea b  │
└─────────┘         └─────────┘
     │
     └──────────────→┌─────────┐
                     │ idea c  │
                     └─────────┘
```

**why this metaphor matters:**
- no hierarchy imposed (unlike mind maps with central node)
- connections are first-class citizens
- encourages exploration over organization

---

## 5. scapple concepts

### double-click to create

**your question:** isn't this obvious for any infinite canvas tool?

**you'd think so, but:**
- many tools require: click toolbar → select note type → click canvas
- or: right-click → context menu → new note
- scapple: just double-click, start typing

**what makes it notable:**
- zero friction between thought and capture
- no mode switching
- the canvas *is* the input

**not all tools do this:**
- miro: need to select sticky note tool first
- figma: need to select text tool or frame tool
- heptabase: similar to scapple (double-click works)

**for our tool:** yes, double-click (or just start typing?) should create a node. the less friction, the better.

---

## 6. affine concepts

### 6.1 local-first — is it appreciated?

**what local-first means:**
- data lives on your device first
- works offline
- syncs to cloud as secondary (optional)

**vs cloud-first:**
- data lives on their servers
- requires internet
- you're renting access to your own data

**is it appreciated? yes, increasingly:**

| concern | local-first solves it |
|---------|----------------------|
| privacy | data never leaves your device unless you want |
| speed | no network latency for reads/writes |
| ownership | you can export/backup/migrate anytime |
| longevity | app dies? your data is still markdown files |
| offline | works on airplane, in tunnel, anywhere |

**who cares most:**
- developers (seen too many services shut down)
- privacy-conscious users
- people with unreliable internet
- power users who want control

**trade-offs:**
- harder to build (conflict resolution is complex)
- collaboration is trickier
- no "access from any device" without sync setup

---

### 6.2 rust + typescript vs react/js

**first, clarifying:**
- react is a ui framework (built on javascript)
- javascript (js) is the language
- typescript is javascript with types (catches errors earlier)
- rust is a completely different language

**javascript/typescript:**
- runs in browser
- good for ui, interactivity
- relatively slow, but fast enough for most things
- easy to write, lots of developers know it

**rust:**
- compiled language (turns into machine code)
- *very* fast (close to c/c++)
- memory-safe without garbage collection
- harder to learn, fewer developers

**affine's architecture:**
```
┌─────────────────────────────────┐
│  browser                        │
│  ┌───────────────────────────┐  │
│  │ typescript/react (ui)     │  │
│  └───────────────────────────┘  │
│            ↓                    │
│  ┌───────────────────────────┐  │
│  │ rust (via webassembly)    │  │
│  │ - heavy computation       │  │
│  │ - data structures         │  │
│  │ - crdt sync engine        │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

**why use both:**
- typescript: ui layer (what users see/interact with)
- rust: performance-critical parts (compiled to webassembly)
- best of both worlds

---

### 6.3 single command line deployment

**what it means:**
- you run one command, and the app is deployed
- e.g., `docker compose up` or `npx affine start`
- vs. "install these 5 things, configure these 3 files, run these 7 commands"

**why it matters:**
- self-hosting is only useful if it's accessible
- complex setup = only experts can do it
- one command = anyone can try it

**example:**
```bash
# bad: complex deployment
npm install
npm run build
configure nginx...
setup ssl certificates...
create database...
run migrations...
start server...

# good: single command
docker compose up -d
```

---

## 7. excalidraw concepts

### 7.1 dual canvas architecture

**what it is:**
- two separate canvas elements layered on top of each other
- background canvas: static content (shapes that aren't being edited)
- interactive canvas: the thing you're currently manipulating

**why do this:**

```
┌─────────────────────────────┐
│   interactive canvas        │  ← only redraws what's changing
│   (current selection)       │
├─────────────────────────────┤
│   background canvas         │  ← static, doesn't redraw
│   (everything else)         │
└─────────────────────────────┘
```

**performance benefit:**
- you have 1000 shapes
- you're dragging 1 shape
- without dual canvas: redraw all 1000 shapes every frame
- with dual canvas: redraw just the 1 shape; background stays cached

**analogy:** animation cels in old cartoons. background painted once, characters on transparent sheets on top.

---

### 7.2 culling

**what it is:**
- only render things that are visible on screen
- if a shape is outside the viewport, don't draw it

**how it works:**
```
┌─────────────────────────────────────────┐
│                                         │
│    ○  □         ┌─────────────┐         │
│         △       │  viewport   │    □    │
│    □            │  (visible)  │         │
│          ○      │     △ ○     │         │
│                 │       □     │    ○    │
│    △            └─────────────┘         │
│                        canvas           │
└─────────────────────────────────────────┘

rendered: only △ ○ □ inside viewport
not rendered: everything outside
```

**why it matters:**
- canvas has 10,000 shapes
- viewport shows 100 shapes
- without culling: draw 10,000 shapes (slow)
- with culling: draw 100 shapes (fast)

**implementation:**
1. calculate viewport bounds
2. for each shape, check if it intersects viewport
3. skip shapes that don't intersect
4. (optimization: use spatial index for faster checking)

---

### 7.3 suggested improvements explained

**"webgl via pixi.js for rendering boost":**
- excalidraw currently uses canvas 2d api
- pixi.js is a library that uses webgl under the hood
- webgl = gpu rendering = faster for many shapes

**"binary formats (flatbuffers) instead of json":**
- excalidraw saves documents as json (text-based)
- json is human-readable but verbose/slow to parse
- flatbuffers is a binary format (compact, fast to read/write)
- see section 11.5 for more detail

**"web workers for intensive computation":**
- javascript runs on one thread (the "main thread")
- main thread also handles ui — if it's busy, ui freezes
- web workers = separate threads for heavy work
- see section 11.4 for more detail

---

## 8. napkin concepts

### 8.1 elastic design

**what it means:**
- diagrams automatically adjust when content changes
- add more text → diagram expands
- remove a bullet → diagram shrinks
- boxes resize, connectors re-route

**vs rigid design:**
- traditional tools: you manually resize boxes
- text overflows? your problem
- want to add a step to flowchart? manually move everything

**example:**
```
before:                      after adding step:
┌───┐    ┌───┐              ┌───┐    ┌───┐    ┌───┐
│ a │───→│ b │              │ a │───→│new│───→│ b │
└───┘    └───┘              └───┘    └───┘    └───┘
                            (napkin adjusts automatically)
```

**why it matters:**
- content evolves as you think
- diagram stays in sync without manual adjustment
- reduces friction between writing and visualizing

---

### 8.2 strong export/integration

**export:**
- png (images for presentations)
- svg (vector graphics, scalable)
- pdf (documents)
- powerpoint (directly to slides)

**integration:**
- paste into google docs/slides and it works
- embed in notion
- share on slack
- post to medium

**why "strong":**
- not just "download as png"
- but: "put this directly where you need it"
- reduces the "ok i made a diagram... now how do i use it?" friction

---

## 9. chatgpt canvas concepts

### 9.1 inline suggestions

**what it is:**
- ai suggests changes directly in your text
- you see the suggestion right where it would go
- accept or reject with one click

**how it works:**
```
original text:
"the system is very fast and efficient"

inline suggestion (shown as diff):
"the system is very fast and efficient"
            ~~~~
"the system is fast and efficient"

[accept] [reject]
```

**vs chat-based suggestions:**
- chat: "hey, you could remove 'very' for conciseness"
- inline: shows you exactly what the change looks like, in context

**why it's better:**
- see the result before committing
- no mental work to imagine the change
- fast accept/reject workflow

---

### 9.2 python in browser via pyodide (webassembly)

**the pieces:**

**webassembly (wasm):**
- a way to run compiled code in the browser
- not javascript, but runs alongside it
- near-native speed

**pyodide:**
- the entire python interpreter compiled to webassembly
- python runs in your browser, no server needed
- includes numpy, pandas, etc.

**what's cool:**
- normally: python code → sent to server → executed → results sent back
- with pyodide: python code → runs locally in browser → instant results
- no server round-trip latency
- your code never leaves your machine (privacy)

**why chatgpt canvas uses it:**
- instant feedback when running code
- no server infrastructure needed for code execution
- sandboxed (can't harm your computer)

---

### 9.3 network requests (unlike code interpreter)

**code interpreter (chatgpt's other python feature):**
- runs python on openai's servers
- sandboxed environment
- *cannot* make network requests (security: could attack other systems)

**canvas python:**
- runs in your browser
- *can* make network requests
- because it's your browser making the request, not openai's servers

**why this matters:**
- code interpreter: can't fetch data from apis, scrape websites
- canvas: can fetch data, call apis, do anything a browser can do

**example:**
```python
# this works in canvas, fails in code interpreter
import requests
response = requests.get("https://api.example.com/data")
```

---

### 9.4 reading level slider

**what it is:**
- a slider that adjusts how complex/simple the ai writes
- kindergarten → graduate school
- one control, huge impact on output

**why it's great ux:**

| level | output style |
|-------|--------------|
| kindergarten | "computers remember things in little boxes" |
| middle school | "computers store data in memory addresses" |
| undergraduate | "computers use ram for volatile storage with o(1) access" |
| graduate | "modern cpu architectures exploit cache hierarchies to mitigate von neumann bottlenecks" |

**why it works:**
- explicit control over something users struggle to prompt for
- "explain like i'm 5" → just move a slider
- useful for: teaching, learning, adjusting for audience

**for our tool:** could have per-node complexity settings. researching for yourself? graduate level. explaining to a friend? simpler.

---

## 10. cursor concepts

### 10.1 embeddings/ast for "knowing your codebase"

**embeddings:**
- a way to represent text as numbers (vectors)
- similar meanings → similar vectors
- allows semantic search ("find code related to authentication")

**how it works:**
```
"user login" → [0.2, 0.8, 0.1, ...]
"authentication" → [0.21, 0.79, 0.12, ...]  ← similar vectors!
"database" → [0.9, 0.1, 0.3, ...]  ← different vector
```

**ast (abstract syntax tree):**
- a structured representation of code
- not just text, but understanding: "this is a function, these are its arguments"

**example:**
```python
def add(a, b):
    return a + b
```
becomes:
```
FunctionDef
├── name: "add"
├── args: ["a", "b"]
└── body:
    └── Return
        └── BinaryOp
            ├── left: "a"
            ├── op: "+"
            └── right: "b"
```

**cursor's use:**
- indexes your codebase with embeddings + ast
- when you ask a question, finds relevant code
- feeds relevant code to llm as context
- llm "knows" your codebase without reading all of it

---

### 10.2 prompt caching

**the problem:**
- every llm call sends a prompt (system message + context)
- same system prompt sent over and over
- costs money (tokens) and time (processing)

**prompt caching:**
- llm provider caches the beginning of prompts
- if the start is identical to a previous request, skip re-processing
- only process the new/different part

**example:**
```
request 1:
[system prompt - 2000 tokens] + [user message - 100 tokens]
→ process all 2100 tokens

request 2:
[same system prompt - 2000 tokens] + [different user message - 150 tokens]
→ cache hit! only process 150 new tokens
```

**benefits:**
- faster responses (less to process)
- cheaper (some providers charge less for cached tokens)

**cursor's approach:**
- keeps system prompt static (doesn't change per-user)
- maximizes cache hits
- critical for agents that make many llm calls

---

### 10.3 streaming ux

**streaming:**
- instead of waiting for complete response, show it as it generates
- tokens appear one by one
- user sees progress immediately

**streaming ux:**
- designing the interface around streaming
- what to show while waiting?
- how to indicate "thinking" vs "done"?

**cursor's challenge:**
- agent makes tool calls (search files, run commands)
- tool calls stream differently than text
- need visual indicators: "searching...", "running...", "found 3 files..."

**why it matters:**
- without streaming ux: screen sits blank for 10 seconds → user thinks it's broken
- with streaming ux: user sees activity → feels responsive

---

### 10.4 static system prompt

**system prompt:**
- instructions given to the llm about how to behave
- "you are a helpful coding assistant..."
- usually at the start of every conversation

**static vs dynamic:**
- dynamic: system prompt changes based on user/context
- static: system prompt is always exactly the same

**why cursor uses static:**
- enables prompt caching (see 10.2)
- same system prompt = cache hit = faster + cheaper
- user-specific stuff loaded via tool calls, not system prompt

**trade-off:**
- static: faster, but less personalized system behavior
- dynamic: slower, but can customize per-user

---

### 10.5 tool-based agent architecture

**tools:**
- things the llm can "call" to interact with the world
- search files, run commands, read documentation
- llm decides which tools to use based on the task

**agent:**
- an llm that runs in a loop
- thinks → calls tool → gets result → thinks again → ...
- continues until task is complete

**tool-based architecture:**
```
user: "find and fix the bug in authentication"
         ↓
agent thinks: "need to find auth code first"
         ↓
tool call: search_files("authentication")
         ↓
result: found auth.py, login.py
         ↓
agent thinks: "let me read these files"
         ↓
tool call: read_file("auth.py")
         ↓
result: [file contents]
         ↓
agent thinks: "i see the bug on line 42"
         ↓
tool call: edit_file("auth.py", ...)
         ↓
agent thinks: "done, let me explain to user"
         ↓
response: "i found and fixed a bug..."
```

**why it works:**
- llm is good at reasoning about what to do
- tools extend what llm can actually do
- modular: add new tools without retraining

---

## 11. technical deep dive concepts

### 11.1 batching

**the problem:**
- drawing 1000 shapes with 1000 separate "draw" calls is slow
- each call has overhead (setup, state changes)

**batching:**
- group many operations into one call
- "draw these 1000 shapes" instead of 1000x "draw this shape"

**example:**
```
without batching:
for shape in shapes:
    gpu.setColor(shape.color)
    gpu.drawRect(shape.x, shape.y, shape.w, shape.h)
# 1000 separate gpu calls

with batching:
batch = []
for shape in shapes:
    batch.append(shape)
gpu.drawAll(batch)
# 1 gpu call with all data
```

**webgl advantage:**
- designed for batching
- send all vertex data at once
- gpu processes in parallel

---

### 11.2 matrix transforms

**what they are:**
- mathematical operations that change position/rotation/scale
- represented as matrices (grids of numbers)
- can be combined efficiently

**why matrices:**
- moving, rotating, scaling = complex math
- but with matrices, it's just multiplication
- chain transformations: translate × rotate × scale = one matrix

**for canvas:**
```
camera at (100, 50), zoomed 2x

without matrix:
for each shape:
    x = (shape.x - 100) * 2
    y = (shape.y - 50) * 2
    draw(x, y)

with matrix:
setTransform(translateMatrix × scaleMatrix)
for each shape:
    draw(shape.x, shape.y)  # gpu applies transform automatically
```

**webgl advantage:**
- matrix math runs on gpu
- apply same transform to millions of vertices = same cost as one

---

### 11.3 why consider pixijs

**what pixijs is:**
- a 2d rendering library built on webgl
- abstracts away webgl complexity
- feels like canvas 2d api, but gpu-accelerated

**why use it instead of raw webgl:**
```
raw webgl (complex):
- create shader program
- compile shaders
- create buffers
- bind attributes
- manage textures
- handle context loss
- ...hundreds of lines of boilerplate

pixijs (simple):
const app = new PIXI.Application();
const rect = new PIXI.Graphics();
rect.beginFill(0xff0000);
rect.drawRect(0, 0, 100, 100);
app.stage.addChild(rect);
```

**trade-off:**
- raw webgl: maximum control, maximum complexity
- pixijs: less control, much simpler
- for most 2d canvases, pixijs is plenty

---

### 11.4 virtualization

**the problem:**
- you have 10,000 shapes
- dom can't handle 10,000 elements efficiently
- even rendering them all to canvas is slow

**virtualization:**
- only render what's visible
- create/destroy elements as they scroll into/out of view

**how it works:**
```
canvas has 10,000 shapes
viewport shows shapes 500-600

without virtualization:
render all 10,000 shapes

with virtualization:
1. calculate which shapes are in viewport
2. render only shapes 500-600
3. user pans to shapes 600-700
4. destroy 500-550, create 650-700
```

**hybrid dom/canvas virtualization:**
- canvas: render overview/thumbnails of all nodes
- dom: render only the node you're editing (for rich text editing)
- switch between them based on interaction

---

### 11.5 web workers

**the problem:**
- javascript runs on one thread (main thread)
- main thread also handles ui updates
- heavy computation → ui freezes

**web workers:**
- separate threads for background work
- can't access dom directly
- communicate via messages

**example:**
```javascript
// main thread
const worker = new Worker('heavy-computation.js');
worker.postMessage({ data: bigArray });
worker.onmessage = (e) => console.log('result:', e.data);
// ui stays responsive while worker crunches numbers

// heavy-computation.js (worker)
onmessage = (e) => {
    const result = expensiveCalculation(e.data);
    postMessage(result);
};
```

**use cases for canvas:**
- parsing large files
- calculating layout for many nodes
- generating thumbnails
- pathfinding/collision detection

---

### 11.6 flatbuffers vs json

**json:**
- text-based format
- human-readable: `{"name": "alice", "age": 30}`
- needs parsing: text → data structure
- verbose (keys repeated, quotes everywhere)

**flatbuffers:**
- binary format (just bytes)
- not human-readable
- zero-copy access: read directly from bytes, no parsing
- compact

**comparison:**

| aspect | json | flatbuffers |
|--------|------|-------------|
| size | larger (text) | smaller (binary) |
| parse time | slow (must parse text) | instant (zero-copy) |
| human readable | yes | no |
| debugging | easy | need tools |
| flexibility | can change structure easily | need schema |

**why flatbuffers for canvas:**
- large documents = lots of shape data
- json: load file → parse entire thing → now you can use it
- flatbuffers: load file → use it immediately (read what you need)

**when to use what:**
- json: config files, api responses, debugging
- flatbuffers: large data, performance-critical, save/load

---

*last updated: december 2024*
