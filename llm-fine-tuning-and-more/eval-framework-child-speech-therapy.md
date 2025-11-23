# evaluation framework for child speech therapy ai

a comprehensive guide to measuring whether your speech therapy ai actually works.

---

## overview

### why evaluation matters

building ai for child speech therapy has high stakes:
- wrong transcription → wrong diagnosis → wrong exercises
- bad recommendations → wasted time, frustrated families
- no improvement tracking → can't prove it works

**the goal:** measure everything that matters, from technical accuracy to real-world outcomes.

### three layers of evaluation

```
┌─────────────────────────────────────────────────────────────┐
│  layer 3: clinical outcomes                                 │
│  "did the child actually improve?"                          │
│  measured: monthly/quarterly                                │
├─────────────────────────────────────────────────────────────┤
│  layer 2: recommendation quality                            │
│  "are the ai suggestions clinically appropriate?"           │
│  measured: per-session + weekly reviews                     │
├─────────────────────────────────────────────────────────────┤
│  layer 1: speech recognition accuracy                       │
│  "did we hear what the child said correctly?"               │
│  measured: every utterance                                  │
└─────────────────────────────────────────────────────────────┘
```

each layer depends on the one below. poor speech recognition = unreliable recommendations = meaningless outcomes.

---

## layer 1: speech recognition evaluation

### primary metric: word error rate (wer)

```
wer = (substitutions + deletions + insertions) / total words × 100

example:
target:    "the rabbit is hopping"
predicted: "the wabbit is hoping"

substitutions: 2 (rabbit→wabbit, hopping→hoping)
deletions: 0
insertions: 0
total words: 4

wer = 2/4 = 50%
```

**targets:**
| context | acceptable wer | goal wer |
|---------|---------------|----------|
| clear speech, quiet room | < 15% | < 8% |
| typical child speech | < 20% | < 12% |
| disordered speech | < 30% | < 18% |
| noisy environment | < 35% | < 25% |

### secondary metrics

#### phoneme error rate (per)
more granular than wer - measures individual sound accuracy.

```python
# phoneme-level evaluation
target_phonemes = ["ð", "ə", "r", "æ", "b", "ɪ", "t"]  # "the rabbit"
predicted_phonemes = ["ð", "ə", "w", "æ", "b", "ɪ", "t"]  # "the wabbit"

per = 1/7 = 14.3%  # only /r/→/w/ error
```

**why it matters:** a child might say "wabbit" for "rabbit" consistently. per captures this pattern better than wer.

#### phoneme-specific accuracy
track accuracy for commonly disordered sounds:

| sound | description | common errors | target accuracy |
|-------|-------------|---------------|-----------------|
| /r/ | the "r" sound | w-substitution | > 85% |
| /s/ | the "s" sound | th-substitution (lisp) | > 85% |
| /l/ | the "l" sound | w-substitution | > 85% |
| /θ/ | "th" (thin) | f-substitution | > 80% |
| /ʃ/ | "sh" sound | s-substitution | > 85% |
| blends | "str", "bl" | cluster reduction | > 75% |

```python
def evaluate_phoneme_accuracy(test_set, model):
    """evaluate accuracy for specific phonemes"""

    phoneme_results = {
        'r': {'correct': 0, 'total': 0},
        's': {'correct': 0, 'total': 0},
        'l': {'correct': 0, 'total': 0},
        # ... other phonemes
    }

    for sample in test_set:
        target = sample['target_phonemes']
        predicted = model.transcribe(sample['audio'])
        predicted_phonemes = phonemize(predicted)

        for phoneme in phoneme_results.keys():
            indices = find_phoneme_indices(target, phoneme)
            for idx in indices:
                phoneme_results[phoneme]['total'] += 1
                if target[idx] == predicted_phonemes[idx]:
                    phoneme_results[phoneme]['correct'] += 1

    return {
        phoneme: data['correct'] / data['total']
        for phoneme, data in phoneme_results.items()
    }
```

#### disfluency handling
for children who stutter or have speech flow issues:

| metric | description | target |
|--------|-------------|--------|
| repetition detection | identifies "b-b-ball" as "ball" | > 90% |
| prolongation handling | "sssssun" → "sun" | > 85% |
| block detection | silence before word | > 80% |
| interjection filtering | removes "um", "uh" | > 95% |

