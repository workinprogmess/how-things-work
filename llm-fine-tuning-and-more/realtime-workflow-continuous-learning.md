# real-time workflow & continuous learning

## real-time at-home workflow (minimal therapist intervention)

this is different from the session-by-session workflow. here, the ai leads the interaction.

```
┌─────────────────────────────────────────────────────────────────┐
│                   PARENT OPENS APP AT HOME                      │
│                  (no therapist present)                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                STEP 0: SESSION INITIALIZATION                   │
├─────────────────────────────────────────────────────────────────┤
│  App loads child's profile:                                     │
│    - current goals: [r-sound in initial position]               │
│    - last session: 2 days ago                                   │
│    - progress: 12/20 successful attempts                        │
│    - next milestone: r-sound in words                           │
│    - preferred activities: animals, short sessions              │
│                                                                 │
│  AI decides today's focus:                                      │
│    if progress < 50%: review previous exercises                │
│    if progress 50-80%: continue current level                   │
│    if progress > 80%: introduce next level                      │
│                                                                 │
│  Loads session plan:                                            │
│    - warm-up activity (1 min)                                   │
│    - main practice (3-5 min)                                    │
│    - game/reward (2 min)                                        │
│    - total: 6-8 minutes (attention span appropriate)            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              STEP 1: WELCOME & ENGAGEMENT                       │
├─────────────────────────────────────────────────────────────────┤
│  [animated character appears - rabbit]                          │
│                                                                 │
│  AI (text-to-speech, child-friendly voice):                     │
│    "hi! i'm robbie the rabbit! ready to practice saying my     │
│     name? you're doing so well! let's try 5 times today."      │
│                                                                 │
│  [visual: progress bar shows 12/20 stars earned]                │
│  [button: "start practice"]                                     │
│                                                                 │
│  Parent role: sits with child, encourages, but AI leads         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            STEP 2: REAL-TIME INTERACTION LOOP                   │
│                (repeats for each attempt)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────┐          │
│  │  2.1: AI PROMPTS CHILD                           │          │
│  ├──────────────────────────────────────────────────┤          │
│  │  [rabbit animation bouncing]                     │          │
│  │  AI: "can you say 'rabbit'? watch my mouth!"    │          │
│  │  [video: shows mouth position for /r/ sound]     │          │
│  │  [record button pulses: "tap to speak"]          │          │
│  └──────────────────────────────────────────────────┘          │
│                       │                                         │
│                       ▼                                         │
│  ┌──────────────────────────────────────────────────┐          │
│  │  2.2: CHILD SPEAKS (AUDIO CAPTURED)              │          │
│  ├──────────────────────────────────────────────────┤          │
│  │  child: "wabbit"                                 │          │
│  │  [visual: waveform animation while recording]    │          │
│  │  [automatically stops after 2 seconds]           │          │
│  └──────────────────────────────────────────────────┘          │
│                       │                                         │
│                       ▼                                         │
│  ┌──────────────────────────────────────────────────┐          │
│  │  2.3: INSTANT TRANSCRIPTION (WHISPER)            │          │
│  ├──────────────────────────────────────────────────┤          │
│  │  audio → whisper (fine-tuned) → transcription    │          │
│  │  latency: 200-500ms (feels instant)              │          │
│  │                                                   │          │
│  │  output:                                          │          │
│  │    text: "wabbit"                                 │          │
│  │    confidence: 0.89                               │          │
│  │    phonemes: [w, æ, b, ɪ, t]                      │          │
│  └──────────────────────────────────────────────────┘          │
│                       │                                         │
│                       ▼                                         │
│  ┌──────────────────────────────────────────────────┐          │
│  │  2.4: INSTANT ANALYSIS (LLM - CACHED)            │          │
│  ├──────────────────────────────────────────────────┤          │
│  │  prompt (pre-cached for speed):                  │          │
│  │    ```                                            │          │
│  │    child: 4yo, r-sound goal, attempt #13         │          │
│  │    said: "wabbit" (confidence 0.89)               │          │
│  │    target: "rabbit"                               │          │
│  │    pattern: consistent r→w substitution           │          │
│  │                                                   │          │
│  │    provide immediate feedback:                    │          │
│  │    1. encouraging response (2-3 words)            │          │
│  │    2. visual feedback (emoji/animation)           │          │
│  │    3. next prompt                                 │          │
│  │    4. update progress tracking                    │          │
│  │    ```                                            │          │
│  │                                                   │          │
│  │  llm output (latency: 300-800ms):                │          │
│  │    {                                              │          │
│  │      "feedback": "nice try! let's try again",    │          │
│  │      "visual": "😊 (warm smile, not star yet)", │          │
│  │      "specific_tip": "make your tongue go up",   │          │
│  │      "next_prompt": "watch my tongue this time", │          │
│  │      "progress_update": {                        │          │
│  │        "attempt": 13,                             │          │
│  │        "success": false,                          │          │
│  │        "pattern_consistent": true,                │          │
│  │        "engagement_level": "high"                 │          │
│  │      }                                             │          │
│  │    }                                              │          │
│  └──────────────────────────────────────────────────┘          │
│                       │                                         │
│                       ▼                                         │
│  ┌──────────────────────────────────────────────────┐          │
│  │  2.5: IMMEDIATE UI RESPONSE                      │          │
│  ├──────────────────────────────────────────────────┤          │
│  │  [rabbit animation: encouraging gesture]         │          │
│  │  AI speech: "nice try! let's try again"          │          │
│  │  [shows tip: tongue illustration]                │          │
│  │  [progress: 13/20 attempts]                      │          │
│  │                                                   │          │
│  │  total latency: 500-1300ms                       │          │
│  │  feels: instant, conversational                  │          │
│  └──────────────────────────────────────────────────┘          │
│                       │                                         │
│                       ▼                                         │
│  ┌──────────────────────────────────────────────────┐          │
│  │  2.6: ADAPTIVE DECISION                          │          │
│  ├──────────────────────────────────────────────────┤          │
│  │  if attempt_count < 5:                           │          │
│  │      → continue same exercise                     │          │
│  │                                                   │          │
│  │  if attempt_count == 5 AND no_success:           │          │
│  │      → switch to easier task                      │          │
│  │      → "let's try just the /r/ sound first"      │          │
│  │                                                   │          │
│  │  if attempt_count == 5 AND some_success:         │          │
│  │      → celebrate!                                 │          │
│  │      → play mini-game reward                      │          │
│  │                                                   │          │
│  │  if engagement_dropping:                         │          │
│  │      → take break                                 │          │
│  │      → "great job! let's take a quick break"     │          │
│  └──────────────────────────────────────────────────┘          │
│                       │                                         │
│                       └──────────┐                              │
│                                  │                              │
│            [loops back to 2.1 for next attempt]                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  STEP 3: SESSION COMPLETION                     │
├─────────────────────────────────────────────────────────────────┤
│  After 5-7 attempts or 5-8 minutes:                             │
│                                                                 │
│  AI: "awesome practice today! you earned 2 stars! ⭐⭐"          │
│                                                                 │
│  [celebration animation]                                        │
│  [sticker reward: rabbit sticker added to collection]          │
│                                                                 │
│  [parent dashboard unlocks]                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              STEP 4: PARENT SUMMARY REPORT                      │
├─────────────────────────────────────────────────────────────────┤
│  What parent sees:                                              │
│                                                                 │
│  ┌───────────────────────────────────────────┐                 │
│  │  today's practice (6 minutes)             │                 │
│  │                                            │                 │
│  │  🎯 goal: r-sound in "rabbit"             │                 │
│  │  ✅ attempts: 5                            │                 │
│  │  📊 pattern: consistent w-substitution     │                 │
│  │  💪 engagement: excellent                  │                 │
│  │  ⭐ earned: 2 stars (14/20 total)          │                 │
│  │                                            │                 │
│  │  what's working:                           │                 │
│  │  - child stays engaged                     │                 │
│  │  - consistent attempts                     │                 │
│  │  - good audio quality                      │                 │
│  │                                            │                 │
│  │  what to try:                              │                 │
│  │  - practice mirror exercises before app    │                 │
│  │  - daily 5-minute sessions work well       │                 │
│  │                                            │                 │
│  │  when to contact therapist:                │                 │
│  │  - 👍 on track, next check-in in 5 days   │                 │
│  │  - if no progress after 10 more sessions,  │                 │
│  │    schedule appointment                     │                 │
│  └───────────────────────────────────────────┘                 │
│                                                                 │
│  [share button: send to therapist]                             │
│  [schedule next session: tomorrow at 4pm?]                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│         STEP 5: BACKGROUND DATA PROCESSING                      │
│              (happens after session ends)                       │
├─────────────────────────────────────────────────────────────────┤
│  Session data logged:                                           │
│  {                                                              │
│    "session_id": "sess_20251120_160000",                       │
│    "child_id": "child_1234",                                    │
│    "duration_seconds": 360,                                     │
│    "attempts": [                                                │
│      {                                                          │
│        "audio_file": "s3://...",                               │
│        "transcription": "wabbit",                              │
│        "target": "rabbit",                                      │
│        "confidence": 0.89,                                      │
│        "feedback_given": "nice try! let's try again",          │
│        "timestamp": "...",                                      │
│        "engagement_indicators": {                              │
│          "response_time": 1.2,  # sec after prompt             │
│          "audio_quality": 0.92,                                │
│          "completed_attempt": true                             │
│        }                                                        │
│      },                                                         │
│      // ... 4 more attempts                                     │
│    ],                                                           │
│    "session_outcome": {                                         │
│      "successful_attempts": 0,                                  │
│      "consistent_pattern": "r_to_w",                           │
│      "engagement": "high",                                      │
│      "parent_present": true                                     │
│    },                                                           │
│    "added_to_training_queue": true  // for continuous learning │
│  }                                                              │
│                                                                 │
│  ↓                                                              │
│                                                                 │
│  Triggers:                                                      │
│  1. update child's progress dashboard                           │
│  2. adjust next session difficulty                              │
│  3. add to continuous fine-tuning dataset                       │
│  4. alert therapist if concerning pattern                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│           STEP 6: THERAPIST REVIEW (ASYNC)                      │
│              (therapist checks periodically)                    │
├─────────────────────────────────────────────────────────────────┤
│  Therapist dashboard shows:                                     │
│                                                                 │
│  ┌─────────────────────────────────────────────────┐           │
│  │  active children (23)                           │           │
│  │                                                  │           │
│  │  🟢 on track (18):                              │           │
│  │    - progressing as expected                    │           │
│  │    - ai recommendations appropriate             │           │
│  │    - review weekly                              │           │
│  │                                                  │           │
│  │  🟡 needs attention (4):                        │           │
│  │    - child_1234: plateaued at 14/20            │           │
│  │    - recommend: adjust exercise difficulty      │           │
│  │    - ai suggestion: add auditory discrimination │           │
│  │    [approve] [modify] [schedule session]        │           │
│  │                                                  │           │
│  │  🔴 urgent (1):                                 │           │
│  │    - child_5678: regression noticed             │           │
│  │    - schedule in-person assessment              │           │
│  │    [contact parent]                             │           │
│  └─────────────────────────────────────────────────┘           │
│                                                                 │
│  Therapist reviews flagged cases:                               │
│  - 5-10 min per day for all clients                            │
│  - vs 45 min per client for weekly sessions                    │
│  - enables serving 5x more families                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## key differences: real-time vs session-based

| aspect | session-based (therapist present) | real-time at-home (ai-led) |
|--------|-----------------------------------|---------------------------|
| **pace** | therapist controls timing | ai adapts to child's pace |
| **intervention** | therapist adjusts on-the-fly | ai follows programmed logic |
| **feedback** | immediate, nuanced | immediate, scripted + adaptive |
| **parent role** | observer, note-taker | active participant, encourager |
| **data quality** | high (therapist annotated) | good (ai-annotated, therapist reviewed) |
| **cost** | $100-200 per session | $0-5 per session (api calls) |
| **frequency** | 1-2x per week | daily |
| **outcome** | professional intervention | practice between sessions |

---

## continuous fine-tuning: the feedback loop

### how it works

```
┌──────────────────────────────────────────────────────────────┐
│                  CONTINUOUS LEARNING CYCLE                   │
└──────────────────────────────────────────────────────────────┘

       ┌─────────────────────────────────────┐
       │  DAY 1-30: DATA COLLECTION          │
       ├─────────────────────────────────────┤
       │  - 100 children use app daily       │
       │  - 5 sessions per child per week    │
       │  - 5 attempts per session           │
       │  = 10,000 new audio samples/week    │
       │  = 40,000 samples/month              │
       └─────────────────────────────────────┘
                      │
                      ▼
       ┌─────────────────────────────────────┐
       │  AUTO-FILTERING                     │
       ├─────────────────────────────────────┤
       │  Keep only high-quality:            │
       │  ✓ confidence > 0.75                │
       │  ✓ clear audio (snr > 20db)         │
       │  ✓ complete attempts                │
       │  ✓ parent verified (optional)       │
       │                                      │
       │  40,000 → 20,000 high-quality       │
       └─────────────────────────────────────┘
                      │
                      ▼
       ┌─────────────────────────────────────┐
       │  THERAPIST REVIEW (SAMPLING)        │
       ├─────────────────────────────────────┤
       │  Therapist reviews 5% random sample │
       │  = 1,000 samples                     │
       │                                      │
       │  For each:                           │
       │  - is transcription correct?         │
       │  - is analysis appropriate?          │
       │  - is recommendation good?           │
       │                                      │
       │  Takes: ~10 hours total              │
       │  Quality assurance completed         │
       └─────────────────────────────────────┘
                      │
                      ▼
       ┌─────────────────────────────────────┐
       │  MONTH END: FINE-TUNING             │
       ├─────────────────────────────────────┤
       │  Combine new data with existing:    │
       │  - previous training: 100,000        │
       │  - new data: 20,000                  │
       │  - total: 120,000 samples            │
       │                                      │
       │  Fine-tune whisper with lora:       │
       │  - cost: $500-1,000                  │
       │  - time: 24-48 hours                 │
       │  - result: whisper_v2.1              │
       └─────────────────────────────────────┘
                      │
                      ▼
       ┌─────────────────────────────────────┐
       │  A/B TESTING                        │
       ├─────────────────────────────────────┤
       │  Deploy both models:                │
       │  - 90% users: whisper_v2.0 (old)    │
       │  - 10% users: whisper_v2.1 (new)    │
       │                                      │
       │  Measure for 1 week:                │
       │  - transcription accuracy            │
       │  - user satisfaction                 │
       │  - therapist review scores           │
       └─────────────────────────────────────┘
                      │
                      ▼
       ┌─────────────────────────────────────┐
       │  ROLLOUT DECISION                   │
       ├─────────────────────────────────────┤
       │  if new_model better:               │
       │      deploy to 100%                  │
       │      retire old model                │
       │  else:                               │
       │      investigate why                 │
       │      refine training data            │
       │      try again                       │
       └─────────────────────────────────────┘
                      │
                      └────────┐
                               │
                               ▼
                         [repeat monthly]
