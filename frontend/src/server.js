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


