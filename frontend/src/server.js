import axios from "axios";

export const createAccount = async (email, firstname, lastname, passcode) => {
    try {
        const response = await axios.post("http://localhost:8000/create-data/", {
            email: email,
            firstname: firstname,
            lastname: lastname,
            passcode: passcode
        });
        console.log(response.data); 
    } catch (error) {
        console.error("Error:", error); 
    }
};


export const login = async (email, passcode) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/get-login/",
            {
                email: email,
                passcode: passcode
            });
        console.log(response.data); 
        return response.data.userid;
    } catch (error) {
        console.error("Error:", error); 
    }
}; 

export const loadfile = async (projectid, userid, filedata, fileName) => {
    console.log(projectid[0])
    console.log(userid)
    console.log(filedata)
    console.log(fileName)
    try {
        const formData = new FormData();
        formData.append('projectid', projectid[0]);
        formData.append('userid', userid);
        formData.append('filedata', filedata);
        formData.append('filename', fileName);


        const response = await axios.post("http://localhost:8000/load-file/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data); 
    } catch (error) {
        console.error("Error:", error); 
    }
};

export const createproject = async (projectname, userid) => {
    try {
        const response = await axios.post("http://localhost:8000/create-project/", {
            projectname: projectname,
            userid: userid
        });
        console.log(response.data); 
    } catch (error) {
        console.error("Error:", error); 
    }
};

export const getproject = async (userid) => {
    try {
        const response = await axios.get(
            `http://localhost:8000/get-project?userid=${userid}`);
        console.log(response.data); 
        return response.data;
    } catch (error) {
        console.error("Error:", error); 
    }
};

export const deleteproject = async (projectname, userid) => {
    try {
        const response = await axios.post("http://localhost:8000/delete-project/", {
            projectname: projectname,
            userid: userid
        });
        console.log(response.data); 
    } catch (error) {
        console.error("Error:", error); 
    }
};

export const getcategories = async (projectName, userid) => {
    try {
        const response = await axios.post("http://localhost:8000/get-categories", {
            projectName: projectName,
            userid: userid
        });
        console.log(response.data); 
        return response.data
    } catch (error) {
        console.error("Error:", error); 
    }
}

export const categoryFile = async (cats, projectName, userid) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/process_files', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            categories: cats,
            projectName: projectName,
            userid: userid
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}


export const fullTextFile = async (keywords, projectName, userid) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/full_text_search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            keywords: keywords,
            projectName: projectName,
            userid: userid
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export const fullTextSummary = async (keywords, projectName, userid) => {
    console.log(projectName)
    console.log(userid)
    console.log(keywords)
    try {
        const response = await fetch('http://127.0.0.1:8000/full_text_summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            keywords: keywords,
            projectName: projectName,
            userid: userid
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export const setprojectid = async (userid, projectname) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/store-projectid/",
            {
                userid: userid,
                projectname: projectname
            });
        console.log(response.data); 
        return response.data.projectid;
    } catch (error) {
        console.error("Error:", error); 
    }
}; 