from typing import List, Optional
from fastapi import HTTPException, status
from datetime import datetime

from ..schemas.comment_schema import CommentCreate, CommentInDB, CommentUpdate, CommentResponse, VoteInfo, CommentResponseWithMystery
from ..models.comment_model import CommentModel
from ..models.mystery_model import MysteryModel
from ..services.vote_service import VoteService

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
        
        # Add empty vote info for new comment
        created_comment["votes"] = VoteInfo().dict()
        
        return CommentResponse(**created_comment)
    
    @staticmethod
    def list_comments_by_mystery(mystery_id: str, current_user_id: Optional[str] = None) -> List[CommentResponse]:
        """List all comments for a mystery"""
        # Check if mystery exists
        mystery = MysteryModel.get_mystery_by_id(mystery_id, include_author=False)
        if not mystery:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Mystery not found"
            )
            
        comments = CommentModel.list_comments_by_mystery(mystery_id)
        
        # Collect all comment IDs (top-level and replies)
        comment_ids = []
        for comment in comments:
            comment_ids.append(comment["id"])
            for reply in comment.get("replies", []):
                comment_ids.append(reply["id"])
        
        # Get vote information for all comments using the VoteModel directly
        from ..models.vote_model import VoteModel
        vote_status = VoteModel.get_vote_status(comment_ids, "comment", current_user_id)
        
        # Add vote information to comments
        for comment in comments:
            if comment["id"] in vote_status:
                comment["votes"] = vote_status[comment["id"]]
            else:
                comment["votes"] = VoteInfo().dict()
            
            # Add vote information to replies
            for reply in comment.get("replies", []):
                if reply["id"] in vote_status:
                    reply["votes"] = vote_status[reply["id"]]
                else:
                    reply["votes"] = VoteInfo().dict()
        
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
        
        # Get vote information using VoteService
        updated_comment["votes"] = VoteService.get_vote_info(comment_id, "comment", current_user_id)
        
        return CommentResponse(**updated_comment)
    
    @staticmethod
    def validate_comment_for_voting(comment_id: str, user_id: str) -> None:
        """Validate that a comment exists for voting"""
        comment = CommentModel.get_comment_by_id(comment_id)
        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Comment not found"
            )
    
    @staticmethod
    def vote_on_comment(comment_id: str, user_id: str, vote_value: int) -> CommentResponse:
        """Vote on a comment using the VoteService"""
        # Get the comment
        comment = CommentModel.get_comment_by_id(comment_id)
        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Comment not found"
            )
        
        # Use the VoteService to handle the vote
        vote_info = VoteService.vote(
            user_id, 
            comment_id, 
            "comment", 
            vote_value, 
            CommentService.validate_comment_for_voting
        )
        
        # Add vote information to comment
        comment["votes"] = vote_info
        
        # Get author details
        from ..models.user_model import UserModel
        author = UserModel.get_user_by_id(comment["author_id"])
        if author:
            comment["author"] = {
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
        
        return CommentResponse(**comment)
    
    @staticmethod
    def list_comments_by_user(user_id: str, current_user_id: Optional[str] = None) -> List[CommentResponseWithMystery]:
        """List all comments by a user"""
        comments = CommentModel.list_comments_by_user(user_id)
        
        # Get vote information for all comments
        comment_ids = [comment["id"] for comment in comments]
        
        # Get vote information using VoteModel directly
        from ..models.vote_model import VoteModel
        vote_status = VoteModel.get_vote_status(comment_ids, "comment", current_user_id)
        
        # Add vote information to comments
        for comment in comments:
            if comment["id"] in vote_status:
                comment["votes"] = vote_status[comment["id"]]
            else:
                comment["votes"] = VoteInfo().dict()
            
            # Normalize category and subcategory values
            if "category" in comment and comment["category"]:
                comment["category"] = comment["category"].lower()
            if "subcategory" in comment and comment["subcategory"]:
                comment["subcategory"] = comment["subcategory"].lower()
        
        result = []
        for comment in comments:
                result.append(CommentResponseWithMystery(**comment))
                     
        return result 