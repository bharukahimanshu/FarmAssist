import pickle
from weather import weather_fetch
from rain import rain_info
from plot import topCrops
import numpy as np
crop_recommendation_model_path = './Models/RandomForest.pkl'
crop_recommendation_model = pickle.load(
    open(crop_recommendation_model_path, 'rb'))
crops = np.load('crops.npy', allow_pickle=True)


def crop_recommendation(formdata):
    rainfall_data = rain_info()
    N = formdata['nitrogen']
    P = formdata['phosphorous']
    K = formdata['pottasium']
    ph = formdata['ph']
    season = formdata['season']
    city = formdata['city']
    temperature, humidity = weather_fetch(city)
    rainfall = rainfall_data[rainfall_data["DIST"] == city][season].values[0]
    data = [[N, P, K, temperature, humidity, ph, rainfall]]
    my_prediction = crop_recommendation_model.predict(data)
    prediction = []
    for i in range(0, len(my_prediction[0])):
        if my_prediction[0][i] == 1:
            prediction.append(crops[i])
    if len(prediction) == 0:
        prediction = ['No crop']
    chart_data = topCrops(crops, data)
    return prediction, temperature, humidity, rainfall, chart_data
