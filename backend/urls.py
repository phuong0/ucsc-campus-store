"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from backend.views import create_account
from backend.views import get_account
from backend.views import get_login
from backend.views import load_file

urlpatterns = [
    path('admin/', admin.site.urls), 
    path('create-data/', create_account, name='create_data'),
    path('get-data/', get_account, name='get_data'), 
    path('get-login/', get_login, name='login'), 
    path('load-file/', load_file, name='load-file')
]

#from backend.views import get_categories
#path('get-categories', get_categories, name='categories'),
