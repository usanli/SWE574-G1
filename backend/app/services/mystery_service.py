from typing import List, Optional
from fastapi import HTTPException, status
from datetime import datetime

from ..schemas.mystery_schema import MysteryCreate, MysteryInDB, MysteryUpdate, MysteryResponse
from ..models.mystery_model import MysteryModel

class MysteryService:
    @staticmethod
    def create_mystery(mystery_data: MysteryCreate, author_id: str) -> MysteryResponse:
        """Create a new mystery"""
        mystery_dict = mystery_data.dict()
        created_mystery = MysteryModel.create_mystery(mystery_dict, author_id)
        
        return MysteryResponse(**created_mystery)
    
    @staticmethod
    def get_mystery_by_id(mystery_id: str) -> MysteryResponse:
        """Get a mystery by ID"""
        mystery = MysteryModel.get_mystery_by_id(mystery_id)
        
        if not mystery:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Mystery not found"
            )
            
        return MysteryResponse(**mystery)
    
    @staticmethod
    def list_mysteries(skip: int = 0, limit: int = 10) -> List[MysteryResponse]:
        """List mysteries with pagination"""
        mysteries = MysteryModel.list_mysteries(skip, limit)
        
        return [MysteryResponse(**mystery) for mystery in mysteries]
    
    @staticmethod
    def update_mystery(mystery_id: str, update_data: MysteryUpdate, current_user_id: str) -> MysteryResponse:
        """Update a mystery"""
        # Check if mystery exists
        mystery = MysteryModel.get_mystery_by_id(mystery_id)
        if not mystery:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Mystery not found"
            )
            
        # Check if current user is the author
        if mystery["author_id"] != current_user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this mystery"
            )
            
        # Update mystery
        update_dict = update_data.dict(exclude_unset=True)
        updated_mystery = MysteryModel.update_mystery(mystery_id, update_dict)
        
        return MysteryResponse(**updated_mystery)
    
    @staticmethod
    def delete_mystery(mystery_id: str, current_user_id: str) -> None:
        """Soft delete a mystery"""
        # Check if mystery exists
        mystery = MysteryModel.get_mystery_by_id(mystery_id)
        if not mystery:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Mystery not found"
            )
            
        # Check if current user is the author
        if mystery["author_id"] != current_user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to delete this mystery"
            )
            
        # Soft delete mystery
        success = MysteryModel.soft_delete_mystery(mystery_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete mystery"
            )
    
    @staticmethod
    def list_mysteries_by_author(author_id: str) -> List[MysteryResponse]:
        """List mysteries by a specific author"""
        mysteries = MysteryModel.list_mysteries_by_author(author_id)
        
        return [MysteryResponse(**mystery) for mystery in mysteries] 