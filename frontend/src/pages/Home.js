import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import ProjectDropdown from "../components/ProjectDropdown";

/*
- homepage for data
*/


const originUrl = window.location.origin;

const sections = [
    { title: "Change Password", url: originUrl + "/home" },
];

export default function Home() {
    const [projects, setProjects] = React.useState([]);

    function parameterizeArray(key, value) {
        return '?' + key + '=' + value;  
    }

    function goToProjects() {
        var url = "/projects" + parameterizeArray('project', projects);
        window.location.href = url;
    }

    function createProject() {
        // does nothing for now
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
                                Create your project
                            </Typography>
                            <Grid
                                item
                                container
                                spacing={6}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                style={{ height: "100%" }}
                            >
                                <Grid item>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="project"
                                        label="Project name"
                                        name="project"
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => createProject()}>Create</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography variant="h5" color="inherit" paragraph>
                                Select your project
                            </Typography>
                            <Grid
                                item
                                container
                                spacing={6}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                style={{ height: "100%" }}
                            >
                                <Grid item>
                                    <ProjectDropdown projects={projects} setProjects={setProjects}/>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => goToProjects()}>Go</Button>
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