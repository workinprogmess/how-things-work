# journal.md

## 2026-01-31 18:00

### personalized books for children: research & thesis exploration

explored the thesis that books/learning will be personalized to each child — starting with physical printed books for toddlers and preschoolers.

**document created:**
- `personalized-books-for-children/personalized-books-research.md` — comprehensive q&a covering vision, printing infrastructure, first-principles thinking, full-stack architecture, and business model

**key areas covered:**

1. **the vision:** abc books with family members, nursery rhymes with child at center, stories about their world, "walk with a hero" concept, personalized coloring books — all physically printed

2. **printing infrastructure gap in india:** no api-based, children's-book-grade print-on-demand exists. canva/printstop/pothi serve adjacent markets but not this one

3. **first-principles on manufacturing:**
   - the core problem: how to make a unique physical object at mass production cost
   - identified the "asset layer" as the smallest compositable unit
   - the "moment of recognition" as the experiential atomic unit
   - five approaches analyzed: hybrid offset+digital, smart batching, modular assembly, form factor rethink, distributed micro-printing

4. **offset vs digital printing:** fundamentally different physics (plates vs laser/inkjet), why hybrid needs two machines, when to invest in each

5. **full-stack architecture:**
   - personalization engine (multi-agent ai backend)
   - layout/composition engine (software-led, layers from day one)
   - print infrastructure (start asset-light at Rs 50L-1Cr, scale to Rs 8-15Cr)
   - companion app (feedback loop, not smart paper)
   - parent-facing app (simple, beautiful, hides all complexity)

