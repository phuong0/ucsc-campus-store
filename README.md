# ucsc-campus-store

# AI search installation instructions
1. pip install gensim 
2. pip install scipy==1.10.1
3. download the word2vec model from here(https://drive.google.com/file/d/0B7XkCwpI5KDYNlNUTTlSS21pQmM/edit?resourcekey=0-wjGZdNAUop6WykTtMip30g)
4. drop the model inside the ucsc-campus-store directory 
5. Title the model: GoogleNews-vectors-negative300.bin 

## development server
To start the project, start up the virtual enviroment
1.  pipenv shell

To start the backend, type these commands into the terminal
1. python manage.py runserver

Then copy IP address in console and paste it into web brower

To start the frontend, type these commands into the terminal in the frontend folder
1. npm start

To stop the enviroment, type in the terminal
1. exit
