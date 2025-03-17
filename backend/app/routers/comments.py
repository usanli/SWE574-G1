from fastapi import APIRouter, Depends, HTTPException, Query, Path, status
from typing import List, Optional

from ..schemas.comment_schema import CommentCreate, CommentResponse, CommentUpdate
from ..schemas.user_schema import UserInDB
from ..services.comment_service import CommentService
from ..core.auth.dependencies import get_current_user

router = APIRouter(prefix="/comments", tags=["comments"])

@router.post("", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def create_comment(
    comment_data: CommentCreate,
    current_user: UserInDB = Depends(get_current_user)
):
    """Create a new comment or reply"""
    return CommentService.create_comment(comment_data, current_user.id)

@router.get("/mystery/{mystery_id}", response_model=List[CommentResponse])
async def list_mystery_comments(
    mystery_id: str = Path(..., title="The ID of the mystery to get comments for")
):
    """List all comments for a mystery"""
    return CommentService.list_comments_by_mystery(mystery_id)

@router.put("/{comment_id}", response_model=CommentResponse)
async def update_comment(
    comment_data: CommentUpdate,
    comment_id: str = Path(..., title="The ID of the comment to update"),
    current_user: UserInDB = Depends(get_current_user)
):
    """Update a comment"""
    return CommentService.update_comment(comment_id, comment_data, current_user.id)

# Add a new router specifically for mystery comments
mystery_router = APIRouter(prefix="/mysteries", tags=["mystery_comments"])

@mystery_router.get("/{mystery_id}/comments", response_model=List[CommentResponse])
async def get_mystery_comments(
    mystery_id: str = Path(..., title="The ID of the mystery to get comments for")
):
    """Get all comments for a specific mystery"""
    return CommentService.list_comments_by_mystery(mystery_id)

@mystery_router.post("/{mystery_id}/comments", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def create_mystery_comment(
    comment_data: CommentCreate,
    mystery_id: str = Path(..., title="The ID of the mystery to comment on"),
    current_user: UserInDB = Depends(get_current_user)
):
    """Create a new comment for a specific mystery"""
    # Override the mystery_id in the comment data with the one from the path
    comment_data.mystery_id = mystery_id
    return CommentService.create_comment(comment_data, current_user.id)

@mystery_router.post("/{mystery_id}/comments/{comment_id}/vote", response_model=CommentResponse)
async def vote_on_comment(
    comment_id: str = Path(..., title="The ID of the comment to vote on"),
    mystery_id: str = Path(..., title="The ID of the mystery"),
    vote_type: str = Query(..., title="The type of vote (upvote or downvote)"),
    current_user: UserInDB = Depends(get_current_user)
):
    """Vote on a comment (upvote or downvote)"""
    if vote_type not in ["upvote", "downvote"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Vote type must be 'upvote' or 'downvote'"
        )
    return CommentService.add_vote(comment_id, current_user.id, vote_type)

@mystery_router.delete("/{mystery_id}/comments/{comment_id}/vote", response_model=CommentResponse)
async def remove_vote_from_comment(
    comment_id: str = Path(..., title="The ID of the comment to remove vote from"),
    mystery_id: str = Path(..., title="The ID of the mystery"),
    current_user: UserInDB = Depends(get_current_user)
):
    """Remove vote from a comment"""
    return CommentService.remove_vote(comment_id, current_user.id) 