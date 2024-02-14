import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv


def send_result(subject, template, name, email):
    load_dotenv()
    try:
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587
        smtp_username = os.getenv('gmail_user')
        smtp_password = os.getenv('gmail_pwd')
        smtp_connection = smtplib.SMTP(smtp_server, smtp_port)
        smtp_connection.starttls()
        smtp_connection.login(smtp_username, smtp_password)
        sender_email = os.getenv('gmail_user')
        subject = subject.replace('{{{name}}}', name)
        content = template.replace('{{{email}}}', email)
        content = content.replace('{{{name}}}', name)
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = email
        msg['Subject'] = subject
        msg.attach(MIMEText(content, 'html'))
        smtp_connection.sendmail(
            sender_email, email, msg.as_string())
        smtp_connection.quit()
        return "Email sent successfully!", 200
    except Exception as e:
        return "Error sending email", 404
