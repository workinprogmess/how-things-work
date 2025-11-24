# sunshine ai speech assessment: critique, investor questions, and follow-ups

based on review of the technical plan against our research on speech therapy ai for children.

---

## overview of the plan

sunshine proposes a three-layer architecture:
1. **sam (sunshine acoustic model)** - whisper/nemo + lora for phoneme-level transcription
2. **clinical assessment layer** - forced alignment + levenshtein distance for error classification
3. **srm (sunshine reasoning model)** - llama 4 + rag for therapeutic responses

key claims:
- 25+ clinics generating ~500 clips/day
- 15,000+ labeled clips target
- 4-5 person engineering team
- 1-2 month data collection timeline

---

## what's strong

### 1. correct architectural intuition
the separation of "ears" (sam) from "brain" (srm) is exactly right. our research confirms:
- specialized whisper fine-tuning achieves 38% wer reduction on child speech
- hybrid approach (whisper + llm) outperforms unified models
- phoneme preservation is critical - standard asr autocorrects "wabbit" → "rabbit"

### 2. lora approach is cost-effective
using lora adapters instead of full fine-tuning is smart:
- $500-2k vs $5k-20k for full fine-tuning
- 90% of the results at 10% of the cost
- matches our research recommendations

### 3. policy engine (layer 2.5) is thoughtful
non-neural guardrails for clinical rules is good practice:
- deterministic behavior for safety-critical decisions
- easier to audit and explain
- regulatory-friendly

### 4. indian english focus
addressing indian phonetic distinctions is a real gap:
- no public indian child speech disorder datasets exist
- ai4bharat has adult indian speech, but not children with disorders
- this could be a genuine moat

---

## concerns & gaps

### 1. data quantity seems optimistic

**claim:** 15,000+ clips, achievable in 1-2 months with 500 clips/day from 25+ clinics

**reality check:**
- 500 clips/day × 60 days = 30,000 raw clips (math checks out)
- but research shows you need **quality, not just quantity**:
  - kid-whisper used 470 hours of myst dataset
  - effective fine-tuning needs 10-20 hours minimum, 100+ ideal
  - 15,000 clips at ~5 seconds each = ~21 hours (borderline minimum)

**questions to ask:**
- what's the average clip duration?
- what's the expected label quality? who's labeling?
- what percentage will pass quality filters (confidence > 0.8)?
- are the 25 clinics confirmed partners or projections?

### 2. labeling strategy unclear

**missing from plan:**
- who labels the data? therapists? outsourced?
- what annotation format? (phoneme-level? word-level? error-type?)
- what's the labeling cost? (our research: $10-30k outsourced, $0 if therapist workflow)
- inter-rater reliability process?

**why it matters:**
- annotation is typically the biggest cost ($50-150k/year at scale)
- poor labels = poor model = wasted compute
- phoneme-level annotation requires trained linguists

### 3. "llama 4" doesn't exist

**the plan mentions:** "srm uses llama 4"

**reality:** as of nov 2025, llama 4 doesn't exist. latest is llama 3.3 (70b).

**concern:** this suggests either:
- plan is aspirational/future-dated
- author isn't current on model landscape
- typo (meant llama 3?)

**questions to ask:**
- what's the actual base model for srm today?
- has any prototype been built?
- what's the fallback if llama 4 doesn't arrive on expected timeline?

### 4. no evaluation framework

**missing entirely:**
- how will they measure wer/per?
- what's the target accuracy?
- how will therapy recommendations be validated?
- clinical outcome measurement?

**why critical:**
- our research shows evaluation is often overlooked
- without evals, you can't prove improvement
- investors will ask "how do you know it works?"

**questions to ask:**
- what's the target wer for sam?
- how will clinical appropriateness be measured?
- any plans for clinical validation study?
- what metrics will you report to investors?

### 5. competitive landscape not addressed

**context:** the indian child speech therapy market is essentially greenfield - no dominant player exists.

**global players (not established in india):**
- speech blubs - 5m+ downloads globally, but not india-focused
- mita - fda breakthrough designation, narrow autism focus
- articulation station, constant therapy - slp tools, not consumer apps

