import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import { loadfile } from "../server";
import { setprojectid, getFileName, getProjectid } from "../server";

/*
- project page
*/

const originUrl = window.location.origin;

const sections = [
    { title: "Home", url: originUrl + "/home" },
    { title: "Log Out", url: originUrl + "/home" },
];


export default function Project() {
    const [historyFiles, setHistoryFiles] = useState([]);
    const [currentFiles, setCurrentFiles] = useState([]);
    const [fileInput, setFileInput] = useState('');
    const [projectname, setProjectName] = useState('');
    const [userid, setUserId] = useState('');
    const [fileName, setFileName] = useState('');
    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userid');
        if (storedUserId) {
            setUserId(storedUserId);
        }
        const storedProjectName = sessionStorage.getItem('selectedProject');
        if (storedProjectName) {
            setProjectName(storedProjectName);
        }

        const getFiles = async (userid, projectid) => {
            try {
                const files = await getFileName(userid, projectid);
                setHistoryFiles(files);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        const fetchProjectIdAndFiles = async (userid, projectName) => {
            try {
                const id = await getProjectid(userid, projectName);
                setProjectId(id);
                await getFiles(userid, id);
            } catch (error) {
                console.error("Error fetching project ID and files:", error);
            }
        };

        if (storedUserId && storedProjectName) {
            fetchProjectIdAndFiles(storedUserId, storedProjectName);
        }

    }, []);

    function parameterizeArray(key, value) {
        return '?' + key + '=' + value;
    }

    const handleFileChange = (event) => {
        let file_type = event.target.files[0].type;
        if ((file_type !== "text/csv") && (file_type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
            console.log(file_type);
            alert("File type must be a csv, excel or spreadsheet");
            return;
        }

        // Call the loadfile function passing the file data
        //loadfile(event.target.files[0]);
        setFileInput(event.target.files[0]);
        setFileName(event.target.files[0].name)

    };

    const handleUpload = async () => {
        try {
            if (fileInput) {
                // Call setprojectid to store the project ID
                const id = await setprojectid(userid, projectname);

                // Call the loadfile function passing the project ID, user ID, and file data
                await loadfile(id, userid, fileInput, fileName);

                // Update state based on current category
                setCurrentFiles(prevFiles => [...prevFiles, fileInput]);
                setFileInput('');
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDone = () => {
        var url = "/files" + parameterizeArray('files', currentFiles);
        window.location.href = url;
    }

    return (
        <Container>
            <Header title={projectname ? `Project: ${projectname}` : "Cruz Store Analyzer"} sections={sections} userid={userid} />
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
                        onClick={handleDone}
                        sx={{ marginLeft: "10px" }}
                    >
                        Done
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ marginTop: "10px" }}>
                <Grid item xs={6}>
                    <Typography variant="h6">All Files Uploaded</Typography>
                    {historyFiles.length > 0 ? (
                        historyFiles.map((file, index) => (
                           <div key={index}>{file}</div>
                        ))
                    ) : (
                        <div>No history available.</div>
                    )}
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">Recent Files Uploaded</Typography>
                    {currentFiles.length > 0 ? (
                        currentFiles.map((file, index) => (
                            <div key={index}>{file.name}</div>
                        ))
                    ) : (
                        <div>No current files uploaded.</div>
                    )}
                </Grid>
            </Grid>
            <Footer
                title="Data Analysis | University of California, Santa Cruz"
                description="description"
            />
        </Container>
    );
};
