from fastapi import APIRouter, Depends, HTTPException, Query, Path, status
from typing import List, Optional, Dict

from ..schemas.user_schema import UserInDB
from ..models.vote_model import VoteModel
from ..core.auth.dependencies import get_current_user

router = APIRouter(prefix="/votes", tags=["votes"])

@router.post("/{content_type}/{target_id}")
async def create_vote(
    target_id: str = Path(..., title="ID of the content to vote on"),
    content_type: str = Path(..., title="Type of content (comment, mystery, etc)"),
    vote_type: str = Query(..., title="Type of vote (upvote or downvote)"),
    current_user: UserInDB = Depends(get_current_user)
):
    """Create or update a vote"""
    if vote_type not in ["upvote", "downvote"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Vote type must be 'upvote' or 'downvote'"
        )
        
    vote = VoteModel.create_vote(
        user_id=current_user.id,
        target_id=target_id,
        vote_type=vote_type,
        content_type=content_type
    )
    
    return {
        "success": True,
        "vote": vote,
        "vote_counts": VoteModel.get_vote_count(target_id, content_type)
    }

@router.delete("/{content_type}/{target_id}")
async def remove_vote(
    target_id: str = Path(..., title="ID of the content to remove vote from"),
    content_type: str = Path(..., title="Type of content (comment, mystery, etc)"),
    current_user: UserInDB = Depends(get_current_user)
):
    """Remove a vote"""
    removed = VoteModel.remove_vote(
        user_id=current_user.id,
        target_id=target_id,
        content_type=content_type
    )
    
    return {
        "success": removed,
        "vote_counts": VoteModel.get_vote_count(target_id, content_type)
    }

@router.get("/{content_type}/{target_id}/count")
async def get_vote_counts(
    target_id: str = Path(..., title="ID of the content"),
    content_type: str = Path(..., title="Type of content (comment, mystery, etc)")
):
    """Get vote counts for a content"""
    return VoteModel.get_vote_count(target_id, content_type)

@router.get("/{content_type}/{target_id}/user")
async def get_user_vote(
    target_id: str = Path(..., title="ID of the content"),
    content_type: str = Path(..., title="Type of content (comment, mystery, etc)"),
    current_user: UserInDB = Depends(get_current_user)
):
    """Get current user's vote for a content"""
    vote = VoteModel.get_user_vote(current_user.id, target_id, content_type)
    return {"vote": vote} 