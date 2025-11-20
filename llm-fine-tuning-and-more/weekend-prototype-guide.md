# weekend prototype: build a working speech therapy ai

**goal:** working demo in 48 hours using existing code + free tools

---

## two approaches

### approach 1: real-time audio interaction ⭐ (recommended)
- live conversation with ai
- immediate feedback
- more engaging for kids

### approach 2: voice note exchange (simpler fallback)
- record → send → get response
- easier to build
- good for testing

---

## approach 1: real-time prototype (48-hour build)

### tech stack
```
frontend: react + web speech api (browser)
backend: python flask/fastapi
speech recognition: openai whisper api or google gemini 2.0
llm: gemini 2.0 flash (multimodal)
deployment: local first, then railway/render (free tier)
```

---

### hour-by-hour breakdown

#### saturday morning (hours 1-4): setup

**hour 1: environment setup**

```bash
# create project
mkdir speech-therapy-proto
cd speech-therapy-proto

# backend setup
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on windows

# install dependencies
pip install fastapi uvicorn python-multipart openai google-generativeai python-dotenv websockets

# frontend setup
npx create-react-app frontend
cd frontend
npm install mic-recorder-to-mp3 react-mic
```

**hour 2: api keys**

1. get gemini api key: https://makersuite.google.com/app/apikey (free)
2. (optional) get openai key: https://platform.openai.com/api-keys

create `.env` file:
```
GEMINI_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here  # optional
```

**hour 3-4: backend foundation**

create `backend/main.py`:

