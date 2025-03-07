from datetime import datetime, timedelta
from typing import Optional
from jose import jwt

from ...core.config import settings

def create_access_token(subject: str, expires_delta: Optional[timedelta] = None) -> str:
    """Create a new JWT token"""
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
    return encoded_jwt 