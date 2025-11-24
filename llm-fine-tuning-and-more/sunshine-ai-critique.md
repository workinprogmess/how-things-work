# sunshine ai speech assessment: critique & investor questions

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

### 5. no mention of existing competition

**missing:**
- speech blubs (5m+ users, video modeling + ai)
- mita (fda breakthrough, 120% improvement in trials)
- articulation station, constant therapy
- none mentioned or differentiated against

**questions to ask:**
- how is sunshine different from speech blubs?
- what's the moat beyond "indian english"?
- why would a parent choose this over established apps?

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
