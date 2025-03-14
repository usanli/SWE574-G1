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
        comment_data["votes"] = comment_data.get("votes", [])
        
        # Handle subcategory - use category as fallback if not provided
        if not comment_data.get("subcategory"):
            comment_data["subcategory"] = comment_data.get("category")
        
        # Insert into database
        comments_collection.insert_one(comment_data)
        return comment_data
    
    @staticmethod
    def get_comment_by_id(comment_id: str) -> Optional[dict]:
        """Get a comment by ID"""
        return comments_collection.find_one({"id": comment_id})
    
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
        
        # Handle setting is_question flag for each comment
        for comment in comments:
            # Set is_question based on category
            comment["is_question"] = comment.get("category", "").lower() == "question"
            
            # Also set for replies
            if "replies" in comment:
                for reply in comment["replies"]:
                    reply["is_question"] = reply.get("category", "").lower() == "question"
        
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
        
    @staticmethod
    def add_vote(comment_id: str, user_id: str, vote_type: str) -> Optional[dict]:
        """Add a vote to a comment"""
        comment = CommentModel.get_comment_by_id(comment_id)
        if not comment:
            return None
            
        # Check if user already voted
        existing_votes = comment.get("votes", [])
        
        # Remove any existing vote by this user
        filtered_votes = [v for v in existing_votes if v.get("user_id") != user_id]
        
        # Add the new vote
        filtered_votes.append({
            "user_id": user_id,
            "type": vote_type,
            "created_at": datetime.utcnow()
        })
        
        # Update the comment
        comments_collection.update_one(
            {"id": comment_id},
            {"$set": {"votes": filtered_votes}}
        )
        
        return CommentModel.get_comment_by_id(comment_id)
        
    @staticmethod
    def remove_vote(comment_id: str, user_id: str) -> Optional[dict]:
        """Remove a vote from a comment"""
        comment = CommentModel.get_comment_by_id(comment_id)
        if not comment:
            return None
            
        # Filter out the vote by this user
        existing_votes = comment.get("votes", [])
        filtered_votes = [v for v in existing_votes if v.get("user_id") != user_id]
        
        # Update the comment
        comments_collection.update_one(
            {"id": comment_id},
            {"$set": {"votes": filtered_votes}}
        )
        
        return CommentModel.get_comment_by_id(comment_id) 