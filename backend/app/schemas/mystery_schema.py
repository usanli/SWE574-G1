from pydantic import BaseModel, Field, HttpUrl
from typing import List, Dict, Optional, Any, Union
from datetime import datetime, date
import uuid
from enum import Enum
from .user_schema import UserResponse

class AttributeDataType(str, Enum):
    TEXT = "text"
    NUMBER = "number"
    DATE = "date"
    BOOLEAN = "boolean"

class ImageBase(BaseModel):
    url: HttpUrl
    caption: Optional[str] = None
    is_primary: bool = False
    order: int = 0

class TagBase(BaseModel):
    name: str
    wikidata_url: Optional[HttpUrl] = None

class AttributeRangeValue(BaseModel):
    min: Union[float, int]
    max: Union[float, int]

class AttributeBase(BaseModel):
    name: str
    data_type: AttributeDataType
    is_range: Optional[bool] = False
    value: Union[str, int, float, bool, AttributeRangeValue]
    unit: Optional[str] = None
    searchable: bool = True

class MysteryBase(BaseModel):
    title: str
    description: str
    location: Optional[str] = None
    anonymous: bool = False

class MysteryCreate(MysteryBase):
    attributes: Optional[List[AttributeBase]] = []
    images: Optional[List[ImageBase]] = []
    tags: Optional[List[TagBase]] = []

class MysteryUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    attributes: Optional[List[AttributeBase]] = None
    images: Optional[List[ImageBase]] = None
    tags: Optional[List[TagBase]] = None
    solved_by: Optional[str] = None
    anonymous: Optional[bool] = None
    deleted_at: Optional[datetime] = None

class MysteryInDB(MysteryBase):
    id: str
    author_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    solved_by: Optional[str] = None
    deleted_at: Optional[datetime] = None
    attributes: List[AttributeBase] = []
    images: List[ImageBase] = []
    tags: List[TagBase] = []

    class Config:
        orm_mode = True

class MysteryResponse(MysteryInDB):
    author: Optional[UserResponse] = None

    class Config:
        orm_mode = True 