from typing import List, Optional
from fastapi import HTTPException, status
from datetime import datetime

from ..schemas.comment_schema import CommentCreate, CommentInDB, CommentUpdate, CommentResponse
from ..models.comment_model import CommentModel
from ..models.mystery_model import MysteryModel

class CommentService:
    @staticmethod
    def create_comment(comment_data: CommentCreate, author_id: str) -> CommentResponse:
        """Create a new comment"""
        # Check if mystery exists
        mystery = MysteryModel.get_mystery_by_id(comment_data.mystery_id, include_author=False)
        if not mystery:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Mystery not found"
            )
            
        # If it's a reply, check if parent comment exists
        if comment_data.parent_id:
            parent_comment = CommentModel.get_comment_by_id(comment_data.parent_id)
            if not parent_comment:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Parent comment not found"
                )
                
            # Don't allow nested replies (only one level deep)
            if parent_comment.get("is_reply", False):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Cannot reply to a reply. Only one level of nesting is allowed"
                )
                
            # Ensure parent comment belongs to the same mystery
            if parent_comment["mystery_id"] != comment_data.mystery_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Parent comment does not belong to the specified mystery"
                )
        
        comment_dict = comment_data.dict()
        created_comment = CommentModel.create_comment(comment_dict, author_id)
        
        return CommentResponse(**created_comment)
    
    @staticmethod
    def list_comments_by_mystery(mystery_id: str) -> List[CommentResponse]:
        """List all comments for a mystery"""
        # Check if mystery exists
        mystery = MysteryModel.get_mystery_by_id(mystery_id, include_author=False)
        if not mystery:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Mystery not found"
            )
            
        comments = CommentModel.list_comments_by_mystery(mystery_id)
        
        return [CommentResponse(**comment) for comment in comments]
    
    @staticmethod
    def update_comment(comment_id: str, update_data: CommentUpdate, current_user_id: str) -> CommentResponse:
        """Update a comment"""
        # Check if comment exists
        comment = CommentModel.get_comment_by_id(comment_id)
        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Comment not found"
            )
            
        # Check if current user is the author
        if comment["author_id"] != current_user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this comment"
            )
            
        # Update comment
        update_dict = update_data.dict(exclude_unset=True)
        updated_comment = CommentModel.update_comment(comment_id, update_dict)
        
        return CommentResponse(**updated_comment) 