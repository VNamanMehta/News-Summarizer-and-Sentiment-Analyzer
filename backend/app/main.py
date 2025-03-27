# Entry point for fastapi app

from fastapi import FastAPI
from app.routes import news, sentiment
from app.tasks import update_trending_news, start_scheduler
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="News Summarizer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET","POST"],
    allow_headers=["*"]
)

start_scheduler()
update_trending_news()

app.include_router(news.router, prefix="/news", tags=["News"])
app.include_router(sentiment.router, prefix="/sentiment", tags=["Sentiment Analysis"])


@app.get("/")
def root():
    return {"message": "Welcome to the News Summarizer API"}