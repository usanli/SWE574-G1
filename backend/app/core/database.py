from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection
from ..core.config import settings

# MongoDB connection
client = MongoClient(settings.MONGO_URL)
db: Database = client[settings.MONGO_DB]

# Collections
users_collection: Collection = db["users"]

# Create indexes
users_collection.create_index("username", unique=True)
users_collection.create_index("email", unique=True) 