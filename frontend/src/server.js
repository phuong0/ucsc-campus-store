import axios from "axios";

export const createAccount = async (email, firstname, lastname, passcode) => {
    try {
        const response = await axios.post("http://localhost:8000/create-data/", {
            email: email,
            firstname: firstname,
            lastname: lastname,
            passcode: passcode
        });
        console.log(response.data); // Handle success response
    } catch (error) {
        console.error("Error:", error); // Handle error
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
        console.log(response.data); // Handle success response
    } catch (error) {
        console.error("Error:", error); // Handle error
    }
};  


