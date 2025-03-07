from fastapi import APIRouter, Depends, HTTPException, status, Body
from typing import List

from ..schemas.user_schema import UserUpdate, UserResponse, UserInDB
from ..services.user_service import UserService
from ..core.security import get_current_user

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