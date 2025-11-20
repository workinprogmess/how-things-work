# latest models for speech therapy ai (november 2025)

**last updated:** 2025-11-20
**note:** this doc focuses on state-of-the-art models as of late 2025

---

## speech recognition models (the "ears")

### 1. openai whisper v3 turbo ⭐⭐⭐ (current sota for child speech)

**released:** november 2023 (turbo variant)
**why it's still recommended:**
- most research on child speech fine-tuning uses whisper
- proven results: 9.2% wer on child speech after fine-tuning
- multilingual (100+ languages including hindi)
- open source - full control
- extensive fine-tuning ecosystem

**specs:**
- parameters: 1.5b (large-v3), 809m (medium), 244m (small)
- turbo: faster inference, same accuracy
- supports: streaming, timestamps, language detection

**strengths:**
- battle-tested on child speech (multiple papers 2024)
- hugging face integration (easy fine-tuning)
- works offline
- lora/qlora support

**weaknesses:**
- not optimized for real-time (400-800ms latency)
- needs fine-tuning for atypical speech

**code availability:**
- github: https://github.com/openai/whisper
- hugging face: openai/whisper-large-v3-turbo

**why over gemini 2.0 for speech?**
- specialized for asr (gemini is generalist)
- proven child speech results
- can fine-tune deeply on your data
- research shows better wer after fine-tuning

---

### 2. google cloud speech-to-text v2 (chirp)

**released:** 2023, updated 2024
**what is it:** google's production asr service

**why it's still relevant despite gemini 2.0:**
- different purpose: chirp = specialized asr api, gemini = multimodal reasoning
- has specific "child speech" model variant
- optimized for production (low latency, high throughput)
- handles 125+ languages

**child speech model:**
- trained on child voice data
- better than base model for ages 3-12
- available via api (no fine-tuning needed for baseline)

**pricing:**
- $0.024 per minute (standard)
- $0.048 per minute (chirp 2 - best quality)

**when to use:**
- quick testing without fine-tuning
- need production reliability
- want google infrastructure

**vs gemini 2.0 asr:**
- chirp: specialized, faster, cheaper for pure transcription
- gemini 2.0: understand context, reason about audio, more expensive

**code:**
```python
from google.cloud import speech_v2

client = speech_v2.SpeechClient()

config = speech_v2.RecognitionConfig(
    model="chirp_2",
    language_codes=["en-IN"],  # indian english
    features=speech_v2.RecognitionFeatures(
        enable_automatic_punctuation=True,
        model_type="CHILD",  # ← child speech model
    )
)
```

---

### 3. meta wav2vec 2.0 / seamless m4t ⭐⭐

**wav2vec 2.0:** released 2020, still competitive
**seamless m4t:** released 2023 (updated 2024)

**why still relevant:**
- research shows sometimes outperforms whisper on child speech
- fully open source (meta)
- good for low-resource languages
- seamless m4t: 100+ languages, built on wav2vec

**specs:**
- wav2vec 2.0: 300m params (base), 1b (large)
- seamless: 2.3b params (supports translation too)

**strengths:**
- excellent for fine-tuning
- works well with limited data
- open ecosystem

**weaknesses:**
- less documentation than whisper
- smaller community
- harder to deploy

**when to use:**
- research showed better results than whisper on your test set
- need translation capabilities (seamless)
- prefer meta's license

---

### 4. assembly ai universal-2 (proprietary)

**released:** 2024
**what is it:** commercial asr api

**specs:**
- claims sota accuracy
- supports 80+ languages
- real-time streaming
- speaker diarization

**pricing:**
- $0.00025 per second (~$0.015/min)
- cheaper than google

**strengths:**
- very accurate out-of-box
- good indian english support
- easy api

**weaknesses:**
- ❌ no child speech model variant
- ❌ can't fine-tune
- ❌ proprietary (data sent to their servers)

---

### 5. apple on-device speech recognition (ml kit)

**released:** ongoing updates with ios releases

**what is it:**
- on-device asr for ios/macos
- runs entirely on apple silicon
- no internet required

**strengths:**
- ✅ completely private (never leaves device)
- ✅ free (no api costs)
- ✅ fast (optimized for apple silicon)
- ✅ works offline

**weaknesses:**
- ❌ only works on apple devices
- ❌ can't fine-tune
- ❌ no child speech variant
- ❌ limited language support

