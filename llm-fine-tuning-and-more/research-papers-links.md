# comprehensive research papers & resources

## child speech recognition - whisper fine-tuning

### 1. adaptation of whisper models to child speech recognition
- **authors:** jain et al., 2023
- **link:** https://arxiv.org/abs/2307.13008
- **pdf:** https://arxiv.org/pdf/2307.13008
- **key findings:**
  - whisper large-v2 achieved 2.88% wer after fine-tuning
  - wav2vec2 models outperformed whisper in some cases
  - fine-tuning significantly improves child speech recognition
- **code:** check paper for github links
- **why read:** foundational paper for your approach

### 2. automatic speech recognition tuning for child speech in the classroom
- **authors:** colorado ai institute, 2024
- **link:** https://www.colorado.edu/research/ai-institute/sites/default/files/attached-files/childasr_icassp24_camera-ready_0.pdf
- **key findings:**
  - 38% relative reduction in wer (down to 9.2% on myst)
  - classroom speech still challenging (54% wer)
  - noisy environments need special handling
- **why read:** practical deployment insights

### 3. kid-whisper: towards bridging the performance gap in asr for children vs. adults
- **authors:** aaai/acm conference on ai, ethics, and society
- **link:** https://ojs.aaai.org/index.php/AIES/article/view/31618
- **key findings:**
  - whisper-small: 13.93% → 9.11% wer
  - whisper-medium: 13.23% → 8.61% wer
  - improvements generalize to unseen datasets
- **code:** likely on github (search "kid-whisper github")
- **why read:** shows generalization is possible

### 4. sparsely shared lora on whisper for child speech recognition
- **authors:** 2024
- **link:** https://arxiv.org/abs/2309.11756
- **html:** https://arxiv.org/html/2309.11756v2
- **key findings:**
  - lora works well for low-resource child speech
  - tested on chinese child speech
  - parameter-efficient fine-tuning is viable
- **code:** check paper
- **why read:** your exact approach (lora + child speech)

### 5. towards better recognition of spontaneous children's speech: speaker-clustering fine-tuning of whisper
- **link:** https://ieeexplore.ieee.org/document/10734799/
- **key findings:**
  - speaker clustering improves performance
  - spontaneous speech harder than read speech
- **why read:** addresses real-world scenarios

### 6. improving end-to-end models for children's speech recognition
- **link:** https://www.mdpi.com/2076-3417/14/6/2353
- **why read:** comprehensive overview of approaches

### 7. robust speech recognition via large-scale weak supervision (original whisper paper)
- **authors:** openai, 2022
- **link:** https://cdn.openai.com/papers/whisper.pdf
- **why read:** understand base model capabilities

## indian language speech recognition

### 8. hindi asr benchmark dataset for speech recognition
- **link:** https://aikosh.indiaai.gov.in/home/datasets/details/hindi_asr_benchmark_dataset_for_speech_recognition_commonvoice_hindi.html
- **dataset:** hindi speech data
- **why relevant:** baseline for indian language asr

### 9. a robust multi-accent benchmark for evaluating hindi asr systems
- **link:** https://arxiv.org/html/2408.11440v1
- **key findings:**
  - 12.5 hours hindi audio
  - 132 speakers across 83 districts
  - multiple accent evaluation
- **why read:** understand indian accent diversity

### 10. nptel2020: speech2text dataset for indian-english accent
- **authors:** ai4bharat
- **link:** https://github.com/AI4Bharat/NPTEL2020-Indian-English-Speech-Dataset
- **dataset:** indian-english speech
- **why relevant:** addresses indian accent in english

### 11. hindi speech corpora: a review
- **link:** https://ieeexplore.ieee.org/document/6709872
- **why read:** comprehensive overview of available data

### 12. summary of hindi data (openslr)
- **link:** https://www.openslr.org/103/
- **dataset:** hindi speech resources
- **free access**

## indian child speech (specific)

### 13. a dataset for measuring reading levels in india at scale
- **link:** https://arxiv.org/pdf/1912.04381
- **key data:**
  - 5,301 subjects
  - 81,330 labeled audio clips
  - hindi, marathi, english
  - children's reading assessment
  - over 11,000 videos, 32 hours of children's speech (google)
- **why critical:** one of few indian child speech datasets
- **access:** check paper for download instructions

### 14. non-native children speech mini corpus
- **link:** https://www.kaggle.com/datasets/kodaliradha20phd7093/nonnative-children-speech-mini-corpus
- **description:** indian children speaking english
- **access:** free on kaggle
- **why relevant:** exactly your use case (indian children)

### 15. microsoft speech corpus (indian languages)
- **link:** https://www.microsoft.com/en-us/download/details.aspx?id=105292
- **languages:** gujarati, telugu, tamil
- **note:** adult speech, but useful for language models
- **access:** free download from microsoft

