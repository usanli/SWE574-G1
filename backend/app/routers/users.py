from fastapi import APIRouter, Depends, HTTPException, status, Body, Path
from typing import List, Optional

from ..schemas.user_schema import UserUpdate, UserResponse, UserInDB
from ..services.user_service import UserService
from ..core.auth.dependencies import get_current_user
from ..schemas.comment_schema import CommentResponseWithMystery
from ..services.comment_service import CommentService
from ..schemas.mystery_schema import MysteryResponse
from ..services.mystery_service import MysteryService

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user: UserInDB = Depends(get_current_user)):
    """Get current user profile"""
    return current_user

@router.put("/me", response_model=UserResponse)
async def update_user_profile(
    update_data: UserUpdate,
    current_user: UserInDB = Depends(get_current_user)
):
    """Update current user profile"""
    updated_user = UserService.update_user(current_user.id, update_data)
    return updated_user

@router.get("/{username}", response_model=UserResponse)
async def get_user_by_username(
    username: str = Path(..., title="The username of the user to get")
):
    """Get user by username"""
    return UserService.get_user_by_username(username)

@router.get("/{username}/comments", response_model=List[CommentResponseWithMystery])
async def get_user_comments(
    username: str = Path(..., title="The username of the user to get comments for"),
    current_user: Optional[UserInDB] = Depends(get_current_user)
):
    """Get user's comments"""
    # First get the user ID from username
    user = UserService.get_user_by_username(username)
    user_id = current_user.id if current_user else None
    return CommentService.list_comments_by_user(user.id, user_id)

@router.get("/{username}/mysteries", response_model=List[MysteryResponse])
async def get_user_mysteries(
    username: str = Path(..., title="The username of the user to get mysteries for")
):
    """Get user's mysteries"""
    # First get the user ID from username
    user = UserService.get_user_by_username(username)
    return MysteryService.list_mysteries_by_author(user.id) 