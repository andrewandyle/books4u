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

def createAuthorsCsv():
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
        
    authors_list = []
    result = scrapeBestSellersAuthors()
    for author in result['data']['authors']:   
        authors_list.append({'full_name' : author['display'], 'first_name': author['first'], 'last_name' : author['last'], 'on_tour' : author['ontour'], 'bestsellers' : "True", 'spotlight' : author['spotlight'], 'image' : author['_links'][0]['href']})

    result = scrapeNoBestsellersAuthors()
    for author in result['data']['authors']:   
        authors_list.append({'full_name' : author['display'], 'first_name': author['first'], 'last_name' : author['last'], 'on_tour' : author['ontour'], 'bestsellers' : "False", 'spotlight' : author['spotlight'], 'image' : author['_links'][0]['href']})

    authorsDataFrames = pd.DataFrame.from_dict(authors_list)
    authorsDataFrames.to_csv('authors-fixed.csv', encoding = 'utf-8')

def createQuotesCsv():
    authorsDataFrames = pd.read_csv('authors-fixed.csv')

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

    quotes_list = []
    for i in range(len(authorsDataFrames)):
        result = scrapeQuotesByAuthor(authorsDataFrames['full_name'][i])
        try:
            result = result['contents']['quotes']
            quotes_list.append({'author' : authorsDataFrames['full_name'][i],'quote' : result[0]['quote'], 'length' : result[0]['length'], 'tags' : result[0]['tags'], 'category' : "None", 'language' : result[0]['language'], 'unique_words' : 0, 'num_syllables' : 0, 'score' : 0, 'most_common_word' : "", 'least_common_word' : "", 'link' : result[0]['permalink'], 'background' : result[0]['background']})
            
        except:
            continue

    quotesDataFrames = pd.DataFrame.from_dict(quotes_list)
    quotesDataFrames.to_csv('quotes-fixed.csv', encoding = 'utf-8')

    quotesDataFrames = pd.concat(frames)
    quotesDataFrames.to_csv('quotes.csv', encoding = 'utf-8')

def createBooksCsv():
    authorsDataFrames = pd.read_csv('authors-fixed.csv')
    def scrapeBooksByAuthor(name):
        book_params = {
            "q" : '+inauthor:' + name,
            "maxResults" : "40",
            "key" : "AIzaSyCkpJRNS5r-1y-sdUpniuhgrzXdetkXFLU"
            
        }
        
        raw = requests.get(
            "https://www.googleapis.com/books/v1/volumes", params=book_params
        ).json()
        return raw
        
    books_list = []
    for i in range(len(authorsDataFrames)):
        author_name = authorsDataFrames['full_name'][i]
        print(i, author_name)
        result = scrapeBooksByAuthor(author_name)
        try:
            result = result['items']
            for book in result:
                curr = {}
                try:
                    curr['name'] = book['volumeInfo']['title']
                except:
                    curr['name'] = None
                try:
                    curr['genres'] = book['volumeInfo']['categories']
                except:
                    curr['genres'] = None
                try:
                    curr['year'] = book['volumeInfo']['publishedDate']
                except:
                    curr['year'] = None
                try:
                    curr['page_count'] = book['volumeInfo']['pageCount']
                except:
                    curr['page_count'] = None
                try:
                    curr['purchase_link'] = book['saleInfo']['buyLink']
                    curr['price'] = book['saleInfo']['listPrice']['amount']
                except:
                    curr['purchase_link'] = None
                    curr['price'] = None
                try:
                    curr['avg_rating'] = book['volumeInfo']['averageRating']
                except:
                    curr['avg_rating'] = None
                try:
                    curr['num_ratings'] = book['volumeInfo']['ratingsCount']
                except:
                    curr['num_ratings'] = None
                try:
                    curr['maturity_rating'] = book['volumeInfo']['maturityRating']
                except:
                    curr['maturity_rating'] = None
                try:
                    curr['language'] = book['volumeInfo']['language']
                except:
                    curr['language'] = None
                try:
                    curr['description'] = book['volumeInfo']['description']
                except:
                    curr['description'] = None
                try:
                    curr['image'] = book['volumeInfo']['imageLinks']['thumbnail']
                except:
                    curr['image'] = None
                try:
                    authors_list = book['volumeInfo']['authors']
                    # Check if current author has written current book
                    if author_name in authors_list:
                        curr['authors'] = book['volumeInfo']['authors']
                    else:
                        raise Exception("Author must match")
                except:
                    # Avoid adding current book if not written by current author
                    continue
                books_list.append(curr)
        except:
            continue
    booksDataFrames = pd.DataFrame.from_dict(books_list)
    booksDataFrames.to_csv('books-fixed.csv', encoding = 'utf-8')

    # booksDataFrames = pd.concat(frames)
    # booksDataFrames.to_csv('books.csv', encoding = 'utf-8')


def createExtraField():
    authorsDataFrames = pd.read_csv('authors-fixed.csv')
    def scrapeExtraFieldByAuthor(name):
        quote_params = {
            "query" : name,
            "language" : "en",
            "detailed" : "true",
            "start" : "0",
            "limit" : "1",
            "api_key" : "fB4po_6wvrjcPMLTOW_SKweF"
        }
        raw = requests.get(
            "https://quotes.rest/quote/authors/search", params=quote_params
        ).json()
        return raw

    extra_authors = []
    for i in range(len(authorsDataFrames)):
        print(i)
        result = scrapeExtraFieldByAuthor(authorsDataFrames['full_name'][i])
        curr = authorsDataFrames.iloc[i]
        result = result['contents']['authors']
        try:
            curr['occupation'] = result[0]['occupation']
        except:
            curr['occupation'] = None
        try:
            curr['birthday'] = result[0]['born']
        except:
            curr['birthday'] = None
        try:
            curr['date_of_death'] = result[0]['dead']
        except:
            curr['date_of_death'] = None
        
        extra_authors.append(curr)
    
    extraFieldDataFrames = pd.DataFrame.from_dict(extra_authors)
    extraFieldDataFrames.to_csv('extra_fields.csv', encoding = 'utf-8')

if __name__ == "__main__":
    # createAuthorsCsv()
    # createQuotesCsv()
    # createBooksCsv()
    createExtraField()