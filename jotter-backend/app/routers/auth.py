
from fastapi import APIRouter,Response,HTTPException,Depends
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import schemas,models,utils,oauth2
from .. database import get_db

router = APIRouter()

@router.post("/login",response_model=schemas.Token)
def login(userTOauthenticate : OAuth2PasswordRequestForm = Depends() ,db : Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email==userTOauthenticate.username).first()
    db.close()

    if not user or not utils.verify(user,userTOauthenticate):
        raise HTTPException(status_code=403,detail="Invalid Credentials")
    
    token = oauth2.create_token(data={"email":user.email})
    return {"access_token": token,"token_type":"bearer"}