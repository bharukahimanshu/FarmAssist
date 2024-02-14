import pickle
from weather import weather_fetch
from rain import rain_info
fertilizer_model = pickle.load(open('./Models/Fertilizer.pkl', 'rb'))


def fertilizer_prediction(formdata):
    rainfall_data = rain_info()
    N = formdata['nitrogen']
    P = formdata['phosphorous']
    K = formdata['pottasium']
    ph = formdata['ph']
    season = formdata['season']
    crop = formdata['crop']
    moisture = formdata['moisture']
    soil = formdata['soil']
    city = formdata['city']
    temperature, humidity = weather_fetch(city)
    rainfall = rainfall_data[rainfall_data["DIST"] == city][season].values[0]
    data = [[temperature, humidity, moisture, soil, crop, N, P, K]]
    ans = fertilizer_model.predict(data)
    if ans[0] == 0:
        data = "10-26-26"
        desc1 = "10:26:26 is a complex fertiliser containing all the three major plant nutrients viz. Nitrogen, Phosphorous and Potassium."
        desc2 = "10:26:26 contains Phosphorous and Potassium in the ratio of 1:1, the highest among the NPK fertilisers. It contains 7% Nitrogen in the Ammonical form, 22% out of 26% phosphate in the water soluble form and the entire 26% potash is available in the water soluble form."
        desc3 = "10:26:26 is ideally suitable for crops which require high phosphate and potassium and this grade is very popular among the Sugarcane farmers of Maharashtra, Karnataka and Andhra Pradesh and Potato farmers of West Bengal & Uttar Pradesh."
        desc4 = ":26:26 is also suitable for Fruit crops."
    elif ans[0] == 1:
        data = "14-35-14"
        desc1 = "Highest total nutrient content among NPK fertilizers (63 %)."
        desc2 = "N & P ratio same as DAP. In addition, GROMOR 14-35-14 has extra 14% potash."
        desc3 = "High in Phosphorous content (35%)."
        desc4 = "Best for almost all kinds of crops like Cotton, Groundnut, Chilly, Soya bean, Potato."
    elif ans[0] == 2:
        data = "17-17-17	"
        desc1 = "Gromor 17:17:17 is a complex fertiliser containing all three major plant nutrients viz. Nitrogen, Phosphorous and Potassium in equal proportion."
        desc2 = "Supplies all three major nutrients 17% each of nitrogen, phosphate & potash to the crops."
        desc3 = "Supplies 17% each of nitrogen, phosphate & potash."
        desc4 = "Contains 14.5% out of 17% phosphate in water soluble form which is easily available to crops."
    elif ans[0] == 3:
        data = "20-20-0"
        desc1 = "This is the most popular grade among the farming community."
        desc2 = "It contains 20% Nitrogen. Of this 90% of Nitrogen is present in Ammonical form and the rest in Amide form. However, the entire Nitrogen is available to crops in Ammonical form."
        desc3 = "It is granular in nature and can be easily applied by broadcasting, placement or drilling."
        desc4 = "It is an excellent fertiliser for all crops grown in Sulphur deficient soils and is highly suitable for Sulphur loving crops such as Oil seeds."
    elif ans[0] == 4:
        data = "28-28-0"
        desc1 = "Complex with highest N & P in 1:1 ratio."
        desc2 = "Unique granulation by coating prilled urea with Ammonium Phosphate layer."
        desc3 = "It does not contain any filler and it has 100% nutrient containing material having secondary and micronutrients such as Sulphur, Calcium and Iron."
        desc4 = "It is an ideal complex fertiliser for all crops for basal application."
    elif ans[0] == 5:
        data = "DAP"
        ph1 = "Diammonium Phosphate"
        p1 = "It is the most popular phosphatic fertiliser because of its high analysis and good physical properties.The composition of DAP is N-18% and P2O5 -46%."
        desc1 = "As far as Indian farmer is concerned, IFFCO's DAP is not just a source of crucial nutrients N, P for the crops, but is an integral part of his/her quest for nurturing mother earth."
        desc2 = "The bountiful crop that results from this care is an enough reason for the graceful bags of IFFCO DAP bags to be an integral part of the farmers's family."
        desc3 = " The Indian farmer's confidence and trust stems from the fact that IFFCO's DAP is a part of a complete package of services, ably supported by a dedicated team of qualified personnel."
        desc4 = "This fertiliser is useful for all kinds of crops."
    else:
        data = "Urea"
        desc1 = "Urea is the most important nitrogenous fertiliser in the country because of its high N content (46%N)."
        desc2 = "Besides its use in the crops, it is used as a cattle feed supplement to replace a part of protein requirements."
        desc3 = "It has also numerous industrial uses notably for production of plastics. Presently all the Urea manufactured in the country is Neen coated."
        desc4 = "Urea is a raw material for the manufacture of two main classes of materials: urea-formaldehyde resins and urea-melamine-formaldehyde used in marine plywood."
    my_prediction = {
        "data": data,
        "desc1": desc1,
        "desc2": desc2,
        "desc3": desc3,
        "desc4": desc4
    }
    return (my_prediction, temperature, humidity, rainfall)
