from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from config import *

app = Flask(__name__, static_folder="../frontend/build/static", template_folder="../frontend/build")
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_POOL_RECYCLE'] = SQLALCHEMY_POOL_RECYCLE
app.config['WTF_CSRF_ENABLED'] = WTF_CSRF_ENABLED
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# application.config['SECRET_KEY'] = SECRET_KEY

db = SQLAlchemy(app)
ma = Marshmallow(app)
