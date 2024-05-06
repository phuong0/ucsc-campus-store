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

export const loadfile = async (filedata) => {
    try {
        const formData = new FormData();
        formData.append('filedata', filedata); 

        const response = await axios.post(
            "http://localhost:8000/load-file/",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
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

export const getcategories = async () => {
    try {
        const response = await axios.post("http://localhost:8000/get-categories");
        // console.log(response.data); 
        return response.data
    } catch (error) {
        console.error("Error:", error); 
    }
}

export const categoryFile = async (cats) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/process_files', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            categories: cats
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
