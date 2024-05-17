import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import ProjectDropdown from "../components/ProjectDropdown";

import {createproject} from "../server"
import {deleteproject} from "../server"
import { setprojectid } from "../server";

/*
- homepage for data
*/


const originUrl = window.location.origin;

const sections = [
    { title: "Home", url: originUrl + "/home" },
    { title: "Change Password", url: originUrl + "/home" },
    { title: "Log Out", url: originUrl + "/home" },
];

export default function Home() {
    const [projects, setProjects] = React.useState([]);
    const [name, setName] = useState('');
    const [userid, setUserId] = useState('');
    const [selectedProject, setSelectedProject] = useState('');

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userid');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    function parameterizeArray(key, value) {
        return '?' + key + '=' + value;
    }

    function goToProjects() {
        var url = "/projects" + parameterizeArray('project', projects);
        window.location.href = url;
    }

    async function createProject(projectname) {
        try {

            sessionStorage.setItem('projectname', projectname);

            var temp = sessionStorage.getItem('userid', userid);
            if (!temp) {
                console.error("User ID not found in session storage.");
                return;
            }
            
            await createproject(projectname, userid);

            
            var url = "/projects" + parameterizeArray('project', projectname);
            window.location.href = url;
        } catch (error) {
            console.error("Error:", error); 
        }
    }

    function handleChange(event) {
        setName(event.target.value); // Update input value in state
    }
    
    async function deleteProject(projectName) {
        try {
            
            if (!userid) {
                console.error("User ID not found in session storage.");
                return;
            }
            await deleteproject(projectName, userid);
            setProjects(projects.filter(project => project !== projectName));
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    return (
        <Container>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Cruz Store Analyzer" sections={sections}  userid={userid}/>
                <main>
                    <Container container>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={10}
                        >
                            <Grid
                            item
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            xs="4">
                                <Typography variant="h5" color="inherit" paragraph >
                                    Create your project
                                </Typography>
                                <Grid
                                    item
                                    container
                                    spacing={3}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ marginTop:"-24px" }}
                                >
                                    <Grid item>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="project"
                                            label="Project name"
                                            name="project"
                                            value={name} // Bind input value to state
                                            onChange={handleChange} // Handle input change
                                        />
                                    </Grid>
                                    <Grid item>
                                    <Button variant="contained" onClick={() => createProject(name)}>Create</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid 
                            item
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            xs="4"
                            >
                                <Typography variant="h5" color="inherit" paragraph>
                                    Delete your project
                                </Typography>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={3}
                                >
                                    <Grid item>
                                        <ProjectDropdown projects={projects} setProjects={setProjects} userid={userid} setSelectedProject={setSelectedProject}/>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" onClick={() => deleteProject(selectedProject)}>Delete</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid 
                            item
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            xs="4">
                                <Typography variant="h5" color="inherit" paragraph>
                                    Select your project
                                </Typography>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={3}
                                >
                                    <Grid item>
                                        <ProjectDropdown projects={projects} setProjects={setProjects} userid={userid} />
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" onClick={() => goToProjects()}>Go</Button>
                                    </Grid>
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