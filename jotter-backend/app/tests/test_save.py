import requests
from app.database import get_db
from app import models,utils
from app.config import settings

class TestDataSave:
    
    url =  settings.base_url + "/users/"
    login_url = settings.base_url + "/login/"

    username = "testuser@jotter.com"
    password = "testpassword"
    token = ""
    wrong_token = "wrongtoken"
    test_state = "teststate"


    def test_save_state(self):
        db = next(get_db())

        # add a valid user into db
        hashpwd = utils.hash(self.password)
        db.query(models.User).filter(models.User.email==self.username).delete()
        db.commit()
        db.add(models.User(email=self.username,password=hashpwd))
        db.commit()
        db.close()

        try :
            # get the token
            response = requests.post(self.login_url ,data={"username":self.username,"password":self.password})
            self.token = response.json()["access_token"]

            # check if the user can save state
            response = requests.put(self.url+"save",headers={"Authorization":f"Bearer {self.token}"},json={"saved_state":self.test_state})
        finally:
            # delete the test user from db
            db = next(get_db())
            db.query(models.User).filter(models.User.email==self.username).delete()
            db.commit()

        db.close()
    
        # test
        assert response.status_code == 200
    

    def test_save_state_correctness(self):
        db = next(get_db())

        # add a valid user into db
        hashpwd = utils.hash(self.password)
        db.query(models.User).filter(models.User.email==self.username).delete()
        db.commit()
        db.add(models.User(email=self.username,password=hashpwd))
        db.commit()
        db.close()

        try:
            # get the token
            response = requests.post(self.login_url ,data={"username":self.username,"password":self.password})
            self.token = response.json()["access_token"]


            # check if the user can save state
            response = requests.put(self.url+"save/",headers={"Authorization":f"Bearer {self.token}"},json={"saved_state":self.test_state})
            assert response.status_code == 200

            # check if the saved state is correct
            response = requests.get(self.url,headers={"Authorization":f"Bearer {self.token}"})

        finally:
            db = next(get_db())

            # delete the test user from db
            db.query(models.User).filter(models.User.email==self.username).delete()
            db.commit()

        db.close()

        # test
        assert response.json()["saved_state"] == self.test_state

    
    def test_save_state_without_token(self):
        # check if the user can save state without token
        response = requests.put(self.url+"save/",json={"saved_state":"teststate"})

        assert response.status_code == 401
    

    def test_save_state_with_wrong_token(self):
        # check if the user can save state with wrong token
        response = requests.put(self.url+"save/",headers={"Authorization":f"Bearer {self.wrong_token}"},json={"saved_state":"teststate"})

        assert response.status_code == 401