import os                                        # to read environment variables
import json                                      # to parse the AI response into a Python dict
from google import genai                         # Gemini SDK
from dotenv import load_dotenv                   # to load variables from .env file

load_dotenv()                                    # loads .env file so we can use os.getenv()

# Configure the Gemini SDK with our API key
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def generate_quiz(text : str, num_questions: int, questionTypes: list, difficulty: str):
    """
    Sends study material to Gemini and gets back quiz questions as JSON.
    
    text           -> the study material pasted or uploaded by the user
    num_questions  -> how many questions to generate
    question_types -> list like ["mcq", "true_false", "short_answer"]
    difficulty     -> "easy", "medium", or "hard"
    """
     # Convert list to readable string for the prompt e.g. ["mcq", "true_false"] -> "mcq, true_false"

    types_str = ", ".join(questionTypes)

    # This is the prompt we send to Gemini
    # We tell it exactly what format to return so we can parse it easily
    prompt = f"""
    You are a quiz generator. Based on the study material below, generate {num_questions} quiz questions.

    Requirements:
    - Difficulty level: {difficulty}
    - Question types to include: {types_str}
    - Mix the question types evenly if multiple types are selected

    Return ONLY a valid JSON array. No explanation, no markdown, no code blocks.
    Each object in the array must follow this exact format depending on type:

    For mcq:
    {{
        "type": "mcq",
        "question": "question text here",
        "options": ["option A", "option B", "option C", "option D"],
        "answer": "correct option here"
    }}
    
    For true_false:
    {{
        "type": "true_false",
        "question": "question text here",
        "answer": "True" or "False"
    }}

    For short_answer:
    {{
        "type": "short_answer",
        "question": "question text here",
        "answer": "expected answer here"
    }}


    Study Material:
    {text}
    """

    # Send the prompt to Gemini and wait for response
    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=prompt,
    )

    # response.text contains the raw text returned by Gemini
    raw = response.text.strip()

    # Sometimes Gemini wraps response in ```json ... ``` even if we ask it not to
    # This removes those markdown code blocks if present   
    if raw.startswith("```"):
        raw = raw.split("```")[1]   # remove opening ```json
        if raw.startswith("json"):
            raw = raw[4:]                 # remove the word "json" after ```

    # Parse the cleaned string into a Python list of dicts
    questions = json.loads(raw)

    return questions    # returns a list of question objects