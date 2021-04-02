# edit the URI below to add your RDS password and your AWS URL
# The other elements are the same as used in the tutorial
# format: (user):(password)@(db_identifier).amazonaws.com:3306/(db_name)
# USERNAME = os.getenv("DB_USERNAME")
# PASSWORD = os.getenv("DB_PASSWORD")
# KEY_FOOD = os.getenv("API_KEY_FOOD")
# KEY_NEWS = os.getenv("API_KEY_NEWS")
# KEY_OURS = os.getenv("API_KEY_OURS")

## Production DB Credentials

# USERNAME = 'postgres'
# PASSWORD = 'cs373group14'
# DB_URL = 'books4u-db.cztd9xq7iwic.us-east-1.rds.amazonaws.com'
# DB_PORT = '5432'
# DB_NAME = 'postgres'

## TEST DB Credentials

USERNAME = 'postgres'
PASSWORD = 'cs373group14'
DB_URL = 'books4u-test.cztd9xq7iwic.us-east-1.rds.amazonaws.com'
DB_PORT = '5432'
DB_NAME = 'postgres'

SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{USERNAME}:{PASSWORD}@{DB_URL}:{DB_PORT}/{DB_NAME}"

# Uncomment the line below if you want to work with a local DB
#SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'

SQLALCHEMY_POOL_RECYCLE = 3600

WTF_CSRF_ENABLED = True
# SECRET_KEY = 'dsaf0897sfdg45sfdgfdsaqzdf98sdf0a'