@echo off

:: Check for Python installation
echo Checking for Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed. Please install Python first.
    exit /b 1
)

:: Upgrade pip to the latest version
echo Upgrading pip...
python -m pip install --upgrade pip

:: Install Django
echo Installing Django...
pip install Django

:: Verify Django installation
echo Verifying Django installation...
django-admin --version

if %errorlevel% neq 0 (
    echo Django installation failed.
    exit /b 1
)

:: Create Django project
echo Creating Django project...
django-admin startproject myproject
cd myproject

:: Create virtual environment
echo Creating virtual environment...
python -m venv venv
call venv\Scripts\activate

:: Install Django REST framework
echo Installing Django REST framework...
pip install djangorestframework

:: Install React and Material-UI
echo Installing Node.js, npm, and create-react-app...
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install node
nvm use node
npm install -g create-react-app

echo Creating React app...
npx create-react-app frontend
cd frontend

echo Installing Material-UI...
npm install @mui/material @emotion/react @emotion/styled

echo React and Material-UI installation completed successfully!

:: Deactivate virtual environment
deactivate

pause