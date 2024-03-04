from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db import connection

@csrf_exempt


def create_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        passcode = data.get('passcode')

        if not all([username, email, firstname, lastname, passcode]):
            return JsonResponse({'error': 'All fields are required'}, status=400)

        with connection.cursor() as cursor:
            try:
                cursor.execute("INSERT INTO accountinfo (username, email, firstname, lastname, passcode) VALUES (%s, %s, %s, %s, %s)",
                               [username, email, firstname, lastname, passcode])
                connection.commit()
                return JsonResponse({'message': 'Data created successfully'}, status=201)
            except Exception as e:
                connection.rollback()
                return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
def get_data(request):
    # Query the database to retrieve values
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM accountinfo")
        data = cursor.fetchall()

    # Convert the fetched data to a list of dictionaries
    keys = ['username', 'email', 'firstname', 'lastname', 'passcode']
    data_list = [dict(zip(keys, row)) for row in data]

    # Return the fetched data in JSON format
    return JsonResponse(data_list, safe=False)

