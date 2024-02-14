import pandas as pd


def rain_info():
    rainfall_data = pd.read_csv('rain.csv')
    return rainfall_data
