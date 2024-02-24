 CREATE TABLE account (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
 );

 CREATE TABLE projects(
    projectid INT AUTO_INCREMENT PRIMARY KEY, 
    userid INT NOT NULL, 
    sortedID INT AUTO_INCREMENT NOT NULL,
    sorted VARBINARY(MAX) NOT NULL,
    FOREIGN KEY (userid) REFERENCES account
 );

 CREATE TABLE files(
    fileid INT AUTO_INCREMENT PRIMARY KEY,
    projectid INT NOT NULL,
    filedata VARBINARY(MAX) NOT NULL,
    FOREIGN KEY (projectid) REFERENCES projects
 );