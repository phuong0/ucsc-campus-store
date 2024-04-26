from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db import connection
from django.contrib.auth import authenticate
from backend.algorithims import categories
from backend.algorithims import full_text
from backend.algorithims import filter_and_save
import pandas as pd
import os
from django.http import FileResponse

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
            cursor.execute("SELECT userid FROM accountinfo WHERE email = %s AND passcode = %s", [email, passcode])
            result = cursor.fetchone()

        # If no matching record found, return error
        if not result:
            return JsonResponse({'error': 'Invalid email or passcode'}, status=401)

        # If email and passcode exist, return success message along with userid
        userid = result[0]
        return JsonResponse({'message': 'Login successful', 'userid': userid}, status=200)

    except Exception as e:
        # Handle exceptions, if any
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt

def get_categories(request):
    if request.method == 'POST':
        try:
            files = request.FILES.getlist('files')  # Assuming 'files' is the key for the array of files
            
            if not files:
                return JsonResponse({'error': 'No files were provided'}, status=400)
            
            ret = []

            for file in files:
                if file.name.endswith('.csv'):
                    df = pd.read_csv(file)
                elif file.name.endswith('.xlsx'):
                    df = pd.read_excel(file)
                else:
                    return JsonResponse({'error': 'Unsupported file format'}, status=400)
                
                category_info = categories(df)
                ret.append(category_info)
            
            return JsonResponse(ret, safe=False, status=200)  # Set safe=False to allow non-dictionary objects
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)


@csrf_exempt

def full_text_search(request):
    if request.method == 'POST':
        try:
            files = request.FILES.getlist('files')  # Assuming 'files' is the key for the array of files
            categories = request.POST.getlist('categories[]')
            
            if not files:
                return JsonResponse({'error': 'No files were provided'}, status=400)
            
            ret = []

            for file in files:
                if file.name.endswith('.csv'):
                    df = pd.read_csv(file)
                elif file.name.endswith('.xlsx'):
                    df = pd.read_excel(file)
                else:
                    return JsonResponse({'error': 'Unsupported file format'}, status=400)
                
                full_text_info = full_text(df, categories, file.name)
                ret.append(full_text_info)
            
            return JsonResponse(ret, safe=False, status=200)  # Set safe=False to allow non-dictionary objects
            
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
    
@csrf_exempt
    
def create_project(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        projectname = data.get('projectname')
        userid = data.get('userid')

        if not all([projectname, userid]):
            return JsonResponse({'error': 'All fields are required'}, status=400)

        with connection.cursor() as cursor:
            try:
                cursor.execute("INSERT INTO projects (projectname, userid) VALUES (%s, %s)",
                               [projectname, userid])
                connection.commit()
                return JsonResponse({'message': 'Project created successfully'}, status=201)
            except Exception as e:
                connection.rollback()
                return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
@csrf_exempt
    
def get_project(request):
    userid = request.GET.get('userid')
    print(request.GET)

    if not userid:
        return JsonResponse({'error': 'User ID is required'}, status=400)
    
    with connection.cursor() as cursor:
        cursor.execute("SELECT projectname FROM projects WHERE userid = %s", [userid])
        data = cursor.fetchall()

    # Convert the fetched data to a list
    projects = [row[0] for row in data]

    # Return the fetched data in JSON format
    return JsonResponse(projects, safe=False)

@csrf_exempt

def delete_project(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        projectname = data.get('projectname')
        userid = data.get('userid')

        if not all([projectname, userid]):
            return JsonResponse({'error': 'All fields are required'}, status=400)

        with connection.cursor() as cursor:
            try:
                cursor.execute("DELETE FROM projects WHERE projectname = %s AND userid = %s",
                               [projectname, userid])
                connection.commit()
                return JsonResponse({'message': 'Project deleted successfully'}, status=201)
            except Exception as e:
                connection.rollback()
                return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)




@csrf_exempt
def process_files(request):
    if request.method == 'POST':
        # Parse request data
        files = request.FILES.getlist('files')
        categories = request.POST.getlist('categories[]')  # Assuming categories are sent as a list in the request

        # Process files
        dataframes = []
        for file in files:
            # Determine file extension
            file_extension = os.path.splitext(file.name)[1].lower()
            
            # Read file based on extension
            if file_extension == '.xlsx':
                df = pd.read_excel(file, engine='openpyxl')
            elif file_extension == '.csv':
                df = pd.read_csv(file)
            else:
                return JsonResponse({'error': f'Unsupported file format: {file_extension}'}, status=400)

            dataframes.append(df)

        output_file_path = 'output.xlsx'  # Define the path for the output file

        # Call the filter_and_save function
        filter_and_save(categories, dataframes, output_file_path)

        # Return the output file to the frontend
        return FileResponse(open(output_file_path, 'rb'), as_attachment=True, filename='output.xlsx')

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

