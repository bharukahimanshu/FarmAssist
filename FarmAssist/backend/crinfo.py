import pickle
from plot import topCrops
import numpy as np
from croprecommend import crop_recommendation
crop_recommendation_model_path = './Models/RandomForest.pkl'
crop_recommendation_model = pickle.load(
    open(crop_recommendation_model_path, 'rb'))
crops = np.load('crops.npy', allow_pickle=True)


def crop_recommendation(formdata, temperature, humidity, rainfall):
    N = formdata['nitrogen']
    P = formdata['phosphorous']
    K = formdata['pottasium']
    ph = formdata['ph']
    data = [[N, P, K, temperature, humidity, ph, rainfall]]
    my_prediction = crop_recommendation_model.predict(data)
    prediction = []
    for i in range(0, len(my_prediction[0])):
        if my_prediction[0][i] == 1:
            prediction.append(crops[i])
    if len(prediction) == 0:
        prediction = ['No crop']
    chart_data = topCrops(crops, data)
    return chart_data


def temp_list(formdata, prediction, temperature, humidity, rainfall):
    prediction = prediction.lower()
    highest_crop_list = {}
    crop_list = {}
    temp_list = [-4, -2, 0, 2, 4]
    for item in temp_list:
        data = crop_recommendation(
            formdata, temperature+item, humidity, rainfall)
        data1 = list(data.keys())
        if prediction not in data.keys():
            crop_list[item+temperature] = (0)
        else:
            crop_list[item+temperature] = (data[prediction])
        highest_crop_list[item+temperature] = (data1[0], data[data1[0]])
    return highest_crop_list, crop_list


def humid_list(formdata, prediction, temperature, humidity, rainfall):
    prediction = prediction.lower()
    highest_crop_list = {}
    crop_list = {}
    h_list = [-20, -10, 0, 10, 20]
    for item in h_list:
        data = crop_recommendation(
            formdata, temperature, humidity+item, rainfall)
        data1 = list(data.keys())
        if prediction not in data.keys():
            crop_list[item+humidity] = (0)
        else:
            crop_list[item+humidity] = (data[prediction])
        highest_crop_list[item+humidity] = (data1[0], data[data1[0]])
    return highest_crop_list, crop_list


def rain_list(formdata, prediction, temperature, humidity, rainfall):
    highest_crop_list = {}
    prediction = prediction.lower()
    crop_list = {}
    r_list = [-200, -100, 0, 100, 200]
    for item in r_list:
        data = crop_recommendation(
            formdata, temperature, humidity, rainfall+item)
        data1 = list(data.keys())
        if prediction not in data.keys():
            crop_list[item+rainfall] = (0)
        else:
            crop_list[item+rainfall] = (data[prediction])
        highest_crop_list[item+rainfall] = (data1[0], data[data1[0]])
    return highest_crop_list, crop_list


# print(temp_list({
#     "nitrogen": 50,
#     "phosphorous": 50,
#     "pottasium": 50,
#     "ph": 7,
#     " season": 'Kharif',
#     "city": 'Bhopal'
# }, 'banana', 25, 50, 1000))
