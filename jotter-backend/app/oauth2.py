from jose import jwt,JWTError
from datetime import datetime,timedelta
from . import schemas
from fastapi import HTTPException,Depends
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme= OAuth2PasswordBearer(tokenUrl="login")

ALGORITHM = "HS256"
SECRET_KEY = "a2fdfwf4132532dsf422"
EXIRATION_IN_MINUTES = 30

def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now()+timedelta(minutes=EXIRATION_IN_MINUTES)
    to_encode.update({"exp":expire})

    enc_jwt = jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
    return enc_jwt

def verify_token(token:str, credential_exception):
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=ALGORITHM)
        email = payload.get("email")
        if email is None:
            raise credential_exception
        
        token_data= schemas.TokenData(email=str(email))
        return token_data.email
    except JWTError:
        raise credential_exception

def get_current_user(token: str = Depends(oauth2_scheme)):
    credential_exception = HTTPException(status_code=401,detail="could not validate credentials", headers={"WWW-Authenticate":"bearer"})
    return verify_token(token,credential_exception)