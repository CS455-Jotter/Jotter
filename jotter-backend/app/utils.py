from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"])

def hash(s):
    return pwd_context.hash(s)

def verify(user,testUser):
    try:
        return pwd_context.verify(testUser.password,user.password)
    except : 
        return False