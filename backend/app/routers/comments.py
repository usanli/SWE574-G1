from fastapi import APIRouter, Depends, HTTPException, Query, Path, status
from typing import List, Optional

from ..schemas.comment_schema import CommentCreate, CommentResponse, CommentUpdate
from ..schemas.user_schema import UserInDB
from ..services.comment_service import CommentService
from ..core.auth.dependencies import get_current_user

mystery_comments_router = APIRouter(prefix="/mysteries", tags=["comments"])

@mystery_comments_router.get("/{mystery_id}/comments", response_model=List[CommentResponse])
async def get_mystery_comments(
    mystery_id: str = Path(..., title="The ID of the mystery to get comments for"),
    current_user: Optional[UserInDB] = Depends(get_current_user)
):
    """Get all comments for a mystery"""
    user_id = current_user.id if current_user else None
    return CommentService.list_comments_by_mystery(mystery_id, user_id)

@mystery_comments_router.post("/{mystery_id}/comments", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def create_mystery_comment(
    comment_data: CommentCreate,
    mystery_id: str = Path(..., title="The ID of the mystery to comment on"),
    current_user: UserInDB = Depends(get_current_user)
):
    """Create a new comment for a mystery"""
    comment_data.mystery_id = mystery_id
    return CommentService.create_comment(comment_data, current_user.id)

@mystery_comments_router.post("/{mystery_id}/comments/{comment_id}/vote", response_model=CommentResponse)
async def vote_on_mystery_comment(
    comment_id: str = Path(..., title="The ID of the comment to vote on"),
    mystery_id: str = Path(..., title="The ID of the mystery"),
    vote_value: int = Query(..., description="Vote value: 1 (upvote), -1 (downvote), 0 (remove vote)"),
    current_user: UserInDB = Depends(get_current_user)
):
    """Vote on a comment within a mystery"""
    return CommentService.vote_on_comment(comment_id, current_user.id, vote_value)

@mystery_comments_router.put("/{mystery_id}/comments/{comment_id}", response_model=CommentResponse)
async def update_mystery_comment(
    update_data: CommentUpdate,
    comment_id: str = Path(..., title="The ID of the comment to update"),
    mystery_id: str = Path(..., title="The ID of the mystery"),
    current_user: UserInDB = Depends(get_current_user)
):
    """Update a comment within a mystery"""
    return CommentService.update_comment(comment_id, update_data, current_user.id) 