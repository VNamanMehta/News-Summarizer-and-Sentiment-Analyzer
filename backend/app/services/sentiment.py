from textblob import TextBlob

def analyze_sentiment(text: str):
    """
    Perform sentiment analysis on the given text.

    Returns:
        - Polarity: A score between -1 (negative) to +1 (positive).
        - Sentiment Label: "Positive", "Slightly Positive", "Neutral", "Slightly Negative", or "Negative".
    """
    # Create a TextBlob object
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity

    # Classify sentiment based on polarity score
    if polarity > 0.25:
        sentiment = "Positive"
    elif 0.05 < polarity <= 0.25:
        sentiment = "Slightly Positive"
    elif -0.05 <= polarity <= 0.05:  # Smaller neutral range
        sentiment = "Neutral"
    elif -0.25 <= polarity < -0.05:
        sentiment = "Slightly Negative"
    else:
        sentiment = "Negative"

    return {"polarity": polarity, "sentiment": sentiment}