```

---

## periodic vs continuous fine-tuning

### option 1: periodic (recommended initially)

**schedule:** monthly or quarterly

**process:**
```
month 1: collect data
month 2: collect data
month 3: collect data + fine-tune
        → deploy new model
month 4: collect data
month 5: collect data
month 6: collect data + fine-tune
        → deploy newer model
```

**pros:**
- ✅ simpler to manage
- ✅ can batch quality review
- ✅ predictable costs
- ✅ time to evaluate impact

**cons:**
- ❌ improvements come in chunks
- ❌ slower iteration

**cost:**
- $500-1k per fine-tuning
- $6k-12k per year (quarterly)
- quality review: 10 hours per quarter

---

### option 2: continuous (advanced)

**schedule:** weekly or bi-weekly

**process:**
```
week 1: collect → filter → fine-tune → test → deploy
week 2: collect → filter → fine-tune → test → deploy
...
```

**pros:**
- ✅ rapid improvement
- ✅ quickly adapt to new patterns
- ✅ always getting better

**cons:**
- ❌ more complex infrastructure
- ❌ higher compute costs
- ❌ need automation
- ❌ can overtrain on recent data

**cost:**
- $200-500 per fine-tuning
- $10k-25k per year (weekly)
- automation setup: $20k-40k one-time

---

### option 3: hybrid (recommended at scale)

**whisper (speech):** quarterly fine-tuning
- speech patterns don't change fast
- quality matters more than recency
- cost-effective

**llm (therapy):** monthly fine-tuning
- new interventions discovered
- therapy approaches evolve
- feedback on recommendations

---

## data selection for fine-tuning

### not all data is equal

**bad data (exclude):**
```python
# example of what NOT to include
{
    "audio": low_quality_audio,  # noisy, clipped
    "confidence": 0.32,  # model uncertain
    "parent_feedback": "app crashed",  # technical issue
    "therapist_flag": "incorrect_analysis"  # ai was wrong
}
```

**good data (include):**
```python
{
    "audio": clear_audio,
    "confidence": 0.88,
    "consistent_with_history": true,  # matches child's pattern
    "therapist_verified": true,  # reviewed and approved
    "outcome": "helpful"  # parent/therapist feedback
}
```

### automated quality scoring

```python
def quality_score(sample):
    score = 0

    # audio quality
    if sample['snr'] > 20:  # signal-to-noise ratio
        score += 25

    # transcription confidence
    if sample['confidence'] > 0.8:
        score += 25

    # consistency
    if matches_child_pattern(sample):
        score += 20

    # user feedback
    if sample['parent_rating'] >= 4:
        score += 15

    # therapist reviewed
    if sample['therapist_verified']:
        score += 15

    return score  # 0-100