### 16. text-to-speech dataset for indian languages
- **link:** http://cvit.iiit.ac.in/research/projects/cvit-projects/text-to-speech-dataset-for-indian-languages
- **why relevant:** phonetic resources for indian languages

## ai4bharat resources (critical for indian languages)

### 17. ai4bharat main site
- **link:** https://ai4bharat.iitm.ac.in/
- **models:** https://models.ai4bharat.org/
- **what they have:**
  - indicwav2vec (multilingual pre-trained, 40 indian languages)
  - indicwhisper (whisper fine-tuned for indian languages)
  - indic-tts (text-to-speech for 22 official indian languages)
- **why critical:** best open-source indian language ai resources

### 18. indicvoices-r: massive multilingual multi-speaker speech corpus
- **link:** https://arxiv.org/html/2409.05356v2
- **what:** large-scale indian language speech data
- **includes:** age, gender, style diversity (but not child-specific)

### 19. bhasaanuvaad: speech translation dataset for 14 indian languages
- **link:** https://arxiv.org/html/2411.04699v1
- **why relevant:** multilingual capabilities

### 20. the indic nlp catalog
- **link:** https://ai4bharat.github.io/indicnlp_catalog/
- **what:** comprehensive list of indian language nlp resources

## datasets for child speech (english, international)

### 21. myst (my science tutor) dataset ⭐
- **link:** https://myst.cemantix.org
- **ldc link:** https://catalog.ldc.upenn.edu/LDC2021S05
- **size:** 470 hours
- **speakers:** 1,371 students (grades 3-5)
- **access:** free for non-commercial
- **paper:** https://arxiv.org/abs/2309.13347
- **why critical:** largest free child speech dataset

### 22. childes database ⭐
- **link:** https://childes.talkbank.org
- **modern interface:** http://childes-db.stanford.edu
- **paper:** https://link.springer.com/article/10.3758/s13428-018-1176-7
- **what:** largest child language database (since 1984)
- **includes:** typical + atypical development, multiple languages
- **access:** free

### 23. cslu kids' speech
- **link:** https://catalog.ldc.upenn.edu/LDC2007S18
- **what:** structured speech tasks
- **access:** ldc (paid)

### 24. ultrasuite repository
- **link:** https://ultrasuite.github.io
- **special:** includes ultrasound tongue imaging
- **why relevant:** understand articulation mechanics

### 25. google audioset - child speech
- **link:** https://research.google.com/audioset/dataset/child_speech_kid_speaking.html
- **what:** large-scale audio dataset
- **access:** free

### 26. kaggle kids speech dataset
- **link:** https://www.kaggle.com/datasets/mirfan899/kids-speech-dataset
- **access:** free
- **why:** quick experiments

## fine-tuning methodologies

### 27. lora: low-rank adaptation of large language models
- **authors:** hu et al., microsoft, 2021
- **link:** https://arxiv.org/abs/2106.09685
- **why read:** understand lora fundamentals
- **code:** https://github.com/microsoft/LoRA

### 28. qlora: efficient finetuning of quantized llms
- **authors:** dettmers et al., 2023
- **link:** https://arxiv.org/abs/2305.14314
- **why read:** most efficient fine-tuning approach
- **code:** https://github.com/artidoro/qlora

### 29. parameter-efficient fine-tuning of large-scale pre-trained language models
- **link:** https://www.nature.com/articles/s42256-023-00626-4
- **why read:** comprehensive overview of peft methods

## medical/healthcare llm fine-tuning

### 30. large language models in healthcare and medical applications: a review
- **link:** https://pmc.ncbi.nlm.nih.gov/articles/PMC12189880/
- **why read:** healthcare-specific considerations

### 31. med42 - evaluating fine-tuning strategies for medical llms
- **link:** https://arxiv.org/html/2404.14779v1
- **why read:** full-parameter vs parameter-efficient comparison

### 32. openmedlm: prompt engineering can out-perform fine-tuning
- **link:** https://pmc.ncbi.nlm.nih.gov/articles/PMC11187169/
- **why read:** when you might not need fine-tuning

### 33. fine-tuning large language models for specialized use cases (mayo clinic)
- **link:** https://www.mcpdigitalhealth.org/article/S2949-7612(24)00114-7/fulltext
- **why read:** practical healthcare deployment

## regulatory & compliance

### 34. the imperative for regulatory oversight of llms in healthcare
- **journal:** npj digital medicine
- **link:** https://www.nature.com/articles/s41746-023-00873-0
- **why read:** understand regulatory landscape

### 35. hipaa compliance ai: using llms safely in healthcare
- **link:** https://www.techmagic.co/blog/hipaa-compliant-llms
- **why read:** practical compliance guide

### 36. embracing large language models for medical applications
- **link:** https://pmc.ncbi.nlm.nih.gov/articles/PMC10292051/
- **why read:** opportunities and challenges

## llm evaluation

