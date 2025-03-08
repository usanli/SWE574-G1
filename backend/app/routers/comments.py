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
    mystery_id: str = Path(..., title="The ID of the mystery to get comments for"),
    current_user: UserInDB = Depends(get_current_user)
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