```python
disfluency_test_cases = [
    {
        "audio": "child_stutter_1.wav",
        "raw_speech": "I w-w-want the b-ball",
        "target_transcription": "I want the ball",
        "disfluency_type": "repetition"
    },
    {
        "audio": "child_prolongation_1.wav",
        "raw_speech": "The ssssnake is green",
        "target_transcription": "The snake is green",
        "disfluency_type": "prolongation"
    }
]
```

### test set design for speech recognition

#### stratification requirements

your test set must include samples across:

**1. age groups:**
- 2-3 years (early speech development)
- 4-5 years (articulation refinement)
- 6-8 years (complex sound mastery)

**2. disorder types:**
- articulation disorders (specific sound errors)
- phonological disorders (pattern-based errors)
- childhood apraxia of speech (motor planning)
- fluency disorders (stuttering)
- mixed presentations

**3. severity levels:**
- mild (mostly intelligible, occasional errors)
- moderate (requires context to understand)
- severe (unintelligible to unfamiliar listeners)

**4. acoustic conditions:**
- studio quality (baseline)
- home environment (typical use)
- background noise (tv, siblings)
- device variation (phone, tablet, laptop)

**5. linguistic diversity (for indian context):**
- hindi-english code-switching
- regional accent variation
- multilingual children

#### minimum test set size

| category | minimum samples | recommended |
|----------|-----------------|-------------|
| per age group | 50 utterances | 200 |
| per disorder type | 100 utterances | 300 |
| per severity level | 100 utterances | 200 |
| total test set | 500 utterances | 2000+ |

**important:** test set must be held out - never used for training.

### evaluation code: speech recognition

```python
# eval_speech_recognition.py

from dataclasses import dataclass
from typing import List, Dict
import evaluate

@dataclass
class SpeechSample:
    audio_path: str
    target_text: str
    age_years: int
    disorder_type: str  # articulation, phonological, fluency, apraxia
    severity: str  # mild, moderate, severe
    acoustic_condition: str  # studio, home, noisy
    language: str  # english, hindi, mixed
    phonemes_targeted: List[str]  # ['r', 's'] if testing specific sounds

class SpeechRecognitionEvaluator:
    def __init__(self, model, test_set: List[SpeechSample]):
        self.model = model
        self.test_set = test_set
        self.wer_metric = evaluate.load("wer")
        self.cer_metric = evaluate.load("cer")  # character error rate

    def evaluate_overall(self) -> Dict:
        """calculate overall wer across entire test set"""
        predictions = []
        references = []

        for sample in self.test_set:
            pred = self.model.transcribe(sample.audio_path)
            predictions.append(pred['text'].lower().strip())
            references.append(sample.target_text.lower().strip())

        return {
            'overall_wer': self.wer_metric.compute(
                predictions=predictions,
                references=references
            ),
            'overall_cer': self.cer_metric.compute(
                predictions=predictions,
                references=references
            ),
            'n_samples': len(self.test_set)
        }

    def evaluate_by_category(self, category: str) -> Dict:
        """evaluate wer broken down by a category"""
        results = {}

        # group samples by category
        groups = {}
        for sample in self.test_set:
            key = getattr(sample, category)
            if key not in groups:
                groups[key] = {'predictions': [], 'references': []}

            pred = self.model.transcribe(sample.audio_path)
            groups[key]['predictions'].append(pred['text'].lower().strip())
            groups[key]['references'].append(sample.target_text.lower().strip())

        # calculate wer for each group
        for key, data in groups.items():
            results[key] = {
                'wer': self.wer_metric.compute(
                    predictions=data['predictions'],
                    references=data['references']
                ),
                'n_samples': len(data['predictions'])
            }

        return results

    def evaluate_edge_cases(self) -> Dict:
        """evaluate on challenging cases"""
        edge_cases = {
            'very_short': [],  # single word utterances
            'very_long': [],  # complex sentences
            'high_disfluency': [],  # lots of stuttering
            'code_switched': [],  # hindi-english mix
            'low_confidence_history': []  # historically difficult
        }

        # ... implementation

        return edge_cases

    def generate_report(self) -> str:
        """generate comprehensive evaluation report"""
        overall = self.evaluate_overall()
        by_age = self.evaluate_by_category('age_years')
        by_disorder = self.evaluate_by_category('disorder_type')
        by_severity = self.evaluate_by_category('severity')
        by_condition = self.evaluate_by_category('acoustic_condition')

        report = f"""
# speech recognition evaluation report

## overall performance
- wer: {overall['overall_wer']*100:.2f}%
- cer: {overall['overall_cer']*100:.2f}%
- samples evaluated: {overall['n_samples']}

## by age group
{self._format_breakdown(by_age)}

## by disorder type
{self._format_breakdown(by_disorder)}

## by severity
{self._format_breakdown(by_severity)}

## by acoustic condition
{self._format_breakdown(by_condition)}

## recommendations
{self._generate_recommendations(by_disorder, by_severity)}
"""
        return report
```

