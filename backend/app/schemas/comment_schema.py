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

class CommentBase(BaseModel):
    content: str
    category: CommentCategory
    anonymous: bool = False
    proof_url: Optional[HttpUrl] = None

class CommentCreate(CommentBase):
    mystery_id: str
    parent_id: Optional[str] = None

class CommentUpdate(BaseModel):
    content: Optional[str] = None
    category: Optional[CommentCategory] = None
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

    class Config:
        orm_mode = True

# Resolve the forward reference
CommentResponse.update_forward_refs() 