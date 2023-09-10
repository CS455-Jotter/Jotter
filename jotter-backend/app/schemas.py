from pydantic import BaseModel,EmailStr,conint
from datetime import datetime
from typing import Optional

class User(BaseModel):
    id: Optional[str] = None
    email : EmailStr
    password : str
    saved_state : Optional[str] = None


class UserOut(BaseModel):
    email : EmailStr
    saved_state : Optional[str]
    class Config:
        orm_mode=True   

class Token(BaseModel):
    access_token : str
    token_type : str 
    class Config:
        orm_mode=True

class TokenData(BaseModel):
    email : Optional[str] = None