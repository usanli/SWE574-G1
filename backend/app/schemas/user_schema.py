from pydantic import BaseModel, EmailStr, Field, validator
from typing import List, Optional
from datetime import date, datetime
import uuid

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None

# User schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    
    @validator('password')
    def password_min_length(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v
    
    @validator('username')
    def username_alphanumeric(cls, v):
        if not v.isalnum():
            raise ValueError('Username must be alphanumeric')
        return v

class UserUpdate(BaseModel):
    name: Optional[str] = None
    surname: Optional[str] = None
    email: Optional[EmailStr] = None
    date_of_birth: Optional[date] = None
    profession: Optional[str] = None
    bio: Optional[str] = None
    country: Optional[str] = None
    profile_picture_url: Optional[str] = None
    password: Optional[str] = None

class UserInDB(UserBase):
    id: str
    name: Optional[str] = None
    surname: Optional[str] = None
    date_of_birth: Optional[date] = None
    profession: Optional[str] = None
    bio: Optional[str] = None
    country: Optional[str] = None
    profile_picture_url: Optional[str] = None
    badges: List[str] = []
    role: str = "user"
    suspended: bool = False
    created_at: datetime = None

    class Config:
        orm_mode = True

class UserResponse(UserBase):
    id: str
    name: Optional[str] = None
    surname: Optional[str] = None
    badges: List[str] = []
    role: str
    
    class Config:
        orm_mode = True

# Login schemas
class UserLogin(BaseModel):
    username: str
    password: str 