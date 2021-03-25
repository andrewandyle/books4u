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

def scrapeBestSellersAuthors():
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

def scrapeNoBestsellersAuthors():
    print("Enter second function")
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
    
# authors_list = []
# result = scrapeBestSellersAuthors()
# for author in result['data']['authors']:   
#     authors_list.append({'full_name' : author['display'], 'first_name': author['first'], 'last_name' : author['last'], 'on_tour' : author['ontour'], 'bestsellers' : "True", 'spotlight' : author['spotlight'], 'image' : author['_links'][0]['href']})

# result = scrapeNoBestsellersAuthors()
# for author in result['data']['authors']:   
#     authors_list.append({'full_name' : author['display'], 'first_name': author['first'], 'last_name' : author['last'], 'on_tour' : author['ontour'], 'bestsellers' : "False", 'spotlight' : author['spotlight'], 'image' : author['_links'][0]['href']})

# authorsDataFrames = pd.DataFrame.from_dict(authors_list)
# authorsDataFrames.to_csv('authors-fixed.csv', encoding = 'utf-8')


#     dataframe = pd.DataFrame.from_dict(raw['data']['authors'])

# def scrapeNotAwardAndBestSellerAuthors():
#     author_params = {
#         "rows" : "10",
#         "showAwards" : "false",
#         "showBestSellers" : "true",
#         "showPublishedBooks" : "true",
#         "showCovers" : "true",
#         "hideAuthorsWithNoPhoto" : "true",
#         "showBio" : "true", 
#         "sort" : "random",
#         "api_key" : "d4huxgvevx94je6fp9eykxds"
#     }

#     raw = requests.get(
#         "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/views/list-display", params=author_params
#     )

#     print(raw)

# scrapeNotAwardAndBestSellerAuthors()

# #raw1 = scrapeAwardAndBestSellerAuthors()
# #raw2 = scrapeAwardAndNotBestSellerAuthors()
# #dataframe1 = pd.DataFrame.from_dict(raw1['data']['authors'])
# #dataframe2 = pd.DataFrame.from_dict(raw2['data']['authors'])
# #frames = [dataframe1, dataframe2]
# #authorsDataFrames = pd.concat(frames)
# #authorsDataFrames.to_csv('authors.csv', encoding = 'utf-8')

# authorsDataFrames = pd.read_csv('authors-fixed.csv')
# #print(authorsDataFrames['display'][0])

# def scrapeQuotesByAuthor(name):
#     quote_params = {
#         "author" : name,
#         #"minlength" : "0",
#         #"maxlength" : "300",
#         #"private" : "true",
#         "language" : "en",
#         "limit" : "1",
#         #"sfw" : "false",
#         "api_key" : "fB4po_6wvrjcPMLTOW_SKweF"
#     }
    
#     raw = requests.get(
#         "https://quotes.rest/quote/search", params=quote_params
#     ).json()
#     return raw

# quotes_list = []

# for i in range(len(authorsDataFrames)):
#     result = scrapeQuotesByAuthor(authorsDataFrames['full_name'][i])
#     try:
#         result = result['contents']['quotes']
#         quotes_list.append({'author' : authorsDataFrames['full_name'][i],'quote' : result[0]['quote'], 'length' : result[0]['length'], 'tags' : result[0]['tags'], 'category' : "None", 'language' : result[0]['language'], 'unique_words' : 0, 'num_syllables' : 0, 'score' : 0, 'most_common_word' : "", 'least_common_word' : "", 'link' : result[0]['permalink'], 'background' : result[0]['background']})
        
#     except:
#         continue
# quotesDataFrames = pd.DataFrame.from_dict(quotes_list)
# quotesDataFrames.to_csv('quotes-fixed.csv', encoding = 'utf-8')

# print(frames)
# quotesDataFrames = pd.concat(frames)
# quotesDataFrames.to_csv('quotes.csv', encoding = 'utf-8')


# #https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

def scrapeBooksByAuthor(name):
    book_params = {
        "q" : '+inauthor:' + name,
        "key" : "AIzaSyD9kP1HFu062nYfIm-tMqTaHWgnKHejZ7A"
        
    }
    
    raw = requests.get(
        "https://www.googleapis.com/books/v1/volumes", params=book_params
    ).json()
    return raw

quotesDataFrames = pd.read_csv('quotes-fixed.csv')
books_list = []
for i in range(1):
    result = scrapeBooksByAuthor(quotesDataFrames['author'][i])
    print(result)
    # try:
    #     dataframe = pd.DataFrame.from_dict(result['items'])
    #     books_list.append(dataframe)
    # except:
    #     continue

# booksDataFrames = pd.concat(frames)
# booksDataFrames.to_csv('books.csv', encoding = 'utf-8')

