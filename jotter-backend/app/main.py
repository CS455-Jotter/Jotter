from fastapi import FastAPI
from . import models
from .database import engine
from .routers import user,auth
from .config import settings
from fastapi.exceptions import RequestValidationError
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(user.router)
app.include_router(auth.router)

@app.get("/")
async def root():
    return {"message":"base dir"}