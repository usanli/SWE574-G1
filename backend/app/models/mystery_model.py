from bson import ObjectId
from datetime import datetime
from typing import List, Optional, Dict, Any
import uuid

from ..core.database import mysteries_collection, users_collection
from ..schemas.user_schema import UserResponse

class MysteryModel:
    @staticmethod
    def create_mystery(mystery_data: dict, author_id: str) -> dict:
        """Create a new mystery in the database"""
        mystery_data["id"] = str(uuid.uuid4())
        
        # Set author and timestamps
        mystery_data["author_id"] = author_id
        mystery_data["created_at"] = datetime.utcnow()
        mystery_data["updated_at"] = None
        mystery_data["deleted_at"] = None
        mystery_data["solved_by"] = None
        
        # Set default values for optional fields
        mystery_data["attributes"] = mystery_data.get("attributes", [])
        mystery_data["images"] = mystery_data.get("images", [])
        mystery_data["tags"] = mystery_data.get("tags", [])
        
        mysteries_collection.insert_one(mystery_data)
        return mystery_data
    
    @staticmethod
    def get_mystery_by_id(mystery_id: str, include_author: bool = True) -> Optional[dict]:
        """Get a mystery by ID"""
        mystery = mysteries_collection.find_one({"id": mystery_id, "deleted_at": None})
        
        if mystery and include_author:
            # Add author information
            author = users_collection.find_one({"id": mystery["author_id"]})
            if author:
                # Convert to UserResponse (exclude sensitive info)
                mystery["author"] = {
                    "id": author["id"],
                    "username": author["username"],
                    "email": author["email"],
                    "name": author.get("name"),
                    "surname": author.get("surname"),
                    "role": author.get("role", "user"),
                    "badges": author.get("badges", []),
                    "bio": author.get("bio"),
                    "country": author.get("country"),
                    "profession": author.get("profession")
                }
        
        return mystery
    
    @staticmethod
    def list_mysteries(skip: int = 0, limit: int = 10, include_author: bool = True) -> List[dict]:
        """List mysteries with pagination"""
        mysteries = list(mysteries_collection.find({"deleted_at": None})
                        .sort("created_at", -1)
                        .skip(skip)
                        .limit(limit))
        
        if include_author:
            # Add author information for each mystery
            for mystery in mysteries:
                author = users_collection.find_one({"id": mystery["author_id"]})
                if author:
                    # Convert to UserResponse (exclude sensitive info)
                    mystery["author"] = {
                        "id": author["id"],
                        "username": author["username"],
                        "email": author["email"],
                        "name": author.get("name"),
                        "surname": author.get("surname"),
                        "role": author.get("role", "user"),
                        "badges": author.get("badges", []),
                        "bio": author.get("bio"),
                        "country": author.get("country"),
                        "profession": author.get("profession")
                    }
        
        return mysteries
    
    @staticmethod
    def update_mystery(mystery_id: str, update_data: dict) -> Optional[dict]:
        """Update a mystery in the database"""
        # Add updated timestamp
        update_data["updated_at"] = datetime.utcnow()
        
        # Update in database
        mysteries_collection.update_one(
            {"id": mystery_id, "deleted_at": None},
            {"$set": update_data}
        )
        
        # Return updated mystery
        return MysteryModel.get_mystery_by_id(mystery_id)
    
    @staticmethod
    def soft_delete_mystery(mystery_id: str) -> bool:
        """Soft delete a mystery"""
        result = mysteries_collection.update_one(
            {"id": mystery_id, "deleted_at": None},
            {"$set": {"deleted_at": datetime.utcnow()}}
        )
        return result.modified_count > 0
    
    @staticmethod
    def count_mysteries() -> int:
        """Count total non-deleted mysteries"""
        return mysteries_collection.count_documents({"deleted_at": None}) 