```python
from fastapi import FastAPI, File, UploadFile, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from openai import OpenAI
import os
from dotenv import load_dotenv
import base64

load_dotenv()

app = FastAPI()

# enable cors for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# initialize apis
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel('gemini-2.0-flash')

# optional: whisper for better asr
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.post("/analyze-speech")
async def analyze_speech(audio: UploadFile = File(...)):
    """
    receives audio file, transcribes it, analyzes for therapy
    """
    # read audio
    audio_bytes = await audio.read()

    # option 1: use gemini for everything (simplest)
    response = gemini_model.generate_content([
        """you are a pediatric speech therapist.

        analyze this child's speech and provide:
        1. what the child said (transcription)
        2. target word/phrase (what they were trying to say)
        3. specific issue identified (e.g., r-sound substitution)
        4. one simple 2-minute exercise for today
        5. encouraging message for parent

        respond in json format:
        {
          "transcription": "...",
          "target": "...",
          "issue": "...",
          "exercise": "...",
          "parent_message": "...",
          "confidence": 0.85
        }
        """,
        {
            "mime_type": "audio/wav",  # or audio/mpeg, audio/mp3
            "data": base64.b64encode(audio_bytes).decode()
        }
    ])

    return response.text

@app.get("/health")
async def health():
    return {"status": "healthy"}

# real-time websocket endpoint (for live audio streaming)
@app.websocket("/ws/live")
async def websocket_live(websocket: WebSocket):
    await websocket.accept()

    try:
        while True:
            # receive audio chunk
            data = await websocket.receive_bytes()

            # process with gemini
            # (simplified - in production would buffer chunks)
            response = gemini_model.generate_content([
                "transcribe this audio briefly",
                {"mime_type": "audio/wav", "data": base64.b64encode(data).decode()}
            ])

            # send back
            await websocket.send_text(response.text)

    except Exception as e:
        print(f"websocket error: {e}")
        await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

#### saturday afternoon (hours 5-8): frontend

**hour 5-6: audio recording component**

create `frontend/src/components/AudioRecorder.js`:

```jsx
import React, { useState, useRef } from 'react';
import { ReactMic } from 'react-mic';

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    setAudioBlob(null);
    setAnalysis(null);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onStop = (recordedBlob) => {
    console.log('recorded:', recordedBlob);
    setAudioBlob(recordedBlob);
  };

  const analyzeAudio = async () => {
    if (!audioBlob) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('audio', audioBlob.blob, 'recording.wav');

    try {
      const response = await fetch('http://localhost:8000/analyze-speech', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      setAnalysis(result);
    } catch (error) {
      console.error('error:', error);
      alert('analysis failed. check backend is running.');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🎤 speech therapy ai - demo</h1>

      <div style={{ marginTop: '20px' }}>
        <ReactMic
          record={isRecording}
          className="sound-wave"
          onStop={onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={startRecording}
          disabled={isRecording}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            marginRight: '10px',
            backgroundColor: isRecording ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isRecording ? 'not-allowed' : 'pointer'
          }}
        >
          start recording
        </button>

        <button
          onClick={stopRecording}
          disabled={!isRecording}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: !isRecording ? '#ccc' : '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: !isRecording ? 'not-allowed' : 'pointer'
          }}
        >
          stop recording
        </button>
      </div>

      {audioBlob && (
        <div style={{ marginTop: '20px' }}>
          <h3>recorded audio:</h3>
          <audio src={audioBlob.blobURL} controls />

          <button
            onClick={analyzeAudio}
            disabled={loading}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              marginTop: '10px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'wait' : 'pointer'
            }}
          >
            {loading ? 'analyzing...' : 'analyze speech'}
          </button>
        </div>
      )}

      {analysis && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f0f0f0',
          borderRadius: '10px'
        }}>
          <h3>analysis results:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(analysis, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
```

**hour 7-8: integrate and test**

update `frontend/src/App.js`:

```jsx
import './App.css';
import AudioRecorder from './components/AudioRecorder';

function App() {
  return (
    <div className="App">
      <AudioRecorder />
    </div>
  );
}

export default App;
```

run both:

```bash
# terminal 1: backend
cd backend
python main.py

# terminal 2: frontend
cd frontend
npm start
```

#### saturday evening (hours 9-12): testing & iteration

- test with sample audio
- refine prompts to gemini
- add better error handling
- improve ui/ux

---

#### sunday morning (hours 13-18): real-time streaming

**this is the advanced version - makes it feel like a conversation**

update `backend/main.py` with better streaming:

```python
@app.websocket("/ws/realtime")
async def websocket_realtime(websocket: WebSocket):
    await websocket.accept()

    # maintain conversation state
    conversation_history = []
    audio_buffer = bytearray()

    try:
        while True:
            # receive audio chunk (streaming from client)
            message = await websocket.receive()

            if message["type"] == "websocket.disconnect":
                break

            # accumulate audio chunks
            if "bytes" in message:
                audio_buffer.extend(message["bytes"])

                # when buffer reaches threshold (e.g., 3 seconds of audio)
                if len(audio_buffer) > 48000 * 3:  # 3 sec at 16khz
                    # process accumulated audio
                    audio_data = bytes(audio_buffer)

                    # transcribe + analyze
                    result = await process_therapy_session(
                        audio_data,
                        conversation_history
                    )

                    # send back analysis
                    await websocket.send_json(result)

                    # update history
                    conversation_history.append({
                        "user_audio": audio_data,
                        "transcription": result["transcription"],
                        "ai_response": result["exercise"]
                    })

                    # clear buffer
                    audio_buffer.clear()

    except Exception as e:
        print(f"error: {e}")
    finally:
        await websocket.close()

async def process_therapy_session(audio_bytes, history):
    """process audio with context from previous attempts"""

    # build context from history
    context = "\n".join([
        f"attempt {i+1}: child said '{h['transcription']}'"
        for i, h in enumerate(history[-5:])  # last 5 attempts
    ])

    prompt = f"""you are a pediatric speech therapist in a live session.

previous attempts in this session:
{context if context else "this is the first attempt"}

analyze the new audio and provide:
1. transcription
2. is there improvement from previous attempts?
3. specific feedback for this attempt
4. next exercise (or continue current one)

respond in json format."""

    response = gemini_model.generate_content([
        prompt,
        {
            "mime_type": "audio/wav",
            "data": base64.b64encode(audio_bytes).decode()
        }
    ])

    return eval(response.text)  # parse json (use json.loads in production)
```

#### sunday afternoon (hours 19-24): polish & test

- add kid-friendly ui (colors, animations)
- add parent dashboard view
- test with real child audio samples
- add sample audio files for demo
- prepare demo script

---

## approach 2: voice note prototype (simpler, 24-hour build)

### tech stack
```
frontend: simple html/js (no react needed)
backend: flask or even just html + javascript
speech recognition: web speech api (browser-native, free!)
llm: gemini api
deployment: single html file (can run locally)
```

### ultra-simple single-file version

create `speech-therapy-demo.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>speech therapy ai - demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        button {
            padding: 15px 30px;
            font-size: 18px;
            margin: 10px 5px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            color: white;
        }
        .record { background-color: #4CAF50; }
        .stop { background-color: #f44336; }
        .analyze { background-color: #2196F3; }
        #results {
            margin-top: 30px;
            padding: 20px;
            background-color: #f0f0f0;
            border-radius: 10px;
            display: none;
        }
        #status {
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>🎤 speech therapy ai demo</h1>
    <p>click record, say a word, then analyze</p>

    <div id="status"></div>

    <button class="record" onclick="startRecording()">start recording</button>
    <button class="stop" onclick="stopRecording()" disabled>stop recording</button>
    <button class="analyze" onclick="analyzeAudio()" disabled>analyze speech</button>

    <div id="results"></div>

    <script>
        let recognition;
        let transcript = "";
        let isRecording = false;

        // use browser's built-in speech recognition
        if ('webkitSpeechRecognition' in window) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-IN';  // indian english

            recognition.onresult = (event) => {
                transcript = event.results[0][0].transcript;
                document.querySelector('.analyze').disabled = false;
                showStatus(`heard: "${transcript}"`, '#4CAF50');
            };

            recognition.onerror = (event) => {
                showStatus(`error: ${event.error}`, '#f44336');
            };

            recognition.onend = () => {
                isRecording = false;
                document.querySelector('.record').disabled = false;
                document.querySelector('.stop').disabled = true;
            };
        } else {
            showStatus('speech recognition not supported in this browser', '#f44336');
        }

        function startRecording() {
            recognition.start();
            isRecording = true;
            transcript = "";
            document.querySelector('.record').disabled = true;
            document.querySelector('.stop').disabled = false;
            document.querySelector('.analyze').disabled = true;
            showStatus('listening...', '#2196F3');
        }

        function stopRecording() {
            recognition.stop();
        }

        async function analyzeAudio() {
            if (!transcript) return;

            showStatus('analyzing with ai...', '#FF9800');
            document.querySelector('.analyze').disabled = true;

            // call gemini api
            try {
                const response = await fetch(
                    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{
                                    text: `you are a pediatric speech therapist.

                                    a child just said: "${transcript}"

                                    analyze this and provide (in simple language for parents):
                                    1. what specific sound/pattern might need work (if any)
                                    2. one simple exercise they can do right now
                                    3. encouraging feedback

                                    format as html paragraphs.`
                                }]
                            }]
                        })
                    }
                );

                const data = await response.json();
                const analysis = data.candidates[0].content.parts[0].text;

                // show results
                document.getElementById('results').innerHTML = `
                    <h3>child said: "${transcript}"</h3>
                    <div>${analysis}</div>
                `;
                document.getElementById('results').style.display = 'block';
                showStatus('analysis complete!', '#4CAF50');

            } catch (error) {
                showStatus('error analyzing. check api key.', '#f44336');
                console.error(error);
            }

            document.querySelector('.analyze').disabled = false;
        }

        function showStatus(message, color) {
            const status = document.getElementById('status');
            status.textContent = message;
            status.style.backgroundColor = color;
            status.style.color = 'white';
        }
    </script>
