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
from backend.views import get_categories
from backend.views import create_project
from backend.views import get_project
from backend.views import full_text_search
from backend.views import delete_project
from backend.views import process_files
from backend.views import full_text_summary
from backend.views import store_projectid
from backend.views import get_fileNames
from backend.views import get_projectid
#from backend.views import word2vec_search
 
urlpatterns = [
    path('admin/', admin.site.urls), 
    path('create-data/', create_account, name='create_data'),
    path('get-data/', get_account, name='get_data'), 
    path('get-login/', get_login, name='login'), 
    path('load-file/', load_file, name='load-file'),
    path('get-categories', get_categories, name='get-categories'),
    path('create-project/', create_project, name='create_project'),
    path('get-project/', get_project, name='get_project'),
    path('full_text_summary', full_text_summary, name='full_text_summary'),
    path('full_text_search', full_text_search, name='full_text_search'),
    path('delete-project/', delete_project, name='delete_project'),
    path('process_files', process_files, name='process_files'),
    path('store-projectid/', store_projectid, name='store_projectid'),
    path('get_fileNames/', get_fileNames, name='get_fileNames'),
    path('get_projectid/', get_projectid, name='get_projectid'),
   #path('word2vec_search', word2vec_search, name='word2vec_search')
]

#from backend.views import get_categories
#path('get-categories', get_categories, name='categories'),
#path('get_summary', get_summary, name='get_summary'),
