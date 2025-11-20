# speech therapy ai agent for children

## the challenge

designing a speech ai/agent for home use by parents to help children (3-9 years) with:
- speech delays
- fluency issues
- feeding & swallowing issues
- stutter/stammer
- autism spectrum
- adhd
- learning difficulties

## goals

- affordable (fraction of professional therapy cost)
- accessible (no therapist availability issues)
- effective for home use by parents

---

## how to build this: step-by-step guide

### step 1: understand what you're building (the analogy)

think of building a speech therapy ai like training a really good assistant therapist:

**the traditional way:**
- hire a therapist → they go to school for years → they practice with hundreds of kids → they get good at their job
- cost: expensive, time-consuming, limited availability

**the ai way:**
- create a "digital brain" → feed it knowledge from thousands of therapy sessions → teach it to recognize speech patterns → let it practice and improve
- cost: upfront investment, then scales infinitely

**simple analogy:**
imagine you're teaching someone to be a speech therapist through a special cookbook:
1. **the recipe book** = training data (recordings, transcripts, therapy session notes)
2. **the chef** = the ai model (like gpt-4, whisper, or custom models)
3. **taste testing** = evaluation (does it actually help kids?)
4. **the kitchen** = the app interface (where parents and kids interact)

---

### step 2: the building blocks you need

#### block 1: speech recognition (the "ears")
the ai needs to hear and understand what the child is saying

**what it does:**
- converts child's speech → text
- understands unclear/delayed speech patterns
- works with different accents, stutters, mispronunciations

**real-world examples:**
- **whisper by openai** - very good at understanding unclear speech
- **google cloud speech-to-text** - has child speech models
- **nuance dragon** - medical-grade speech recognition

**challenge with kids:** children with speech delays don't sound like adults. regular speech recognition fails because:
- they might say "wabbit" instead of "rabbit"
- they might stutter: "b-b-b-ball"
- they might speak very slowly or very fast

**solution:** you need to fine-tune the model on children's speech, especially atypical speech patterns

#### block 2: analysis engine (the "brain")
understands what's wrong and what to do about it

**what it does:**
- identifies specific issues (is it articulation? fluency? phonological?)
- tracks progress over time
- decides what exercises to suggest next

**real-world examples:**
- **speechify** - ai-powered reading tool
- **forbrain** - auditory feedback device
- **constant therapy** - speech therapy app (uses some ai)

#### block 3: interaction layer (the "personality")
makes it engaging for kids and usable for parents

**what it does:**
- presents exercises as games
- gives encouraging feedback
- explains progress to parents in simple terms

**real-world examples:**
- **speech blubs** - uses video modeling and ai
- **otsimo** - gamified therapy for autism/adhd
- **gemiini** - video-based learning platform

---

### step 3: the fine-tuning process (how to make it work for YOUR use case)

this is where we get into llm fine-tuning specifically.

**what is fine-tuning?**
think of it like this:
- **base model** = a medical student who knows general medicine
- **fine-tuning** = specializing that student in pediatric speech therapy

**the process:**

#### 3.1: collect training data
you need examples of:
- ✓ recordings of children with speech issues
- ✓ transcripts of what they said
- ✓ what the therapist identified as the problem
- ✓ what exercises the therapist recommended
- ✓ what worked and what didn't

