from rest_framework.test import APIClient
import pytest
from faker import Faker
import os
import tempfile
from PIL import Image


client = APIClient()
faker = Faker()

endpoint = "/drivers"
registration_endpoint = "/auth/"

current_directory = os.path.dirname(os.path.abspath(__file__))




def register_user_get_driver_id():
    data = {
        "first_name":faker.first_name(),
        "last_name":faker.last_name(),
        "email":faker.email(),
        # Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character
        "password":f"{faker.email()}Ab2",
        "is_driver":True
    }
    reg_response = client.post(registration_endpoint, data)
    driver_id = reg_response.data["data"]["driver_profile"].get("id")
    token = reg_response.data.get("access")
    return driver_id, token


@pytest.mark.django_db
def test_retrieve_driver_profile():
    driver_id, token = register_user_get_driver_id()
    client.credentials(HTTP_AUTHORIZATION='JWT ' + token)
    response = client.get(f"{endpoint}/profile/{driver_id}/")
    client.credentials()
    assert response.status_code == 200



@pytest.mark.django_db
def test_retrieve_driver_profile_fail():
    """
    Server response should be 404 when object does not exist
    """
    driver_id = "124oasla"
    response = client.get(f"{endpoint}/profile/{driver_id}/")
    assert response.status_code == 404




def temporary_image():
    """
    Returns a new temporary image file
    """
    
    image = Image.new('RGB', (100, 100))
    tmp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
    image.save(tmp_file, 'jpeg')
    tmp_file.seek(0)  # important because after save(), the fp is already at the end of the file
    return tmp_file


@pytest.mark.django_db
def test_update_driver_profile():
    data = {
        "license_front": temporary_image(),
        "license_back": temporary_image(),
        "profile_picture": temporary_image(),
    }
    driver_id, token = register_user_get_driver_id()
    client.credentials(HTTP_AUTHORIZATION='JWT ' + token)

    response = client.put(f"{endpoint}/profile/{driver_id}/", data, format='multipart')
    assert response.status_code == 202
    assert "license_front" and "license_back" and "profile_picture" in response.data # must be true
    client.credentials()
    
    


@pytest.mark.django_db
def test_create_driver_car():
    driver_id, token = register_user_get_driver_id()
    data = {
        "driver":int(driver_id),
        "vehicle_name_model": "Toyota Sienna",
        "vehicle_number": "T1242141C",
        "vehicle_color": "Red",
        "vehicle_registration": temporary_image(),
        "vehicle_insurance": temporary_image(),
    }
    client.credentials(HTTP_AUTHORIZATION='JWT ' + token)
    response = client.post(f"{endpoint}/car/", data, format="multipart")
    assert response.status_code == 201
    client.credentials()
    
    
    
@pytest.mark.django_db
def test_update_driver_car():
    driver_id, token = register_user_get_driver_id()
    data = {
        "driver":int(driver_id),
        "vehicle_name_model": "Toyota Sienna",
        "vehicle_number": "T1242141C",
        "vehicle_color": "Red",
        "vehicle_registration": temporary_image(),
        "vehicle_insurance": temporary_image(),
    }
    client.credentials(HTTP_AUTHORIZATION='JWT ' + token)
    response = client.post(f"{endpoint}/car/", data, format="multipart")
    client.credentials()
    data = {
        "driver":int(driver_id),
        "vehicle_name_model": "Toyota Corrolla",
        "vehicle_number": "T1242141C",
        "vehicle_color": "Blue",
        "vehicle_registration": temporary_image(),
        "vehicle_insurance": temporary_image(),
    }
    client.credentials(HTTP_AUTHORIZATION='JWT ' + token)
    response = client.put(f"{endpoint}/car/{response.data['id']}/", data, format="multipart")
    assert response.status_code == 202
    client.credentials()
    
    
    
    
    
    
@pytest.mark.django_db
def test_delete_driver_car():
    driver_id, token = register_user_get_driver_id()
    data = {
        "driver":int(driver_id),
        "vehicle_name_model": "Toyota Sienna",
        "vehicle_number": "T1242141C",
        "vehicle_color": "Red",
        "vehicle_registration": temporary_image(),
        "vehicle_insurance": temporary_image(),
    }
    client.credentials(HTTP_AUTHORIZATION='JWT ' + token)
    response = client.post(f"{endpoint}/car/", data, format="multipart")

    response = client.delete(f"{endpoint}/car/{response.data['id']}/")
    assert response.status_code == 204
    client.credentials()