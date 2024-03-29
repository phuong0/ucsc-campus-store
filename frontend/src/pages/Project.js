import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import UploadFile from "../components/uploadFile";
import CategoryDropdown from "../components/CategoryDropdown";

/*
- project page
*/


const originUrl = window.location.origin;

const sections = [
    { title: "Change Password", url: originUrl + "/home" },
];

export default function Project() {
    const [files, setFiles] = React.useState([]);

    function parameterizeArray(key, value) {
        return '?' + key + '=' + value;  
    }

    function goToFiles() {
        var url = "/files" + parameterizeArray('file', files);
        window.location.href = url;
    }


    return (
        <Container>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Cruz Store Analyzer" sections={sections} />
                <main>
                    <Container container>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography variant="h5" color="inherit" paragraph>
                                Import your data
                            </Typography>
                            <Grid
                                item
                                container
                                spacing={6}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <UploadFile variant="contained" />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => goToFiles()}>Done</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </Container>
            <Footer
                title="Data Analysis | University of California, Santa Cruz"
                description="description"
            />
        </Container>
    );
}