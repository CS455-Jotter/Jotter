import requests
from app.database import get_db
from app import models,utils
from app.config import settings

class TestUserAuth:

    url =  settings.base_url + "/login"
    reg_url = settings.base_url + "/users/"

    username = "testuser@jotter.com"
    password = "testpassword"
    wrong_password = "wrongpassword"
    wrong_username = "mskfeioncea"
    token =""

    def test_register_user(self):
        db = next(get_db())

        db.query(models.User).filter(models.User.email==self.username).delete()
        db.commit()

        # check if a user can register
        response = requests.post(self.reg_url,json={"email":self.username,"password":self.password})

        # delete the test user from db
        db.query(models.User).filter(models.User.email==self.username).delete()
        db.commit()

        # test
        db.close_all()
        assert response.status_code == 200

    def test_invalid_user_login(self):

        # check if a user with wrong password or username can login
        respone1 = requests.post(self.url,data={"username":self.wrong_username,"password":self.password})
        respone2 = requests.post(self.url,data={"username":self.username,"password":self.wrong_password})

        # test
        assert respone1.status_code == 403
        assert respone2.status_code == 403

    def test_valid_user_login(self):
        db = next(get_db())
        # add a valid user into db
        hashpwd = utils.hash(self.password)

        db.query(models.User).filter(models.User.email==self.username).delete()
        db.commit()
        
        db.add(models.User(email=self.username,password=hashpwd))
        db.commit()

        db.close_all()

        try:
            # check if the user can login
            response = requests.post(self.url,data={"username":self.username,"password":self.password})

        finally:
            # delete the test user from db
            db = next(get_db())
            db.query(models.User).filter(models.User.email==self.username).delete()
            db.commit()

        db.close_all()
        # test
        assert response.status_code == 200


    def test_user_from_token(self):
        db = next(get_db())
        # add a valid user into db
        hashpwd = utils.hash(self.password)
        db.query(models.User).filter(models.User.email==self.username).delete()
        db.commit()

        db.add(models.User(email=self.username,password=hashpwd))
        db.commit()

        db.close_all()

        # get the token
        try :
            response = requests.post(self.url ,data={"username":self.username,"password":self.password})
            self.token = response.json()["access_token"]

            # check if the user can be fetched from token
            response = requests.get(self.reg_url,headers={"Authorization":f"Bearer {self.token}"})

        finally:
            # delete the test user from db
            db = next(get_db())
            db.query(models.User).filter(models.User.email==self.username).delete()
            db.commit()

        db.close_all()

        # test
        assert response.status_code == 200