</body>
</html>
```

**to use:**
1. replace `YOUR_API_KEY` with your gemini api key
2. open file in chrome/edge browser
3. allow microphone access
4. click record, speak, analyze

---

## existing code repositories to leverage

### 1. whisper web demo
- **repo:** https://github.com/openai/whisper
- **what to take:** whisper integration code
- **stars:** 70k+

### 2. voice-chatgpt
- **repo:** https://github.com/platelminto/chatgpt-conversation
- **what to take:** real-time audio streaming setup
- **useful:** websocket audio handling

### 3. speech-to-text-with-openai
- **repo:** https://github.com/ggerganov/whisper.cpp
- **what to take:** optimized whisper inference (c++)
- **useful:** if need fast local inference

### 4. react-voice-recorder
- **repo:** https://github.com/michelequeiroz/react-mic
- **what to take:** audio recording component
- **npm:** `react-mic`

### 5. gemini-pro-examples
- **repo:** https://github.com/google/generative-ai-python
- **what to take:** gemini api examples
- **useful:** official google examples

### 6. speech-therapy-app-template
- **search:** github "speech therapy" + "react"
- **found:** https://github.com/search?q=speech+therapy+react
- **many:** app templates, ui components

---

## weekend timeline (realistic)

### saturday
- 9am-12pm: setup, get apis working, basic backend
- 12pm-1pm: lunch + testing apis
- 1pm-5pm: build frontend, basic ui
- 5pm-6pm: dinner
- 6pm-10pm: integration, first working version

### sunday
- 9am-12pm: add real-time streaming (if time)
- 12pm-1pm: lunch
- 1pm-5pm: polish ui, add sample data, testing
- 5pm-7pm: prepare demo, test with family member
- 7pm-8pm: document, take screenshots/video

---

## testing without child speech data

use these resources:

### 1. myst dataset samples
- download: https://myst.cemantix.org
- includes: real child speech audio

### 2. synthesize test audio
use google text-to-speech api to create test samples:

```python
from google.cloud import texttospeech

