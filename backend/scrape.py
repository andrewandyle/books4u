from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import time
import urllib
import os
import json


import numpy as np
import pandas as pd

# import init
# import models
# import search

def scrapeAwardAndBestSellerAuthors():
    print("Enter function")
    author_params = {
        "rows" : "500",
        "showAwards" : "true",
        "showBestSellers" : "true",
        "showPublishedBooks" : "true",
        "showCovers" : "true",
        "hideAuthorsWithNoPhoto" : "true",
        "showBio" : "true", 
        "sort" : "random",
        "api_key" : "d4huxgvevx94je6fp9eykxds"
    }


    raw = requests.get(
        "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/views/list-display", params=author_params
    ).json()
    dataframe = pd.DataFrame.from_dict(raw['data']['authors'])

def scrapeAwardAndNotBestSellerAuthors():
    author_params = {
        "rows" : "500",
        "showAwards" : "true",
        "showBestSellers" : "false",
        "showPublishedBooks" : "true",
        "showCovers" : "true",
        "hideAuthorsWithNoPhoto" : "true",
        "showBio" : "true", 
        "sort" : "random",
        "api_key" : "d4huxgvevx94je6fp9eykxds"
    }


    raw = requests.get(
        "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/views/list-display", params=author_params
    ).json()
    dataframe = pd.DataFrame.from_dict(raw['data']['authors'])

def scrapeNotAwardAndBestSellerAuthors():
    author_params = {
        "rows" : "10",
        "showAwards" : "false",
        "showBestSellers" : "false",
        "showPublishedBooks" : "true",
        "showCovers" : "true",
        "hideAuthorsWithNoPhoto" : "true",
        "showBio" : "true", 
        "sort" : "random",
        "api_key" : "d4huxgvevx94je6fp9eykxds"
    }

    raw = requests.get(
        "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/views/list-display", params=author_params
    ).json()

scrapeAwardAndBestSellerAuthors()
# scrapeAwardAndNotBestSellerAuthors()