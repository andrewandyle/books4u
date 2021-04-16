echo "Deploying Backend..."
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 416671831557.dkr.ecr.us-east-1.amazonaws.com/books4u-back:latest
docker system prune -a
docker build -t books4u-back .
docker tag books4u-back:latest 416671831557.dkr.ecr.us-east-1.amazonaws.com/books4u-back:latest
docker push 416671831557.dkr.ecr.us-east-1.amazonaws.com/books4u-back:latest
cd aws_deploy
eb deploy