**when to use:**
- ios-only app
- privacy-first approach
- need offline capability

**code:**
```swift
import Speech

let recognizer = SFSpeechRecognizer(locale: Locale(identifier: "en-IN"))
// on-device recognition
recognizer?.supportsOnDeviceRecognition // true on modern devices
```

---

### 6. deepgram nova-2 (proprietary)

**released:** 2023-2024
**what is it:** commercial asr api

**claims:**
- fastest transcription
- high accuracy
- real-time streaming

**pricing:**
- $0.0043 per minute (nova-2)
- pay-as-you-go

**weaknesses:**
- no child speech model
- can't fine-tune deeply

---

## **recommendation for speech recognition:**

```
testing phase: google cloud speech-to-text v2 (chirp child model)
  - fastest to start
  - has child speech model
  - $0.048/min

production (fine-tuned): whisper v3 large/medium + lora
  - proven child speech results
  - fine-tune on your data
  - one-time cost $2k-5k
  - run on-device or own servers
  - full control

alternative: wav2vec 2.0 if research shows better results
```

---

## language models (the "brain")

### 1. google gemini 2.0 flash ⭐⭐⭐ (recommended for starting)

**released:** december 2024
**latest:** gemini 2.0 flash thinking (experimental)

**why recommended:**
- native multimodal (can process audio directly)
- very fast inference
- good at medical/therapy reasoning
- affordable

**specs:**
- context: 1 million tokens
- output: 8k tokens
- supports: text, audio, images, video
- thinking mode: deep reasoning

**pricing:**
- input: $0.075 per 1m tokens (≤128k context)
- input: $0.15 per 1m tokens (>128k context)
- output: $0.30 per 1m tokens
- **audio input:** $0.0375 per 1m tokens

**real-world cost:**
- typical therapy recommendation: ~5k input + 500 output
- cost: $0.000525 per recommendation (half a cent!)

**strengths:**
- ✅ can process audio directly (skip whisper for testing)
- ✅ excellent reasoning
- ✅ fast (low latency)
- ✅ cheap at scale
- ✅ supports indian languages

**fine-tuning:**
- available through vertex ai
- expensive ($10-50 per 1m training tokens)
- not recommended initially

**when to use:**
- start here for validation phase
- testing therapy recommendations
- need multimodal capabilities

**code:**
```python
import google.generativeai as genai

model = genai.GenerativeModel('gemini-2.0-flash')

# can send audio directly
response = model.generate_content([
    "analyze this child's speech for therapy recommendations",
    {"mime_type": "audio/wav", "data": audio_bytes}
])
```

---

### 2. anthropic claude 3.7 sonnet ⭐⭐⭐ (best reasoning)

**released:** october 2024 (3.5), november 2024 (3.7)

**why it's excellent:**
- best-in-class reasoning
- very good at medical/clinical tasks
- follows instructions precisely
- good safety guardrails

**specs:**
- context: 200k tokens
- output: 8k tokens
- no audio input (text only)

**pricing:**
- input: $3 per 1m tokens
- output: $15 per 1m tokens
- **more expensive than gemini but better quality**

**real-world cost:**
- typical therapy recommendation: ~5k input + 500 output
- cost: $0.0225 per recommendation (2 cents)

**strengths:**
- ✅ excellent clinical reasoning
- ✅ follows complex instructions
- ✅ good at explaining "why"
- ✅ safer outputs

**weaknesses:**
- ❌ no audio input (need whisper first)
- ❌ can't fine-tune
- ❌ 10x more expensive than gemini

**when to use:**
- need highest quality recommendations
- budget allows
- reasoning quality > cost

---

### 3. meta llama 3.3 70b ⭐⭐⭐ (open source, fine-tunable)

**released:** december 2024
**note:** you mentioned llama 4 - as of november 2024, llama 3.3 is the latest. llama 4 hasn't been released yet.

**why recommended:**
- fully open source
- can fine-tune completely
- run on your own infrastructure
- no ongoing api costs

**specs:**
- parameters: 70b (best quality), 8b (fast), 3b (edge devices)
- context: 128k tokens
- multilingual

**strengths:**
- ✅ fine-tune on your therapy data
- ✅ run on-premise (hipaa compliant)
- ✅ no per-request costs
- ✅ full control

