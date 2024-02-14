# Importing essential libraries and modules
import json
import blogs
from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
import numpy as np
from news import news_fetch
from flask_cors import CORS
from sendOtp import send_message
from croprecommend import crop_recommendation
from fertilizer import fertilizer_prediction
from cropyield import crop_yield
from flask_sqlalchemy import SQLAlchemy
from mail import send_email
from reg import obfuscate_email
from crinfo import temp_list, humid_list, rain_list
from cyinfo import info_range
from resultmail import send_result
load_dotenv()
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'subscribers'
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), primary_key=True,
                      unique=True, nullable=False)
    mobile = db.Column(db.String(120), unique=True, nullable=False)

    def __init__(self, name, email, mobile):
        self.name = name
        self.email = email
        self.mobile = mobile

    def __repr__(self):
        return '<Email %r>' % self.email


class Blogs(db.Model):
    __tablename__ = 'blogs'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    image_1 = db.Column(db.String(200), nullable=False)
    image_2 = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(50), nullable=False)
    read_time = db.Column(db.String(10), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    content = db.Column(db.Text, nullable=False)
    link = db.Column(db.String(50), unique=True, nullable=False)

    def __init__(self, title, description, image_1, image_2, author, read_time, date, content, link):
        self.title = title
        self.description = description
        self.image_1 = image_1
        self.image_2 = image_2
        self.author = author
        self.read_time = read_time
        self.date = date
        self.content = content
        self.link = link

    def __repr__(self):
        return f"Article('{self.title}', '{self.author}', '{self.date}')"


@app.route('/')
def home():
    return render_template('index.html')


@ app.route('/news', methods=['GET'])
def getNews():
    return news_fetch(request.args.get("page"))


@ app.route('/send-message', methods=['POST'])
def send_otp():
    formdata = request.json
    mobile = formdata['mobile']
    return send_message(mobile)


@ app.route('/crop-predict', methods=['POST'])
def crop_prediction():
    data = request.json
    formdata = data['formdata']
    prediction, temperature, humidity, rainfall, chart_data = crop_recommendation(
        formdata)
    rainfall = round(rainfall, 2)
    prediction[0] = list(chart_data.keys())[0]
    pred = {
        "prediction": prediction,
        "temperature": temperature,
        "humidity": humidity,
        "rainfall": rainfall,
        "chart_data": chart_data,
    }
    print(pred)
    if pred == 'No Crop':
        response = {"status": "error", "result": pred,
                    "message": "No crop can be grown in this region"}
    else:
        response = {"status": "success", "result": pred,
                    "message": "Crop recommendation fetched successfully"}
    return {
        "response": response
    }


@app.route('/crop-predict-temp', methods=['POST'])
def crop_prediction_temp():
    data = request.json
    formdata = data['formdata']
    chart_data = data['chart_data']
    temperature = data['temperature']
    humidity = data['humidity']
    rainfall = data['rainfall']
    pred = {
        "temp_data": temp_list(formdata, list(chart_data.keys())[0], temperature, humidity, rainfall),
        "prediction": list(chart_data.keys())[0],
    }
    response = {"status": "success", "result": pred,
                "message": "Crop recommendation fetched successfully"}
    return {
        "response": response
    }


@app.route('/crop-predict-humid', methods=['POST'])
def crop_prediction_humid():
    data = request.json
    formdata = data['formdata']
    chart_data = data['chart_data']
    temperature = data['temperature']
    humidity = data['humidity']
    rainfall = data['rainfall']
    pred = {
        "humid_data": humid_list(formdata, list(chart_data.keys())[0], temperature, humidity, rainfall),
        "prediction": list(chart_data.keys())[0],
    }
    response = {"status": "success", "result": pred,
                "message": "Crop recommendation fetched successfully"}
    return {
        "response": response
    }


@app.route('/crop-predict-rain', methods=['POST'])
def crop_prediction_rain():
    data = request.json
    formdata = data['formdata']
    chart_data = data['chart_data']
    temperature = data['temperature']
    humidity = data['humidity']
    rainfall = data['rainfall']
    pred = {
        "rain_data": rain_list(formdata, list(chart_data.keys())[0], temperature, humidity, rainfall),
        "prediction": list(chart_data.keys())[0],
    }
    response = {"status": "success", "result": pred,
                "message": "Crop recommendation fetched successfully"}
    return {
        "response": response
    }


@ app.route('/crop-yield-predict', methods=['POST'])
def crop_yield_prediction():
    data = request.json
    formdata = data['formdata']
    prediction, temperature, humidity, rainfall = crop_yield(
        formdata)
    rainfall = round(rainfall, 2)
    (year_yield, season_yield, temp_yield, rain_yield, humid_yield
     ) = info_range(formdata, temperature, humidity, rainfall)
    year_yield[2022] = round(prediction/int(formdata['area']), 2)
    pred = {
        "prediction": prediction,
        "temperature": temperature,
        "humidity": humidity,
        "rainfall": rainfall,
        "year_yield": year_yield,
        "season_yield": season_yield,
        "temp_yield": temp_yield,
        "rain_yield": rain_yield,
        "humid_yield": humid_yield,
    }
    if pred == '':
        response = {"status": "error", "result": pred,
                    "message": "No crop can be grown in this region"}
    else:
        response = {"status": "success", "result": pred,
                    "message": "Crop Yield fetched successfully"}
    return {
        "response": response
    }


@ app.route('/fertilizer-predict', methods=['POST'])
def fert_prediction():
    data = request.json
    formdata = data['formdata']
    my_prediction, temperature, humidity, rainfall = fertilizer_prediction(
        formdata)
    rainfall = round(rainfall, 2)
    pred = {
        "prediction": my_prediction,
        "temperature": temperature,
        "humidity": humidity,
        "rainfall": rainfall,
    }
    response = {"status": "success", "result": pred,
                "message": "Fertilizer recommendation fetched successfully"}
    return {
        "response": response
    }


@ app.route('/send-newsletter', methods=['GET'])
def send_newsletter():
    subject = 'Newsletter'
    with open('templates/newsletter.html', 'r') as f:
        template = f.read()
    subscribers = db.session.query(User).all()
    return send_email(subject, template, subscribers)


@ app.route('/check-subscription', methods=['POST'])
def check_subscription():
    formdata = request.json
    name = formdata['name']
    email = formdata['email']
    mobile = formdata['mobile']
    user = User(name, email, mobile)
    if db.session.query(User).filter(User.email == email).count() == 1:
        response = {
            'status': '201',
            "message": 'This email is already subscribed to our mailing list!'
        }
    elif db.session.query(User).filter(User.mobile == mobile).count() == 1:
        user = db.session.query(User).filter(User.mobile == mobile).first()
        email = user.email
        response = {
            'status': '202',
            "message": 'This mobile number is already subscribed to our mailing list with email: ' + obfuscate_email(email) + '!'
        }
    else:
        response = {
            'status': '200',
            'message': 'You are not subscribed to our mailing list!'
        }
    return {"response": response}


@ app.route('/subscribe', methods=['POST'])
def subscribe():
    formdata = request.json
    name = formdata['name']
    email = formdata['email']
    mobile = formdata['mobile']
    user = User(name, email, mobile)
    db.session.add(user)
    db.session.commit()
    subject = 'Thanks for subscribing {{{name}}}'
    with open('templates/subscribe.html', 'r') as f:
        template = f.read()
    subscribers = db.session.query(User).filter(User.email == email)
    template = template.replace('{{{name}}}', name)
    template = template.replace('{{{email}}}', email)
    message = send_email(subject, template, subscribers)
    if message[1] == 200:
        response = {
            'status': '200',
            'message': 'You have been successfully subscribed to our mailing list!'
        }
    else:
        db.session.delete(user)
        db.session.commit()
        response = {
            'status': '500',
            'message': 'Something went wrong! Please try again later.'
        }
    return {"response": response}


@ app.route('/send-result', methods=['POST'])
def sendResult():
    formdata = request.json
    name = formdata['name']
    email = formdata['email']
    body = formdata['body']
    subject = 'Thank you {{{name}}} for using QuickCrop'
    with open('templates/Result.html', 'r') as f:
        template = f.read()
    template = template.replace('{{{body}}}', body)
    message = send_result(subject, template, name, email)
    if message[1] == 200:
        response = {
            'status': '200',
            'message': 'You have been successfully subscribed to our mailing list!'
        }
    else:
        response = {
            'status': '500',
            'message': 'Something went wrong! Please try again later.'
        }
    return {"response": response}


@ app.route('/unsubscribe', methods=['GET'])
def unsubscribe():
    email = request.args.get("email")
    user = db.session.query(User).filter(User.email == email).first()
    db.session.delete(user)
    db.session.commit()
    return 'You have been successfully unsubscribed from our mailing list. Thank you!'


@ app.route('/add-blog', methods=['POST'])
def addBlog():
    formdata = request.json
    title = formdata['title']
    description = formdata['description']
    image_1 = formdata['image_1']
    image_2 = formdata['image_2']
    author = formdata['author']
    read_time = formdata['read_time']
    date = formdata['date']
    content = formdata['content']
    link = formdata['link']
    blog = Blogs(title, description, image_1, image_2,
                 author, read_time, date, content, link)
    db.session.add(blog)
    db.session.commit()
    return {
        "response": {
            "status": "success",
            "result": blog.__dict__,
            "message": "Blog added successfully"
        }
    }


@ app.route('/blogs', methods=['GET'])
def getBlogs():
    blogs = db.session.query(Blogs).all()
    blogs = [blog.__dict__ for blog in blogs]
    for blog in blogs:
        blog.pop('_sa_instance_state')

    return {
        "response": {
            "status": "success",
            "result": blogs,
            "message": "Blogs fetched successfully"
        }
    }


if __name__ == '__main__':
    app.run()
