from .database import Base
from sqlalchemy import Column, Integer, String#, Foreign_Key
# from sqlalchemy.orm import relationship
# from sqlalchemy.sql.sqltypes import TIMESTAMP
# from sqlalchemy.sql.expression import text


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, nullable= False)
    email = Column(String, nullable=False, unique= True)
    password = Column(String, nullable=False)
    saved_state = Column(String,default="")
