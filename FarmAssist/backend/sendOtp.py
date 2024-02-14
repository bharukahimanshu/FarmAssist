import random
from twilio.base.exceptions import TwilioRestException
from twilio.rest import Client
import os
from dotenv import load_dotenv


def send_message(mobile):
    load_dotenv()
    client = Client(os.getenv('twilio_account_sid'),
                    os.getenv('twilio_auth_token'))
    otp = random.randint(1000, 9999)
    url = "https://quickcrop.netlify.app"
    try:
        message = client.messages.create(
            body="Welcome to QuickCrop! Your Otp is " +
            str(otp)+"! We are here to help you with your farming needs. Please visit our website to get started " + url,
            from_=os.getenv('twilio_number'),
            to='+' + mobile
        )
        response = {
            "status": "success",
            "message": "Message sent successfully",
            "otp": otp
        }
        return {"response":  response}
    except TwilioRestException as e:
        response = {
            "status": "error",
            "message": "Message sending failed",
            "otp": "0"
        }
        return {"response":  response}
