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
    password: Optional[str] = None
    date_of_birth: Optional[date] = None
    profession: Optional[str] = None
    bio: Optional[str] = None
    country: Optional[str] = None
    profile_picture_url: Optional[str] = None
    
    @validator('password')
    def password_min_length(cls, v):
        if v is not None and len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v

class UserInDB(UserBase):
    id: str
    name: Optional[str] = None
    surname: Optional[str] = None
    date_of_birth: Optional[datetime] = None
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
        
    @validator('date_of_birth', pre=True)
    def parse_date_of_birth(cls, v):
        if isinstance(v, date) and not isinstance(v, datetime):
            return datetime.combine(v, datetime.min.time())
        return v

class UserResponse(UserBase):
    id: str
    name: Optional[str] = None
    surname: Optional[str] = None
    date_of_birth: Optional[date] = None
    profession: Optional[str] = None
    bio: Optional[str] = None
    country: Optional[str] = None
    badges: List[str] = []
    role: str
    
    class Config:
        orm_mode = True
        
    @validator('date_of_birth', pre=True)
    def convert_datetime_to_date(cls, v):
        if isinstance(v, datetime):
            return v.date()
        return v

# Login schemas
class UserLogin(BaseModel):
    username: str
    password: str 