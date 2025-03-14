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
        
        # Handle is_question flag - translate between frontend and backend categories
        # The frontend uses lowercase categories, backend uses uppercase
        # We need to normalize this
        category = comment_data.category
        if isinstance(category, str):
            # Convert to uppercase for backend
            comment_data.category = category.upper()
        
        comment_dict = comment_data.dict()
        created_comment = CommentModel.create_comment(comment_dict, author_id)
        
        # Get author details for the response
        from ..models.user_model import UserModel
        author = UserModel.get_user_by_id(author_id)
        if author:
            created_comment["author"] = {
                "id": author["id"],
                "username": author["username"],
                "email": author["email"],
                "name": author.get("name"),
                "surname": author.get("surname"),
                "role": author.get("role", "user"),
                "badges": author.get("badges", []),
                "bio": author.get("bio"),
                "country": author.get("country"),
                "profession": author.get("profession")
            }
        
        # Set is_question flag based on category for the frontend
        created_comment["is_question"] = created_comment.get("category", "").upper() == "QUESTION"
        
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
        
        # Set is_question flag for each comment based on category
        for comment in comments:
            comment["is_question"] = comment.get("category", "").upper() == "QUESTION"
            if "replies" in comment:
                for reply in comment["replies"]:
                    reply["is_question"] = reply.get("category", "").upper() == "QUESTION"
        
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
        
    @staticmethod
    def add_vote(comment_id: str, user_id: str, vote_type: str) -> CommentResponse:
        """Add a vote to a comment"""
        # Check if comment exists
        comment = CommentModel.get_comment_by_id(comment_id)
        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Comment not found"
            )
            
        # Add the vote
        updated_comment = CommentModel.add_vote(comment_id, user_id, vote_type)
        if not updated_comment:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to add vote"
            )
            
        return CommentResponse(**updated_comment)
        
    @staticmethod
    def remove_vote(comment_id: str, user_id: str) -> CommentResponse:
        """Remove a vote from a comment"""
        # Check if comment exists
        comment = CommentModel.get_comment_by_id(comment_id)
        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Comment not found"
            )
            
        # Remove the vote
        updated_comment = CommentModel.remove_vote(comment_id, user_id)
        if not updated_comment:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to remove vote"
            )
            
        return CommentResponse(**updated_comment) 