### 37. development and validation of llm rating scales for therapy sessions
- **link:** https://pmc.ncbi.nlm.nih.gov/articles/PMC12343941/
- **scientific reports:** https://www.nature.com/articles/s41598-025-14923-y
- **why read:** evaluating therapy recommendations

### 38. the impact of fine-tuning llms on automated therapy quality
- **link:** https://www.nature.com/articles/s44184-025-00159-1
- **why read:** quality assessment methods

### 39. llm evaluation: metrics, methodologies, best practices
- **link:** https://www.datacamp.com/blog/llm-evaluation
- **why read:** practical evaluation guide

### 40. comprehensive guide to evaluating large language models
- **link:** https://www.singlestore.com/blog/complete-guide-to-evaluating-large-language-models/
- **why read:** technical evaluation methods

### 41. evaluating large language models (toloka)
- **link:** https://toloka.ai/blog/evaluating-llms/
- **why read:** practical frameworks

## autism & developmental disorders

### 42. breaking barriers: ai and assistive technology in autism care
- **link:** https://pmc.ncbi.nlm.nih.gov/articles/PMC10817661/
- **why read:** ai applications in autism intervention

### 43. ai-powered autism diagnosis and intervention
- **context:** cognoa (mita) approach
- **why relevant:** fda approval pathway for pediatric ai

## speech assessment clinical methods

### 44. speech assessment (statpearls)
- **link:** https://www.ncbi.nlm.nih.gov/books/NBK559025/
- **why read:** clinical evaluation standards

### 45. recent advances in speech language models: a survey
- **link:** https://arxiv.org/html/2410.03751v1
- **why read:** state of the art overview

## tutorials & practical guides

### 46. fine-tune whisper for multilingual asr (hugging face)
- **link:** https://huggingface.co/blog/fine-tune-whisper
- **why read:** step-by-step tutorial with code

### 47. hugging face nlp course
- **link:** https://huggingface.co/course
- **why read:** free comprehensive course

### 48. fast.ai practical deep learning for coders
- **link:** https://course.fast.ai/
- **why read:** hands-on approach to deep learning

## youtube channels & video resources

### 49. 3blue1brown - neural networks
- **link:** https://www.youtube.com/c/3blue1brown
- **specific:** "neural networks" series
- **why watch:** intuitive understanding of fundamentals

### 50. andrej karpathy - neural networks: zero to hero
- **link:** https://www.youtube.com/c/andrejkarpathy
- **why watch:** build from scratch understanding

### 51. weights & biases - ml evaluation
- **link:** https://www.youtube.com/c/weightsandbiases
- **why watch:** evaluation and experiment tracking

---

## recommended reading order for your project

### week 1: understand the foundation
1. whisper paper (#7) - understand base model
2. kid-whisper paper (#3) - see it applied to children
3. adaptation of whisper (#1) - technical approach

### week 2: indian language context
4. ai4bharat overview (#17) - indian language resources
5. hindi asr benchmark (#9) - accent diversity
6. indian child reading dataset (#13) - your demographic

### week 3: fine-tuning methods
7. lora paper (#27) - efficient fine-tuning
8. qlora paper (#28) - most practical approach
9. hugging face whisper tutorial (#46) - hands-on

### week 4: evaluation & deployment
10. llm evaluation guide (#39) - how to measure
11. therapy llm validation (#37) - clinical assessment
12. healthcare compliance (#35) - regulatory requirements

### ongoing: practical implementation
- hugging face course (#47)
- fast.ai course (#48)
- youtube tutorials (#49-51)

---

## papers most relevant to your specific use case

### top 5 must-reads:
1. **adaptation of whisper models to child speech** (#1)
   - your exact technical approach

2. **indian child reading dataset** (#13)
   - only dataset with indian children's speech

3. **qlora paper** (#28)
   - how you'll actually fine-tune affordably

4. **llm evaluation in therapy** (#37)
   - how to validate recommendations

5. **ai4bharat resources** (#17)
   - essential for indian language support

### gap identified:
**no comprehensive dataset of indian children with speech delays/disorders exists publicly**

this is actually an opportunity:
- your clinic's data is uniquely valuable
- you could publish this dataset (anonymized, with consent)
- contribute to research community
- establish your clinic as leader in this space

---

## additional resources to explore

### github repositories:
- openai/whisper: https://github.com/openai/whisper
- huggingface/transformers: https://github.com/huggingface/transformers
- microsoft/lora: https://github.com/microsoft/LoRA
- ai4bharat models: https://github.com/AI4Bharat

### communities:
- hugging face discord: https://hf.co/join/discord
- r/machinelearning: https://reddit.com/r/machinelearning
- eleutherai discord: https://www.eleuther.ai/get-involved

### conferences to follow:
- interspeech (speech technology)
- icassp (acoustics, speech, signal processing)
- aaai (ai applications)
- ml4h (machine learning for health)

---

*this is a living document - will update as new papers emerge*
