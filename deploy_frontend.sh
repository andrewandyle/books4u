echo "Deploying Frontend..."
cd frontend
export REACT_APP_API_URL=/api
yarn build
aws s3 sync build/ s3://books4u-front