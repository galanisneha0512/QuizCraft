from fastapi import APIRouter, HTTPException    # APIRouter lets us define routes in separate files
from pydantic import BaseModel                  # BaseModel is used to define request body structure
from typing import List                         # for type hints like List[str]
from services.gemini import generate_quiz       # import our gemini function

# Create a router - think of this like a mini app for quiz related routes
router = APIRouter()

# This class defines what the frontend must send in the request body
# Pydantic automatically validates the incoming data against this structure
class QuizRequest(BaseModel):
    text: str                   # the study material
    num_questions: int          # how many questions
    question_types: List[str]   # e.g. ["mcq", "true_false"]
    difficulty: str             # "easy", "medium", or "hard"

# POST /generate-quiz
# Frontend calls this endpoint with the study material and settings
@router.post("/generate_quiz")
async def generate_quiz_route(request: QuizRequest):

    # Basic validation - if text is empty return an error
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Study material cannot be empty.")
    
    # Validate question types - only allow known types
    valid_types = {"mcq", "true_false", "short_answer"}
    for t in request.question_types:
        if t not in valid_types:
            raise HTTPException(status_code=400, detail=f"Invalid question type: {t}")
        
    try:
        # Call our gemini service function with the request data
        questions = generate_quiz(
            text=request.text,
            num_questions=request.num_questions,
            questionTypes=request.question_types,
            difficulty=request.difficulty
        )

        # Return the questions as JSON response
        return { "questions": questions }
    
    except Exception as e:
        # If anything goes wrong (API error, JSON parse error etc.) return 500
        raise HTTPException(status_code=500, detail=f"Failed to generate quiz: {str(e)}")
    