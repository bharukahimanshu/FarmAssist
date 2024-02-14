import requests
import os
from dotenv import load_dotenv


def weather_fetch(city):
    load_dotenv()
    city = city
    api_key = os.getenv("weather_api_key")
    base_url = "http://api.openweathermap.org/geo/1.0/direct?q={city_name}&appid={API_key}&limit=1"
    complete_url = base_url.format(city_name=city, API_key=api_key)
    response = requests.get(complete_url)
    x = response.json()
    lat = x[0]["lat"]
    lon = x[0]["lon"]
    base_url = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&"
    complete_url = base_url.format(lat=lat, lon=lon) + "appid=" + api_key
    response = requests.get(complete_url)
    x = response.json()
    y = x["main"]
    print(response)
    temperature = round((y["temp"] - 273.15), 2)
    humidity = y["humidity"]
    return temperature, humidity
