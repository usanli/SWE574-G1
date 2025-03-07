from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi

from .core.config import settings
from .routers import auth, users
from .core.security import oauth2_scheme

app = FastAPI(
    title=settings.APP_NAME,
    description="A Blog API with MongoDB",
    version="0.1.0",
    debug=settings.DEBUG
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)

@app.get("/", tags=["root"])
async def root():
    return {"message": f"Welcome to {settings.APP_NAME}"} 