### regression testing

every model update must pass regression tests:

```python
class RegressionTest:
    """ensure new model doesn't break existing capabilities"""

    def __init__(self, baseline_results: Dict, tolerance: float = 0.02):
        self.baseline = baseline_results
        self.tolerance = tolerance  # 2% regression allowed

    def check_regression(self, new_results: Dict) -> Dict:
        regressions = {}

        for category, baseline_wer in self.baseline.items():
            new_wer = new_results.get(category, 1.0)
            regression = new_wer - baseline_wer

            if regression > self.tolerance:
                regressions[category] = {
                    'baseline': baseline_wer,
                    'new': new_wer,
                    'regression': regression,
                    'status': 'FAILED'
                }

        return {
            'passed': len(regressions) == 0,
            'regressions': regressions
        }
```

---

## layer 2: therapy recommendation evaluation

this evaluates the llm that generates therapy advice based on transcriptions.

### evaluation dimensions

#### 2.1 clinical appropriateness

is the recommendation clinically sound?

```
scale: 1-5
1 = clinically inappropriate or harmful
2 = not recommended for this case
3 = acceptable but generic
4 = good, would use with minor changes
5 = excellent, would use as-is
```

**rubric:**
| score | criteria |
|-------|----------|
| 5 | targets correct phoneme/pattern, age-appropriate, evidence-based |
| 4 | mostly appropriate, minor adjustments needed |
| 3 | generic advice, not harmful but not optimal |
| 2 | wrong target or approach for this presentation |
| 1 | could cause harm, regression, or frustration |

#### 2.2 age appropriateness

is it suitable for the child's developmental level?

```
factors:
- vocabulary complexity
- attention span requirements
- motor skill demands
- cognitive load
- engagement level
```

**examples:**
| age | appropriate | inappropriate |
|-----|-------------|---------------|
| 3yr | "say 'bunny hop hop'" | "produce the /r/ phoneme" |
| 5yr | "let's practice snake sounds - ssss" | "articulate fricatives" |
| 7yr | "try saying 'rabbit' slowly" | "demonstrate phonemic awareness" |

#### 2.3 parent clarity

can a non-expert parent understand and implement this?

```
scale: 1-5
1 = requires slp degree to understand
2 = confusing jargon, unclear steps
3 = understandable but vague
4 = clear with minor clarification needed
5 = any parent could follow this
```

#### 2.4 safety

does it avoid harm?

```
red flags (automatic score = 1):
- could cause physical strain
- likely to cause frustration/avoidance
- contradicts medical advice
- inappropriate for disorder type
- could reinforce error patterns
```

#### 2.5 evidence basis

is it grounded in speech therapy research?

```
categories:
- strongly evidence-based (published rcts)
- moderately supported (clinical consensus)
- emerging (limited evidence)
- not supported (contrary to evidence)
- harmful (known to cause issues)
```

### test case design for recommendations