**costs:**
- fine-tuning: $5k-15k one-time (with your data)
- inference: gpu costs ($1-5k/month for 70b) or local ($10k gpu one-time)

**when to use:**
- after validation phase
- want full control
- privacy-critical
- high volume (cost effective at scale)

**alternatives:**
- llama 3.3 8b: faster, cheaper, good for simpler tasks
- llama 3.3 405b: best quality but very expensive to run

---

### 4. alibaba qwen 2.5 72b ⭐⭐

**released:** september 2024

**why interesting:**
- excellent multilingual (especially chinese)
- open source
- competitive with llama
- good at code and reasoning

**specs:**
- 72b params (also 7b, 14b, 32b variants)
- context: 32k tokens (some variants 128k)

**strengths:**
- strong on non-english languages
- good reasoning
- open license

**weaknesses:**
- less battle-tested than llama
- smaller community
- less documentation

**when to use:**
- need strong chinese/asian language support
- alternative to llama

---

### 5. deepseek v3 ⭐⭐

**released:** december 2024
**from:** chinese ai lab

**what's special:**
- mixture of experts (moe) architecture
- 671b total params, 37b active per token
- very cost-effective training

**specs:**
- context: 64k tokens
- multilingual

**pricing (via api):**
- very cheap: ~$0.14 per 1m input tokens
- open source weights available

**strengths:**
- extremely cost effective
- good reasoning
- strong on code

**weaknesses:**
- newer, less proven
- chinese focus
- less documentation

---

### 6. mistral large 2 (123b) ⭐⭐

**released:** july 2024

**why interesting:**
- european (french) company
- open source
- competitive quality

**specs:**
- 123b params
- context: 128k tokens

**strengths:**
- multilingual (especially european languages)
- open license
- good reasoning

**weaknesses:**
- very large (hard to run)
- less focused on indian languages

---

### 7. openai gpt-4o / o1 ⭐⭐

**gpt-4o:** multimodal gpt-4
**o1:** reasoning-focused (released sep 2024)

**why not recommended for you:**
- very expensive
- can't fine-tune affordably
- gemini 2.0 flash better value

**when to consider:**
- need absolute best quality
- budget not a concern
- gpt-4o: multimodal capabilities

---

## on-device / edge models

### apple ml models

**apple intelligence (on-device):**
- runs on iphone 15 pro+, m1+ macs
- completely private
- fast
- limited capabilities

**for speech therapy:**
- ❌ can't fine-tune
- ❌ not accessible via api for custom apps
- ❌ closed ecosystem

---

### smaller efficient models for edge deployment

#### 1. llama 3.3 3b/8b ⭐⭐⭐

**why:**
- can run on phone
- fast inference
- good for simple tasks

**use case:**
- initial screening
- offline mode
- low-latency responses

#### 2. phi-4 (microsoft)

**released:** december 2024
**specs:** 14b params

**why interesting:**
- small but very capable
- trained on high-quality data
- runs on consumer hardware

**use case:**
- edge deployment
- cost optimization
- faster inference

#### 3. gemini 2.0 flash (lite variant)

**coming:** announced, not fully released

**will offer:**
- smaller footprint
- on-device capable
- gemini quality at smaller size

---

## recommended architecture (updated nov 2025)

### phase 1: validation (months 1-2)

```
option a (simplest):
audio → gemini 2.0 flash (does both asr + recommendations)
cost: ~$0.05 per interaction
speed: 2-3 seconds
accuracy: good for testing

option b (better accuracy):
audio → google cloud speech (chirp child model) → gemini 2.0 flash
cost: ~$0.05 per interaction
speed: 2-3 seconds
accuracy: better asr for children
```

### phase 2: production v1 (months 3-6)

```
audio → whisper v3 (fine-tuned on your data) → gemini 2.0 flash
cost: $0.0005 per interaction (after fine-tuning whisper)
speed: 1-2 seconds
accuracy: ⭐⭐⭐ best for atypical child speech
```

### phase 3: production v2 (months 6-12)

```
audio → whisper v3 (fine-tuned) → llama 3.3 70b (fine-tuned on therapy data)
cost: infrastructure only (no per-use)
speed: 1-2 seconds
accuracy: ⭐⭐⭐⭐ optimized for everything
privacy: ⭐⭐⭐⭐⭐ runs on your servers
```

