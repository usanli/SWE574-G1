from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection
from ..core.config import settings
from urllib.parse import quote_plus

# MongoDB connection
if "://" in settings.MONGO_URL and "@" in settings.MONGO_URL:
    protocol = settings.MONGO_URL.split("://")[0]
    rest = settings.MONGO_URL.split("://")[1]
    
    if "@" in rest:
        credentials, rest = rest.split("@", 1)
        username, password = credentials.split(":", 1)
        
        encoded_username = quote_plus(username)
        encoded_password = quote_plus(password)
        
        mongo_uri = f"{protocol}://{encoded_username}:{encoded_password}@{rest}"
        client = MongoClient(mongo_uri)
    else:
        client = MongoClient(settings.MONGO_URL)
else:
    client = MongoClient(settings.MONGO_URL)

db: Database = client[settings.MONGO_DB]

# Collections
users_collection: Collection = db["users"]
mysteries_collection: Collection = db["mysteries"]
comments_collection: Collection = db["comments"]

# Create indexes
users_collection.create_index("username", unique=True)
users_collection.create_index("email", unique=True)
mysteries_collection.create_index("author_id")
mysteries_collection.create_index("title")
comments_collection.create_index("mystery_id")
comments_collection.create_index("parent_id")