```python
@dataclass
class TherapyTestCase:
    # input context
    child_profile: Dict  # age, diagnosis, history
    speech_sample: str  # transcribed utterance
    target_word: str  # what they were trying to say
    error_pattern: str  # r→w substitution, etc.
    session_context: str  # first session, ongoing, specific goal

    # for evaluation
    gold_standard_recommendation: str  # expert slp recommendation
    key_elements_required: List[str]  # must include these
    red_flags: List[str]  # must NOT include these

# example test case
test_case_1 = TherapyTestCase(
    child_profile={
        'age': 5,
        'diagnosis': 'articulation disorder - /r/ substitution',
        'severity': 'moderate',
        'sessions_completed': 12,
        'current_goal': '/r/ in initial position',
        'preferred_activities': ['animals', 'cars'],
        'frustration_triggers': ['too many repetitions']
    },
    speech_sample="the wabbit is wunning",
    target_word="rabbit",
    error_pattern="w/r substitution",
    session_context="practice_session",

    gold_standard_recommendation="""
    great try! i heard 'wabbit' - let's work on that tricky /r/ sound.

    exercise: rabbit race
    1. show picture of rabbit
    2. model "rrr" sound - tongue back, lips apart
    3. child imitates "rrr" for 3 seconds
    4. combine: "rrr...abbit"
    5. practice 5 times with rabbit hopping game

    parent tip: praise effort, not perfection.
    "i love how you're trying that /r/ sound!"
    """,

    key_elements_required=[
        'acknowledge child attempt positively',
        'target /r/ sound specifically',
        'provide clear articulation cue',
        'include game/engaging element',
        'limit repetitions (frustration trigger)',
        'include parent guidance'
    ],

    red_flags=[
        'criticize the error',
        'use jargon without explanation',
        'suggest too many repetitions',
        'target wrong sound',
        'recommend activities for wrong age'
    ]
)
```

### evaluation methods

#### method 1: expert slp review (gold standard)

```python
class ExpertReview:
    """therapists rate model outputs"""

    dimensions = [
        'clinical_appropriateness',
        'age_appropriateness',
        'parent_clarity',
        'safety',
        'evidence_basis'
    ]

    def collect_rating(self, test_case, model_output) -> Dict:
        return {
            'case_id': test_case.id,
            'model_output': model_output,
            'ratings': {dim: None for dim in self.dimensions},  # 1-5
            'would_use_as_is': None,  # boolean
            'modifications_needed': None,  # free text
            'concerns': None,  # free text
            'reviewer_id': None,
            'review_time_seconds': None
        }

    def calculate_inter_rater_reliability(self, reviews: List[Dict]) -> float:
        """calculate agreement between multiple reviewers"""
        # cohen's kappa or krippendorff's alpha
        pass
```

**process:**
1. sample 100-200 test cases
2. generate model recommendations
3. 3 slps independently rate each
4. calculate average scores + inter-rater reliability
5. flag cases with high disagreement for discussion

#### method 2: key element checklist

```python
def evaluate_key_elements(model_output: str, test_case: TherapyTestCase) -> Dict:
    """check if recommendation contains required elements"""

    results = {
        'required_present': [],
        'required_missing': [],
        'red_flags_present': [],
        'element_score': 0.0
    }

    output_lower = model_output.lower()

    for element in test_case.key_elements_required:
        # use fuzzy matching or llm to check presence
        if element_present(output_lower, element):
            results['required_present'].append(element)
        else:
            results['required_missing'].append(element)

    for flag in test_case.red_flags:
        if flag_present(output_lower, flag):
            results['red_flags_present'].append(flag)

    # calculate score
    present = len(results['required_present'])
    total = len(test_case.key_elements_required)
    red_flag_penalty = len(results['red_flags_present']) * 0.2

    results['element_score'] = max(0, (present / total) - red_flag_penalty)

    return results
```

#### method 3: llm-as-judge (fast but verify)