**the real questions aren't "how do you beat incumbents" but:**
- why will you win the race to establish in india?
- what's the defensible moat once you're there?
- what stops speech blubs from adding hindi/indian english support?
- how do you build network effects or data moats?

**questions to ask:**
- what's the go-to-market strategy for india?
- how do you acquire users cost-effectively?
- what's the defensibility if a well-funded competitor enters?

### 6. team composition concerns

**plan says:** 4-5 engineers (asr, nlp, ml ops, backend)

**missing:**
- clinical advisor / slp on team?
- who validates therapeutic appropriateness?
- regulatory/compliance expertise?
- child ux/engagement expertise?

**our research shows:**
- mita's success came from 3-year clinical trial with 6k+ children
- clinical validation is essential, not optional
- engagement > features for pediatric apps

**questions to ask:**
- is there an slp on the team or advisory board?
- who designed the therapeutic protocols?
- what's the clinical validation plan?

### 7. regulatory path not addressed

**missing:**
- hipaa compliance (if us market)
- coppa (children's data)
- fda pathway (if claiming therapeutic benefit)
- india: cdsco, digital personal data protection act

**why it matters:**
- claiming "assessment" or "therapy" triggers regulatory scrutiny
- fda has cleared ai devices in this space (floreo got breakthrough designation)
- non-compliance = existential risk

**questions to ask:**
- what's the regulatory strategy?
- wellness device vs medical device positioning?
- data privacy architecture?

### 8. engagement/gamification absent

**the plan is purely technical** - no mention of:
- how kids will actually use it
- gamification strategy
- parent involvement
- therapist workflow integration

**our research shows:**
- engagement > features for pediatric apps
- speech blubs' success is largely gamification
- kids need games, not therapy interfaces

**questions to ask:**
- what's the user experience vision?
- how do you keep a 5-year-old engaged?
- b2c (parents) or b2b (clinics) go-to-market?

### 9. cost/unit economics missing

**no mention of:**
- development budget
- inference costs
- pricing model
- path to profitability

**our research estimates:**
- mvp: $100-200k
- clinical validation: $350-850k
- annual ml budget at scale: $70-210k

**questions to ask:**
- what's the total funding ask?
- what's the burn rate?
- cost per session at scale?
- when does it become unit-economic positive?

### 10. vision modality not considered

**the plan is audio-only**

**our research shows:**
- speech therapy can benefit from vision (lip reading, engagement detection)
- ot and aba (often co-occurring with speech delays) require vision
- multimodal = competitive advantage

**opportunity they're missing:**
- unified platform across therapy types
- single child profile for co-occurring conditions
- larger tam (total addressable market)

---

## investor-focused questions

### market & competition
1. what's the tam/sam/som? how did you calculate it?
2. who are the top 3 competitors and why will you win?
3. what happens when speech blubs adds indian language support?
4. is this b2c (parents) or b2b (clinics)? why?

### team & expertise
5. who on the team has pediatric speech therapy domain expertise?
6. is there an slp (speech-language pathologist) involved?
7. what's the founders' relevant background?
8. have you built ml products before? shipped to production?

### product & technology
9. is there a working prototype? can we see a demo?
10. what's the current wer on indian child speech?
11. how does sam handle code-switching (hindi-english)?
12. what happens when the model is wrong? safety mechanisms?

### data & moat
13. are the 25 clinics confirmed partners or pipeline?
14. what's the data exclusivity arrangement?
15. who owns the training data?
16. how defensible is the indian speech data moat?

### validation & outcomes
17. how will you prove clinical efficacy?
18. any plans for rct or clinical study?
19. what outcome metrics will you track?
20. have any children used a prototype? results?

### regulatory & risk
21. medical device or wellness positioning?
22. hipaa/coppa compliance plan?
23. what if fda requires clinical trials?
24. liability if model gives wrong assessment?

### financials
25. what's the funding ask and use of funds?
26. what's the runway with current/planned funding?
27. cost per user at scale?
28. path to profitability timeline?

### roadmap & milestones
29. what's the mvp and when will it be ready?
30. what milestones trigger next funding round?
31. what's the 18-month vs 3-year vision?
32. what's the biggest risk and mitigation?

---

## summary assessment

| aspect | rating | notes |
|--------|--------|-------|
| technical architecture | strong | correct separation of concerns |
| data strategy | weak | optimistic timelines, labeling unclear |
| evaluation plan | absent | critical gap |
| clinical validation | absent | essential for credibility |
| competitive positioning | absent | no differentiation story |
| regulatory strategy | absent | risk if claiming therapeutic benefit |
| team composition | incomplete | need clinical expertise |
| engagement/ux | absent | kids need games, not tech |
| financials | absent | no cost/pricing visibility |

**overall:** technically sound foundation, but missing the clinical, regulatory, and business layers that matter for actual success. the plan reads like an ml engineer's perspective without clinical or commercial grounding.

**recommendation for your friend:** before pitching to investors, address:
1. add clinical advisor/slp to team or advisory
2. define evaluation metrics and targets
3. build competitive differentiation story
4. clarify regulatory positioning
5. prototype with actual children and measure outcomes

---

## what i'd want to see in v2 of this plan

1. **clinical validation section** - how will you prove it works?
2. **competitive landscape** - why you vs speech blubs/mita?
3. **team bios** - relevant experience, clinical advisors
4. **prototype results** - any early data?
5. **regulatory strategy** - medical vs wellness positioning
6. **financials** - funding ask, use of funds, unit economics
7. **go-to-market** - b2b vs b2c, pricing, distribution
8. **engagement strategy** - how kids will actually use it
9. **expansion vision** - ot, aba, multimodal future?

---

## appendix: glossary of terms

| term | meaning |
|------|---------|
| **wer (word error rate)** | % of words transcribed incorrectly. formula: (substitutions + deletions + insertions) / total words. lower = better. target: < 15% |
| **per (phoneme error rate)** | same as wer but at individual sound level. more granular - useful for therapy |
| **lora (low-rank adaptation)** | efficient fine-tuning technique. freezes base model, adds small trainable adapters. 90% results at 10% cost |
| **vad (voice activity detection)** | detects when someone is speaking vs silence. used to only send relevant audio |
| **dsp (digital signal processing)** | audio cleanup - noise reduction, normalization, echo cancellation |
| **forced alignment** | matching audio to text at phoneme level with timestamps |
| **levenshtein distance** | algorithm measuring edit distance between two strings |
| **rag (retrieval augmented generation)** | llm technique that retrieves relevant context from database before generating |
| **slp** | speech-language pathologist (the clinical professional) |

---

## appendix: additional technical gaps identified

### levenshtein distance is too simplistic

the plan uses standard levenshtein which treats all errors equally, but:
- /r/ → /w/ is common and developmentally expected at age 3
- /p/ → /g/ is unusual and clinically significant

**better approach:** phonologically weighted distance where:
```python
error_weights = {
    ('r', 'w'): 0.3,  # common, low severity
    ('s', 'th'): 0.4,  # lisp, moderate
    ('p', 'g'): 1.0,  # unusual, high severity
}
```

or even better: phonological feature distance based on voicing, place, manner.

### real-time vs audio-notes not clarified

the plan mentions "real-time" but doesn't explain:
- what's the latency target?
- how is conversation state maintained?
- what happens with connection issues?

**this matters:** real-time interaction is technically harder but more engaging. audio-notes is simpler but less interactive.

**current state of tech:** real-time voice ai for extended sessions is possible (openai realtime api, hume ai, character.ai voice) but requires careful architecture.

### swallowing/feeding mentioned but not addressed

the plan mentions this in disorder types but:
- swallowing/feeding assessment requires **vision**, not just audio
- need to observe swallowing mechanics, feeding posture
- this is more ot territory than speech

**gap:** audio-only architecture can't address this

### data strategy for different disorder types

labeling needs differ significantly:

| disorder | annotation needs |
|----------|-----------------|
| articulation | phoneme-level transcription |
| fluency | temporal patterns, disfluency markers |
| language delay | vocabulary, sentence structure |

the plan treats all as same labeling task - this won't work.

### recommended team additions

| role | why needed |
|------|-----------|
| slp / clinical advisor | validates therapeutic approach, creates clinical rulebook |
| child ux designer | gamification, engagement - kids won't use boring apps |
| data/annotation lead | labeling is critical and complex |
| regulatory/compliance | hipaa, coppa, potentially fda |
| product manager | owns user experience end-to-end |

---

## follow-up questions & detailed explanations

### 1. the ears (acoustic layer / sam)

#### 1.1 kid-whisper vs regular whisper?

**regular whisper** struggles with children:
- higher pitch, different formant frequencies
- less consistent articulation
- more disfluencies
- underrepresented in training data

**kid-whisper** (fine-tuned on child speech) shows major improvement:
- whisper-small: 13.93% → 9.11% wer (35% improvement)
- whisper-medium: 13.23% → 8.61% wer

**verdict:** for child speech therapy, fine-tuning on child speech is necessary, not optional.

#### 1.1.1 what is "local vad on edge + server-side dsp"?

- **vad (voice activity detection)** - detects when someone is speaking vs silence
  - running "on edge" (phone/tablet) means device only sends audio when speech detected
  - saves bandwidth, reduces latency, lowers costs

- **dsp (digital signal processing)** - audio cleanup on server
  - noise reduction, normalization, echo cancellation

#### 1.1.2 do standard ai models "autocorrect"?

**partially true, nuanced:**
- whisper is trained on audio → correct text pairs
- learns to map messy audio → clean text
- tends to output "rabbit" even when someone says "wabbit"
- not explicitly "autocorrecting grammar" but the effect is similar
- normalizes toward expected output

**the fix:** fine-tune on data where "wabbit" audio → "wabbit" text (preserving errors)

#### 1.1.3 what does "using lora" mean?

**lora (low-rank adaptation)** - efficient fine-tuning technique:

```
full model: 1 billion parameters
full fine-tuning: update all 1 billion (expensive, $5k-20k)
lora: freeze original, add small "adapter" layers (~1-10m params)
      train only adapters (cheap, $500-2k)
```

**what bits to fine-tune:**
- lora targets attention layers (where model "decides what to focus on")
- don't manually pick - lora inserts trainable matrices alongside existing layers
- rank parameter (r) controls size: r=8 common, r=16-32 for more capacity

**how to decide:**
- start with r=8, evaluate
- if underfitting (not learning), increase rank
- if overfitting (memorizing), decrease rank or add data

#### 1.1.4 beyond articulation - what about fluency, delays, feeding?

different disorders need different signals:

| disorder | what to capture | technical approach |
|----------|-----------------|-------------------|
| **articulation** (rabbit→wabbit) | phoneme substitutions | phoneme-level transcription, error classification |
| **fluency/stuttering** | repetitions, prolongations, blocks | temporal patterns, disfluency detection, speaking rate |
| **speech delay** | limited vocabulary, simpler structures | vocabulary diversity, mlu (mean length of utterance) |
| **unclear speech** | intelligibility | confidence scores, listener comprehension rate |
| **swallowing/feeding** | not speech - physical act | vision-based (observe swallowing), acoustic (swallow sounds) |

**key insight:** swallowing/feeding is ot territory, needs vision, not just audio. sunshine plan doesn't address this.

#### 1.1.5 evals for the "ears" layer

```python
ears_eval = {
    # primary
    'wer': target < 15%,  # word error rate
    'per': target < 10%,  # phoneme error rate

    # disorder-specific
    'error_preservation': 'wabbit stays wabbit',
    'disfluency_detection': 'b-b-ball recognized as stuttering',
    'confidence_calibration': 'low confidence when uncertain',

    # practical
    'latency': target < 500ms,
    'noise_robustness': 'wer < 25% with background noise'
}
```

### 2. the judge (clinical assessment layer)

#### 2.1 separate model or part of reasoning?

**in sunshine plan: separate deterministic layer, not neural model:**
- takes phoneme output from sam
- applies algorithmic comparison (forced alignment, levenshtein)
- outputs structured error classification

**this is good design** - keeps clinical logic auditable and deterministic

#### 2.2 where does the curriculum come from?

the "curriculum" is:
- **phoneme inventory** - what sounds exist (from linguistics)
- **developmental norms** - what sounds kids should have at each age (slp research)
- **error classification rules** - how to categorize substitutions, omissions, distortions

**source:** speech-language pathology literature, standardized tests (gfta-3, caap-2), clinical guidelines

**who maintains:** needs slp advisor - this is why plan needs clinical expertise on team

#### 2.3 should we use weighted levenshtein distance?

**yes, you're absolutely right.** standard levenshtein treats all errors equally, but:
- /r/ → /w/ is very common, less severe
- /p/ → /g/ is unusual, more concerning
- some errors are developmental (expected at age 3), others are disordered

**better approach: weighted distance**
```python
error_weights = {
    ('r', 'w'): 0.3,  # common substitution, low weight
    ('s', 'th'): 0.4,  # lisp, moderate
    ('p', 'g'): 1.0,  # unusual, high weight
}
```

**even better: phonological feature distance**
- /p/ and /b/ differ only in voicing → small distance
- /p/ and /s/ differ in place, manner, voicing → large distance

**this is a gap in the plan** - they mention levenshtein but not weighting.

#### 2.4 where does reasoning/knowledge come from?

**in the judge layer:** it's not "reasoning" - it's rule-based comparison. knowledge is:
1. expected phonemes (from text/target)
2. actual phonemes (from sam)
3. classification rules (from clinical literature)

**no deep understanding here** - that comes in srm layer where llm reasons about what to do.

### 3. the scorekeeper/policy engine

#### 3.1 where does clinical rulebook come from?

**manually authored by:**
- slps with clinical expertise
- translated into decision rules

**example rules:**
```python
if error_rate > 0.5 and frustration_detected:
    action = "simplify_task"

if same_error_3_times_in_row:
    action = "try_different_approach"

if target_sound_accuracy > 0.8:
    action = "progress_to_next_level"
```

**who maintains:** clinical team, needs regular updates based on outcomes

**gap in plan:** doesn't specify who creates/maintains this

#### 3.2 what does "stop_testing_use_metaphor" mean?

directive to srm (response generator) saying:
- stop drilling child on tests
- switch to metaphor-based teaching (e.g., "make snake sound - sssss" instead of "say /s/")

policy engine decides *strategy*, then tells llm to execute in natural language.

### 4. deep-dive: sam

#### 4.1 what does "train specific adapters" mean?

**adapters = lora modules** for specific capabilities:

```
base whisper
    ├── indian english adapter (accent/phonetics)
    ├── stuttering adapter (disfluency patterns)
    ├── child voice adapter (pitch/formants)
    └── noise robustness adapter
```

**yes, need baselines before training:**
1. measure base whisper on test set
2. train adapter
3. measure again
4. compare improvement

without baselines, can't prove adapter helped.

#### 4.2 is "phonemes with confidence scores" best output?

**for speech therapy, yes:**
- phonemes tell exactly what sounds were produced
- confidence tells how sure model is
- low confidence = flag for human review

**potential additions:**
- timestamps (when each phoneme occurred)
- alternatives (top-3 phonemes if uncertain)
- disfluency markers (repetition, prolongation flags)

#### 4.3 evals for sam

```python
sam_evals = {
    # accuracy
    'phoneme_accuracy': per_score,
    'by_phoneme': {'/r/': 0.85, '/s/': 0.90, ...},

    # error preservation
    'autocorrect_rate': should_be_near_zero,

    # calibration
    'confidence_vs_accuracy': correlation_score,

    # robustness
    'noisy_audio_per': target < 20%,
    'accented_speech_per': target < 15%,

    # latency
    'inference_time_ms': target < 300,

    # regression
    'vs_previous_version': no_degradation
}
```

### 5. deep-dive: srm

#### 5.1 what does "not neural, deterministic logic" mean?

**neural network:** learns patterns from data, outputs can vary
**deterministic logic:** if-then rules, always same output for same input

```python
# deterministic (policy engine)
if frustration_score > 0.7:
    return "take_break"  # always

# neural (llm)
generate_response(context)  # might vary
```

**why separate:**
- safety-critical decisions should be deterministic (auditable, explainable)
- creative responses can be neural (flexible, natural)

#### 5.2 policy engine = judge + scorekeeper?

**based on plan:**
- **judge** (layer 2) = error classification (what's wrong)
- **scorekeeper** (layer 2.5) = state tracking + intervention triggers (what to do)
- together they form "policy engine" that wraps neural srm

#### 5.3 what is "longitudinal memory"? is there latitudinal?

**longitudinal = over time:**
- tracks child's progress across sessions
- remembers what worked before
- knows their history, preferences, struggles

**no "latitudinal"** - not a term used here. but could imagine:
- **cross-domain memory** = remembering insights from speech therapy that help in ot
- this is "unified architecture" opportunity

#### 5.4 "decision trees of human therapists" - detailed in data pipeline?

**you're right, it's not detailed.** plan mentions it but doesn't explain:
- how to capture therapist decision patterns
- what data format
- how many examples needed

**this is a gap.** would require:
- recording therapist sessions (with consent)
- annotating decision points ("why switch activities here?")
- extracting patterns into training data

#### 5.5 does lora work for srm too?

**yes, lora works for llms too** (that's where it originated):
- original lora paper was for llm fine-tuning
- proven effective for domain adaptation
- research-backed: thousands of papers, industry standard

**can apply to any transformer model** - whisper, llama, gpt, etc.

#### 5.6 what are we fine-tuning in reasoning layer?

**plan is unclear, but likely:**

| component | fine-tuning approach |
|-----------|---------------------|
| clinical response style | fine-tune llm on therapist transcripts |
| therapy recommendations | fine-tune on (context → recommendation) pairs |
| child-friendly language | fine-tune on age-appropriate examples |
| safety guardrails | rlhf or constitutional ai |

**differentiation layer** seems disorder-specific logic, likely rule-based not fine-tuned.

#### 5.7 evals for srm

```python
srm_evals = {
    # clinical quality (expert review)
    'clinical_appropriateness': rating_1_5,
    'age_appropriateness': rating_1_5,
    'safety': pass_fail,

    # practical
    'parent_clarity': rating_1_5,
    'response_latency': target < 1s,

    # automated checks
    'jargon_free': no_clinical_terms_without_explanation,
    'length_appropriate': not_too_long,

    # llm-as-judge (calibrated against experts)
    'gpt4_clinical_score': correlation > 0.7 with expert,

    # outcome-based (long-term)
    'child_improvement_rate': compare_vs_control
}
```

### 6. building it

#### 6.1 why "top 2-3 issues" not all?

**practical reasons:**
- limited labeling resources
- each disorder needs different annotation approach
- better to do 2-3 well than 10 poorly
- can expand later

**good strategy:** articulation + fluency + language delay covers ~80% of cases

#### 6.2 labeling strategy concerns

**you're right to question.** plan is vague on:
- annotation format (phoneme-level? word-level? error-type?)
- who labels (slps? outsourced? automated?)
- quality control (inter-rater reliability?)
- cost (biggest expense, not mentioned)

**this is critical gap.**

#### 6.3 data strategy by therapy type

**speech therapy data:**
```
collect:
- audio clips (child speaking)
- target text (what they should say)
- actual transcription (preserving errors)
- error annotations (type, severity, phoneme)
- session context (age, diagnosis, session #)
- therapist actions (what they did next)

labeling:
- phoneme-level transcription (trained annotator)
- error classification (slp)
- quality score (confidence, noise)
```

**occupational therapy data (different!):**
```
collect:
- video of child performing task
- task description (stack blocks, button shirt)
- skeleton/pose data (vitpose/mediapipe)
- quality assessment (therapist rating)
- specific metrics (time, accuracy)

labeling:
- action segmentation (start/end movements)
- quality rating (1-5)
- error identification
```

**aba/behavioral data (multimodal):**
```
collect:
- video + audio of session
- behavior annotations (stimming, engagement)
- abc data (antecedent-behavior-consequence)
- reinforcement tracking
- emotional state

labeling:
- behavior coding (time-stamped)
- emotional state
- therapist decisions
```

**key difference:** speech is audio-first, ot is vision-first, aba is multimodal

#### 6.4 what to add to building sam/srm?

**for sam:**
- specific lora rank and training hyperparameters
- data augmentation (noise injection, speed perturbation)
- evaluation checkpoints
- failure mode analysis

**for srm:**
- rag architecture details (what in vector db?)
- prompt engineering approach
- guardrail implementation
- a/b testing framework

#### 6.5 real-time vs audio-notes?

**critical question they don't answer clearly.**

**audio-notes approach:**
- parent records child, uploads
- async processing, feedback later
- simpler, cheaper, works offline

**real-time approach:**
- live interaction, ai responds immediately
- harder: latency requirements (< 500ms), conversation state
- more engaging but technically complex

**can we do real-time for an hour?**

**yes, possible now:**
- openai realtime api, google gemini live
- maintains context for extended conversations
- latency acceptable (200-500ms)

**examples of hour+ voice ai:**
- character.ai voice (long conversations)
- inflection pi (extended dialogue)
- hume ai (emotional voice interactions)

**but for therapy:**
- children may not sustain hour-long sessions
- 10-15 minute sessions more realistic
- real-time valuable for immediate feedback loop

### 7. system architecture flow

```
┌─────────────────────────────────────────────────────────────┐
│                      client (phone/tablet)                   │
│  ┌─────────────┐                                            │
│  │ microphone  │ → vad (is talking?) → if yes, send audio  │
│  └─────────────┘                                            │
└────────────────────────────┬────────────────────────────────┘
                             │ audio stream
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                         server                               │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ layer 1: sam (ears)                                   │   │
│  │ whisper + lora adapters                               │   │
│  │ input: audio                                          │   │
│  │ output: phonemes + confidence                         │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │ phonemes                           │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ layer 2: judge (clinical assessment)                  │   │
│  │ forced alignment + levenshtein                        │   │
│  │ input: phonemes + expected target                     │   │
│  │ output: error classification                          │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │ errors                             │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ layer 2.5: policy engine (scorekeeper)                │   │
│  │ deterministic rules                                   │   │
│  │ input: errors + child state + history                 │   │
│  │ output: strategy directive                            │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │ directive                          │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ layer 3: srm (brain)                                  │   │
│  │ llama + rag + fine-tuning                             │   │
│  │ input: directive + context + child history            │   │
│  │ output: natural language response                     │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │ response                           │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      client (phone/tablet)                   │
│  ┌─────────────┐                                            │
│  │   speaker   │ ← text-to-speech ← response                │
│  └─────────────┘                                            │
│                                                              │
│  ┌─────────────┐                                            │
│  │   display   │ ← visual feedback, games, progress         │
│  └─────────────┘                                            │
└─────────────────────────────────────────────────────────────┘
```

**flow in simple terms:**
1. child speaks into phone
2. phone detects speech, sends to server
3. sam converts audio → phonemes
4. judge compares phonemes to expected, finds errors
5. policy engine decides strategy (encourage? simplify? metaphor?)
6. srm generates friendly response following strategy
7. response sent to phone
8. phone speaks response + shows visual feedback

### 8. team composition

**plan says:** 4-5 engineers (asr, nlp, ml ops, backend)

**what's missing:**

| role | why needed |
|------|-----------|
| **slp / clinical advisor** | validates therapeutic approach, creates rulebook, ensures clinical appropriateness |
| **child ux designer** | kids won't use boring apps, need gamification expertise |
| **data/annotation lead** | labeling critical, needs dedicated owner |
| **regulatory/compliance** | hipaa, coppa, potentially fda - can't be afterthought |
| **product manager** | owns user experience end-to-end |

**what i'd edit:**
- asr engineer ✓
- nlp engineer ✓
- ml ops ✓
- backend ✓
- **add:** slp advisor (part-time/advisory ok)
- **add:** product/ux person
- **add:** data annotation lead
