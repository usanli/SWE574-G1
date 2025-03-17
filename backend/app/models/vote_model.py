from bson import ObjectId
from datetime import datetime
from typing import List, Optional, Dict, Any
import uuid

from ..core.database import votes_collection, users_collection

class VoteModel:
    @staticmethod
    def create_vote(user_id: str, target_id: str, vote_type: str, content_type: str = "comment") -> dict:
        """Create a new vote or update existing vote
        
        Args:
            user_id: ID of the user casting the vote
            target_id: ID of the content being voted on (comment, mystery part, etc)
            vote_type: Type of vote (upvote, downvote)
            content_type: Type of content being voted on (comment, mystery, image, etc)
            
        Returns:
            The created or updated vote
        """
        # Check if user already voted on this content
        existing_vote = votes_collection.find_one({
            "user_id": user_id,
            "target_id": target_id,
            "content_type": content_type
        })
        
        if existing_vote:
            # Update existing vote if vote type changed
            if existing_vote.get("vote_type") != vote_type:
                votes_collection.update_one(
                    {"_id": existing_vote["_id"]},
                    {"$set": {
                        "vote_type": vote_type,
                        "updated_at": datetime.utcnow()
                    }}
                )
                existing_vote["vote_type"] = vote_type
                existing_vote["updated_at"] = datetime.utcnow()
            return existing_vote
        
        # Create a new vote
        vote = {
            "id": str(uuid.uuid4()),
            "user_id": user_id,
            "target_id": target_id,
            "content_type": content_type,
            "vote_type": vote_type,
            "created_at": datetime.utcnow(),
            "updated_at": None
        }
        
        votes_collection.insert_one(vote)
        return vote
    
    @staticmethod
    def remove_vote(user_id: str, target_id: str, content_type: str = "comment") -> bool:
        """Remove a vote
        
        Args:
            user_id: ID of the user who cast the vote
            target_id: ID of the content that was voted on
            content_type: Type of content (comment, mystery, etc)
            
        Returns:
            True if vote was removed, False otherwise
        """
        result = votes_collection.delete_one({
            "user_id": user_id,
            "target_id": target_id,
            "content_type": content_type
        })
        
        return result.deleted_count > 0
    
    @staticmethod
    def get_votes(target_id: str, content_type: str = "comment") -> List[dict]:
        """Get all votes for a specific content
        
        Args:
            target_id: ID of the content
            content_type: Type of content (comment, mystery, etc)
            
        Returns:
            List of votes for the content
        """
        return list(votes_collection.find({
            "target_id": target_id,
            "content_type": content_type
        }))
    
    @staticmethod
    def get_vote_count(target_id: str, content_type: str = "comment") -> Dict[str, int]:
        """Get vote counts for a specific content
        
        Args:
            target_id: ID of the content
            content_type: Type of content (comment, mystery, etc)
            
        Returns:
            Dictionary with upvotes and downvotes counts
        """
        votes = VoteModel.get_votes(target_id, content_type)
        
        upvotes = sum(1 for vote in votes if vote.get("vote_type") == "upvote")
        downvotes = sum(1 for vote in votes if vote.get("vote_type") == "downvote")
        
        return {
            "upvotes": upvotes,
            "downvotes": downvotes,
            "total": len(votes),
            "score": upvotes - downvotes
        }
    
    @staticmethod
    def get_user_vote(user_id: str, target_id: str, content_type: str = "comment") -> Optional[dict]:
        """Get a user's vote for a specific content
        
        Args:
            user_id: ID of the user
            target_id: ID of the content
            content_type: Type of content (comment, mystery, etc)
            
        Returns:
            The vote or None if user hasn't voted
        """
        return votes_collection.find_one({
            "user_id": user_id,
            "target_id": target_id,
            "content_type": content_type
        })
    
    @staticmethod
    def get_user_votes(user_id: str, content_type: str = None) -> List[dict]:
        """Get all votes by a user, optionally filtered by content type
        
        Args:
            user_id: ID of the user
            content_type: Optional type of content to filter by
            
        Returns:
            List of votes by the user
        """
        query = {"user_id": user_id}
        if content_type:
            query["content_type"] = content_type
            
        return list(votes_collection.find(query)) 