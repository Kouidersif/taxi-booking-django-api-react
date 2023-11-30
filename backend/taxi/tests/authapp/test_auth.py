from rest_framework.test import APIClient
import pytest
from faker import Faker


client = APIClient()
faker = Faker()


registration_endpoint = "/auth/"
login_endpoint = "/api/token/"


@pytest.mark.django_db
def test_user_registration():
    data = {
        "first_name":faker.first_name(),
        "last_name":faker.last_name(),
        "email":faker.email(),
        # Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character
        "password":f"{faker.email()}Ab2",
    }
    response = client.post(registration_endpoint, data)
    assert response.status_code == 201
    
    
@pytest.mark.django_db
def test_user_registration_failed_weak_pwd():
    """
    Testing invalid data sent by user, expecting a 400 status code indicating user sent data is not correct
    """
    data = {
        "first_name":faker.first_name(),
        "last_name":faker.last_name(),
        "email":faker.email(),
        # Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character
        "password":"azerty123", #weak password that backend should refuse
    }
    response = client.post(registration_endpoint, data)
    
    assert response.status_code == 400


@pytest.mark.django_db
def test_user_registration_email_exists():
    """
    Testing if user exists with the registred email
    """
    data_registration = {
        "first_name":faker.first_name(),
        "last_name":faker.last_name(),
        "email":faker.email(),
        "password":"azerty@A123",
    }
    response = client.post(registration_endpoint, data_registration)
    data = {
        "first_name":faker.first_name(),
        "last_name":faker.last_name(),
        # The test should fail because a user already exists with this email
        "email":data_registration["email"],
        "password":"azerty@A123",
    }
    response = client.post(registration_endpoint, data)
    
    assert response.status_code == 400




@pytest.mark.django_db
def test_user_login():
    data = {
        "first_name":faker.first_name(),
        "last_name":faker.last_name(),
        "email":faker.email(),
        "password":f"{faker.email()}Ab2",
    }
    response = client.post(registration_endpoint, data)
    login_data = {
        "email":data["email"],
        "password":data["password"],
    }
    response = client.post(login_endpoint, login_data)
    assert response.status_code == 200
    acesss = response.data["access"]
    refresh = response.data["refresh"]
    
    assert "access" and "refresh" in response.data # Must be True
    
    
    


@pytest.mark.django_db
def test_user_login_fail_wrong_pwd():
    data = {
        "first_name":faker.first_name(),
        "last_name":faker.last_name(),
        "email":faker.email(),
        # Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character
        "password":f"{faker.email()}Ab2",
    }
    response = client.post(registration_endpoint, data)
    login_data = {
        "email":data["email"],
        # Using incorrect password
        "password": "thisIsAwrongPassWord",
    }
    response = client.post(login_endpoint, login_data)
    assert response.status_code == 401




