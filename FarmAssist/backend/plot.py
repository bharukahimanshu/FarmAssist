import pickle
crop_recommendation_model_path = './Models/RandomForest.pkl'
crop_recommendation_model = pickle.load(
    open(crop_recommendation_model_path, 'rb'))


def topCrops(crops, data):
    probs = crop_recommendation_model.predict_proba(data)
    crop_probs = {}
    for i in range(len(crops)):
        crop_probs[crops[i]] = probs[i][0][1]
    top_crops = sorted(crop_probs.items(),
                       key=lambda x: x[1], reverse=True)[:5]
    top_crops = dict(top_crops)
    return top_crops
