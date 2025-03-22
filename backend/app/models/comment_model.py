from bson import ObjectId
from datetime import datetime
from typing import List, Optional, Dict, Any
import uuid

from ..core.database import comments_collection, users_collection

class CommentModel:
    @staticmethod
    def create_comment(comment_data: dict, author_id: str) -> dict:
        """Create a new comment in the database"""
        # Generate UUID for the comment
        comment_data["id"] = str(uuid.uuid4())
        
        # Set author and timestamps
        comment_data["author_id"] = author_id
        comment_data["created_at"] = datetime.utcnow()
        comment_data["updated_at"] = None
        
        # Check if it's a reply and set is_reply
        comment_data["is_reply"] = bool(comment_data.get("parent_id"))
        
        # Set default values
        comment_data["featured"] = comment_data.get("featured", False)
        
        # Handle subcategory - use category as fallback if not provided
        if not comment_data.get("subcategory"):
            comment_data["subcategory"] = comment_data.get("category")
        
        # Insert into database
        comments_collection.insert_one(comment_data)
        return comment_data
    
    @staticmethod
    def get_comment_by_id(comment_id: str) -> Optional[dict]:
        """Get a comment by ID"""
        comment = comments_collection.find_one({"id": comment_id})
        
        return comment
    
    @staticmethod
    def list_comments_by_mystery(
        mystery_id: str, 
        include_author: bool = True, 
        include_replies: bool = True
    ) -> List[dict]:
        """List all top-level comments for a mystery with optional replies"""
        # Find top-level comments (no parent_id)
        comments = list(comments_collection.find({
            "mystery_id": mystery_id,
            "parent_id": None
        }).sort("created_at", -1))
        
        if include_author:
            # Add author information for each comment
            for comment in comments:
                author = users_collection.find_one({"id": comment["author_id"]})
                if author:
                    # Convert to UserResponse (exclude sensitive info)
                    comment["author"] = {
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
        
        if include_replies:
            # Add replies for each comment
            for comment in comments:
                replies = list(comments_collection.find({
                    "parent_id": comment["id"]
                }).sort("created_at", 1))
                
                if include_author:
                    # Add author information for each reply
                    for reply in replies:
                        author = users_collection.find_one({"id": reply["author_id"]})
                        if author:
                            # Convert to UserResponse (exclude sensitive info)
                            reply["author"] = {
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
                
                comment["replies"] = replies
        
        return comments
    
    @staticmethod
    def update_comment(comment_id: str, update_data: dict) -> Optional[dict]:
        """Update a comment in the database"""
        # Add updated timestamp
        update_data["updated_at"] = datetime.utcnow()
        
        # Update in database
        comments_collection.update_one(
            {"id": comment_id},
            {"$set": update_data}
        )
        
        # Return updated comment
        return CommentModel.get_comment_by_id(comment_id)
    
    @staticmethod
    def delete_comment(comment_id: str) -> bool:
        """Delete a comment"""
        result = comments_collection.delete_one({"id": comment_id})
        return result.deleted_count > 0 