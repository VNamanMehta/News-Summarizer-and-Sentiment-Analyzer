from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from app.services.news_fetcher import fetch_rss_news, extract_full_article
from app.services.sentiment import analyze_sentiment
from app.services.summarizer import summarize_article

trending_news_cache = {"date": None, "news":[]}

def update_trending_news():
    """
    Fetch, summarize, and analyze sentiment for trending news.
    This runs once daily and updates the cache.
    """
    print("updating the trending news ...")
    news_list = fetch_rss_news()
    if not news_list:
        print("No news found")
        return
    
    summarized_news = []

    for news in news_list:
        article = extract_full_article(news["link"])
        if "Error" in article:
            continue

        summary = summarize_article(article)
        sentiment = analyze_sentiment(summary)

        summarized_news.append({
            "title": news["title"],
            "summary": summary,
            "sentiment": sentiment,
            "published": news["published"]
        })

        # store data in memory cache

    trending_news_cache["date"] = datetime.now().date()
    trending_news_cache["news"] = summarized_news

    print("Trending news updated successfully")

def start_scheduler():
    """
    Starts the scheduler to update trending news once per day.
    """
    scheduler = BackgroundScheduler()
    scheduler.add_job(update_trending_news,"cron", hour=0)
    scheduler.start()