```python
def llm_judge_recommendation(
    test_case: TherapyTestCase,
    model_output: str,
    judge_model: str = "gpt-4"
) -> Dict:
    """use strong llm to evaluate recommendation quality"""

    prompt = f"""you are an expert pediatric speech-language pathologist
evaluating ai-generated therapy recommendations.

## child profile
age: {test_case.child_profile['age']}
diagnosis: {test_case.child_profile['diagnosis']}
severity: {test_case.child_profile['severity']}
current goal: {test_case.child_profile['current_goal']}
sessions completed: {test_case.child_profile['sessions_completed']}
interests: {test_case.child_profile['preferred_activities']}
avoid: {test_case.child_profile['frustration_triggers']}

## speech sample
child said: "{test_case.speech_sample}"
target: "{test_case.target_word}"
error pattern: {test_case.error_pattern}

## ai recommendation to evaluate
{model_output}

## evaluation task
rate this recommendation on each dimension (1-5):

1. clinical_appropriateness: does it target the right sounds/patterns?
2. age_appropriateness: suitable for a {test_case.child_profile['age']}-year-old?
3. parent_clarity: can a non-expert parent follow this?
4. safety: any risk of harm, frustration, or regression?
5. evidence_basis: grounded in speech therapy research?

also provide:
- would_use_as_is: true/false
- critical_issues: list any serious problems
- suggested_improvements: what would you change?

respond in json format."""

    response = judge_model.generate(prompt)
    return parse_json(response)
```

**important:** llm-as-judge should be calibrated against expert reviews.

```python
def calibrate_llm_judge(expert_reviews: List[Dict], llm_reviews: List[Dict]) -> Dict:
    """measure how well llm judge correlates with expert slps"""

    correlations = {}
    for dimension in ['clinical_appropriateness', 'age_appropriateness', ...]:
        expert_scores = [r['ratings'][dimension] for r in expert_reviews]
        llm_scores = [r['ratings'][dimension] for r in llm_reviews]
        correlations[dimension] = pearson_correlation(expert_scores, llm_scores)

    return {
        'correlations': correlations,
        'reliable_dimensions': [d for d, c in correlations.items() if c > 0.7],
        'unreliable_dimensions': [d for d, c in correlations.items() if c < 0.5]
    }
```

### recommendation evaluation metrics summary

| metric | how measured | target | frequency |
|--------|--------------|--------|-----------|
| avg clinical appropriateness | expert review | > 4.0/5 | monthly |
| avg parent clarity | expert + parent review | > 4.2/5 | monthly |
| safety pass rate | expert review | 100% | every release |
| key element coverage | automated | > 85% | every inference |
| red flag rate | automated | < 1% | every inference |
| llm-judge correlation | vs expert | > 0.75 | calibrate monthly |

---

## layer 3: clinical outcome evaluation

the ultimate test: does the child actually improve?

### outcome metrics

#### 3.1 speech accuracy improvement

```python
@dataclass
class ProgressMeasurement:
    child_id: str
    measurement_date: datetime
    target_phoneme: str
    contexts_tested: List[str]  # initial, medial, final, blends

    # results
    accuracy_by_context: Dict[str, float]  # {'initial': 0.7, 'medial': 0.5, ...}
    overall_accuracy: float

    # standardized assessment (if available)
    gfta_percentile: Optional[int]  # goldman-fristoe test of articulation
    pcc_score: Optional[float]  # percent consonants correct
```

**tracking improvement:**
```python
def calculate_improvement(baseline: ProgressMeasurement,
                          current: ProgressMeasurement) -> Dict:
    """calculate improvement from baseline to current"""

    accuracy_change = current.overall_accuracy - baseline.overall_accuracy
    days_elapsed = (current.measurement_date - baseline.measurement_date).days

    return {
        'absolute_improvement': accuracy_change,
        'relative_improvement': accuracy_change / baseline.overall_accuracy if baseline.overall_accuracy > 0 else None,
        'improvement_per_week': accuracy_change / (days_elapsed / 7),
        'by_context': {
            ctx: current.accuracy_by_context.get(ctx, 0) - baseline.accuracy_by_context.get(ctx, 0)
            for ctx in ['initial', 'medial', 'final', 'blends']
        }
    }
```

#### 3.2 generalization

does improvement transfer beyond practice?

| level | description | measurement |
|-------|-------------|-------------|
| trained items | words practiced in sessions | direct accuracy |
| untrained items | new words with target sound | probe accuracy |
| conversational | spontaneous speech | sample analysis |
| environmental | home, school, social | parent/teacher report |

