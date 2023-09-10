from fastapi import HTTPException, Depends, APIRouter, Response
from .. import schemas,utils,models,oauth2
from sqlalchemy.orm import Session
from app.database import get_db
from typing import List
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import HTTPException

router = APIRouter(
    prefix="/users"
)

@router.post("/",response_model=schemas.UserOut)
def create_user(user: schemas.User,db : Session = Depends(get_db)):
    hashpwd = utils.hash(user.password)
    user.password=hashpwd
    db.commit()
    newUser = models.User(**user.dict())
    db.add(newUser)
    db.commit()
    db.refresh(newUser)

    return newUser

@router.get(
        "/",
        response_model=schemas.UserOut,
        response_model_exclude_none= True,       
)
def get_user(db: Session = Depends(get_db),email:int = Depends(oauth2.get_current_user)):
    user = db.query(models.User).filter(models.User.email==email).first()
    
    if user == None:
        raise HTTPException(status_code=404, detail=f"User with email = {email} not found")
    response = jsonable_encoder(user)
    return response

@router.put(
    "/save",
)
def save_state(state : schemas.State,db: Session = Depends(get_db),email:str = Depends(oauth2.get_current_user)):
    user_query = db.query(models.User).filter(models.User.email==email)
    user = user_query.first()

    usernew = schemas.User(email=email,password=user.password)
    usernew.saved_state = state.saved_state
    user_query.update(usernew.dict(exclude_none=True),synchronize_session=False)
    db.commit()

    return Response(status_code=200)
