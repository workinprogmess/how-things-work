# detailed explanations: key concepts

## q2: what does "fine-tune your own therapy llm" mean?

### the confusion explained

when i say "build your own therapy llm," there are two meanings:

#### meaning 1: using apis as-is (not really "yours")
```
your app → gemini api → gemini's models (google's servers)

- you don't own the model
- you're just calling google's service
- like using uber: you don't own the cars
- good for: starting, testing, low volume
```

#### meaning 2: fine-tuning an existing model (partially "yours")
```
base model (llama 3.3) → add your therapy data → fine-tuned model

- you own the fine-tuned weights
- runs on your servers
- like buying a car and customizing it
- good for: production, privacy, high volume
```

### what i meant in the guide

**phase 1-2: use gemini/claude as-is**
```python
# not fine-tuning, just clever prompts
response = gemini.generate(
    f"""you are a speech therapist.

    child said: {transcription}
    child profile: {profile}

    suggest exercise."""
)
```

**pros:**
- ✅ working in 1 hour
- ✅ $0 upfront cost
- ✅ very good quality

**cons:**
- ❌ not optimized for your specific therapy approach
- ❌ data goes to google/anthropic
- ❌ ongoing per-request costs
- ❌ limited customization

**phase 3+: fine-tune llama on your therapy data**
```python
# actually training the model on your data
base_model = "meta-llama/llama-3.3-70b"

training_data = [
    {
        "input": {
            "child_profile": {...},
            "speech_attempt": "wabbit",
            "context": {...}
        },
        "output": {
            "assessment": "r-sound substitution, age-appropriate",
            "exercise": "auditory discrimination with mirror",
            "rationale": "child needs to hear difference before production",
            "parent_instruction": "..."
        }
    },
    # 10,000+ examples from your clinic
]

fine_tuned_model = train(base_model, training_data)
# now you own this model, can run anywhere
```

**pros:**
- ✅ optimized for your exact therapy approaches
- ✅ learns from your successful interventions
- ✅ runs on your servers (private)
- ✅ no per-request costs after training
- ✅ can work offline

**cons:**
- ❌ $5k-15k upfront cost
- ❌ need ml engineer
- ❌ takes weeks to set up
- ❌ need to maintain infrastructure

### why both approaches exist

**analogy: restaurant**

**using gemini api = ordering from restaurant**
- fast: call, order, get food
- expensive per meal: $10-20 each time
- convenient: no cooking, no cleanup
- quality: professional chef
- no customization: menu is fixed

**fine-tuning llama = hiring your own chef**
- slow to start: hire, train on your recipes
- expensive upfront: salary, kitchen equipment
- cheap per meal: ingredients only
- customized: exactly your menu
- you control everything

### is using gemini as-is fruitful?

**yes! very much so.**

here's why:

1. **gemini 2.0 is already excellent at medical reasoning**
   - trained on medical literature
   - understands therapy concepts
   - follows clinical guidelines

2. **prompt engineering is powerful**
   ```python
   # without fine-tuning, just good prompts
   prompt = f"""you are dr. sarah chen, pediatric slp with 15 years experience.

   your approach:
   - always consider developmental norms first
   - prefer play-based interventions
   - emphasize parent coaching
   - use evidence from these studies: [your clinic's approach]

   child: {profile}
   speech: {attempt}

   provide recommendation following your approach."""

   # this works surprisingly well!
   ```

3. **rag (retrieval-augmented generation) adds your data**
   ```python
   # find similar cases from your database
   similar_cases = database.search(
       child_age=4,
       issue="r-sound",
       limit=5
   )

   prompt = f"""based on these similar cases from our clinic:
   {similar_cases}

   and this new case:
   {current_case}

   recommend intervention."""

   # now it uses your clinic's data without fine-tuning!
   ```

4. **90% quality for 10% cost**
   - fine-tuned model: 95% quality, $15k + infrastructure
   - gemini + good prompts + rag: 90% quality, $100/month
   - for first 6-12 months, not worth fine-tuning

### when to fine-tune

**wait until:**
- ✅ validated that therapy ai actually works (parents use it)
- ✅ have 10,000+ therapy sessions documented
- ✅ prompt engineering hitting limits
- ✅ volume high enough that api costs > $500/month
- ✅ privacy critical (need on-premise)
- ✅ want offline capability

**then:**
- fine-tune llama 3.3 70b on your therapy data
- takes your clinic's exact approach
- learns "when case X, intervention Y works best"
- becomes your competitive moat

---

