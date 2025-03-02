from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from ..schemas.user_schema import UserCreate, UserResponse, Token, UserLogin
from ..services.user_service import UserService

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate):
    """Register a new user"""
    return UserService.register_user(user_data)

@router.post("/login", response_model=Token)
async def login(form_data: UserLogin):
    """Login and get access token"""
    return UserService.authenticate_user(
        username=form_data.username,
        password=form_data.password
    ) 