# only include score > 70 for fine-tuning
training_data = [s for s in all_data if quality_score(s) > 70]
```

---

## monitoring & feedback

### what to track

**model performance:**
```python
metrics = {
    "wer_overall": 9.2,  # word error rate
    "wer_by_age_group": {
        "3-4yo": 12.1,
        "5-6yo": 8.3,
        "7-9yo": 7.1
    },
    "wer_by_issue": {
        "r_sound": 8.5,
        "stuttering": 15.2,
        "phonological": 11.3
    },
    "confidence_distribution": [histogram],
    "errors_by_type": {
        "substitution": 45%,
        "deletion": 30%,
        "insertion": 25%
    }
}
```

**user satisfaction:**
```python
feedback = {
    "parent_ratings": {
        "avg_rating": 4.3,
        "would_recommend": 87%,
        "finds_helpful": 82%
    },
    "therapist_ratings": {
        "appropriate_recommendations": 91%,
        "needs_modification": 6%,
        "incorrect": 3%
    },
    "engagement": {
        "completion_rate": 78%,
        "avg_session_length": 6.2min,
        "sessions_per_week": 4.1
    }
}
```

---

## when to retrain

### triggers for fine-tuning

**time-based:**
- monthly or quarterly (scheduled)

**performance-based:**
- wer increases > 1% (model degrading)
- new error patterns emerge
- user satisfaction drops

**data-based:**
- accumulated 50k+ new quality samples
- new child populations added
- new therapy approaches added

**strategic:**
- adding new language support
- expanding age range
- new disorder types

### decision tree

```python
def should_retrain():
    # sufficient data?
    if new_samples < 10000:
        return False  # wait for more data

    # performance degraded?
    if current_wer > baseline_wer * 1.1:
        return True  # performance dropped 10%

    # user feedback negative?
    if satisfaction_score < 4.0:
        return True  # users unhappy

    # scheduled time?
    if days_since_last_training > 90:
        return True  # quarterly update

    # strategic reasons?
    if new_features_added:
        return True  # added hindi support, retrain

    return False  # keep using current model
```

---

## infrastructure for continuous learning

### minimal setup (< 100 users)

```
app → cloud storage (s3/gcs)
         ↓
    monthly: download data
         ↓
    local machine: fine-tune with lora
         ↓
    deploy new model to api
```

**cost:** $50-200/month

---

### production setup (1000+ users)

```
app → streaming data pipeline (kafka/kinesis)
         ↓
    data warehouse (bigquery/snowflake)
         ↓
    quality filtering (automated)
         ↓
    therapist review tool (web app)
         ↓
    training orchestration (airflow/prefect)
         ↓
    gpu cluster (spot instances)
         ↓
    model registry (mlflow/wandb)
         ↓
    a/b testing framework
         ↓
    gradual rollout
```

**cost:** $2k-10k/month + engineering time

---

*continuous improvement makes the ai better over time, adapting to your specific population and therapy approaches*
