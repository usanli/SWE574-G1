from typing import Any, Dict, Optional
from fastapi import HTTPException, status

from ..models.vote_model import VoteModel

class VoteService:
    @staticmethod
    def vote(
        user_id: str, 
        entity_id: str, 
        entity_type: str, 
        vote_value: int, 
        entity_validator=None
    ) -> Dict[str, Any]:
        """
        Generic vote service that can be used for any entity type
        
        Parameters:
        - user_id: The ID of the user voting
        - entity_id: The ID of the entity being voted on
        - entity_type: The type of entity ('comment', 'mystery', etc.)
        - vote_value: The vote value (1 for upvote, -1 for downvote, 0 for removing vote)
        - entity_validator: Optional function to validate entity exists and user can vote on it
        
        Returns:
        - Dict containing vote information (upvote_count, downvote_count, user_vote)
        """
        # Validate vote value
        if vote_value not in [-1, 0, 1]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Vote value must be -1 (downvote), 0 (remove vote), or 1 (upvote)"
            )
        
        # If entity validator function is provided, call it
        if entity_validator:
            entity_validator(entity_id, user_id)
        
        # Record the vote
        VoteModel.vote(user_id, entity_id, entity_type, vote_value)
        
        # Get updated vote information
        vote_info = VoteModel.get_vote_counts(entity_id, entity_type)
        user_vote = VoteModel.get_user_vote(user_id, entity_id, entity_type)
        
        # Return vote information
        return {
            "upvote_count": vote_info["upvote_count"],
            "downvote_count": vote_info["downvote_count"],
            "user_vote": user_vote
        }
    
    @staticmethod
    def get_vote_info(
        entity_id: str, 
        entity_type: str, 
        user_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Get vote information for an entity
        
        Parameters:
        - entity_id: The ID of the entity
        - entity_type: The type of entity ('comment', 'mystery', etc.)
        - user_id: Optional ID of the current user to include their vote
        
        Returns:
        - Dict containing vote information (upvote_count, downvote_count, user_vote)
        """
        vote_info = VoteModel.get_vote_counts(entity_id, entity_type)
        
        result = {
            "upvote_count": vote_info["upvote_count"],
            "downvote_count": vote_info["downvote_count"],
            "user_vote": None
        }
        
        if user_id:
            result["user_vote"] = VoteModel.get_user_vote(user_id, entity_id, entity_type)
        
        return result 