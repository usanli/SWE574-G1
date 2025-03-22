from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Any
from datetime import datetime
import uuid
from enum import Enum
from .user_schema import UserResponse

class CommentCategory(str, Enum):
    QUESTION = "question"
    IDENTIFICATION = "identification"
    CONFIRMATION = "confirmation"
    EXPLANATION = "explanation"
    ADDITIONAL_INFO = "additional_info"
    OTHER = "other"
    GUESS = "guess"
    DISCUSSION = "discussion"
    HINT = "hint"
    EXPERT = "expert"

# Add VoteInfo schema
class VoteInfo(BaseModel):
    upvote_count: int = 0
    downvote_count: int = 0
    user_vote: Optional[int] = None

class CommentBase(BaseModel):
    content: str
    category: CommentCategory
    subcategory: Optional[CommentCategory] = None
    anonymous: bool = False
    proof_url: Optional[HttpUrl] = None

class CommentCreate(CommentBase):
    mystery_id: Optional[str] = None
    parent_id: Optional[str] = None
    is_reply: Optional[bool] = None

class CommentUpdate(BaseModel):
    content: Optional[str] = None
    category: Optional[CommentCategory] = None
    subcategory: Optional[CommentCategory] = None
    anonymous: Optional[bool] = None
    proof_url: Optional[HttpUrl] = None
    featured: Optional[bool] = None

class CommentInDB(CommentBase):
    id: str
    mystery_id: str
    author_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    parent_id: Optional[str] = None
    is_reply: bool
    featured: bool = False

    class Config:
        orm_mode = True

class CommentResponse(CommentInDB):
    author: Optional[UserResponse] = None
    replies: Optional[List['CommentResponse']] = []
    votes: VoteInfo = Field(default_factory=lambda: VoteInfo())

    class Config:
        orm_mode = True

class CommentResponseWithMystery(CommentResponse):
    """Comment response that includes mystery title for profile display"""
    mystery_title: str
    mystery_id: str

    class Config:
        orm_mode = True

CommentResponse.update_forward_refs() 