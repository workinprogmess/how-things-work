# sunshine investor deck: peak xv series a
## product & technology deep dive

*for cpo + cto meeting | $7-10M ask*

---

## slide 1: intro

**"every child must realize their potential"**

- sunshine
- ai-powered child development platform
- [logo placeholder]

---

## slide 2: product leadership

**[photo collage placeholders]**

| CPO | CTO |
|-----|-----|
| [your photo] | [colleague photo] |
| [your name] | [colleague name] |
| product vision, therapy domain | ml architecture, implementation |

---

## slide 3: why we joined

**why the child development space excites us:**

1. **clear problem statement**
   - 30 million children in india need developmental support
   - fewer than 1% receive it
   - not because parents don't care—because quality therapy doesn't scale

2. **parents' willingness to pay (and do whatever it takes)**
   - families who can afford ₹15,000-25,000/month get care
   - everyone else is left behind
   - the emotional intensity = sustained engagement

3. **greenfield opportunity in india**
   - no dominant player exists
   - no indian child speech disorder dataset exists
   - first mover with data = permanent moat

4. **it's fulfilling (being parents ourselves)**
   - we've seen children transform
   - every milestone matters
   - this is generational impact work

---

## slide 4: we've been growing

**traction to date:**

| metric | value |
|--------|-------|
| children served | 10,000+ |
| ARR | $2M+ |
| sunshine centers | 25+ |
| therapists | 100+ |
| therapy hours daily | 600+ |

*"we're not an ai startup with an idea—we're a proven therapy business adding ai intelligence"*

---

## slide 5: vision

**sunshine in every household**

