from fastapi import APIRouter, Depends, HTTPException, Query, Path, status
from typing import List, Optional

from ..schemas.mystery_schema import MysteryCreate, MysteryResponse, MysteryUpdate
from ..schemas.user_schema import UserInDB
from ..services.mystery_service import MysteryService
from ..core.auth.dependencies import get_current_user

router = APIRouter(prefix="/mysteries", tags=["mysteries"])

@router.post("", response_model=MysteryResponse, status_code=status.HTTP_201_CREATED)
async def create_mystery(
    mystery_data: MysteryCreate,
    current_user: UserInDB = Depends(get_current_user)
):
    """Create a new mystery"""
    return MysteryService.create_mystery(mystery_data, current_user.id)

@router.get("", response_model=List[MysteryResponse])
async def list_mysteries(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    current_user: UserInDB = Depends(get_current_user)
):
    """List mysteries with pagination"""
    return MysteryService.list_mysteries(skip, limit)

@router.get("/{mystery_id}", response_model=MysteryResponse)
async def get_mystery_by_id(
    mystery_id: str = Path(..., title="The ID of the mystery"),
    current_user: UserInDB = Depends(get_current_user)
):
    """Get a mystery by ID"""
    return MysteryService.get_mystery_by_id(mystery_id)

@router.put("/{mystery_id}", response_model=MysteryResponse)
async def update_mystery(
    mystery_data: MysteryUpdate,
    mystery_id: str = Path(..., title="The ID of the mystery to update"),
    current_user: UserInDB = Depends(get_current_user)
):
    """Update a mystery"""
    return MysteryService.update_mystery(mystery_id, mystery_data, current_user.id)

@router.delete("/{mystery_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_mystery(
    mystery_id: str = Path(..., title="The ID of the mystery to delete"),
    current_user: UserInDB = Depends(get_current_user)
):
    """Soft delete a mystery"""
    MysteryService.delete_mystery(mystery_id, current_user.id)
    return None 