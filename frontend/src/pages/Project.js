import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import { loadfile } from "../server";

/*
- project page
*/

const originUrl = window.location.origin;

const sections = [
    { title: "Change Password", url: originUrl + "/home" },
];


export default function Project() {
    const [historyFiles, setHistoryFiles] = useState([]);
    const [currentFiles, setCurrentFiles] = useState([]);
    const [fileInput, setFileInput] = useState('');

    const handleFileChange = (event) => {
        let file_type = event.target.files[0].type;
        if ((file_type !== "text/csv") && (file_type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
            console.log(file_type);
            alert("File type must be a csv, excel or spreadsheet");
            return;
        }

        // Call the loadfile function passing the file data
        loadfile(event.target.files[0]);
        setFileInput(event.target.files[0]);
    };

    const handleUpload = () => {
        if (fileInput) {
            // Update state based on current category
            setCurrentFiles([...currentFiles, fileInput]);
            setFileInput('');
        }
    };

    function parameterizeArray(key, value) {
        return '?' + key + '=' + value;
    }

    const handleFinishUpload = () => {
        if (fileInput) {
            // Allow user to go to the analysis page
            var url = "/files" + parameterizeArray('files', currentFiles);
            window.location.href = url;
        }
    }

    return (
        <Container>
            <Header title="Cruz Store Analyzer" sections={sections} />
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        type="file"
                        onChange={handleFileChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        disabled={!fileInput}
                    >
                        Upload
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFinishUpload}
                        disabled={!fileInput}
                    >
                        Done
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{marginTop: "10px"}}>
                <Grid item xs={6}>
                    <Typography variant="h6">History</Typography>
                    {historyFiles.map((file, index) => (
                        <div key={index}>{file.name}</div>
                    ))}
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">Current Files</Typography>
                    {currentFiles.map((file, index) => (
                        <div key={index}>{file.name}</div>
                    ))}
                </Grid>
            </Grid>
            <Footer
                title="Data Analysis | University of California, Santa Cruz"
                description="description"
            />
        </Container>
    );
};
