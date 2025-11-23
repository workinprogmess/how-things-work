# occupational therapy ai for children

## overview

designing an ai-powered occupational therapy (ot) system for home use by parents to help children (typically 3-12 years) with:
- adhd (attention, focus, self-regulation)
- autism spectrum disorder (sensory processing, motor planning)
- developmental coordination disorder (dcd/dyspraxia)
- sensory processing disorders
- fine motor delays (handwriting, manipulating objects)
- gross motor delays (balance, coordination, bilateral skills)
- developmental delays (general)

## the key insight: ot requires vision

unlike speech therapy where audio is the primary modality, occupational therapy fundamentally requires **visual observation** because the ai must see how the child performs physical tasks:

- **fine motor skills**: how they grip a pencil, manipulate objects, button clothes
- **gross motor skills**: how they jump, balance, throw/catch, coordinate body movements
- **sensory integration**: how they respond to stimuli, body awareness, spatial orientation
- **postural control**: trunk stability, head control, sitting balance

**implication**: the core technical challenge is computer vision + pose estimation + action recognition, not just speech recognition.

---

## what exists today

### companies and products in this space

#### dedicated ot/motor assessment platforms

**1. korro ai** - most relevant for this space
- website: https://www.korro.ai
- what they do: ai-powered pediatric therapy platform using computer vision
- technology:
  - advanced computer vision analyzes movement in real-time
  - runs locally on smartphone/tablet (no cloud image uploads)
  - tracks hundreds of metrics: fine motor, gross motor, attention, behavioral
  - adaptive difficulty based on performance
