from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.sentiment import analyze_sentiment

router = APIRouter()

class NewRequest(BaseModel):
    text: str

@router.post("/analyze-sentiment/")
def sentiment_analysis(request: NewRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text is required")
    
    sentiment = analyze_sentiment(request.text)
    return sentiment