import tweepy
import praw
import requests
import nltk
import spacy
from bs4 import BeautifulSoup
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Download NLTK resources
nltk.download("vader_lexicon")

# Load spaCy model for keyword extraction
nlp = spacy.load("en_core_web_sm")

# Initialize sentiment analyzer
sia = SentimentIntensityAnalyzer()

# Twitter API Authentication
TWITTER_BEARER_TOKEN = "your_twitter_bearer_token"
twitter_client = tweepy.Client(bearer_token=TWITTER_BEARER_TOKEN)

# Reddit API Authentication
reddit = praw.Reddit(
    client_id="your_reddit_client_id",
    client_secret="your_reddit_client_secret",
    user_agent="your_user_agent"
)

# LinkedIn Scraping (Public posts)
LINKEDIN_SEARCH_URL = "https://www.linkedin.com/search/results/content/?keywords="

def extract_keywords(text):
    """Extracts keywords from text using spaCy"""
    doc = nlp(text)
    keywords = [token.text for token in doc if token.pos_ in ["NOUN", "PROPN"]]
    return list(set(keywords))

def analyze_sentiment(text):
    """Returns sentiment score (-1 to 1) using VADER"""
    return sia.polarity_scores(text)["compound"]

def get_twitter_data(stock_symbol):
    """Fetches stock-related tweets and sentiment scores"""
    query = f"${stock_symbol} -is:retweet lang:en"
    tweets = twitter_client.search_recent_tweets(query=query, max_results=20, tweet_fields=["text"])

    sentiment_scores = []
    keyword_list = []
    mention_count = 0

    if tweets.data:
        for tweet in tweets.data:
            text = tweet.text
            mention_count += 1
            sentiment_scores.append(analyze_sentiment(text))
            keyword_list.extend(extract_keywords(text))

    return sentiment_scores, keyword_list, mention_count

def get_reddit_data(stock_symbol):
    """Fetches stock-related Reddit posts and sentiment scores"""
    subreddit = reddit.subreddit("stocks")
    posts = subreddit.search(stock_symbol, limit=20)

    sentiment_scores = []
    keyword_list = []
    mention_count = 0

    for post in posts:
        text = post.title + " " + post.selftext
        mention_count += 1
        sentiment_scores.append(analyze_sentiment(text))
        keyword_list.extend(extract_keywords(text))

    return sentiment_scores, keyword_list, mention_count

def get_linkedin_data(stock_symbol):
    """Scrapes public LinkedIn posts mentioning the stock"""
    url = f"{LINKEDIN_SEARCH_URL}{stock_symbol}"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    response = requests.get(url, headers=headers)
    sentiment_scores = []
    keyword_list = []
    mention_count = 0

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        posts = soup.find_all("p")  # Simplified scraping

        for post in posts:
            text = post.get_text()
            mention_count += 1
            sentiment_scores.append(analyze_sentiment(text))
            keyword_list.extend(extract_keywords(text))

    return sentiment_scores, keyword_list, mention_count

def assess_impact(avg_sentiment):
    """Determines if the stock is positively or negatively impacted"""
    if avg_sentiment > 0.1:
        return "Positively Impacted 🚀"
    elif avg_sentiment < -0.1:
        return "Negatively Impacted 📉"
    else:
        return "Neutral 🟡"

def analyze_stock(stock_symbol):
    """Analyzes stock mentions and sentiment across platforms"""
    twitter_scores, twitter_keywords, twitter_mentions = get_twitter_data(stock_symbol)
    reddit_scores, reddit_keywords, reddit_mentions = get_reddit_data(stock_symbol)
    linkedin_scores, linkedin_keywords, linkedin_mentions = get_linkedin_data(stock_symbol)

    all_scores = twitter_scores + reddit_scores + linkedin_scores
    all_keywords = twitter_keywords + reddit_keywords + linkedin_keywords
    total_mentions = twitter_mentions + reddit_mentions + linkedin_mentions

    avg_sentiment = sum(all_scores) / len(all_scores) if all_scores else 0
    impact = assess_impact(avg_sentiment)

    return {
        "Total Mentions": total_mentions,
        "Average Sentiment": round(avg_sentiment, 3),
        "Impact Assessment": impact,
        "Top Keywords": list(set(all_keywords))[:10]  # Top 10 unique keywords
    }

if __name__ == "__main__":
    stock = input("Enter stock symbol (e.g., TSLA): ")
    result = analyze_stock(stock)

    print("\nStock Sentiment Analysis")
    print("--------------------------")
    for key, value in result.items():
        print(f"{key}: {value}")