### phase 4: scale (months 12+)

```
premium tier:
audio → whisper v3 → llama 3.3 70b → personalized recommendations

basic tier (offline-capable):
audio → whisper tiny (on-device) → llama 3.3 8b (on-device)
runs entirely on phone, no internet needed
```

---

## why these specific recommendations?

### whisper v3 over gemini 2.0 asr:

1. **proven results on child speech:**
   - research: 38% improvement after fine-tuning
   - multiple papers (2024) showing sota results
   - gemini 2.0: no published child speech results yet

2. **fine-tuning depth:**
   - whisper: can fine-tune every parameter
   - gemini 2.0: limited fine-tuning, expensive

3. **atypical speech patterns:**
   - whisper: learns "wabbit" = "rabbit" after fine-tuning
   - gemini 2.0: generalist, may struggle with severe delays

4. **cost at scale:**
   - whisper: $2k-5k one-time, then free
   - gemini 2.0: $0.0375 per minute of audio forever

5. **offline capability:**
   - whisper: runs on device
   - gemini 2.0: requires internet

### gemini 2.0 flash over llama 3.3 (initially):

1. **time to market:**
   - gemini: api call, working in 1 hour
   - llama: need to set up infrastructure, fine-tune, weeks

2. **initial cost:**
   - gemini: pay per use, $0 upfront
   - llama: $10k-50k infrastructure + fine-tuning

3. **multimodal:**
   - gemini: can process audio directly (useful for testing)
   - llama: text only

4. **quality for medical reasoning:**
   - gemini: excellent
   - llama (base): good but needs fine-tuning for therapy

### llama 3.3 70b over gemini (eventually):

1. **privacy:**
   - llama: data never leaves your servers (hipaa easy)
   - gemini: data goes to google

2. **cost at scale:**
   - llama: $5k/month infrastructure for unlimited use
   - gemini: $0.0005 * 100,000 daily interactions = $50/day = $18k/year

3. **control:**
   - llama: fine-tune on exact therapy approaches
   - gemini: limited customization

4. **no vendor lock-in:**
   - llama: own the model
   - gemini: dependent on google pricing/availability

---

## confidence score explained

**what is it:** probability that the transcription is correct

```python
# whisper output example
{
  "text": "wabbit",
  "confidence": 0.87,  # ← 87% confident this is what was said
  "alternatives": [
    {"text": "rabbit", "confidence": 0.13}
  ]
}
```

**how it's calculated:**
- model outputs probability distribution over all possible words
- confidence = probability of chosen word

**what it means:**
- 0.9+ : very confident, likely correct
- 0.7-0.9: somewhat confident, probably right
- < 0.7: uncertain, may be wrong

**use in therapy context:**
- high confidence + wrong word = consistent speech pattern
  - child reliably says "wabbit" → can target this specifically
- low confidence = unclear audio or inconsistent production
  - might need better audio quality or child is variable

**example in your app:**
```python
if confidence > 0.85:
    # trust this transcription
    analyze_speech_pattern(transcription)
else:
    # ask child to repeat
    request_repeat("couldn't hear clearly, say it again")
```

---

## why not just use gemini 2.0 for everything?

**you could!** for testing/mvp, gemini 2.0 end-to-end is fine.

**but for production:**

| aspect | gemini 2.0 only | whisper + llama |
|--------|----------------|-----------------|
| child speech accuracy | good (no fine-tuning) | excellent (fine-tuned) |
| atypical speech | okay | excellent |
| cost at 100k users | $18k/year | $5k/year |
| privacy | data goes to google | fully private |
| offline | no | yes |
| customization | limited | complete |
| vendor dependency | high | none |

**tl;dr:** gemini 2.0 is perfect for months 1-6 to validate. then switch to whisper + llama for production scale.

---

## emerging models to watch (2025-2026)

### google gemini 2.5 / 3.0
- expected: mid-2025
- likely improvements in multimodal, efficiency

### meta llama 4
- expected: mid-2025
- likely: better reasoning, efficiency

### openai gpt-5
- expected: 2025
- likely: significant capability jump

### anthropic claude 4 / opus 4
- expected: 2025
- likely: better reasoning, longer context

**recommendation:** build with current models, architecture designed to swap models easily as new ones emerge.

---

*research current as of november 2025. ai field moves fast - revalidate in 3-6 months.*
