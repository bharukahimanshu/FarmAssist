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


def crop_yield(formdata, temperature, rainfall, year, season):
    crop = formdata['crop']
    area = formdata['area']
    city = formdata['city']
    if (season == ""):
        season = formdata['season']

    columns = [index for index in data]
    df = pd.DataFrame(columns=columns)
    df.loc[0] = 0
    if (year == ""):
        year = 2005
    df[city] = 1
    df[season] = 1
    df[crop] = 1
    df["Area"] = area
    df["Temperature"] = temperature
    df["Rainfall"] = rainfall
    my_prediction = crop_yield_model.predict(df)
    prediction = my_prediction[0]
    return prediction


# iterate for multple temperature and rainfall
def info_range(formdata, temperature, humidity, rainfall):
    temp_list = [-10, -5, 0, 5, 10]
    rain_list = [-500, -250, 0, 250, 500]
    year_list = [2004, 2007, 2010, 2013, 2016]
    year_list1 = [2018, 2019, 2020, 2021, 2022]
    humid_list = [-20, -10, 0, 10, 20]
    season_list = ["Kharif", "Rabi", "Summer",
                   "Whole Year", "Winter", "Autumn"]
    year_yield = {}
    season_yield = {}
    temp_yield = {}
    rain_yield = {}
    humid_yield = {}
    for i in range(0, 5):
        data = crop_yield(
            formdata, temperature+temp_list[i], rainfall+rain_list[i], year_list[i], "")
        year_yield[year_list1[i]] = round(data/int(formdata['area']), 2)
    for i in range(0, 5):
        data = crop_yield(
            formdata, temperature, rainfall, year_list[i], season_list[i])
        season_yield[season_list[i]] = round(data/int(formdata['area']), 2)
    for i in range(0, 5):
        data = crop_yield(
            formdata, temperature+temp_list[i], rainfall+rain_list[i], year_list[i], season_list[i])
        temp_yield[round(temp_list[i] +
                   temperature, 2)] = round(data/int(formdata['area']), 2)
        rain_yield[round(rain_list[i] +
                   rainfall, 2)] = round(data/int(formdata['area']), 2)
        humid_yield[round(humid_list[i] +
                    humidity, 2)] = round(data/int(formdata['area']), 2)

    return (
        year_yield, season_yield, temp_yield, rain_yield, humid_yield)
