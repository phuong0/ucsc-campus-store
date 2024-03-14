from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db import connection
from django.contrib.auth import authenticate
#from backend.categories import categories
import pandas as pd

@csrf_exempt

def create_account(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        passcode = data.get('passcode')

        if not all([email, firstname, lastname, passcode]):
            return JsonResponse({'error': 'All fields are required'}, status=400)

        with connection.cursor() as cursor:
            try:
                cursor.execute("INSERT INTO accountinfo (email, firstname, lastname, passcode) VALUES (%s, %s, %s, %s)",
                               [email, firstname, lastname, passcode])
                connection.commit()
                return JsonResponse({'message': 'User created successfully'}, status=201)
            except Exception as e:
                connection.rollback()
                return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
def get_account(request):
    # Query the database to retrieve values
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM accountinfo")
        data = cursor.fetchall()

    # Convert the fetched data to a list of dictionaries
    keys = ['email', 'firstname', 'lastname', 'passcode']
    data_list = [dict(zip(keys, row)) for row in data]

    # Return the fetched data in JSON format
    return JsonResponse(data_list, safe=False)

@csrf_exempt

def get_login(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

    try:
        # Get email and passcode from request body
        data = json.loads(request.body)
        email = data.get('email')
        passcode = data.get('passcode')

        # Check if email and passcode are provided
        if not email or not passcode:
            return JsonResponse({'error': 'Email and passcode are required'}, status=400)

        # Query the database to check if email and passcode exist in accountinfo table
        with connection.cursor() as cursor:
            cursor.execute("SELECT COUNT(*) FROM accountinfo WHERE email = %s AND passcode = %s", [email, passcode])
            result = cursor.fetchone()

        # If no matching record found, return error
        if result[0] == 0:
            return JsonResponse({'error': 'Invalid email or passcode'}, status=401)

        # If email and passcode exist, return success message
        return JsonResponse({'message': 'Login successful'}, status=200)

    except Exception as e:
        # Handle exceptions, if any
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt

def get_categories(request):
    if request.method == 'POST':
        try:
            file = request.FILES['file']
            
            if file.name.endswith('.csv'):
                df = pd.read_csv(file)
            elif file.name.endswith('.xlsx'):
                df = pd.read_excel(file)
            else:
                return JsonResponse({'error': 'Unsupported file format'}, status=400)
            category_info = categories(df)

            return JsonResponse(category_info, status=200)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
@csrf_exempt
    
def load_file(request):
    if request.method == 'POST':
        file_data = request.FILES.get('filedata')  

        if not file_data:
            return JsonResponse({'error': 'No file provided'}, status=400)

        with connection.cursor() as cursor:
            try:
                cursor.execute("INSERT INTO files (filedata) VALUES (%s)", [file_data.read()])
                connection.commit()
                return JsonResponse({'message': 'File uploaded successfully'}, status=201)
            except Exception as e:
                connection.rollback()
                return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)