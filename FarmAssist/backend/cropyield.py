import pickle
from weather import weather_fetch
from rain import rain_info
import json
import pandas as pd
rainfall_data = rain_info()


with open('../ML/columns.json', 'r') as f:
    data = json.load(f)
crop_yield_model_path = "./Models/DecisionTree.pkl"
crop_yield_model = pickle.load(open(crop_yield_model_path, "rb"))


def crop_yield(formdata):
    crop = formdata["crop"]
    area = int(formdata["area"])
    season = formdata["season"]
    city = formdata["city"]
    temperature, humidity = weather_fetch(city)
    rainfall = rainfall_data[rainfall_data["DIST"] == city][season].values[0]
    columns = [index for index in data]
    df = pd.DataFrame(columns=columns)
    df.loc[0] = 0
    df["Year"] = 2016
    df[city] = 1
    df[season] = 1
    df[crop] = 1
    df["Area"] = area
    df["Temperature"] = temperature
    df["Rainfall"] = rainfall
    my_prediction = crop_yield_model.predict(df)
    prediction = my_prediction[0]
    return prediction, temperature, humidity, rainfall
