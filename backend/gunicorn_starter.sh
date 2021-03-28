#!/bin/sh

gunicorn --chdir /backend/app wsgi:app -w 2 --threads 2 -b 0.0.0.0:80
