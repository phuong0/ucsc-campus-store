import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import CategoryDropdown from "../components/CategoryDropdown";

/*
- files page
*/


const originUrl = window.location.origin;

const sections = [
    { title: "Change Password", url: originUrl + "/home" },
];

export default function File() {
    const [categories, setCategories] = React.useState([]);
    const [files, setFiles] = React.useState([]);

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
                                Categories
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
                                    <CategoryDropdown categories={categories} setCategories={setCategories}/>
                                </Grid>
                            </Grid>
                            <Typography variant="h5" color="inherit" paragraph>
                                Full Text Search
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
                                    <TextField
                                        margin="normal"
                                        id="full-search"
                                        label="Full Search"
                                        name="full-search"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3 }}
                                    >
                                        Search
                                    </Button>
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