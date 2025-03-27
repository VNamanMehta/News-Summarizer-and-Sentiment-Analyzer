# this file is used to get the rss feed and extract the full article from the link provided by the rss

from turtle import title
import feedparser
import newspaper

#note that rss give only the title, link, publish date, description and not the entire article
RSS_FEEDS = [
    "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
    "https://www.thehindu.com/feeder/default.rss",
    "https://feeds.bbci.co.uk/news/rss.xml"
]

def fetch_rss_news():
    # fetch the rss feed using feedparser
    news_list = []
    for url in RSS_FEEDS:
        feed = feedparser.parse(url)
        for entry in feed.entries[:5]:
            '''
            getattr(object, "attribute_name", default_value)
            If entry.published exists, it will be used.
            If entry.published does not exist, it tries entry.pubDate.
            If neither exists, it defaults to "Unknown Date".
            '''
            news_list.append({
                "title": entry.title,
                "link": entry.link,
                "published": getattr(entry, "published", getattr(entry, "pubDate","Unknown Date"))
            })
    return news_list

def extract_full_article(url):
    # Extract full articles using newspaper3k
    try:
        article = newspaper.Article(url)
        article.download()
        article.parse()
        if not article.text.strip():
            return "Error: Empty article text"
        return article.text
    except Exception as e:
        return f"Error extracting the article: {e}"