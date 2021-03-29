FROM nikolaik/python-nodejs

RUN ls && pwd

RUN git clone https://gitlab.com/cs373-group14/books4u.git

RUN ls && pwd

WORKDIR /books4u

RUN ls && pwd
RUN cd frontend && yarn install && yarn build
RUN pwd && ls
RUN git pull --force

CMD bash

# Run docker run -p 80:80 <name of image> - in order to test api locally