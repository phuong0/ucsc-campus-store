import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import {loadfile} from "../server"

// actually uploading the transcript

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function UploadFile() {
    
    const changeHandler = (event) => {
        let file_type = event.target.files[0].type;
        if((file_type !== "text/csv") && (file_type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")){
            console.log(file_type);
            alert("File type must be a csv, excel or spreadsheet");
            return;
        }
        alert("file is excel/cvs");
    
        // Call the loadfile function passing the file data
        loadfile(event.target.files[0]);
    };
    
    return (
        <Button component="label" variant="contained">
            Upload file
            <VisuallyHiddenInput type="file" onChange={changeHandler} />
        </Button>
    );
}



 // backend work
        // fetch("http://localhost:8080/user/uploadTranscript", {
        //     method: "POST",
        //     credentials: "include",
        //     headers: {
        //         "Content-Type": "application/pdf"
        //     },
        //     body: event.target.files[0]
        // }).then((res) => {
        //     if (res.status === 404) {
        //         window.location.href = "/signin";
        //     }
        //     else {
        //         alert("Success uploading transcript.");
        //     }
        // }).catch((err) => {
        //     alert(err);
        // });