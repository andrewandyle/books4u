FROM nikolaik/python-nodejs

RUN ls && pwd

RUN git clone https://gitlab.com/cs373-group14/books4u.git

RUN ls && pwd

WORKDIR /books4u

RUN ls && pwd
RUN cd frontend && npm install && npm build
RUN pwd && ls
RUN pip3 install -r backend/requirements.txt
RUN pip3 install flask_sqlalchemy
RUN pip3 install flask_marshmallow
RUN pip3 install config
RUN pip3 install psycopg2
RUN git pull --force

EXPOSE 80

CMD git pull --force && python backend/app.py

# Run docker run -p 80:80 <name of image> - in order to test api locally