```python
generalization_assessment = {
    'trained_words': {
        'words': ['rabbit', 'red', 'run'],
        'accuracy': 0.85
    },
    'untrained_words': {
        'words': ['raccoon', 'rainbow', 'ring'],  # never practiced
        'accuracy': 0.60  # target: within 20% of trained
    },
    'conversational': {
        'sample_length_minutes': 10,
        '/r/_occurrences': 24,
        '/r/_correct': 14,
        'accuracy': 0.58
    }
}
```

#### 3.3 engagement metrics

```python
engagement_metrics = {
    # session completion
    'sessions_started': 100,
    'sessions_completed': 87,
    'completion_rate': 0.87,  # target: > 80%

    # session quality
    'avg_session_duration_minutes': 12.5,
    'avg_attempts_per_session': 35,
    'avg_engagement_score': 4.2,  # from gamification

    # consistency
    'sessions_per_week': 4.2,  # target: 4-5
    'longest_gap_days': 5,
    'streak_current': 12,

    # voluntary engagement
    'extra_practice_sessions': 8,  # beyond assigned
    'requested_sessions': 3  # child asked to practice
}
```

#### 3.4 family satisfaction

```python
satisfaction_survey = {
    # usability (1-5)
    'ease_of_use': 4.5,
    'child_enjoys_it': 4.2,
    'fits_schedule': 4.0,
    'technical_issues': 1.3,  # lower is better

    # perceived effectiveness (1-5)
    'seeing_improvement': 4.1,
    'recommendations_helpful': 4.3,
    'complements_therapy': 4.4,

    # likelihood (1-10)
    'would_recommend': 8.5,
    'would_continue': 8.8,

    # open feedback
    'most_helpful': "...",
    'biggest_frustration': "...",
    'suggestions': "..."
}
```

### outcome study design

#### comparison groups

```
ideal: randomized controlled trial (rct)
- group a: ai-assisted practice + standard therapy
- group b: standard therapy only (control)
- group c: ai-assisted practice only (if ethical)

pragmatic: pre-post with comparison
- measure before ai introduction
- measure after 3 months ai use
- compare to historical outcomes

minimum: single-arm pilot
- establish baseline
- introduce ai
- measure outcomes monthly
- track engagement
```

#### sample size requirements

```python
# power analysis for detecting meaningful improvement

from scipy import stats

def required_sample_size(
    expected_improvement: float,  # e.g., 0.15 (15% accuracy gain)
    baseline_variance: float,  # typical variance in outcomes
    power: float = 0.8,
    alpha: float = 0.05
) -> int:
    """calculate minimum n for statistical significance"""

    effect_size = expected_improvement / baseline_variance

    # using cohen's d convention
    # small: 0.2, medium: 0.5, large: 0.8

    from statsmodels.stats.power import TTestIndPower
    analysis = TTestIndPower()
    n = analysis.solve_power(
        effect_size=effect_size,
        power=power,
        alpha=alpha,
        alternative='two-sided'
    )

    return int(np.ceil(n))

# example: detecting 15% improvement
n_needed = required_sample_size(
    expected_improvement=0.15,
    baseline_variance=0.20
)
# typically: 30-50 per group for medium effects
```

#### timeline

```
month 0: baseline assessment
- standardized test (gfta-3 or similar)
- custom probe for target sounds
- parent questionnaire

months 1-3: intervention period
- weekly progress tracking via app
- bi-weekly automated assessments
- monthly parent check-in

month 3: midpoint assessment
- repeat standardized test
- custom probe
- parent questionnaire
- interim analysis

months 4-6: continued intervention
- adjust based on progress
- track engagement decay

month 6: outcome assessment
- final standardized test
- generalization probes
- parent questionnaire
- child feedback (age-appropriate)

month 9: follow-up
- retention assessment
- continued use patterns
```

### statistical analysis

