CREATE TABLE accountinfo (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    passcode VARCHAR(100) NOT NULL
);

CREATE TABLE projects (
    projectid INT AUTO_INCREMENT PRIMARY KEY,
    projectname VARCHAR(100) NOT NULL,
    userid INT NOT NULL, 
    FOREIGN KEY (userid) REFERENCES accountinfo(userid)
);

CREATE TABLE files (
    fileid INT AUTO_INCREMENT PRIMARY KEY,
    projectid INT NOT NULL,
    userid INT NOT NULL,
    filedata LONGBLOB NOT NULL,
    file_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (projectid) REFERENCES projects(projectid) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES accountinfo(userid)
);

CREATE TABLE sortedfile (
    sortedid INT AUTO_INCREMENT PRIMARY KEY,
    projectid INT NOT NULL,
    userid INT NOT NULL,
    filedata LONGBLOB NOT NULL,
    FOREIGN KEY (projectid) REFERENCES projects(projectid) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES accountinfo(userid)
);
