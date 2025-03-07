from bson import ObjectId
from datetime import datetime, date
from typing import List, Optional
import uuid

from ..core.database import users_collection
from ..core.auth.password import get_password_hash, verify_password

class UserModel:
    @staticmethod
    def create_user(user_data: dict) -> dict:
        """Create a new user in the database"""
        # Generate UUID for the user
        user_data["id"] = str(uuid.uuid4())
        
        # Hash the password
        user_data["password"] = get_password_hash(user_data["password"])
        
        # Convert date_of_birth from date to datetime if present
        if "date_of_birth" in user_data and isinstance(user_data["date_of_birth"], date):
            user_data["date_of_birth"] = datetime.combine(user_data["date_of_birth"], datetime.min.time())
        
        # Set default values
        user_data["badges"] = user_data.get("badges", [])
        user_data["role"] = user_data.get("role", "user")
        user_data["suspended"] = user_data.get("suspended", False)
        user_data["created_at"] = datetime.utcnow()
        
        # Insert into database
        users_collection.insert_one(user_data)
        return user_data
    
    @staticmethod
    def get_user_by_username(username: str) -> Optional[dict]:
        """Get a user by username"""
        return users_collection.find_one({"username": username})
    
    @staticmethod
    def get_user_by_email(email: str) -> Optional[dict]:
        """Get a user by email"""
        return users_collection.find_one({"email": email})
    
    @staticmethod
    def get_user_by_id(user_id: str) -> Optional[dict]:
        """Get a user by ID"""
        return users_collection.find_one({"id": user_id})
    
    @staticmethod
    def authenticate_user(username: str, password: str) -> Optional[dict]:
        """Authenticate a user by username and password"""
        user = UserModel.get_user_by_username(username)
        if not user:
            return None
        
        if not verify_password(password, user["password"]):
            return None
            
        return user
        
    @staticmethod
    def update_user(user_id: str, update_data: dict) -> dict:
        """Update a user in the database"""
        # Add updated timestamp
        update_data["updated_at"] = datetime.utcnow()
        
        # If password is being updated, hash it
        if "password" in update_data and update_data["password"]:
            update_data["password"] = get_password_hash(update_data["password"])
        
        # Convert date_of_birth from date to datetime if present
        if "date_of_birth" in update_data and isinstance(update_data["date_of_birth"], date):
            update_data["date_of_birth"] = datetime.combine(update_data["date_of_birth"], datetime.min.time())
        
        # Update in database
        users_collection.update_one(
            {"id": user_id},
            {"$set": update_data}
        )
        
        # Return updated user
        return UserModel.get_user_by_id(user_id) 