6. **business model insights:**
   - parents as creators/authors (etsy model for children's books)
   - print api as a platform business (serve other startups, schools, publishers)
   - content is commoditized, print is low-margin, but the integrated loop is the moat
   - own-stack margins at 60-70% (apple analogy)
   - india: 120M+ children under 6, no one owns personalization + manufacturing stack

**key insight:** the moat isn't any single piece — it's the system that knows your child, improves over time, and delivers a physical product. the full loop.

---

## 2025-11-23 17:30

### comprehensive research: ot and aba therapy ai for children

created two comprehensive research documents expanding the therapy ai scope beyond speech.

**documents created:**

1. **occupational-therapy-ai-children.md** (~35kb)
2. **aba-behavioral-therapy-ai-children.md** (~75kb)

**occupational therapy research highlights:**

- key insight: ot requires vision (camera/video) - ai must observe motor performance
- leading company: korro ai (computer vision + games, rct validated, cohen's d=1.1)
- technical stack: pose estimation (vitpose/mediapipe) → skeleton extraction → action recognition (st-gcn) → quality assessment
- key dataset: multiview child motor development dataset (gigascience 2023) - 399 children, ages 20-71 months
- challenge: child pose estimation models trained on adults, need fine-tuning
- indian players: beable health (armable), nema ai, vifr tech
- budget: mvp $135-275k globally, ~35-71 lakh inr in india

**aba/behavioral therapy research highlights:**

- key insight: multimodal opportunity (audio + vision) for behavior tracking
- ethical considerations addressed: aba controversies, neurodiversity-affirming approach
- leading companies: forta ($55m funding), spectrumai ($9m), floreo (fda breakthrough)
- technical stack: behavior detection + emotion recognition + abc tracking + reinforcement analysis
- key datasets: ssbd (stimming behaviors), mmasd+ (100+ hours), uc davis mind institute
- indian players: cogniable, purple butterfly, arula for autism
- budget: $787k-1.7m us, $200-350k india

**unified vision-enabled architecture (next step):**

both ot and aba benefit from vision. speech therapy can also be enhanced with vision (lip reading, engagement). planning unified architecture that:
- shares pose estimation + action recognition infrastructure
- modular therapy-specific layers
- single child profile across therapy types
- cross-therapy insights for co-occurring conditions

---

## 2025-11-22 10:30

### evaluation framework for child speech therapy ai

created comprehensive eval framework document covering three layers of evaluation.

**document created:** `eval-framework-child-speech-therapy.md`

**layer 1: speech recognition (asr)**
- primary metric: word error rate (wer)
- secondary: phoneme error rate (per), phoneme-specific accuracy
- special handling for disfluencies (stuttering, prolongations)
- targets by context: quiet room < 8%, disordered speech < 18%
- test set stratification: age, disorder type, severity, acoustic conditions, language

**layer 2: therapy recommendation quality**
- 5 evaluation dimensions:
  1. clinical appropriateness (1-5)
  2. age appropriateness (1-5)
  3. parent clarity (1-5)
  4. safety (pass/fail with red flags)
  5. evidence basis (categorical)
- three evaluation methods:
  - expert slp review (gold standard)
  - key element checklist (automated)
  - llm-as-judge (fast, needs calibration)

**layer 3: clinical outcomes**
- speech accuracy improvement tracking
- generalization testing (trained → untrained → conversational)
- engagement metrics (completion, consistency, voluntary use)
- family satisfaction surveys
- comparison study design (rct ideal, pre-post pragmatic)
- statistical analysis: effect size, responder rate

**evaluation infrastructure:**
- golden test set (500+ samples, versioned, stable)
- dynamic test set (production failures, edge cases)
- alerting thresholds (critical/warning/info)
- reporting templates for model releases and monthly dashboards

**alignment with clinical standards:**
- mapped ai metrics to standardized tests (gfta-3, caap-2, ssi-4)
- therapist-friendly reporting format
- pcc (percent consonants correct) equivalent tracking

**key targets identified:**
| metric | target |
|--------|--------|
| wer (disordered speech) | < 18% |
| clinical appropriateness | > 4.0/5 |
| safety pass rate | 100% |
| mean outcome improvement | > 20% |
| responder rate | > 75% |
| family satisfaction | > 4.0/5 |

**next steps:**
1. build test set (500+ labeled samples)
2. implement automated evals (layers 1 + 2)
3. recruit expert reviewers (3-5 slps)
4. establish baselines on current system
5. design clinical outcome study protocol

---

## 2025-11-20 16:00

### follow-up round 2: latest models + prototyping + detailed explanations

created four comprehensive new documents addressing follow-up questions.

**documents created:**

1. **latest-models-nov2025.md** - current state-of-the-art models
2. **weekend-prototype-guide.md** - hands-on build guide
3. **detailed-explanations.md** - deep conceptual clarity
4. **realtime-workflow-continuous-learning.md** - production workflows

**q1: latest models (nov 2025 accurate)**

researched and documented current model landscape:

**speech recognition (ears):**
- whisper v3 turbo: still sota for child speech after fine-tuning (9.2% wer)
- google cloud speech-to-text v2 (chirp): has child speech model variant, why still relevant despite gemini 2.0
- wav2vec 2.0 / seamless m4t: alternative, sometimes outperforms whisper
- apple on-device: privacy-first but can't fine-tune
- clarified: chirp is specialized asr api, gemini 2.0 is multimodal reasoning (different purposes)

**language models (brain):**
- gemini 2.0 flash: recommended starting point ($0.0005/request, multimodal)
- claude 3.7 sonnet: best reasoning but 10x more expensive
- llama 3.3 70b: latest (not llama 4, doesn't exist yet as of nov 2025)
- qwen 2.5 72b: strong multilingual, especially chinese
- deepseek v3: cost-effective moe architecture
- mistral large 2: european focus
- phi-4: microsoft's small but capable model (14b)

**edge models:**
- llama 3.3 3b/8b: can run on phone
- gemini flash lite (coming): on-device capable

**why whisper over gemini 2.0 for asr:**
- proven: 38% improvement on child speech vs no fine-tuning
- specialization: optimized for atypical speech patterns
- cost: $2k-5k one-time vs $0.0375/min forever
- offline: runs on device
- fine-tuning depth: can customize every parameter

**why gemini initially, llama eventually:**
- gemini: fast validation, $0 upfront, excellent quality
- llama: privacy, no ongoing costs, full control after fine-tuning

**confidence score explained:**
- probability model assigns to chosen transcription
- 0.87 = 87% sure, reliable data
- used to filter quality, guide parent feedback

**q2: fine-tuning "your own" vs using apis**

clarified the two meanings:

**meaning 1: using apis (not really "yours")**
```
your app → gemini api → google's servers
- don't own model
- just calling service
- good for starting
```

**meaning 2: fine-tuning open source (actually "yours")**
```
llama 3.3 → your therapy data → fine-tuned weights
- you own the model
- run on your servers
- good for production
```

**is using gemini as-is fruitful? yes!**
- already excellent at medical reasoning
- prompt engineering very powerful
- rag adds your clinic's data without fine-tuning
- 90% quality for 10% cost (vs fine-tuning)
- fine-tune only after validation phase

**why separate models = more accuracy:**
- specialization: whisper trained on 680k hours of audio, gemini on reasoning
- proven: whisper fine-tuned achieves 50% fewer errors than gemini alone
- cost: cheaper at scale
- control: can fine-tune parts independently

**q3: weekend prototype guide**

created two complete build approaches:

**approach 1: real-time (recommended)**
- tech stack: react + flask + gemini 2.0
- hour-by-hour breakdown (48 hours total)
- complete code examples
- saturday: setup + basic ui (12 hours)
- sunday: real-time streaming + polish (12 hours)

**approach 2: voice notes (simpler)**
- single html file version
- uses browser's built-in speech recognition
- calls gemini api for analysis
- can build in 24 hours

**existing repos to leverage:**
- openai/whisper - integration code
- react-mic - audio recording
- google/generative-ai-python - gemini examples
- 6+ github repos identified with reusable components

**testing without child data:**
- myst dataset samples (free)
- synthesize with google tts
- record yourself
- ask family with kids

**what you'll have by sunday:**
- ✅ working web app
- ✅ records audio
- ✅ transcribes speech
- ✅ analyzes for therapy
- ✅ suggests exercises
- ✅ demo-ready ui

**q4 & q5: real-time workflow + continuous fine-tuning**

**real-time at-home workflow (ai-led):**
- complete step-by-step interaction flow
- session initialization loads child's progress
- ai prompts → child speaks → instant analysis → adaptive feedback
- latency: 500-1300ms total (feels instant)
- parent sees summary after session
- therapist reviews periodically (5-10 min/day for all clients)

**vs session-based:**
| aspect | session (therapist) | real-time (ai-led) |
|--------|---------------------|-------------------|
| frequency | 1-2x/week | daily |
| cost | $100-200/session | $0-5/session |
| role | professional intervention | practice between sessions |

**continuous fine-tuning cycle:**

```
month 1-3: collect data (40k samples/month)
    ↓
auto-filter high quality (50% pass)
    ↓
therapist reviews 5% sample (qa)
    ↓
monthly: fine-tune whisper ($500-1k)
    ↓
a/b test new vs old model
    ↓
rollout if better
    ↓
repeat
```

**periodic vs continuous:**
- periodic (quarterly): simpler, $6k-12k/year
- continuous (weekly): faster improvement, $10k-25k/year
- hybrid: quarterly whisper, monthly llm

**data quality scoring:**
- audio quality (snr > 20db)
- transcription confidence (> 0.8)
- consistency with child's pattern
- therapist verification
- parent feedback
- only include samples scoring > 70/100

**triggers for retraining:**
- scheduled (monthly/quarterly)
- performance drops > 1%
- 50k+ new samples
- user satisfaction < 4.0
- strategic (new language, age range)

**infrastructure:**
- minimal (< 100 users): $50-200/month, manual process
- production (1000+ users): $2k-10k/month, automated pipeline

**key insights:**

- gemini 2.0 and chirp serve different purposes (reasoning vs specialized asr)
- llama 3.3 is latest (llama 4 doesn't exist yet)
- using gemini api as-is is very fruitful for validation
- weekend prototype is achievable with existing tools
- real-time workflow enables daily practice vs weekly therapy
- continuous learning makes model better over time
- data quality matters more than quantity for fine-tuning

**technical clarifications:**

- confidence score: probability of transcription being correct
- fine-tuning "yours": you own weights, run on your servers
- separate models: specialization beats generalization
- real-time: 500-1300ms latency feels conversational
- continuous learning: improve model monthly/quarterly

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
