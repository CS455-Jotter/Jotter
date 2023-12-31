from pydantic import BaseModel,EmailStr
from typing import Optional

class User(BaseModel):
    id: Optional[str] = None
    email : EmailStr
    password : str
    saved_state : Optional[str] = None

class State(BaseModel):
    saved_state : str


class UserOut(BaseModel):
    email : EmailStr
    saved_state : Optional[str]
    class Config:
        from_attributes=True   

class Token(BaseModel):
    access_token : str
    token_type : str 
    class Config:
        from_attributes=True

class TokenData(BaseModel):
    email : Optional[str] = None