from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import *

application = Flask(__name__)

application.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
application.config['SQLALCHEMY_POOL_RECYCLE'] = SQLALCHEMY_POOL_RECYCLE
application.config['WTF_CSRF_ENABLED'] = WTF_CSRF_ENABLED
application.config['SECRET_KEY'] = SECRET_KEY

db = SQLAlchemy(application)