the market:
- **~30 million children** in india need developmental support
- **8-9% of children globally** have speech disorders ([source](https://pmc.ncbi.nlm.nih.gov/articles/PMC9986674/))
- **<1 SLP per 100,000 people** in india vs 60+ in US

the hybrid model:
| tier | offering | price point |
|------|----------|-------------|
| **premium** | in-center therapy | ₹15,000-25,000/mo |
| **accessible** | at-home ai-led therapy | ₹500-1,000/mo |
| **blended** | center + home hybrid | customized |

*"quality therapy will never again be the reason a child is left behind"*

---

## slide 6: product demo

**[VIDEO PLACEHOLDER]**

*a real-time, vision-based, voice-led interaction:*

1. **parent opens ray ai** on their phone
2. **ai assesses the child** through natural interaction (speech + engagement)
3. **ai generates personalized 8-week plan** based on assessment
4. **weekly sessions** with ai + parent + child
5. **milestone achieved** in ~10 weeks

**the promise:**
- at a fraction of the cost
- at home
- almost as effective as in-center support

---

## slide 7: groundwork—the trifecta

**three products powering sunshine intelligence:**

### spark (operations engine)
- admin data, booking, billing, scheduling
- 50% reduction in admin work across 20 centers
- 95%+ retention through automated renewals
- *"you can't build intelligent ai without intelligent data infrastructure"*

### soul (therapist copilot)
- ai records sessions, generates notes instantly
- therapists focus 100% on the child (zero note-taking)
- patterns identified across sessions
- **source of all proprietary therapy data**

### ray (parent ai bot)
- whatsapp-first, multilingual, 24/7
- parents understand progress, get updates after every session
- at-home exercise suggestions personalized to the child
- *"therapy was a black box. ray changes that completely."*

---

## slide 8: product architecture

**4-layer system design**

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONT-END: MOBILE APP                     │
│  ┌─────────────┐                                            │
│  │ ray ai bot  │ ← parent/child interface                   │
│  └─────────────┘                                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 1: SAM (SUNSHINE ACOUSTIC MODEL) — "THE EARS"         │
│ whisper + lora adapters                                     │
│ input: raw audio → output: phonemes + confidence            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 2: SCM (SUNSHINE CLINICAL MODEL) — "THE JUDGE"        │
│ forced alignment + weighted distance + clinical rules       │
│ input: phonemes → output: error classification + severity   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 3: SRM (SUNSHINE REASONING MODEL) — "THE BRAIN"       │
│ llama 3.3 70b + rag + lora                                  │
│ input: errors + context → output: therapeutic strategy      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 4: SSM (SUNSHINE SPEECH MODEL) — "THE VOICE"          │
│ neural tts (warm, child-friendly voice)                     │
│ input: text → output: natural speech to parent/child        │
└─────────────────────────────────────────────────────────────┘
```

**why 4 layers, not 1 unified model?**
- specialization > generalization for clinical applications
- each layer can be fine-tuned independently
- deterministic clinical logic (layer 2) = auditable, explainable, safe

---

## slide 9: the ears (SAM)

### mission
*"be the world's best 'ear' for indian children with speech disorders"*

### the problem with generic ASR
- whisper/others trained on adult speech → "autocorrect" child errors
- child says "wabbit" → generic ai outputs "rabbit" (useless for therapy)
- we need **brutal honesty**: /w/ /a/ /b/ /i/ /t/ not /r/ /a/ /b/ /i/ /t/

### technical architecture

**base model:** kid-whisper (whisper fine-tuned on child speech)

| paper | finding | citation |
|-------|---------|----------|
| kid-whisper (AAAI 2024) | WER: 13.93% → 9.11% (35% improvement) | [arxiv](https://arxiv.org/abs/2309.07927) |
| child ASR (ICASSP 2024) | 38% relative WER reduction to 9.2% | [colorado.edu](https://www.colorado.edu/research/ai-institute/sites/default/files/attached-files/childasr_icassp24_camera-ready_0.pdf) |

**fine-tuning: specialist lora adapters**

| adapter | purpose |
|---------|---------|
| **indian english** | handles 't' vs 'd' sounds, indian phonetic distinctions |
| **fluency** | detects rhythm breaks, repetitions (stuttering) |
| **articulation** | distinguishes "thun" vs "sun" (lisps, substitutions) |
| **toddler** | handles hinglish, code-switching, limited vocabulary |

**output format:**
```
input: child says "wabbit"
generic ai output: "rabbit" (useless)
SAM output: /w/ /a/ /b/ /i/ /t/ (confidence: 99%)
```

### continuous fine-tuning loop

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ therapy      │ ──▶ │ therapist    │ ──▶ │ labeled      │
│ sessions     │     │ corrections  │     │ dataset      │
└──────────────┘     └──────────────┘     └──────────────┘
                                                │
                                                ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ deployed     │ ◀── │ fine-tune    │ ◀── │ quality      │
│ sam v(n+1)   │     │ lora         │     │ filter       │
└──────────────┘     └──────────────┘     └──────────────┘
```

**example: articulation error (wabbit vs rabbit)**

| step | what happens |
|------|--------------|
| 1. session | child says "wabbit" during therapy |
| 2. SAM transcribes | /w/ /a/ /b/ /i/ /t/ |
| 3. therapist confirms | tags as "substitution: /r/ → /w/" |
| 4. data stored | audio clip + phoneme label |
| 5. weekly fine-tune | lora adapter improves on /r/-/w/ distinction |

### evals framework (SAM)

| metric | target | why it matters |
|--------|--------|----------------|
| **WER (word error rate)** | <15% typical, <20% disordered | baseline accuracy |
| **PER (phoneme error rate)** | <10% | granular sound-level accuracy |
| **error preservation rate** | >95% | "wabbit" stays "wabbit", not autocorrected |
| **confidence calibration** | correlation >0.8 | low confidence = flag for human review |
| **disfluency detection F1** | >0.85 | catches stuttering: b-b-b-ball |
| **latency** | <500ms | real-time interaction requirement |
| **noise robustness** | WER <25% with background noise | home environments are noisy |

**key differentiator:**
> standard asr: "rabbit" (autocorrected, useless)
> SAM: /w/ /a/ /b/ /i/ /t/ (brutally honest, clinically actionable)

---

## slide 10: the brain (SRM)

### mission
*"build a digital clinical brain with the reasoning capabilities of a senior therapist"*

### the problem with generic LLMs
- gpt/gemini have "medical knowledge" (textbook definitions)
- they lack "clinical intuition":
  - detecting frustration mid-session
  - knowing when to pivot strategy
  - scaffolding based on child's emotional state

### technical architecture

**base model:** llama 3.3 70b (gemini 2.0 flash for validation)

**layer-by-layer breakdown:**

| layer | component | function |
|-------|-----------|----------|
| **engine** | llama 3.3 70b | complex reasoning, conversation |
| **guardrails** | policy engine (deterministic) | clinical rules, safety checks |
| **memory** | rag + vector db | longitudinal child history |
| **intuition** | lora fine-tuning | clinical decision patterns |

**the policy engine (non-neural, deterministic):**
```python
# example rule: scaffolding after repeated failures
if consecutive_fail_count >= 3:
    directive = "simplify_task"
    context_inject = "child struggling, pivot to scaffolding"

# example rule: frustration detection
if frustration_score > 0.7:
    directive = "take_break"
    strategy = "use_metaphor_or_game"
```

**longitudinal memory (RAG):**
- query: "does arjun respond better to high-energy or calm encouragement?"
- retrieval: "history shows he responds best to 'superheroes' theme and high energy. he shuts down when corrected sternly."

**differentiation layer (clinical intuition via lora):**

| training data | what it teaches |
|---------------|-----------------|
| "gold standard" therapist logs | decision trees of best therapists |
| session recordings with outcomes | "when i see [pattern], i do [action]" |
| synthetic data (gpt-5 cleaned) | persona + protocol alignment |

**behavioral cloning pipeline:**

```
┌─────────────────────┐
│ raw session         │ 1 hour audio
│ recording           │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ outcome filter      │ did child improve? yes → keep
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ speaker separation  │ track a: child, track b: therapist
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ teacher model       │ "what clinical strategy did therapist use?"
│ (offline analysis)  │ → tags: "de-escalation / co-regulation"
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ final dataset       │ context + strategy + best response
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ SRM (llama 3.3)     │ learns to mimic star therapist
└─────────────────────┘
```

### evals framework (SRM)

| metric | target | method |
|--------|--------|--------|
| **clinical appropriateness** | >4.0/5.0 | SLP expert rating |
| **age appropriateness** | >4.0/5.0 | language complexity match |
| **safety** | 100% pass | harmful content detection |
| **parent clarity** | >4.0/5.0 | can parent understand and act? |
| **response latency** | <1.5s | conversational feel |
| **jargon-free** | <5% clinical terms | accessibility |
| **llm-as-judge** | correlation >0.7 | gpt-4 rating vs expert |
| **outcome-based** | improvement rate vs control | long-term clinical validation |

**persona alignment by disorder type:**

| disorder | persona | success metric |
|----------|---------|----------------|
| articulation | high-energy, repetition-focused | accuracy |
| fluency/stuttering | slow, calm, anxiety-reducing | confidence |
| language delay | expansion-focused, encouraging | vocabulary growth |

---

## slide 11: the judge (SCM - sunshine clinical model)

### mission
*"translate raw phonemes into clinically actionable assessments—deterministically"*

### why deterministic, not neural?
- clinical assessments must be **auditable** (regulatory requirement)
- same input → same output (reproducible)
- easier to explain to parents, therapists, regulators
- safety-critical decisions shouldn't be probabilistic

### technical architecture

**component 1: forced alignment**

uses montreal forced aligner (MFA) methodology ([paper](https://people.linguistics.mcgill.ca/~morgan/mcauliffeEtAl2017_mfa.pdf))

| step | what happens |
|------|--------------|
| 1 | ai knows target was "rabbit" (/r/ /a/ /b/ /i/ /t/) |
| 2 | aligns child's audio time-codes to expected phonemes |
| 3 | detects that at 02.5 seconds, SAM heard /w/ instead of /r/ |

**research validation:**
> "montreal forced aligner with speaker adaptive training showed the highest accuracy and smallest timing differences" on children's speech ages 3-6 ([PMC study](https://pmc.ncbi.nlm.nih.gov/articles/PMC8740721/))

**component 2: weighted phonological distance**

standard levenshtein treats all errors equally—clinically wrong.

```python
# weighted distance (clinically informed)
error_weights = {
    ('r', 'w'): 0.3,   # common substitution, developmentally expected at age 3
    ('s', 'th'): 0.4,  # lisp, moderate concern
    ('p', 'g'): 1.0,   # unusual, high clinical significance
}

# phonological feature distance (advanced)
# /p/ and /b/ differ only in voicing → small distance
# /p/ and /s/ differ in place, manner, voicing → large distance
```

**component 3: error classification**

| error type | detection logic | example |
|------------|-----------------|---------|
| **substitution** | target ≠ heard | /r/ → /w/ ("wabbit") |
| **omission** | target exists, heard is empty | "spoon" → "poon" |
| **addition** | target empty, heard exists | "blue" → "buh-lue" |
| **distortion** | phoneme present but acoustic features differ | /s/ sounds "slushy" |

**component 4: disorder classification**

| pattern detected | classification |
|------------------|----------------|
| consistent /r/ → /w/ across multiple words | **articulation disorder** (gliding) |
| phoneme repeated 4+ times in 200ms | **dysfluency/block** (stuttering) |
| MLU (mean length utterance) below age norm | **language delay** |
| intelligibility <50% | **unclear speech** |

**component 5: developmental norms database**

sourced from clinical literature: GFTA-3, CAAP-2, RCI curriculum ([source](https://pubs.asha.org/doi/10.1044/2018_PERS-SIG1-2018-0018))

| age | expected sounds | common errors (acceptable) |
|-----|-----------------|---------------------------|
| 3 | /p/, /b/, /m/, /n/, /w/, /h/ | /r/ → /w/, /l/ → /w/ |
| 4 | + /k/, /g/, /d/, /t/, /f/ | /s/ → /th/, cluster reduction |
| 5 | + /s/, /z/, /l/ | /r/ distortions |
| 6+ | + /r/, /sh/, /ch/, /th/ | complex clusters |

### output: clinical verdict

```json
{
  "session_id": "12345",
  "child_age": 4,
  "target_word": "rabbit",
  "heard_phonemes": ["/w/", "/a/", "/b/", "/i/", "/t/"],
  "errors": [
    {
      "type": "substitution",
      "target": "/r/",
      "actual": "/w/",
      "position": "initial",
      "severity": 0.3,
      "developmental_status": "age_appropriate",
      "clinical_note": "gliding - common at age 4, monitor"
    }
  ],
  "disorder_flags": ["articulation_gliding"],
  "recommended_action": "continue_current_protocol",
  "escalate_to_human": false
}
```

### evals framework (SCM)

| metric | target | method |
|--------|--------|--------|
| **alignment accuracy** | >90% agreement with SLP | compare timestamps |
| **error classification accuracy** | >95% | human expert validation |
| **severity scoring correlation** | >0.85 | vs SLP ratings |
| **developmental norm accuracy** | 100% | lookup table validation |
| **false positive rate** | <5% | flagging typical as disordered |
| **false negative rate** | <2% | missing actual disorders |
| **inter-rater reliability** | κ >0.8 | vs GFTA-3/CAAP-2 gold standard |

---

## slide 12: the voice (SSM - sunshine speech model)

### mission
*"speak back to parent and child with a warm, clear, engaging voice"*

### why voice matters
- children engage better with voice than text
- parents need clear pronunciation models
- real-time interaction requires natural speech

### technical options (2024-2025)

| model/platform | pros | cons |
|----------------|------|------|
| **elevenlabs** | natural, expressive, fast | cost at scale, closed source |
| **azure neural tts** | 446 voices, 144 languages | microsoft dependency |
| **google wavenet** | 380+ voices, 50+ languages | google dependency |
| **coqui/xtts** | open source, cloneable | requires hosting |
| **bark** | open source, expressive | higher latency |

**our approach:**
1. **start with:** azure/google neural tts (reliable, fast, hindi support)
2. **fine-tune for:** warm, child-friendly persona (not robotic)
3. **future:** train custom voice on therapist recordings (with consent)

### fine-tuning considerations

| aspect | decision |
|--------|----------|
| **voice persona** | warm, encouraging, like a favorite teacher |
| **speed** | slightly slower than adult TTS (children need processing time) |
| **hindi/english** | seamless code-switching for indian families |
| **pronunciation modeling** | clear articulation of target sounds |

### real-time requirements

| metric | target |
|--------|--------|
| **latency** | <300ms (text to first audio byte) |
| **quality** | MOS >4.0 (mean opinion score) |
| **child engagement** | qualitative testing with actual children |

### evals framework (SSM)

| metric | target | method |
|--------|--------|--------|
| **naturalness (MOS)** | >4.0/5.0 | human listener rating |
| **intelligibility** | >95% | word recognition accuracy |
| **child engagement** | sustained attention >80% | session observation |
| **pronunciation clarity** | >4.5/5.0 | SLP rating for target sounds |
| **latency** | <300ms | time to first byte |
| **hindi/english switching** | seamless | no awkward pauses |

---

## slide 13: real-time workflow

### the articulation loop (e.g., "wabbit" → "rabbit")

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 1: THE HANDOFF                                                          │
│ ┌──────────────┐                                                            │
│ │ ray ai app   │ sends audio ("wabbit") + target (/r/)                      │
│ └──────────────┘                                                            │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 2: THE EAR (SAM) — 300ms                                               │
│ ┌──────────────────────────────────────────────────────────────────────┐    │
│ │ "transcribe raw audio to phonemes"                                    │    │
│ │ phonemes: /w/ /a/ /b/ /i/ /t/ (confidence: 99%)                      │    │
│ └──────────────────────────────────────────────────────────────────────┘    │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 3: THE JUDGE (SCM) — 100ms                                             │
│ ┌──────────────────────────────────────────────────────────────────────┐    │
│ │ "compare /w/ to target /r/"                                          │    │
│ │ error detected: substitution (/r/ → /w/)                             │    │
│ │ severity: 0.3 (developmentally expected at age 4)                    │    │
│ └──────────────────────────────────────────────────────────────────────┘    │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 4: THE POLICY CHECK — 50ms                                             │
│ ┌──────────────────────────────────────────────────────────────────────┐    │
│ │ "get state & guidelines"                                              │    │
│ │ fact: fail_count=3, guideline: "scaffold after 3 fails"              │    │
│ │ directive: "stop drilling, use metaphor"                              │    │
│ └──────────────────────────────────────────────────────────────────────┘    │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 5: THE BRAIN (SRM) — 800ms                                             │
│ ┌──────────────────────────────────────────────────────────────────────┐    │
│ │ input: error + context (fail=3) + directive (use metaphor)           │    │
│ │ analysis: "child is stuck, frustration rising, pivot to tiger game"  │    │
│ │ output: "good try! let's play a game. can you growl like a tiger?    │    │
│ │          GRRRR! that's the /r/ sound!"                               │    │
│ └──────────────────────────────────────────────────────────────────────┘    │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 6: THE VOICE (SSM) — 300ms                                             │
│ ┌──────────────────────────────────────────────────────────────────────┐    │
│ │ converts text → warm, child-friendly speech                          │    │
│ │ + sends tiger animation to app                                       │    │
│ └──────────────────────────────────────────────────────────────────────┘    │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 7: THE DELIVERY — delivered to parent/child                            │
│ ┌──────────────────────────────────────────────────────────────────────┐    │
│ │ audio: "good try! let's play a game..."                              │    │
│ │ visual: tiger animation                                               │    │
│ │ TOTAL LATENCY: ~1.5 seconds                                          │    │
│ └──────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### the fluency loop (stuttering case: "b-b-b-ball")

```
step 1: child says "b-b-b-ball" + target (fluency)
step 2: SAM detects phonemes: /b/ - /b/ - /b/ - /aw/ - /l/
step 3: SCM analyzes rhythm → error: dysfluency (3x repetition)
step 4: policy check → fact: struggle_index=high, guideline: "reduce pressure"
step 5: SRM decides → use pacing strategy
step 6: SSM speaks → "take a deep breath. let's say it sloooow... baaall."
step 7: delivery → audio + visual pacing bar
```

### the language delay loop (late talker: "car" instead of "red car")

```
step 1: child says "car" + target ("red car")
step 2: SAM transcribes: "car"
step 3: SCM compares MLU → gap detected: 1 word (target was 2)
step 4: policy check → fact: vocabulary gap, guideline: "expansion"
step 5: SRM decides → validate + expand with adjectives
step 6: SSM speaks → "yes! it IS a car. a big RED car. vroom!"
step 7: delivery → audio + car animation
```

---

## slide 14: data flywheel

### the proprietary data advantage

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ 25+ centers │ ──▶ │ 600+ hours  │ ──▶ │ therapist   │ ──▶ │ labeled     │
│ 100+        │     │ daily       │     │ corrections │     │ dataset     │
│ therapists  │     │ sessions    │     │ (in-flow)   │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                  │
      ┌───────────────────────────────────────────────────────────┘
      │
      ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ better SAM  │ ──▶ │ better      │ ──▶ │ better      │ ──▶ repeat
│ better SRM  │     │ outcomes    │     │ reputation  │
│ better SCM  │     │             │     │ more centers│
└─────────────┘     └─────────────┘     └─────────────┘
```

**daily data generation:**
- 25+ centers × 20+ children/center × 1 hour sessions = **500+ hours/day**
- (previously said 15 min sessions—corrected to 1 hour)

---

## slide 15: labeling strategy

### the "seamless labeling" approach

therapist workflow = natural annotation (zero extra effort)

### labeling example 1: ears (SAM)

**articulation error labeling:**

```
┌───────────────────────────────────────────────────────────────────────────┐
│ STEP 1: THE THERAPY SESSION                                               │
│ child speaks: "wabbit"                                                    │
│ app records: background audio                                             │
└───────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ STEP 2: POST-SESSION DOCUMENTATION (therapist app - soul)                 │
│ ai transcript: "child said rabbit"  ← ai autocorrected (wrong!)          │
│ therapist sees: highlights "rabbit"                                       │
│ therapist clicks: "substitution" → selects "/w/ for /r/"                 │
│ time: 2 seconds                                                          │
└───────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ STEP 3: THE DATA ASSET                                                    │
│ saved: audio clip (04:12 timestamp) + micro-label (error: /w/ for /r/)   │
│ → THE GOLDEN PAIR: audio + correct phoneme annotation                    │
└───────────────────────────────────────────────────────────────────────────┘
```

### labeling example 2: brain (SRM)

**clinical decision labeling:**

```
┌───────────────────────────────────────────────────────────────────────────┐
│ RAW SESSION RECORDING (1 hour)                                            │
└───────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ OUTCOME FILTER                                                            │
│ question: did child improve this session? → yes → keep for training      │
└───────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ SPEAKER SEPARATION                                                        │
│ track a: child audio                                                      │
│ track b: therapist audio                                                  │
└───────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ TEACHER MODEL (offline)                                                   │
│ prompt: "what clinical strategy did therapist use here?"                  │
│ output: tag = "de-escalation / co-regulation"                            │
└───────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ FINAL DATASET                                                             │
│ context + strategy tag + therapist response = training example for SRM   │
└───────────────────────────────────────────────────────────────────────────┘
```

### labeling example 3: judge (SCM)

**clinical rule extraction:**

| source | extraction method | output |
|--------|-------------------|--------|
| SLP textbooks (GFTA-3, CAAP-2) | manual encoding | developmental norms table |
| therapist corrections | pattern analysis | error classification rules |
| session outcomes | correlation analysis | severity weights |

---

## slide 16: why this moat is real

### the data moat

| fact | implication |
|------|-------------|
| **no indian child speech disorder dataset exists** | first to build = permanent advantage |
| **ai4bharat has adult indian speech** | not children, not disorders |
| **we generate 500+ hours/day** | competitors start at zero |
| **therapist corrections = free labels** | annotation cost is $0 |

### data exclusivity through clinic partnerships

**how it works:**
- sunshine centers use soul (therapist app) → data flows to us
- non-compete: therapists using soul can't contribute data elsewhere
- network effect: more centers → more data → better ai → attracts more centers

### additional moats

| moat | description |
|------|-------------|
| **multi-disciplinary dataset** | speech + OT + behavioral (competitors focus on one) |
| **longitudinal records** | same child over months/years (not just snapshots) |
| **outcome correlation** | we know which interventions actually worked |
| **clinical relationships** | years of trust with families |

### what stops speech blubs from entering india?

| barrier | our advantage |
|---------|---------------|
| **language** | hindi, hinglish, indian english accents |
| **data** | no indian child speech disorder data exists for them |
| **distribution** | 25+ physical centers, 100+ therapists |
| **trust** | 10k+ families, years of relationships |

---

## slide 17: 6-9 month roadmap

### timeline to beta: march 2026

| phase | timeline | milestone | key deliverables |
|-------|----------|-----------|------------------|
| **1: foundation** | nov-dec 2025 (M1-2) | data pipeline live | soul captures labeled data, baseline SAM/SRM metrics |
| **2: ears** | jan 2026 (M3) | SAM v1 deployed | indian child speech lora, WER <15% |
| **3: judge** | feb 2026 (M4) | SCM v1 deployed | forced alignment + error classification |
| **4: brain** | feb-mar 2026 (M4-5) | SRM v1 deployed | llama fine-tuned on therapist logs |
| **5: voice** | mar 2026 (M5) | SSM integrated | azure/google tts, child-friendly persona |
| **6: beta** | mar 2026 (M5) | ray ai beta launch | 3-5 pilot families, therapist oversight |

### key milestones

| date | milestone |
|------|-----------|
| **dec 2025** | data pipeline live, 10k labeled clips |
| **jan 2026** | SAM beats whisper baseline by 30%+ |
| **feb 2026** | end-to-end demo (SAM → SCM → SRM → SSM) |
| **mar 2026** | beta with 5 families, therapist-in-loop |
| **apr-may 2026** | iterate based on feedback, expand to 50 families |
| **jun 2026** | public launch (ray ai v1) |

---

## slide 18: team

### current leadership

| role | name | focus areas |
|------|------|-------------|
| **CPO** | [you] | product vision, therapy domain, investor relations |
| **CTO** | [colleague] | ml architecture, implementation, technical strategy |

### key hires (with funding)

| role | responsibility | layer focus |
|------|----------------|-------------|
| **lead AI scientist (speech expert)** | owns SAM + SCM | ears + judge |
| profile: masters/phd in signal processing or ASR, worked with whisper/nemo | | |
| **NLP/LLM engineer (brain builder)** | owns SRM | brain |
| profile: RAG, vector dbs, fine-tuning (huggingface, pytorch) | | |
| **ML ops / data engineer (plumber)** | data pipeline, training infra | overall |
| profile: devops + ai, docker, kubernetes, gpu orchestration | | |
| **backend architect (orchestrator)** | real-time api, policy engine | workflow |
| profile: python/go, redis, websockets, high-concurrency | | |

### advisors (to add)

| role | why needed |
|------|-----------|
| **SLP clinical advisor** | validates therapeutic protocols, clinical rulebook |
| **pediatric specialist** | developmental norms, medical positioning |
| **regulatory consultant** | CDSCO, data privacy, wellness → medical pathway |

### total team size

~4-5 new specialized engineers + existing app team + clinical advisors

---

## slide 19: questions

**thank you**

*"quality therapy will never again be the reason a child is left behind"*

---

## appendix: research citations

### child speech recognition
- [Kid-Whisper (AAAI 2024)](https://arxiv.org/abs/2309.07927) - WER 13.93% → 9.11%
- [Child ASR Fine-tuning (ICASSP 2024)](https://www.colorado.edu/research/ai-institute/sites/default/files/attached-files/childasr_icassp24_camera-ready_0.pdf) - 38% WER reduction
- [Adaptation of Whisper to Child Speech](https://arxiv.org/pdf/2307.13008)

### forced alignment
- [Montreal Forced Aligner](https://people.linguistics.mcgill.ca/~morgan/mcauliffeEtAl2017_mfa.pdf)
- [Performance on Children's Speech (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC8740721/)
- [Text-Independent Forced Alignment for SLP](https://pmc.ncbi.nlm.nih.gov/articles/PMC10747711/)

### clinical assessments
- [GFTA-3 Overview](https://www.theraplatform.com/blog/998/gfta)
- [CAAP-2 Overview](https://www.theraplatform.com/blog/1082/caap-2)
- [Speech Sound Disorder Assessment Methods (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC9986674/)
- [Phoneme Scoring Methods (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4832875/)

### clinical guidelines
- [Good Practice Guidelines for Analysis of Child Speech (RCSLT)](https://www.rcslt.org/wp-content/uploads/2019/11/guidelines-for-analysis-of-child-speech-data.pdf)
- [Assessment of Speech Sound Production (Wisconsin DPI)](https://dpi.wi.gov/sites/default/files/imce/sped/pdf/sl-assessment-speech-sound-prod.pdf)

### tts/voice
- [Top TTS Models 2025](https://modal.com/blog/open-source-tts)
- [Azure Neural TTS](https://azure.microsoft.com/en-us/products/ai-services/text-to-speech)

---

## appendix: glossary

| term | meaning |
|------|---------|
| **WER** | word error rate - % of words transcribed incorrectly |
| **PER** | phoneme error rate - same as WER but at sound level |
| **LoRA** | low-rank adaptation - efficient fine-tuning (90% results at 10% cost) |
| **VAD** | voice activity detection - detects speech vs silence |
| **MFA** | montreal forced aligner - phoneme-to-audio alignment tool |
| **RAG** | retrieval augmented generation - llm + external knowledge |
| **SLP** | speech-language pathologist |
| **GFTA-3** | goldman-fristoe test of articulation (standardized assessment) |
| **CAAP-2** | clinical assessment of articulation and phonology |
| **MLU** | mean length of utterance - measure of language complexity |
| **TTS** | text-to-speech |
