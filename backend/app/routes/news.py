from datetime import datetime
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.news_fetcher import fetch_rss_news, extract_full_article
from app.services.summarizer import summarize_article
from app.services.sentiment import analyze_sentiment
from app.tasks import trending_news_cache, update_trending_news

router = APIRouter()

@router.get("/trending/")
def default_rss_feed_articles():
    """
    Returns the cached trending news for the day.
    If not available (server restarted), fetch and store it.
    """
    today = datetime.now().date()

    if trending_news_cache["date"] != today:
        update_trending_news() # update the cache

    if not trending_news_cache["news"]:
         raise HTTPException(status_code=404, detail="No news available")
    
    return trending_news_cache["news"]

class NewRequest(BaseModel):
     url: str

@router.post("/summarize/")
def user_entered_link_article_summary(request: NewRequest):

    article = extract_full_article(request.url)
    
    if "Error" in article:
        raise HTTPException(status_code=400, detail=article)
    
    summary = summarize_article(article)
    
    if not summary:
        raise HTTPException(status_code=400, detail="could not summarize the article")
    
    sentiment = analyze_sentiment(summary)

    if not sentiment:
            raise HTTPException(status_code=400, detail="Failed to get the sentiment")

    return {"summary": summary, "sentiment": sentiment}