client = texttospeech.TextToSpeechClient()

# create child-like voice
voice = texttospeech.VoiceSelectionParams(
    language_code="en-IN",
    ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL,
    name="en-IN-Wavenet-D"  # child-like voice
)

# synthesize "wabbit" for testing
synthesis_input = texttospeech.SynthesisInput(text="wabbit")
audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.MP3,
    pitch=-5.0,  # higher pitch = younger voice
    speaking_rate=0.9  # slightly slower
)

response = client.synthesize_speech(
    input=synthesis_input,
    voice=voice,
    audio_config=audio_config
)

with open("test_audio_wabbit.mp3", "wb") as out:
    out.write(response.audio_content)
```

### 3. record yourself
- speak like a child (slower, simplified)
- intentionally mispronounce (wabbit, tat, etc.)
- test the pipeline

### 4. ask family with kids
- get consent from friends/family
- record 5-10 samples for testing
- don't need clinical data for prototype

---

## deployment (optional, if demo works)

### free hosting options:

**1. render.com**
```bash
# backend
git push
# auto-deploys from github

# frontend
npm run build
# upload build folder
```

**2. railway.app**
- connect github repo
- auto-deploys
- free $5/month credit

**3. vercel (frontend only)**
```bash
npm install -g vercel
vercel deploy
```

---

## demo script (for showing others)

1. **intro (30 sec):**
   "this is a prototype speech therapy ai. parents can use it at home between therapy sessions."

2. **demonstrate (2 min):**
   - click record
   - say "wabbit" (mispronounced "rabbit")
   - click analyze
   - show ai feedback: "detected r-sound substitution, here's an exercise"

3. **explain value (1 min):**
   "ai gives immediate feedback, tracks progress, suggests exercises. fraction of the cost of extra therapy sessions."

4. **next steps (30 sec):**
   "this is basic version. real version will fine-tune on indian child speech, add games, track progress over time."

---

## troubleshooting common weekend issues

### issue 1: cors errors
```python
# add to backend
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in production, specify exact origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### issue 2: audio format issues
```python
# install ffmpeg for audio conversion
# mac: brew install ffmpeg
# ubuntu: apt-get install ffmpeg

# convert audio format
from pydub import AudioSegment
audio = AudioSegment.from_file(uploaded_file)
audio.export("converted.wav", format="wav")
```

### issue 3: gemini api rate limits
- free tier: 60 requests/minute
- solution: add rate limiting, or pay $0 for more quota

### issue 4: microphone permissions
- browsers require https for microphone (except localhost)
- solution: use localhost for demo, or deploy with https

---

## what you'll have by sunday night

✅ working web app
✅ records audio (voice notes or real-time)
✅ transcribes speech
✅ analyzes for therapy needs
✅ suggests exercises
✅ all with ui you can demo

**ready to iterate from there!**

---

*this is a prototype roadmap - adapt based on your skills (python vs javascript) and what works best*