```python
def analyze_outcomes(baseline: List[float],
                     outcome: List[float],
                     control_baseline: List[float] = None,
                     control_outcome: List[float] = None) -> Dict:
    """comprehensive outcome analysis"""

    results = {}

    # 1. within-group improvement
    improvement = [o - b for b, o in zip(baseline, outcome)]
    results['mean_improvement'] = np.mean(improvement)
    results['improvement_sd'] = np.std(improvement)

    # paired t-test
    t_stat, p_value = stats.ttest_rel(outcome, baseline)
    results['within_group_p'] = p_value
    results['significant_improvement'] = p_value < 0.05

    # effect size (cohen's d for paired samples)
    results['effect_size'] = np.mean(improvement) / np.std(improvement)

    # 2. if control group available: between-group comparison
    if control_baseline and control_outcome:
        control_improvement = [o - b for b, o in zip(control_baseline, control_outcome)]

        # independent t-test on improvements
        t_stat, p_value = stats.ttest_ind(improvement, control_improvement)
        results['between_group_p'] = p_value
        results['better_than_control'] = (
            np.mean(improvement) > np.mean(control_improvement) and p_value < 0.05
        )

        # effect size vs control
        pooled_sd = np.sqrt(
            (np.var(improvement) + np.var(control_improvement)) / 2
        )
        results['effect_vs_control'] = (
            np.mean(improvement) - np.mean(control_improvement)
        ) / pooled_sd

    # 3. responder analysis
    clinically_meaningful_threshold = 0.10  # 10% improvement
    results['responder_rate'] = sum(
        i >= clinically_meaningful_threshold for i in improvement
    ) / len(improvement)

    return results
```

### outcome metrics summary

