from typing import Optional
from fastapi import HTTPException, status
from datetime import timedelta

from ..schemas.user_schema import UserCreate, UserInDB, Token, UserUpdate
from ..models.user_model import UserModel
from ..core.auth.jwt import create_access_token
from ..core.auth.password import get_password_hash
from ..core.config import settings

class UserService:
    @staticmethod
    def register_user(user_data: UserCreate) -> UserInDB:
        # Check if username already exists
        if UserModel.get_user_by_username(user_data.username):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already registered"
            )
            
        # Check if email already exists
        if UserModel.get_user_by_email(user_data.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
            
        # Create the user
        user_dict = user_data.dict()
        created_user = UserModel.create_user(user_dict)
        
        return UserInDB(**created_user)
    
    @staticmethod
    def authenticate_user(username: str, password: str) -> Token:
        user = UserModel.authenticate_user(username, password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        if user.get("suspended", False):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is suspended"
            )
            
        # Create access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            subject=user["id"], expires_delta=access_token_expires
        )
        
        return Token(access_token=access_token)
    
    @staticmethod
    def update_user(user_id: str, update_data: UserUpdate) -> UserInDB:
        """Update user profile"""
        # Get existing user
        user = UserModel.get_user_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
            
        # Prepare update data
        update_dict = update_data.dict(exclude_unset=True)
        
        # Hash password if it's being updated
        if "password" in update_dict and update_dict["password"]:
            update_dict["password"] = get_password_hash(update_dict["password"])
            
        # Update user
        updated_user = UserModel.update_user(user_id, update_dict)
        
        return UserInDB(**updated_user) 