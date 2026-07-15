from fastapi import FastAPI                         # FastAPI is the main framework
from fastapi.middleware.cors import CORSMiddleware  # CORS allows frontend to talk to backend
from routes.quiz import router as quiz_router       # import our quiz routes

# Create FastAPI app instance
app = FastAPI()

# CORS configuration
# Without this, the browser will block requests from React (localhost:5173) to FastAPI (localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173"],   # only allow requests from our React app
    allow_credentials=True,
    allow_methods=["*"],                       # allow all HTTP methods (GET, POST etc.)
    allow_headers=["*"],                       # allow all headers
)

# Register the quiz router
# All routes in quiz.py will now be available under /api
# e.g. /generate-quiz becomes /api/generate-quiz

app.include_router(quiz_router, prefix="/api")

# Root endpoint — just to confirm the server is running
@app.get("/")
def root():
    return {"message": "QuizCraft backend is running!"}