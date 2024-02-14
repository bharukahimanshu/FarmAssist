from newsdataapi import NewsDataApiClient
import os
from dotenv import load_dotenv


def news_fetch(nextPage):
    load_dotenv()
    newsapi = NewsDataApiClient(apikey=os.getenv('newsdata_api_key'))
    if nextPage == "1":
        response = newsapi.news_api(
            country="in", q="Agricultutre OR Farming OR Farmers", language="en,hi")
    else:
        response = newsapi.news_api(
            country="in", q="Agricultutre OR Farming OR Farmers", language="en,hi", page=nextPage)
    return response