**where to get this:**
- your own clinic's anonymized session data (with consent!)
- public datasets like:
  - speechocean762 (children's speech)
  - torgo database (atypical speech)
  - childes database (child language data)

#### 3.2: choose your base model
- **for speech recognition:** whisper, wav2vec 2.0
- **for language understanding:** gpt-4, llama, claude
- **for conversation:** combination of both

#### 3.3: fine-tune the model
teach it your specific patterns:

```
example training data format:

input: [audio of child saying "wabbit"]
expected output: {
  "transcription": "rabbit (pronounced as 'wabbit')",
  "issue": "r-sound substitution (common in ages 3-5)",
  "severity": "age-appropriate, monitor",
  "exercise": "r-sound isolation with visual cues",
  "parent_explanation": "your child is substituting 'w' for 'r', which is normal at this age. let's practice the r-sound using mirror exercises."
}
```

#### 3.4: evaluate and iterate
test with real families, gather feedback, improve

---

### step 4: the technical architecture (simplified)

```
parent's phone/tablet
       ↓
   [app interface]
       ↓
1. child speaks → [speech recognition model]
       ↓
2. audio analyzed → [fine-tuned llm identifies issues]
       ↓
3. recommendations → [exercise database + engagement layer]
       ↓
4. feedback loop → [track progress, adjust difficulty]
       ↓
   back to parent/child
```

---

## companies doing similar things (to learn from)

### 1. **speech blubs** ⭐ most relevant
- website: https://speechblubs.com
- what they do: #1 speech development app, used by 5+ million kids
- technology stack:
  - video modeling (real kids modeling sounds/words)
  - ai analyzes how kids speak and adapts
  - facial recognition
  - voice activation
  - gamification with stickers, face filters
- what to learn:
  - created with 1000+ speech therapists
  - proven therapeutic techniques wrapped in fun
  - personalization for each user
  - ai articulation screener (free assessment tool)
- business model: top 5 grossing app for kids under 5 in us
- key insight: accidental discovery of video modeling technique that works

### 2. **mita (mental imagery therapy for autism)**
- platforms: ios, android
- what they do: language therapy specifically for autism
- credibility:
  - fda breakthrough device designation
  - 3-year clinical trial with 6,454 children
  - language scores improved 120% vs non-users
  - used by 1.5+ million children
- what to learn:
  - clinical validation is crucial
  - can get fda approval as medical device
  - evidence-based approach wins

### 3. **basics**
- what they do: early learning app for speech delays, autism, developmental needs
- reach: 700,000+ families worldwide
- team: speech therapists + child psychologists + educators
- what to learn: interdisciplinary team approach

### 4. **leeloo aac**
- focus: non-verbal children
- technology: aac (augmentative and alternative communication) + pecs (picture exchange communication system)
- what to learn: addressing severe communication barriers

### 5. **otsimo**
- website: https://otsimo.com
- focus: autism, adhd, down syndrome
- approach: gamified special education
- what to learn: making therapy fun and accessible

### 6. **forbrain**
- website: https://forbrain.com
- what they do: auditory feedback headset (hardware + software)
- what to learn: real-time feedback importance, hardware integration

---

## research papers & datasets

### key papers on fine-tuning whisper for child speech

#### 1. **"adaptation of whisper models to child speech recognition"** (jain et al., 2023)
- arxiv: https://arxiv.org/abs/2307.13008
- key finding: whisper large-v2 achieved 2.88% wer (word error rate) after fine-tuning
- important: wav2vec2 models actually outperformed whisper in some cases
- takeaway: you need to test multiple approaches

#### 2. **"automatic speech recognition tuning for child..."** (2024)
- result: 38% relative reduction in wer → down to 9.2% on myst dataset (new record!)
- classroom speech: 7% reduction → 54% wer (still challenging)
- takeaway: classroom/noisy environments are much harder than clean recordings

#### 3. **"kid-whisper: towards bridging the performance gap"** (2024)
- results:
  - whisper-small: 13.93% → 9.11% wer
  - whisper-medium: 13.23% → 8.61% wer
- takeaway: improvements generalize to unseen datasets

#### 4. **"sparsely shared lora on whisper for child speech recognition"** (2024)
- focus: chinese child speech (low-resource language)
- method: lora (low-rank adaptation) - more efficient fine-tuning
- takeaway: you don't need to fine-tune entire model, can use parameter-efficient methods

### datasets you can use

#### 1. **myst (my science tutor) dataset** ⭐ best for english
- size: ~470 hours of speech
- speakers: 1,371 students (grades 3-5)
- utterances: 227,567 total, 102,433 transcribed
- access:
  - free for non-commercial: https://myst.cemantix.org
  - commercial license: contact jramo@boulderlearning.com
  - ldc: https://catalog.ldc.upenn.edu/LDC2021S05
- format: 16khz, 16-bit flac wav files
- why it's great: conversational speech, real classroom scenarios

#### 2. **childes database**
- website: https://childes.talkbank.org
- size: largest database for child language
- includes:
  - typically developing children
  - children with language impairment
  - autism, down syndrome, hearing impairment
  - multiple languages
- access: free, browse or download
- tools: clan tools for analysis
- modern interface: http://childes-db.stanford.edu (r api available)
- why it's great: diverse conditions, established since 1984

#### 3. **cslu kids' speech**
- source: linguistic data consortium
- link: https://catalog.ldc.upenn.edu/LDC2007S18
- focus: structured speech tasks

#### 4. **ultrasuite repository**
- website: https://ultrasuite.github.io
- special feature: includes ultrasound tongue imaging
- why it's useful: understand articulation mechanics

#### 5. **google audioset - child speech**
- link: https://research.google.com/audioset/dataset/child_speech_kid_speaking.html
- large-scale audio dataset

#### 6. **kaggle kids speech dataset**
- link: https://www.kaggle.com/datasets/mirfan899/kids-speech-dataset
- good for quick experiments

### regulatory & compliance papers

#### 1. **"the imperative for regulatory oversight of llms in healthcare"**
- journal: npj digital medicine
- link: https://www.nature.com/articles/s41746-023-00873-0
- key points:
  - regulatory oversight needed for patient safety
  - privacy and data protection critical
  - transparency requirements

#### 2. **"hipaa compliance ai: using llms safely in healthcare"**
- key requirements:
  - no phi (protected health information) leakage
  - penalties: $141 to $2,134,831 per violation
  - need on-premise/private deployment for compliance
  - open-source models better for transparency

#### 3. **medical llm fine-tuning best practices**
- sources: mayo clinic proceedings, pmc articles
- key methods:
  - domain-specific pre-training on medical corpora
  - supervised fine-tuning for specific tasks
  - parameter-efficient methods (lora, adapter v2)
  - continuous evaluation with clinical validation
  - interdisciplinary teams essential

---

## practical roadmap: how to actually build this

### phase 1: validate & learn (months 1-2)

**week 1-2: talk to parents**
- survey 20-30 parents from your clinic
- questions to ask:
  - what's hardest about home practice?
  - would they pay $20/month for an app?
  - what features matter most?
  - what are they already using?

**week 3-4: competitive analysis**
- try speech blubs, mita, basics yourself
- document what works, what doesn't
- find the gaps your clinic's expertise can fill

**week 5-6: regulatory roadmap**
- consult healthcare attorney about:
  - do you need fda approval? (probably not if "wellness" not "treatment")
  - hipaa requirements
  - coppa (children's privacy)
- study mita's path to fda breakthrough designation

**week 7-8: data inventory**
- how many therapy sessions recorded? (need consent!)
- what's already transcribed?
- what issues are most common in your clinic?

### phase 2: proof of concept (months 3-4)

**step 1: start with existing models (don't build from scratch!)**

use openai's whisper api or azure cognitive services:
```python
# pseudo-code - testing basic speech recognition
import whisper

model = whisper.load_model("medium")
result = model.transcribe("child_speech_sample.mp3")
print(result["text"])

# check: how accurate is it on your kids' speech?
# spoiler: probably not great, but gives you baseline
```

**step 2: collect 10-20 hours of clinic data**
- get parental consent (written, clear)
- record therapy sessions (with therapist notes)
- format:
  - audio file
  - what child said (actual)
  - what it should be (target)
  - therapist's assessment
  - recommended exercise

**step 3: build simple comparison app**
- parent records child saying "rabbit"
- app shows: what was said vs target
- gives one exercise suggestion
- tracks attempts over time

**goal:** does it work at all? will parents actually use it?

### phase 3: mvp with fine-tuning (months 5-8)

**step 1: expand data collection**
- need 100+ hours for decent fine-tuning
- use myst dataset (free for research!)
- combine with your clinic data

**step 2: fine-tune whisper model**

using huggingface transformers:
```python
# simplified fine-tuning process
from transformers import WhisperForConditionalGeneration, WhisperProcessor

# load base model
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-small")
processor = WhisperProcessor.from_pretrained("openai/whisper-small")

# prepare your data
# child_speech_data = load_your_clinic_data()

# fine-tune (this is simplified - real code more complex)
# trainer = Trainer(model, train_dataset=child_speech_data)
# trainer.train()
```

**alternative: use lora for efficiency**
- less expensive
- faster training
- easier to update
- research paper showed good results

**step 3: build llm layer for recommendations**

use gpt-4 api with prompt engineering first:
```python
# example prompt structure
prompt = f"""
you are a pediatric speech therapist.

child's speech: "{transcription}"
target word: "rabbit"
age: 4 years old
issue detected: r-sound substitution (says 'wabbit')

provide:
1. one simple exercise for parents to do today
2. explanation in simple language
3. when to seek professional help

keep it encouraging and specific.
"""

# later, you can fine-tune your own llm on therapy session data
```

**step 4: gamification layer**
- partner with game designer
- study speech blubs' approach
- make exercises feel like play

### phase 4: pilot program (months 9-12)

**select 10-15 families**
- mix of speech issues
- committed parents
- willing to give feedback

**measure outcomes:**
- are kids using it? (engagement metrics)
- are they improving? (pre/post assessments by real therapist)
- do parents like it? (satisfaction surveys)
- what breaks? (bug tracking)

**iterate weekly:**
- watch session recordings
- fix issues fast
- add features parents request

### phase 5: clinical validation (months 13-18)

**design proper study:**
- 50-100 kids
- control group (usual care only)
- treatment group (usual care + app)
- measure: standardized speech assessments
- duration: 6 months

**publish results:**
- write up findings
- submit to journal (e.g., journal of speech, language, and hearing research)
- builds credibility
- helps with funding/partnerships

**regulatory path:**
if going fda route:
- pre-submission meeting with fda
- ide (investigational device exemption) if needed
- clinical trial
- submit for approval

### phase 6: scale (months 18+)

**technical infrastructure:**
- hipaa-compliant cloud (azure, aws with baa)
- or on-device processing (more private, works offline)
- subscription model: $19.99/month

**business model options:**

1. **direct to consumer**
   - app stores
   - monthly subscription
   - referral program

2. **b2b (clinics, schools)**
   - site licenses
   - therapist dashboard
   - integration with clinic workflows

3. **insurance reimbursement**
   - hardest path but biggest market
   - need clinical validation
   - cpt codes for digital therapeutics

**team you'll need:**
- speech therapist (clinical lead) - you!
- ml engineer (fine-tuning, deployment)
- mobile developer (ios/android)
- ux designer (make it kid-friendly)
- regulatory consultant (part-time)
- child psychologist (engagement strategies)

---

## the realistic budget estimate

### bootstrapped mvp (months 1-12)
- developer time: $50k-100k (or equity for co-founder)
- cloud costs: $500-2k/month
- data collection/annotation: $10k-20k
- legal/regulatory: $10k-20k
- design: $10k-20k
- **total: $100k-200k**

### full clinical validation (months 13-24)
- clinical trial: $200k-500k
- additional development: $100k-200k
- regulatory (if fda): $50k-150k
- **total: $350k-850k**

### alternative: start with therapist tool first
instead of going straight to parents:
1. build tool for your therapists to use during sessions
2. automates note-taking, tracks progress
3. generates home exercise plans
4. builds your dataset while being useful
5. revenue from day one (charge clinics)
6. then extend to parent-facing app later

**advantages:**
- easier to validate
- immediate revenue
- builds dataset ethically
- therapists give expert feedback
- less regulatory risk

---

## the simple 3-month test

**if you want to test the concept quickly:**

**month 1: buy speech blubs pro**
- have 10 families use it
- track if they stick with it
- what's missing?

**month 2: build supplement**
- simple recording app
- sends recordings to your therapists
- therapists give feedback via video
- hybrid human + tech approach

**month 3: measure results**
- are kids progressing faster?
- are parents more engaged?
- what would they pay?

**if yes → build full ai version**
**if no → saved yourself a year and $200k**

---

## key success factors (from companies that worked)

1. **clinical credibility first**
   - mita: 3-year study, fda designation
   - speech blubs: 1000+ therapists involved
   - lesson: work with experts, publish results

2. **engagement over features**
   - kids don't care about ai
   - they care about fun
   - make it a game first, therapy second

3. **parent support is crucial**
   - parents are the actual users
   - must be dead simple
   - show progress clearly
   - celebrate small wins

4. **start narrow, expand later**
   - speech blubs started with articulation
   - mita focused on autism specifically
   - don't try to fix everything at once

5. **ethical data practices**
   - transparent consent
   - privacy by design
   - on-device processing when possible
   - parents can delete data anytime

---

## red flags to avoid

❌ **don't:**
- claim to replace therapists
- promise medical outcomes without validation
- collect data without clear consent
- launch without speech therapist involvement
- ignore regulatory requirements
- make it too complex for parents

✅ **do:**
- position as supplement to therapy
- measure and publish outcomes
- privacy-first design
- co-create with therapists and parents
- understand regulatory landscape
- keep it simple and fun

---

## next steps for your project

**this week:**
1. survey 10 parents about home practice challenges
2. download and try speech blubs + mita apps
3. inventory your clinic's existing data (with consent plan)

**this month:**
1. talk to healthcare attorney about regulatory path
2. find ml engineer interested in health tech (offer equity)
3. apply for myst dataset access (free for research)
4. draft parental consent form for data collection

**this quarter:**
1. build proof-of-concept with existing whisper api
2. test with 5 families from your clinic
3. measure if basic version helps at all
4. decide: build further or pivot approach

---

## key considerations

### privacy & ethics
- hipaa compliance for health data
- coppa compliance (children's online privacy)
- parental consent for recordings
- data anonymization
- right to delete all data
- on-device processing preferred

### clinical safety
- not replacing therapists, augmenting them
- clear disclaimers about limitations
- when to escalate to human professional
- emergency contact info visible
- regular check-ins with real therapist

### accessibility
- works offline (many families have limited internet)
- low-cost devices (not everyone has latest iphone)
- multiple languages
- culturally appropriate content
- adjustable for different learning speeds
- works for various disabilities

### technical requirements
- low latency (< 2 seconds for feedback)
- high accuracy (> 90% on child speech)
- small model size (< 500mb for mobile)
- battery efficient
- accessible ui (wcag compliant)

---

## recommended reading order

1. try speech blubs app (hands-on learning)
2. read "adaptation of whisper models to child speech" paper
3. explore myst dataset
4. read hipaa compliance guide for ai
5. study mita's clinical validation approach

---

*research in progress - updating as we learn more*
