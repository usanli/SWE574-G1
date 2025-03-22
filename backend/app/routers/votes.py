from fastapi import APIRouter, Depends, Path, Query, status
from typing import Dict, Any, Optional

from ..schemas.user_schema import UserInDB
from ..services.vote_service import VoteService
from ..core.auth.dependencies import get_current_user

router = APIRouter(
    prefix="/votes",
    tags=["votes"]
)

@router.post("/{entity_type}/{entity_id}", response_model=Dict[str, Any])
async def vote_on_entity(
    entity_type: str = Path(..., description="The type of entity to vote on (e.g., 'comment', 'mystery')"),
    entity_id: str = Path(..., description="The ID of the entity to vote on"),
    vote_value: int = Query(..., description="Vote value: 1 (upvote), -1 (downvote), 0 (remove vote)"),
    current_user: UserInDB = Depends(get_current_user)
):
    """
    Generic endpoint to vote on any entity type
    
    - entity_type: The type of entity (e.g., 'comment', 'mystery')
    - entity_id: The ID of the entity
    - vote_value: 1 (upvote), -1 (downvote), 0 (remove vote)
    """
    validator = None
    
    # Import here to avoid circular imports
    if entity_type == "comment":
        from ..services.comment_service import CommentService
        validator = CommentService.validate_comment_for_voting
    
    return VoteService.vote(current_user.id, entity_id, entity_type, vote_value, validator)

@router.get("/{entity_type}/{entity_id}", response_model=Dict[str, Any])
async def get_entity_votes(
    entity_type: str = Path(..., description="The type of entity (e.g., 'comment', 'mystery')"),
    entity_id: str = Path(..., description="The ID of the entity"),
    current_user: Optional[UserInDB] = Depends(get_current_user)
):
    """
    Get vote information for an entity
    
    - entity_type: The type of entity (e.g., 'comment', 'mystery')
    - entity_id: The ID of the entity
    """
    user_id = current_user.id if current_user else None
    return VoteService.get_vote_info(entity_id, entity_type, user_id) 