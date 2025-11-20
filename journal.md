# journal.md

## 2025-11-20 12:15

### first research deep-dive: speech therapy ai agent

conducted comprehensive research on building speech ai/agent for children with speech delays, autism, adhd:

**question:** how to design domain-specific ai for home speech therapy at fraction of professional cost?

**research approach:**
- searched for existing companies and products
- found academic papers on fine-tuning whisper for child speech
- identified publicly available datasets
- analyzed regulatory/compliance requirements
- studied successful implementations

**key findings:**

*existing solutions:*
- speech blubs: 5m+ users, video modeling + ai, gamification works
- mita: fda breakthrough designation, 120% improvement with clinical validation
- 6+ other apps serving this space already

*technical approach:*
- base model: openai whisper (best for child speech recognition)
- fine-tuning method: lora (parameter-efficient, proven results)
- datasets: myst (470 hours, free for research), childes (largest child language db)
- improvement: 38% wer reduction after fine-tuning (9.2% wer achieved)

*critical insights:*
- don't build from scratch - fine-tune existing models
- clinical validation essential (mita's approach: 3-year trial, 6k+ children)
- engagement > features (kids need games, not therapy interface)
- start with therapist tool first (builds dataset + revenue + feedback loop)
- regulatory path exists but requires planning (hipaa, coppa, possibly fda)

**practical roadmap created:**
- phase 1: validate (2 months) - parent surveys, competitive analysis
- phase 2: poc (2 months) - test whisper baseline, collect 10-20 hours data
- phase 3: mvp (4 months) - fine-tune model, build llm recommendation layer
- phase 4: pilot (4 months) - 10-15 families, measure outcomes
- phase 5: validate (6 months) - proper clinical study, publish results
- phase 6: scale - b2c or b2b or insurance reimbursement

**budget reality check:**
- mvp: $100k-200k
- full validation: $350k-850k
- alternative: build therapist tool first (immediate revenue, builds dataset)

**3-month quick test proposed:**
- month 1: try speech blubs with 10 families
- month 2: build simple recording + human feedback hybrid
- month 3: measure if worth building full ai version

**documentation created:**
- speech-therapy-ai-agent.md with full guide
- includes: analogies, step-by-step process, code examples, real companies, research papers, datasets, regulatory considerations, budget estimates, success factors, red flags to avoid

**links captured:**
- 6 working products analyzed
- 10+ research papers referenced
- 6 datasets identified with access instructions
- regulatory frameworks mapped

**next exploration topics to consider:**
- technical deep-dive into lora fine-tuning methodology
- prompt engineering for therapy recommendations
- gamification psychology for pediatric engagement
- ethical ai in pediatric healthcare

## 2025-11-20 11:50

### track 1 folder structure

- created llm-fine-tuning-and-more/README.md to make folder visible in git
- readme outlines research focus areas for fine-tuning track
- ready to start collecting research materials

## 2025-11-20 11:47

### initial setup

- created workspace in conductor
- established project structure and guidelines
- project focus: research on "how things work"
- starting with track 1: llm fine-tuning and related topics
- branch: fine (renamed from boise, set as default on github)
- commit format: specific title + what bullets + why section, all lowercase
- this journal tracks all thinking, design, and code decisions in reverse chronological order
