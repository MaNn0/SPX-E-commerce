from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    firstName:str
    lastName:str
    email:EmailStr
    password:str

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    firstName: Optional[str] = None
    lastName:Optional[str] = None
    email:Optional[EmailStr] = None
    
class UserOut(UserBase):
    id:int
    
class Config:
        from_attributes = True