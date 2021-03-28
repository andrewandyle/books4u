echo "Deploying Frontend..."
cd frontend
yarn add mui-datatables
export REACT_APP_API_URL=/api
yarn build
aws s3 sync build/ s3://books4u-front