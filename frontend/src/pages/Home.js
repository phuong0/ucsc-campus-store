import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import cat from "../assets/cute_cat.jpg";
import UploadFile from '../components/uploadFile';

/*
- homepage for data
*/


const originUrl = window.location.origin;

const sections = [
    { title: "History", url: originUrl + "/home" },
];

export default function Home() {
    const [file, setFile] = React.useState({
        selectedFile: "",
    });
    
    console.log(file.selectedFile);
    return (
        <Container>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Data Analysis" sections={sections} />
                <main>
                    <Paper
                        sx={{
                            backgroundImage: `url(${cat})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            padding: "22%",
                        }}
                    >
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
                                        <UploadFile setFile={setFile} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    </Paper>
                </main>
            </Container>
            <Footer
                title="Data Analysis | University of California, Santa Cruz"
                description="description"
            />
        </Container>
    );
}