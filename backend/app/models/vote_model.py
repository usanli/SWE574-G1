from datetime import datetime
from typing import Optional, List, Dict
import uuid

from ..core.database import db

# Create a votes collection
votes_collection = db["votes"]

# Create indexes for votes collection
votes_collection.create_index([("user_id", 1), ("entity_type", 1), ("entity_id", 1)], unique=True)
votes_collection.create_index("entity_id")
votes_collection.create_index("entity_type")

class VoteModel:
    @staticmethod
    def vote(user_id: str, entity_id: str, entity_type: str, vote_value: int) -> dict:
        """
        Create or update a vote
        vote_value: 1 for upvote, -1 for downvote, 0 for removing vote
        """
        # Find existing vote
        existing_vote = votes_collection.find_one({
            "user_id": user_id,
            "entity_id": entity_id,
            "entity_type": entity_type
        })
        
        if vote_value == 0:
            # If vote_value is 0, remove the vote
            if existing_vote:
                votes_collection.delete_one({
                    "user_id": user_id,
                    "entity_id": entity_id,
                    "entity_type": entity_type
                })
            return {"vote_value": 0}
        
        vote_data = {
            "user_id": user_id,
            "entity_id": entity_id,
            "entity_type": entity_type,
            "vote_value": vote_value,
            "updated_at": datetime.utcnow()
        }
        
        if existing_vote:
            # Update existing vote
            votes_collection.update_one(
                {
                    "user_id": user_id,
                    "entity_id": entity_id,
                    "entity_type": entity_type
                },
                {"$set": vote_data}
            )
        else:
            # Create new vote
            vote_data["id"] = str(uuid.uuid4())
            vote_data["created_at"] = datetime.utcnow()
            votes_collection.insert_one(vote_data)
        
        return vote_data
    
    @staticmethod
    def get_user_vote(user_id: str, entity_id: str, entity_type: str) -> Optional[int]:
        """Get a user's vote for an entity"""
        vote = votes_collection.find_one({
            "user_id": user_id,
            "entity_id": entity_id,
            "entity_type": entity_type
        })
        
        return vote["vote_value"] if vote else None
    
    @staticmethod
    def get_vote_counts(entity_id: str, entity_type: str) -> Dict[str, int]:
        """Get vote counts for an entity"""
        upvotes = votes_collection.count_documents({
            "entity_id": entity_id,
            "entity_type": entity_type,
            "vote_value": 1
        })
        
        downvotes = votes_collection.count_documents({
            "entity_id": entity_id,
            "entity_type": entity_type,
            "vote_value": -1
        })
        
        return {
            "upvote_count": upvotes,
            "downvote_count": downvotes
        }
    
    @staticmethod
    def get_vote_status(entity_ids: List[str], entity_type: str, user_id: Optional[str] = None) -> Dict[str, Dict]:
        """
        Get vote counts and user vote status for multiple entities
        Returns a dictionary of entity_id -> vote_info
        """
        result = {}
        
        for entity_id in entity_ids:
            # Get vote counts
            counts = VoteModel.get_vote_counts(entity_id, entity_type)
            
            vote_info = {
                "upvote_count": counts["upvote_count"],
                "downvote_count": counts["downvote_count"],
                "user_vote": None
            }
            
            # Get user vote if a user is provided
            if user_id:
                vote_info["user_vote"] = VoteModel.get_user_vote(user_id, entity_id, entity_type)
            
            result[entity_id] = vote_info
        
        return result 