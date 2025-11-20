# journal.md

## 2025-11-20 14:30

### follow-up research: deep-dive into 10 critical questions

responded to comprehensive questions about building speech therapy ai. created two major documents.

**questions covered:**

1. **model architecture:** do we need two models (ears + brain)? analyzed three approaches:
   - specialized (whisper + llm) - recommended
   - unified (gemini 2.0 only) - simpler but less accurate
   - hybrid (whisper fine-tuned + gemini) - best of both
   - conclusion: use hybrid approach for child speech accuracy + reasoning capability

2. **workflow diagram:** created detailed ascii flowchart showing:
   - audio input → speech recognition → context enrichment → analysis → recommendations → gamification → data logging
   - complete data flow with code examples
   - feedback loop for continuous improvement

3. **nuance dragon:** clarified it's NOT suitable for child speech
   - removed from main recommendations
   - focused on whisper, wav2vec2, google cloud speech-to-text

4. **existing fine-tuned models:**
   - found: kid-whisper (publicly available on hugging face)
   - found: ai4bharat indicwhisper (indian languages, but adult speech)
   - **gap identified:** no indian child speech models exist
   - **opportunity:** our clinic's data is uniquely valuable

5. **applicability of examples:** corrected to focus exclusively on child-relevant solutions
   - whisper fine-tuned ⭐⭐⭐
   - wav2vec 2.0 ⭐⭐⭐
   - google cloud (child models) ⭐⭐

6. **training data strategy:**
   - **6.1 data labeling:**
     - which data: audio + transcripts for whisper; therapy notes + outcomes for llm
     - labeling approach: build into therapist workflow (cost $0) vs outsource ($10k-30k)
     - how much: minimum 10-20 hours, ideal 100+ hours for whisper; 1k-10k sessions for therapy llm
     - annotation format examples provided
     - skills needed: ml engineer, data engineer, therapists for qa
   - **6.2 indian child datasets:**
     - found 2 datasets: google/pratham reading dataset (32 hours), kaggle corpus
     - **critical finding:** NO public indian child speech disorder datasets
     - this makes our clinic data incredibly valuable (proprietary moat)
     - opportunity to publish research and establish leadership
   - **6.3 external vs proprietary:**
     - use both: external for baseline, proprietary for specialization
     - multi-stage fine-tuning approach recommended

7. **evaluation (evals):**
   - explained what evals are (testing before deployment)
   - metrics for speech: word error rate (wer), < 10% goal
   - metrics for therapy: therapist ratings, outcome-based, llm-as-judge
   - provided python code examples for eval suite
   - resources: hugging face evaluate library, weights & biases, promptfoo
   - who does it: automated metrics (computer) + clinical validation (humans)

8. **fine-tuning deep-dive:**
   - **what it is:** specializing base model on specific domain
   - **types:**
     - full fine-tuning: $5k-20k, best results
     - lora (recommended): $500-2k, 90% results at 10% cost
     - qlora: $200-800, most efficient
   - **alternatives explored:**
     - prompt engineering (start here, $0)
     - few-shot learning (minimal cost)
     - rag (retrieval-augmented, moderate cost)
   - **cost for 600-1000 hours/day generation:**
     - annual ml budget: $70k-210k
     - biggest cost: annotation ($50k-150k/year)
     - recommendation: collect selectively, fine-tune quarterly
   - **compute requirements:**
     - cloud gpus: $1-2/hour (lambda labs, runpod)
     - local: rtx 4090 ($1,600) sufficient for lora
     - production: serverless inference
   - **learning resources:**
     - fundamentals: 3blue1brown, fast.ai
     - practical: hugging face tutorials, kid-whisper github
     - communities: hf discord, r/machinelearning

9. **choosing base models:**
   - **can fine-tune gemini/gpt?** yes but expensive, not recommended
   - **open source vs closed:**
     - recommended: open source for control, privacy, cost
   - **recommended stack:**
     - speech (ears): whisper medium/large (fine-tune with lora)
     - therapy (brain): start gemini api, later llama 3.1 70b (fine-tuned)
   - **decision process:**
     - define metrics (wer, latency, cost, safety)
     - run bake-off on test set
     - evaluate on edge cases (stutter, indian accent, code-switching)
     - evals determine winner
   - **phased approach:**
     - phase 1-2: gemini for everything (validate)
     - phase 3: whisper + gemini (optimize asr)
     - phase 4: whisper + llama fine-tuned (full control, privacy)

10. **research papers:** compiled comprehensive list with direct links

**major documents created:**

1. **follow-up-questions-answered.md** (15k+ words)
   - detailed answers to all 10 questions
   - code examples throughout
   - analogies for complex concepts
   - cost breakdowns and timelines
   - practical recommendations

2. **research-papers-links.md** (50+ papers)
   - organized by category
   - direct links to papers, datasets, code
   - reading order recommendations
   - top 5 must-reads identified
   - gaps in research highlighted

**key insights:**

- hybrid approach (whisper + gemini → eventually whisper + llama) is optimal
- indian child speech disorder data doesn't exist publicly (our competitive advantage!)
- lora fine-tuning makes this economically feasible ($500-2k vs $5k-20k)
- evaluation is critical (both automated metrics + clinical validation)
- multi-stage approach: external datasets first, then proprietary data
- annual ml budget: $70k-210k (annotation biggest cost)
- can start with prompt engineering before committing to fine-tuning

**research findings:**

- 50+ papers catalogued and linked
- identified 26 datasets (6 with children, 2 with indian children)
- ai4bharat has indicwhisper (indian languages, adult speech)
- kid-whisper models publicly available on hugging face
- gap: no indian child speech disorder models (opportunity!)

**next potential explorations:**
- hands-on tutorial: fine-tune whisper on sample data
- build annotation tool for therapists
- design eval framework specific to speech therapy
- explore ai4bharat collaboration opportunities

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
