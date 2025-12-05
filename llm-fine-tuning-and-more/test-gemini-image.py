from google import genai
from google.genai import types
import base64

# Configure client
client = genai.Client(api_key="AIzaSyAeoqIhD47oeTlDqR3VXlvnqOvC4dWIvOs")

prompt = """A warm, glowing sun shining rays down onto a simplified map outline of India. 

Style: Clean line art, technical illustration style like architectural drawings.
Colors: Warm sunshine palette - orange, golden yellow, soft coral.
Background: Light cream/warm white with subtle grid pattern.
Sun: Radiating rays/beams with warmth and optimism.
India map: Simple, elegant geographic outline.
Mood: Warmth, hope, new beginnings.
No text or labels."""

# Try with gemini-2.5-flash-image
response = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE", "TEXT"]
    )
)

# Save the image
for part in response.candidates[0].content.parts:
    if part.inline_data:
        image_data = base64.b64decode(part.inline_data.data)
        with open("/Users/V/workinprogmess/how-things-work/.conductor/calgary/llm-fine-tuning-and-more/deck-images/slide1-sun-india.png", "wb") as f:
            f.write(image_data)
        print("Image saved successfully to deck-images/slide1-sun-india.png")
    elif part.text:
        print(f"Text: {part.text}")
