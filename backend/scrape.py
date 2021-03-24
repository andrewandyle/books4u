from flask import Flask, render_template, request, jsonify
#from flask_cors import CORS
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
    return raw
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
    return raw
    dataframe = pd.DataFrame.from_dict(raw['data']['authors'])
"""
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
"""

#raw1 = scrapeAwardAndBestSellerAuthors()
#raw2 = scrapeAwardAndNotBestSellerAuthors()
#dataframe1 = pd.DataFrame.from_dict(raw1['data']['authors'])
#dataframe2 = pd.DataFrame.from_dict(raw2['data']['authors'])
#frames = [dataframe1, dataframe2]
#authorsDataFrames = pd.concat(frames)
#authorsDataFrames.to_csv('authors.csv', encoding = 'utf-8')

authorsDataFrames = pd.read_csv('authors.csv')
#print(authorsDataFrames['display'][0])

def scrapeQuotesByAuthor(name):
    quote_params = {
        "author" : name,
        #"minlength" : "0",
        #"maxlength" : "300",
        #"private" : "true",
        "language" : "en",
        "limit" : "1",
        #"sfw" : "false",
        "api_key" : "fB4po_6wvrjcPMLTOW_SKweF"
    }
    
    raw = requests.get(
        "https://quotes.rest/quote/search", params=quote_params
    ).json()
    return raw

frames = []
'''
for i in range(1000):
    result = scrapeQuotesByAuthor(authorsDataFrames['display'][i])
    try:
        dataframe = pd.DataFrame.from_dict(result['contents'])
        frames.append(dataframe)
    except:
        continue
    
print(frames)
quotesDataFrames = pd.concat(frames)
quotesDataFrames.to_csv('quotes.csv', encoding = 'utf-8')
'''