- clinical validation:
  - rct at capable kids pediatric clinic
  - significant improvements in bilateral coordination (p=0.01, cohen's d=1.1)
- key insight: uses games to deliver therapy while computer vision tracks performance
- target: ages 4-12, used by ot practitioners

**2. vrapeutic** - unicef innovation fund portfolio
- website: https://www.vrapeutic.com
- what they do: vr/ar rehabilitation for developmental conditions
- focus areas: cerebral palsy, down syndrome, autism, adhd, dyslexia
- technology: vr-based curricula for motor, cognitive, and academic skills
- research partners: university of ottawa, cairo university
- global reach: collaboration with unicef vietnam for validation study
- key insight: vr creates controlled, immersive environments for therapy

**3. floreo** - fda breakthrough device designation
- website: https://floreovr.com
- what they do: vr therapy for social/communication skills in autism
- technology:
  - vr headset-based lessons
  - parent/therapist can observe on tablet while child is in vr
  - joint attention training, safety skills, social skills
- clinical validation:
  - fda breakthrough device designation
  - published research on joint attention module
- target: autism spectrum, also supports adhd
- key insight: parent involvement during vr sessions

**4. beable health (india)**
- product: armable - upper limb rehabilitation device
- what they do: gamified upper limb therapy with movement tracking
- technology: hardware + software, therapeutic games, progress tracking
- target: individuals with motor deficits
- relevance: demonstrates indian healthtech capability

**5. nemax ai (india)**
- focus: eeg-based special education platform
- what they do: assessment and personalized learning for children with special needs
- technology: eeg for measuring cognitive engagement
- key insight: combining neural signals with educational content

**6. vifr tech (india)**
- product: halara - vr special education platform
- focus: training young adults with autism and neurodevelopmental conditions
- key insight: vr for vocational/life skills training

#### related digital therapy platforms

**7. pigpug health**
- focus: ai-powered neurofeedback for adhd and autism
- technology: brain training through neurofeedback
- target: cognitive aspects of adhd/autism

**8. empowered brain**
- what they do: ai-driven smartglasses for students with asd
- target: school-based intervention for socio-emotional behaviors

**9. auto train brain**
- focus: neurofeedback for learning difficulties, adhd, autism
- conditions: dyslexia, dyscalculia, dysgraphia, dyspraxia

#### vr therapy providers

**10. ds therapies / joybridge kids**
- what they do: multidisciplinary therapy (ot, speech, aba)
- approach: traditional therapy + technology augmentation

### research findings: ai in pediatric ot

#### key academic papers

**1. "use of ai in pediatric occupational therapy: a review" (2024)**
- source: science publishing group
- findings:
  - ai technologies (ml, computer vision, wearables) offer innovative assessment approaches
  - noticeable shift toward pediatric applications post-2020
  - challenges: data privacy, ethical decision-making, therapist education
  - gaps identified: remote interventions, individual goal-setting, personalized programs

**2. "ai-supported ot program on handwriting skills" (2025)**
- source: pubmed/sciencedirect
- study design: rct with 42 children aged 8-12 at risk for dcd
- intervention: ai-supported ot program using moho framework, 2x/week for 8 weeks
- results: significant improvements in handwriting performance
- key insight: demonstrates ai can improve specific motor skills

**3. "computer vision-based assessment of autistic children" (ieee, 2023)**
- what they did: cv applications for skill/emotion assessment in children with asd
- dataset: 300 videos of asd children in social interaction
- models developed:
  - activity comprehension model
  - joint attention recognition (head and hand pose)
  - emotion/facial expression recognition
- approach: retrained 2d mask r-cnn for child pose estimation
- accuracy: 72% for typical vs atypical behavior classification

**4. "automating general movements assessment" (nature communications, 2023)**
- focus: early cerebral palsy screening via infant movement analysis
- technology: deep learning-based pose estimation from consumer device videos
- significance: automates assessment that traditionally requires trained professionals
- key insight: markerless, non-invasive video analysis works

**5. "pose-mapping for cerebral palsy" (mit, 2023)**
- what they did: remote motor function evaluation using skeleton pose data
- dataset: 1,000+ children with cerebral palsy videos
- classification: gmfcs (gross motor function classification system)
- finding: pretrained networks learned cerebral palsy movement patterns accurately
- key insight: transfer learning from adult datasets works for pediatric use

**6. "evaluation of motor coordination in children" (2024)**
- technology: machine vision for objective motor assessment
- approach: skeleton extraction via pose estimation network
- methods: dtw for temporal alignment, regularization for spatial alignment
- significance: transforms video assessments into keypoint sequence evaluations

---

## technical architecture for ot ai

### the core stack

```
child's smartphone/tablet camera
         ↓
    [pose estimation layer]
    - mediapipe blazepose (real-time, on-device)
    - vitpose (higher accuracy, may need server)
    - openpose (multi-person, detailed)
         ↓
    [skeleton extraction]
    - 2d joint coordinates (17-33 keypoints)
    - 3d estimation if depth available
    - temporal sequences across frames
         ↓
    [action recognition layer]
    - spatial-temporal graph neural networks (st-gcn)
    - transformer-based temporal models
    - dynamic time warping for action comparison
         ↓
    [assessment engine]
    - compare child's movement to reference patterns
    - quality scoring (not just recognition)
    - detect specific motor deficits
         ↓
    [recommendation layer]
    - llm for exercise recommendations
    - adaptive difficulty adjustment
    - parent-friendly explanations
         ↓
    [engagement layer]
    - gamified interface
    - reward systems
    - progress visualization
```

### pose estimation models comparison

| model | pros | cons | best for |
|-------|------|------|----------|
| **mediapipe blazepose** | real-time on mobile, 33 landmarks, 3d coordinates | less accurate for children, detector optimized for adults | mobile apps, real-time feedback |
| **vitpose** | best accuracy on infant/child data, no fine-tuning needed | computationally expensive | server-side processing, research |
| **openpose** | multi-person detection, hand keypoints, detailed | older, more compute, worse than vitpose on children | multi-person scenarios |
| **hrnet** | good accuracy vs speed tradeoff | requires gpu | balanced applications |
| **alphapose** | competitive accuracy | less community support | alternative to vitpose |

**research finding**: vitpose performs best on infant datasets even without pediatric-specific training. openpose outperforms mediapipe for children. mediapipe struggles because its face detector assumes adult body proportions.

### skeleton-based action recognition

**spatial-temporal graph neural networks (st-gcn)**
- skeleton naturally forms a graph structure
- nodes = joints, edges = bones
- spatial convolution: learn joint relationships
- temporal convolution: learn movement patterns over time
- best suited for child action recognition

**key research finding**: state-of-the-art skeleton models trained on adult datasets (kinetics-400, ntu rgb+d) are not directly suitable for children because:
- children are still in motor development stage
- size and anatomical differences create distribution shifts
- solution: transfer learning + fine-tuning on child data

**transformer-based approaches**
- motionformer: trajectory attention for temporal correlation
- mvit (multiscale vision transformers): multi-scale feature hierarchies
- ls-vit: long and short-term temporal differences
- advantage: better at capturing long-range dependencies in movement sequences

### action quality assessment (aqa)

beyond just recognizing what action is being performed, ot needs to assess how well:

**temporal parsing transformer**
- decomposes movement into temporal part-level representations
- uses learnable queries for atomic movement patterns
- outputs quality scores via contrastive regression

**applications**:
- is the child's jumping pattern coordinated?
- is their handwriting stroke smooth or jerky?
- are bilateral movements synchronized?

### fine motor assessment via hand tracking

**handwriting analysis approach**:
- hardware: tablet with stylus + hand motion tracker (e.g., ultraleap)
- features extracted:
  - pressure patterns
  - writing speed
  - in-air movements
  - pen lifts and stops
  - stroke shape/smoothness
  - time to complete task

**deep learning for handwriting**:
- cnn models classify task difficulty and quality
- trained on spatio-temporal features from stylus + hand kinematics
- can detect dysgraphia with accuracy comparable to experts

**research result**: models achieved root-mean-square error < 1 for predicting sems (standardized handwriting) scores.

---

## datasets available

### child motor development datasets

**1. multiview child motor development dataset** - most relevant
- source: gigascience (oxford academic), 2023
- content: videos of children aged 20-71 months performing k-dst behaviors
- data:
  - 399 children
  - 4 behaviors per age group
  - 3 camera angles per video
  - skeleton extraction included
  - 3-point scale labels from 15 experts + 3 pediatricians
- access: publicly available
- significance: first publicly accessible dataset for child motor development assessment

**2. toddleract dataset**
- focus: toddler gross motor action recognition
- content: videos of toddlers (under 3 years) performing gross motor activities
- significance: addresses gap in toddler-specific action datasets
- applications: early childhood development monitoring

**3. taiwanese infant pose dataset**
- source: mackay children hospital collaboration
- content: spontaneous movement videos of infants 0-6 months
- includes: typical development + gross motor delay infants
- collection period: 2021-2024
- significance: home-recorded videos for real-world conditions

**4. kids motor performance dataset (malaysia)**
- content: motor performance data for 7-year-olds
- based on: segak physical fitness test
- scope: national primary schools across malaysia

### general skeleton/action datasets (for pre-training)

**5. ntu rgb+d / ntu rgb+d 120**
- scale: 56,880 samples (v1) / 114,480 samples (v2)
- actions: 60/120 action classes
- modalities: rgb, depth, 3d skeleton (25 joints), infrared
- captured by: 3 kinect v2 cameras
- note: primarily adults, but useful for pre-training
- access: https://rose1.ntu.edu.sg/dataset/actionRecognition/

**6. kinetics-skeleton**
- source: derived from deepmind kinetics videos
- scale: ~400 action classes, 300 videos per class
- skeleton extraction: openpose (18 joints)
- access: google drive / baiduyun

**7. coco (for pose estimation pre-training)**
- standard benchmark for 2d pose estimation
- 17 keypoints annotation
- useful for initial model training

### infant movement datasets (for early development)

**8. cerebral palsy video datasets**
- mit research: 1,000+ videos of children with cp
- tagged with gmfcs scores
- used for remote motor function evaluation

**9. general movements assessment datasets**
- multiple research groups
- infant spontaneous movement recordings
- labeled with gma scores for cp prediction

### data collection strategies

**if collecting your own data:**

1. **standardized tasks**
   - use established assessments (bot-2, mabc-2, k-dst)
   - multiple camera angles (front, side, top)
   - controlled lighting and background
   - consistent task instructions

2. **expert labeling**
   - multiple raters (3+ ot practitioners)
   - standardized scoring rubrics
   - inter-rater reliability checks
   - video annotation tools (labelme, cvat)

3. **consent and privacy**
   - parental consent (written, detailed)
   - child assent where applicable
   - hipaa/coppa compliance
   - clear data usage terms
   - option to delete

4. **diversity considerations**
   - age range coverage
   - gender balance
   - include children with and without diagnoses
   - multiple cultural backgrounds
   - varying severity levels

5. **realistic conditions**
   - home environment recordings (not just clinic)
   - natural clothing
   - varied backgrounds
   - smartphone/tablet quality (not just research cameras)

---

## fine-tuning approaches for child motor assessment

### transfer learning strategy

**the challenge**: child motor data is scarce; adult action datasets are abundant

**approach**:
```
1. pre-train on adult action datasets
   - ntu rgb+d 120 (skeleton)
   - kinetics-skeleton (skeleton)
   - imagenet (for vision backbone)

2. domain adaptation
   - adjust for child body proportions
   - account for developmental stage variations
   - bridge adult→child distribution gap

3. fine-tune on child-specific data
   - multiview child motor dataset
   - your clinic's collected data
   - augmentation to expand limited samples

4. task-specific adaptation
   - ot assessment tasks (not general action recognition)
   - quality assessment (not just classification)
   - severity/developmental level estimation
```

### parameter-efficient fine-tuning (peft)

**why peft matters for pediatric ai**:
- limited child motor data available
- prevents overfitting on small datasets
- reduces compute costs
- allows multiple task-specific adaptations

**lora (low-rank adaptation)**
- freeze base model weights
- add small trainable matrices
- 10-100x fewer parameters to train
- proven effective for whisper child speech adaptation

**adapter layers**
- insert small modules between transformer layers
- task-specific without full model retraining
- multiple adapters for different assessment types

### data augmentation for movement data

**skeleton augmentation**:
- random rotation (simulate different camera angles)
- scale variation (simulate distance from camera)
- temporal jittering (speed variations)
- joint noise (simulate pose estimation errors)
- mirror/flip (for bilateral tasks)

**video augmentation**:
- random crop/resize
- color jittering
- temporal sampling variations
- background substitution (if segmented)

### few-shot learning for rare conditions

some motor deficits are rare; you may only have a few examples:

**approaches**:
- prototypical networks (learn class prototypes)
- siamese networks (learn similarity)
- meta-learning (learn to learn from few examples)
- synthetic data generation (vary existing samples)

### action quality assessment fine-tuning

**beyond classification to quality scoring**:

1. **contrastive regression**
   - compare pairs of movements
   - learn "this is better than that"
   - more data-efficient than absolute scoring

2. **multi-task learning**
   - joint training on:
     - action recognition (what is the child doing?)
     - quality assessment (how well?)
     - deficit classification (what's wrong?)

3. **reference-guided assessment**
   - compare child's movement to expert/typical reference
   - dynamic time warping for temporal alignment
   - deviation scoring from reference trajectory

---

## regulatory considerations

### fda (united states)

**current landscape**:
- 876 ai/ml-enabled medical devices authorized
- 97.4% through 510(k) clearance pathway
- only a small number authorized specifically for pediatric use
- only 18.7% disclosed pediatric validation in regulatory documents

**key concerns**:
- children exposed to off-label use
- differential algorithm performance in pediatrics
- lack of standardized reporting for pediatric devices

**regulatory pathways**:

1. **wellness device (non-regulated)**
   - claims: general fitness, education, entertainment
   - no disease diagnosis/treatment claims
   - example: "helps children practice motor skills"
   - lowest barrier, most common starting point

2. **510(k) clearance (class ii)**
   - substantial equivalence to predicate device
   - timeline: ~6-12 months
   - cost: $20k-100k fees + development
   - required: performance testing, biocompatibility (if applicable)

3. **de novo classification (class i/ii)**
   - for novel devices without predicates
   - creates new device classification
   - timeline: 12-18 months
   - required: safety/effectiveness data

4. **breakthrough device designation**
   - for devices treating serious conditions
   - more intensive fda interaction
   - may expedite review
   - example: floreo received this for autism treatment

**pediatric considerations**:
- fda considers unique pediatric populations
- may require human oversight integration
- postmarket surveillance often required
- section 522 applies to pediatric devices

### cdsco (india)

**regulatory authority**: central drugs standard control organisation

**classification**:
- software as medical device (samd) regulated under medical device rules 2017
- if ai tool is used for diagnosis, monitoring, prediction, or treatment → medical device
- risk-based classification: class a (low) to class d (high)

**key requirements**:
- iso 13485 quality management system
- iso 14971 risk management
- iec 62304 software lifecycle processes
- clinical evidence and performance evaluation
- machine learning algorithm guidance included

**approval timeline**: 6-9 months typical

**india-specific challenges**:
- clinical trials may need to be conducted in india
- no specific requirement for india-trained algorithms
- alignment with imdrf (international medical device regulators forum)

### hipaa/privacy considerations

**united states (hipaa)**:
- applies if handling protected health information (phi)
- annual compliance costs: $25k-100k+
- on-device processing preferred (no phi in cloud)
- penalties: $141 to $2,134,831 per violation

**children's privacy (coppa)**:
- applies to children under 13 in us
- parental consent required before data collection
- clear privacy notice requirements
- right to review/delete child's data

**india (dpdp act)**:
- digital personal data protection act 2023
- consent requirements for data processing
- special provisions for children's data
- data localization considerations

### recommendations for regulatory strategy

**start as wellness device**:
- position as "motor skill practice tool" not "diagnostic device"
- no claims about treating/diagnosing conditions
- build clinical evidence while on market
- upgrade regulatory classification as evidence grows

**build clinical evidence simultaneously**:
- pilot studies with documented outcomes
- publish peer-reviewed research
- prepare for regulatory submission
- partner with academic medical centers

---

## indian context

### market opportunity

**prevalence data**:
- 5-6% of school-aged children globally have dcd
- 5-13% of children aged 4-6 have sensory processing issues
- 40-80% of children with neurodevelopmental disabilities have sensory processing difficulties
- india has ~250 million children under 14

**therapy access challenges**:
- limited trained occupational therapists
- concentration in urban centers
- high therapy costs relative to income
- long wait times for assessment

### existing indian players

**rehabilitation technology startups**:

1. **physica** - in-home rehabilitation platform
2. **forhealth** - robotic assistive technologies
3. **beable health** - armable upper limb rehabilitation
4. **deedee labs** - bionic prosthetics
5. **terrablue xt** - wearable neurology devices
6. **nema ai** - eeg-based special education
7. **vifr tech** - vr special education (halara)
8. **circleofhope** - emotional/mental health for children

**research involvement**:
- chandran et al. (2024, india) on learning capacity prediction using ot
- indian researchers increasingly active in ai-rehabilitation intersection

### india-specific considerations

**technology access**:
- high smartphone penetration but varied device quality
- internet connectivity inconsistent in rural areas
- need for offline-capable solutions
- low-cost hardware constraints

**language and cultural factors**:
- instructions in multiple indian languages
- culturally appropriate activities and games
- parent education materials in vernacular
- visual instructions for low-literacy parents

**pricing**:
- therapy costs in india: rs 500-2000 per session
- monthly subscription must be fraction of this
- freemium model may work better than pure subscription
- consider government/ngo partnerships for reach

**regulatory**:
- cdsco registration required for medical claims
- wellness positioning initially simpler
- build evidence for eventual medical device registration
- partner with indian medical institutions for validation

---

## practical roadmap for building

### phase 1: foundation (months 1-3)

**week 1-2: competitive analysis**
- use korro ai, floreo, vrapeutic products
- document strengths, weaknesses, gaps
- identify your differentiation opportunity

**week 3-4: clinical partnerships**
- find ot clinic willing to collaborate
- establish data collection agreement
- identify target age range and conditions

**week 5-8: technical validation**
- test pose estimation models on child videos
- compare mediapipe vs vitpose vs openpose
- measure accuracy on your target population
- identify technical feasibility constraints

**week 9-12: data collection setup**
- ethics committee approval
- parental consent forms
- standardized assessment protocol (bot-2 tasks)
- video recording setup (angles, lighting, equipment)

### phase 2: proof of concept (months 4-6)

**step 1: collect initial dataset**
- target: 50-100 children
- 5-10 standardized motor tasks each
- mix of typical development + diagnoses
- ot assessment scores for ground truth

**step 2: build basic pipeline**
```python
# simplified pipeline pseudo-code

# 1. pose estimation
import mediapipe as mp  # start with mediapipe for speed
pose = mp.solutions.pose.Pose()
results = pose.process(video_frame)
keypoints = extract_keypoints(results)

# 2. temporal sequence
sequence = []
for frame in video:
    sequence.append(extract_keypoints(frame))
skeleton_sequence = np.array(sequence)  # [T, V, C]

# 3. action quality model (simple start)
from sklearn.ensemble import RandomForestRegressor
# extract features: joint angles, velocities, smoothness
features = extract_movement_features(skeleton_sequence)
# predict quality score
quality_score = model.predict(features)
```

**step 3: validate with therapists**
- show ai assessments to ot practitioners
- compare ai scores to expert scores
- identify where ai fails
- iterate on features/model

### phase 3: mvp development (months 7-12)

**step 1: deep learning pipeline**
```python
# upgrade to st-gcn for skeleton-based recognition
# pre-trained on ntu rgb+d, fine-tune on your data

from mmaction2.models import STGCN

# load pretrained
model = STGCN.from_pretrained('stgcn_ntu_rgbd')

# fine-tune on child data
model.classifier = nn.Linear(256, num_assessment_classes)
trainer = Trainer(model, child_motor_dataset)
trainer.train()
```

**step 2: mobile app development**
- flutter/react native for cross-platform
- on-device inference (tensorflow lite / coreml)
- gamified interface
- parent dashboard
- progress tracking

**step 3: gamification layer**
- work with game designer
- make exercises into games (jumping game, catching game, etc.)
- reward systems (points, badges, characters)
- difficulty progression

### phase 4: pilot study (months 13-18)

**participant selection**:
- 20-30 families
- mix of conditions: adhd, autism, dcd, typical
- ages 4-10
- committed to 12-week usage

**study design**:
- pre-assessment by qualified ot (bot-2, mabc-2)
- 12 weeks of app usage (3-4 sessions/week)
- weekly check-ins
- post-assessment by same ot
- parent satisfaction surveys

**metrics to track**:
- engagement: sessions completed, duration, drop-off
- clinical: standardized assessment score changes
- usability: parent feedback, sos requests
- technical: inference latency, crash rates

### phase 5: clinical validation (months 19-24)

**formal rct design**:
- 50-100 participants
- control group: standard ot care
- intervention group: standard ot + app
- randomization, blinding where possible
- 6-month duration
- primary outcome: bot-2 score improvement
- secondary: engagement, parent satisfaction, therapist workload

**publish and validate**:
- submit to occupational therapy journals
- present at conferences (aota, wfot)
- build credibility for regulatory submission

### phase 6: scale (months 25+)

**technical infrastructure**:
- hipaa/dpdp compliant cloud (aws/azure with baa)
- or fully on-device (more private, offline-capable)
- model update pipeline
- analytics dashboard

**business models**:

1. **direct to consumer (d2c)**
   - app store distribution
   - freemium: free basic, $15-20/month premium
   - annual discount

2. **b2b (clinics/schools)**
   - site licenses
   - therapist dashboard
   - bulk pricing
   - white-label options

3. **insurance/government**
   - longest path but largest market
   - requires clinical validation
   - partner with insurers early
   - explore government health schemes (india: ayushman bharat)

---

## budget estimates

### bootstrapped mvp (months 1-12)

| item | cost range |
|------|------------|
| ml engineer (1) | $60k-120k or equity |
| mobile developer (0.5) | $30k-60k or equity |
| data collection/annotation | $15k-30k |
| cloud/compute costs | $5k-15k |
| design (contract) | $10k-20k |
| legal/regulatory consult | $10k-20k |
| clinical partnership costs | $5k-10k |
| **total** | **$135k-275k** |

### clinical validation phase (months 13-24)

| item | cost range |
|------|------------|
| clinical trial costs | $100k-300k |
| additional development | $50k-100k |
| regulatory preparation | $30k-80k |
| continued operations | $60k-120k |
| **total** | **$240k-600k** |

### fda/regulatory submission (if pursuing)

| item | cost range |
|------|------------|
| fda fees | $20k-100k |
| regulatory consultants | $50k-150k |
| additional clinical data | $100k-300k |
| **total** | **$170k-550k** |

### india-specific budget (lower costs)

| item | cost range (inr) |
|------|------------------|
| ml engineer (1) | 15-30 lakh/year |
| mobile developer (0.5) | 8-15 lakh/year |
| data collection | 5-10 lakh |
| cloud costs | 2-5 lakh |
| design | 3-6 lakh |
| legal | 2-5 lakh |
| **mvp total** | **35-71 lakh (~$40-85k)** |

---

## challenges and gaps

### technical challenges

1. **child pose estimation accuracy**
   - current models trained on adults
   - children have different proportions
   - fast/unpredictable movements
   - solution: fine-tune on child data, use vitpose

2. **limited labeled data**
   - expert labeling expensive
   - inter-rater variability
   - rare conditions have few examples
   - solution: semi-supervised learning, data augmentation

3. **real-world conditions**
   - home environments vary (lighting, clutter, camera angles)
   - children don't follow instructions precisely
   - sibling/parent interference in frame
   - solution: robust models, clear setup guidance

4. **action quality vs classification**
   - recognizing an action is easier than scoring quality
   - subtle movement differences matter clinically
   - solution: contrastive learning, reference-guided assessment

5. **multimodal integration**
   - motor skills + attention + sensory processing
   - need to combine video + possibly audio + possibly sensors
   - solution: start simple, add modalities incrementally

### clinical challenges

1. **standardization of assessments**
   - different ots may score differently
   - need inter-rater reliability protocols
   - solution: multiple expert raters, clear rubrics

2. **generalization across conditions**
   - adhd motor issues differ from autism motor issues
   - dcd is different again
   - solution: condition-specific models or conditioning

3. **measuring long-term outcomes**
   - motor improvements take weeks/months
   - engagement drops over time
   - solution: gamification, regular new content

4. **therapist acceptance**
   - some may see ai as threat
   - need to position as augmentation not replacement
   - solution: involve therapists in design, show workload benefits

### business challenges

1. **proving roi**
   - hard to quantify therapy effectiveness
   - insurance reimbursement uncertain
   - solution: clinical trials, outcomes data

2. **user acquisition**
   - parents overwhelmed with app options
   - need therapist recommendations
   - solution: b2b2c model, therapist partnerships

3. **retention**
   - children lose interest
   - parents forget to use
   - solution: push notifications, progress celebrations, new content

### ethical challenges

1. **privacy of children's movement data**
   - highly sensitive information
   - potential for misuse
   - solution: on-device processing, minimal data collection

2. **diagnostic claims**
   - risk of false positives/negatives
   - parental anxiety from ai assessments
   - solution: clear disclaimers, always recommend professional evaluation

3. **equity of access**
   - not everyone has smartphone/tablet
   - digital divide
   - solution: partnerships with schools/clinics, low-cost options

### research gaps identified in literature

1. lack of remotely provided participation-focused interventions using ai
2. lack of individual goal-setting integrated in ai interventions
3. lack of interventions tailored to individually reported needs of children/families
4. limited validation of ai reliability in pediatric ot
5. need for pediatric-specific algorithm validation in regulatory submissions

---

## key success factors

### from companies that worked

1. **clinical credibility first**
   - korro: rct with significant results
   - floreo: fda breakthrough designation
   - mita (speech): 3-year clinical trial with 6,454 children
   - lesson: invest in validation early

2. **engagement over features**
   - children don't care about ai
   - make it a game first
   - progress should feel rewarding
   - variety prevents boredom

3. **therapist involvement**
   - co-design with ot practitioners
   - make their job easier, not threatened
   - provide them valuable data/insights

4. **parent experience matters**
   - parents are the gatekeepers
   - must be easy to use
   - clear progress communication
   - feel supported, not judged

5. **start narrow, expand later**
   - korro: started with bilateral coordination
   - floreo: focused on joint attention
   - don't solve everything at once

### technical best practices

1. **on-device processing when possible**
   - privacy benefits
   - works offline
   - lower latency
   - reduces cloud costs

2. **model efficiency matters**
   - target < 500mb model size
   - < 100ms inference latency
   - battery efficient

3. **graceful degradation**
   - handle pose estimation failures
   - work with partial visibility
   - provide feedback on recording quality

4. **continuous improvement**
   - collect (consented) usage data
   - update models regularly
   - a/b test new approaches

---

## next steps

### this week
1. download and test korro ai / floreo apps
2. identify local ot clinic for partnership discussions
3. test mediapipe pose estimation on phone with child movement video

### this month
1. request access to multiview child motor development dataset
2. consult healthcare attorney about regulatory pathway
3. draft parental consent forms
4. begin competitive analysis documentation

### this quarter
1. collect pilot data (10-20 children, 5 tasks each)
2. build basic pose estimation → feature extraction → scoring pipeline
3. validate with 2-3 ot practitioners
4. decide: continue building or pivot approach

---

## resources and links

### datasets
- multiview child motor development: https://academic.oup.com/gigascience/article/doi/10.1093/gigascience/giad039
- ntu rgb+d: https://rose1.ntu.edu.sg/dataset/actionRecognition/
- toddleract: https://arxiv.org/abs/2409.00349

### tools and frameworks
- mediapipe pose: https://github.com/google-ai-edge/mediapipe
- mmaction2 (action recognition): https://github.com/open-mmlab/mmaction2
- openpose: https://github.com/CMU-Perceptual-Computing-Lab/openpose
- vitpose: https://github.com/ViTAE-Transformer/ViTPose

### companies
- korro ai: https://www.korro.ai
- floreo: https://floreovr.com
- vrapeutic: https://www.vrapeutic.com

### regulatory
- fda ai-enabled devices: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices
- cdsco india: https://cdsco.gov.in

### research papers
- computer vision for asd assessment (ieee): https://ieeexplore.ieee.org/document/10105862/
- automating gma (nature communications): https://www.nature.com/articles/s41467-023-44141-x
- pose estimation for cerebral palsy (mit): https://news.mit.edu/2023/pose-mapping-technique-cerebral-palsy-patients-0914
- ai in pediatric ot review: https://www.sciencepublishinggroup.com/article/10.11648/j.rs.20240902.12

---

*research compiled november 2024 - updating as field evolves*