## why separate models (ears + brain) = more accuracy?

### the specialization principle

**analogy: hospital departments**

bad hospital:
- one doctor does everything
- sees ear infections AND does brain surgery
- okay at both, expert at neither

good hospital:
- ent specialist for ears
- neurosurgeon for brain
- each world-class in their domain

### technical explanation

#### whisper (speech recognition specialist)

**trained on:**
- 680,000 hours of audio
- specifically for speech → text
- learned: accents, noise, disfluencies

**architecture:**
- encoder: audio → features
- decoder: features → text
- optimized for acoustic patterns

**what it's really good at:**
- hearing "wabbit" in noisy audio
- distinguishing speech from background
- handling accents, stutters, unclear speech

**what it's bad at:**
- reasoning about therapy
- knowing child development norms
- suggesting interventions

#### gemini/llama (reasoning specialist)

**trained on:**
- trillions of words of text
- medical literature, therapy manuals
- conversation patterns

**architecture:**
- transformer: text → understanding → response
- optimized for reasoning

**what it's really good at:**
- understanding "child said wabbit, target rabbit → r-sound issue"
- knowing developmental norms
- suggesting evidence-based interventions
- explaining to parents

**what it's bad at:**
- hearing audio (it's text-based)
- distinguishing "wabbit" from "rabbit" in audio

### why gemini 2.0 can do both but shouldn't

gemini 2.0 can process audio → text → reasoning in one model.

**seems better, right? one model, simpler!**

**but:**

1. **not specialized for atypical speech**
   - trained on mostly clear adult speech
   - when child says "wabbit" with severe articulation delay, might mishear as "widget", "wobbit", etc.
   - whisper fine-tuned on child speech with delays: learns "this acoustic pattern = child attempting 'r' sound"

2. **can't fine-tune the asr part separately**
   - gemini: huge model, expensive to fine-tune
   - whisper: can fine-tune just the speech part affordably ($2k)

3. **latency**
   - whisper (specialized): 200-500ms
   - gemini (does both): 1-3 seconds

4. **cost at scale**
   - whisper: $2k one-time, free forever
   - gemini audio: $0.0375 per minute forever

### evidence: research results

from the papers:

**gemini 2.0 (base) on child speech:**
- wer: ~18-25% (estimated, no published results yet)

**whisper v3 (base) on child speech:**
- wer: ~15-20%

**whisper v3 (fine-tuned on myst) on child speech:**
- wer: 9.2% ⭐

**whisper v3 (fine-tuned on your clinic data) on atypical child speech:**
- wer: estimated 6-12% (depends on data quality)

**difference:**
- 18% vs 9% wer = **50% fewer errors**
- critical for atypical speech where every mispronunciation has clinical meaning

### real example

**audio:** child with severe r-sound delay says "wabbit"

**gemini 2.0 alone (no fine-tuning):**
```
transcription: "wobbits" (mishears due to unclear articulation)
analysis: "child said 'wobbits', unclear what target word was"
recommendation: "ask child to repeat more clearly"
```
❌ wrong transcription → wrong analysis

**whisper (fine-tuned) → gemini:**
```
whisper transcription: "wabbit (confidence: 0.89)"
whisper note: "detected r→w substitution pattern"

gemini analysis (receives whisper's output):
  "child consistently substituting /w/ for /r/ in initial position.
  this is gliding, common in this age group. confidence high due to
  consistent pattern. recommend auditory discrimination exercises."
```
✅ correct transcription → correct analysis

### when one model is fine

**gemini 2.0 alone works when:**
- typical child speech (clear pronunciation)
- testing/mvp phase
- low volume
- convenience > accuracy

**specialized pipeline needed when:**
- atypical speech (delays, disorders)
- production with real clinical use
- accuracy critical (drives therapy decisions)
- high volume (cost matters)

---

## what is confidence score?

### simple explanation

**confidence = how sure the model is**

```python
model hears audio → generates many possibilities:
  "rabbit" - 68% probability
  "wabbit" - 22% probability
  "ribbit" - 7% probability
  "rabbit" - 3% probability

picks highest: "rabbit" with confidence 0.68 (68%)
```

### how it's actually calculated

**for whisper:**

1. audio → encoder → features
2. decoder generates probability distribution:
   ```
   at each step, for each possible next word:
   p(rabbit) = 0.68
   p(wabbit) = 0.22
   p(ribbit) = 0.07
   ...

   sum = 1.0 (probabilities sum to 100%)
   ```
3. confidence = probability of chosen word

### what affects confidence?

**high confidence (0.85-1.0):**
- clear audio
- child speaks clearly
- consistent pronunciation
- no background noise

**medium confidence (0.6-0.85):**
- some background noise
- mild articulation issues
- child speaks softly

**low confidence (<0.6):**
- very noisy audio
- severe articulation disorder
- child mumbles or is inconsistent
- technical issue (mic problem)

### how to use in therapy context

**scenario 1: high confidence + wrong word**
```python
transcription: "wabbit"
confidence: 0.92
interpretation: child CONSISTENTLY says "wabbit"
action: this is reliable data, can target r-sound specifically
```

**scenario 2: low confidence + wrong word**
```python
transcription: "wabbit" (but maybe "rabbit"?)
confidence: 0.45
interpretation: unclear - could be poor audio OR inconsistent production
action: ask child to repeat, improve audio quality
```

**scenario 3: high confidence + correct word**
```python
transcription: "rabbit"
confidence: 0.94
interpretation: child said it correctly!
action: celebrate, move to next target
```

### implementation in your app

```python
def analyze_attempt(audio):
    # transcribe with confidence
    result = whisper.transcribe(audio, return_confidence=True)

    transcription = result['text']
    confidence = result['confidence']

    # decision tree
    if confidence > 0.8:
        # trust this transcription
        if transcription == target_word:
            return celebrate_success()
        else:
            return analyze_error_pattern(transcription, target_word)

    elif 0.6 < confidence <= 0.8:
        # moderate confidence - note it but watch for pattern
        return {
            "note": "audio quality could be better",
            "action": "track pattern over next few attempts",
            "suggestion": analyze_error_pattern(transcription, target_word)
        }

    else:  # confidence < 0.6
        # don't trust - audio issue
        return {
            "error": "couldn't hear clearly",
            "action": "please have child repeat",
            "tips": [
                "move closer to microphone",
                "reduce background noise",
                "speak a bit louder"
            ]
        }
```

### confidence is relative to model

**important nuance:**

```python
model A (not fine-tuned):
  hears "wabbit"
  thinks: "is this rabbit? wabbit? wadbit?"
  confidence: 0.52 (uncertain)

model B (fine-tuned on child speech):
  hears "wabbit"
  thinks: "definitely wabbit, i've heard this pattern before"
  confidence: 0.89 (certain)
```

**same audio, different confidence!**

**why?**
- model B trained on child speech
- recognizes "wabbit" as common r→w substitution
- has learned this is a real pattern (not noise)

this is why fine-tuning helps: not just accuracy, but appropriate confidence.

### using confidence for feedback

**for parents:**
```python
if confidence > 0.8:
    "i clearly heard your child say '{transcription}'"
elif confidence > 0.6:
    "i think your child said '{transcription}', but not completely sure"
else:
    "couldn't hear clearly - could you try again in a quieter space?"
```

**for therapists:**
```python
session_report = {
    "attempts": 20,
    "high_confidence_attempts": 18,  # good data quality
    "consistent_error_pattern": "r→w substitution in 17/18 attempts",
    "confidence": "clinical recommendations based on reliable data"
}
```

### technical: where confidence comes from

```python
# inside whisper model (simplified)

def transcribe(audio):
    features = encoder(audio)  # audio → features

    words = []
    confidences = []

    # generate word by word
    for position in sequence:
        # get probability distribution over all possible words
        logits = decoder(features, previous_words)
        probs = softmax(logits)  # convert to probabilities

        # probs is like:
        # {"rabbit": 0.68, "wabbit": 0.22, "ribbit": 0.07, ...}

        chosen_word = argmax(probs)  # pick highest
        confidence = probs[chosen_word]  # its probability

        words.append(chosen_word)
        confidences.append(confidence)

    overall_confidence = mean(confidences)  # or product

    return {
        "text": " ".join(words),
        "confidence": overall_confidence
    }
```

### confidence .87 means

**from your example:**

```python
{
  "transcription": "wabbit",
  "confidence": 0.87
}
```

**interpretation:**
- model is 87% sure child said "wabbit"
- there's 13% chance it could be something else
- this is high confidence - reliable transcription
- safe to base therapy decisions on this

**not 100% because:**
- maybe slight background noise
- maybe child's pronunciation slightly ambiguous
- model has inherent uncertainty
- 100% confidence rare (would mean absolutely zero doubt)

**87% is actually good!**
- anything > 0.8 is high confidence
- means reliable data for therapy

---

*these explanations will be referenced in workflow docs*