| metric | target | minimum acceptable |
|--------|--------|-------------------|
| mean accuracy improvement | > 20% | > 10% |
| effect size (cohen's d) | > 0.8 (large) | > 0.5 (medium) |
| responder rate | > 75% | > 60% |
| generalization to untrained | > 70% of trained | > 50% |
| session completion rate | > 85% | > 70% |
| family satisfaction | > 4.0/5 | > 3.5/5 |
| would recommend (nps) | > 8/10 | > 7/10 |

---

## evaluation infrastructure

### data pipeline

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ production  │ → │ eval data   │ → │ analysis    │
│ sessions    │    │ warehouse   │    │ dashboards  │
└─────────────┘    └─────────────┘    └─────────────┘
      ↓                  ↓                  ↓
 - audio files      - anonymized       - wer trends
 - transcripts      - labeled          - clinical scores
 - recommendations  - stratified       - outcome tracking
 - outcomes         - versioned        - alerts
```

### evaluation schedule

| evaluation type | frequency | owner | time required |
|-----------------|-----------|-------|---------------|
| automated wer | continuous | system | real-time |
| key element check | continuous | system | real-time |
| llm-as-judge | daily batch | system | 2-3 hours |
| expert slp review | weekly | clinical team | 4-6 hours |
| outcome analysis | monthly | data team | 8 hours |
| full clinical study | quarterly | research team | ongoing |

### alerting thresholds

```python
alerts = {
    'critical': {
        'safety_flag_rate': {'threshold': 0.001, 'action': 'stop deployment'},
        'wer_spike': {'threshold': 0.25, 'action': 'page on-call'},
    },
    'warning': {
        'wer_increase': {'threshold': 0.05, 'action': 'investigate'},
        'clinical_score_drop': {'threshold': 0.3, 'action': 'review samples'},
        'engagement_drop': {'threshold': 0.15, 'action': 'ux review'},
    },
    'info': {
        'new_error_pattern': {'action': 'log for analysis'},
        'edge_case_failure': {'action': 'add to test set'},
    }
}
```

---

## test set management

### golden test set

a curated, stable set for consistent evaluation across model versions.

```python
golden_test_set = {
    'version': '1.0.0',
    'created_date': '2024-01-15',
    'n_samples': 500,

    'composition': {
        'age_2_3': 100,
        'age_4_5': 200,
        'age_6_8': 200,

        'articulation': 200,
        'phonological': 150,
        'fluency': 100,
        'apraxia': 50,

        'mild': 200,
        'moderate': 200,
        'severe': 100,

        'english': 300,
        'hindi': 100,
        'mixed': 100,
    },

    'update_policy': 'append only, never modify existing samples',
    'review_cycle': 'quarterly expert review for label accuracy'
}
```

### dynamic test set

samples from production that failed or were interesting.

```python
def add_to_dynamic_test_set(sample: Dict, reason: str):
    """add production sample to test set for future evaluation"""

    dynamic_test_set.append({
        'sample': anonymize(sample),
        'added_date': datetime.now(),
        'reason': reason,  # 'failure', 'edge_case', 'expert_flagged'
        'reviewed': False,
        'gold_label': None  # to be added by expert
    })
```

### test set versioning

```
test_sets/
├── golden/
│   ├── v1.0.0/
│   │   ├── samples.json
│   │   ├── metadata.json
│   │   └── checksums.md5
│   └── v1.1.0/  # added 50 new samples
├── dynamic/
│   ├── 2024-q1/
│   └── 2024-q2/
└── challenge/
    ├── severe_disorders/
    ├── noisy_environments/
    └── code_switching/
```

---

## reporting

### model release report template

```markdown
# model evaluation report: whisper-child-v2.1

## summary
- **recommendation:** approved for deployment / needs revision
- **overall wer:** 11.2% (target: < 12%)
- **critical issues:** none / [list]

## speech recognition
| category | v2.0 wer | v2.1 wer | change |
|----------|----------|----------|--------|
| overall | 12.8% | 11.2% | -1.6% ✓ |
| age 2-3 | 18.2% | 16.1% | -2.1% ✓ |
| severe | 28.5% | 24.2% | -4.3% ✓ |
| /r/ sound | 22.1% | 18.3% | -3.8% ✓ |

## regression check
- all categories within tolerance: yes/no
- regressions found: none / [list]

## therapy recommendations
- avg clinical score: 4.2/5 (n=100 expert reviews)
- safety pass rate: 100%
- key element coverage: 88%

## known limitations
- [list any identified weaknesses]

## deployment notes
- [any special considerations]
```

### monthly outcome dashboard

```
┌────────────────────────────────────────────────────────────┐
│ child speech therapy ai - monthly outcomes - nov 2024     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ active children: 127       sessions this month: 2,847     │
│ avg improvement: +18.2%    engagement rate: 84%           │
│                                                            │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ improvement distribution                             │   │
│ │ ████████████████████░░░░ 78% improved               │   │
│ │ ████░░░░░░░░░░░░░░░░░░░░ 15% no change              │   │
│ │ ██░░░░░░░░░░░░░░░░░░░░░░  7% declined               │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                            │
│ by disorder type:                                         │
│   articulation: +21.3%  phonological: +16.8%             │
│   fluency: +12.4%       apraxia: +9.2%                   │
│                                                            │
│ family satisfaction: 4.3/5  would recommend: 8.7/10      │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## appendix: clinical assessment alignment

### mapping to standardized tests

| ai metric | clinical equivalent | standardized test |
|-----------|---------------------|-------------------|
| phoneme accuracy | percent consonants correct (pcc) | gfta-3 |
| error patterns | phonological process analysis | caap-2 |
| intelligibility | intelligibility rating | ics |
| fluency rate | stuttering severity | ssi-4 |

### reporting for therapists

ai progress data should map to familiar clinical frameworks:

```python
def generate_therapist_report(child_data: Dict) -> str:
    """generate report in clinician-friendly format"""

    return f"""
## progress summary: {child_data['name']}
date range: {child_data['start']} - {child_data['end']}

### phoneme accuracy (comparable to pcc)
| target | baseline | current | change |
|--------|----------|---------|--------|
| /r/ initial | 23% | 67% | +44% |
| /r/ medial | 18% | 52% | +34% |
| /s/ blends | 45% | 71% | +26% |

### practice summary
- total sessions: 24
- avg duration: 14 min
- total practice time: 5.6 hours

### engagement
- completion rate: 92%
- self-initiated sessions: 6

### recommendations for next therapy session
based on ai analysis, suggest focusing on:
1. /r/ in medial position (lowest accuracy)
2. introduce /r/ blends (ready to progress)
3. generalization activities (high trained accuracy)

### data quality note
- confidence score avg: 0.87
- samples requiring review: 3/247
"""
```

---

## next steps

1. **build test set:** collect and label 500+ samples across categories
2. **implement automated evals:** deploy layer 1 + layer 2 automation
3. **recruit expert reviewers:** 3-5 slps for regular review rotation
4. **establish baselines:** run evals on current system before changes
5. **design outcome study:** protocol for clinical validation

---

*this framework should evolve as the system matures. update quarterly based on learnings.*
