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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import category from "../assets/category.png";
import fullsearch from "../assets/magnifying.png";

import {getcategories} from "../server"

/*
- files page
*/


const originUrl = window.location.origin;

const sections = [
    { title: "Home", url: originUrl + "/home" },
    { title: "Change Password", url: originUrl + "/home" },
];

export default function File() {
    const [categories, setCategories] = React.useState([]);
    const [files, setFiles] = React.useState([]);

    React.useEffect(() => {
        sendReq();
    }, []);

    const sendReq = async () => {
        
        try {
            const cat = await getcategories();
            setCategories(cat)
        } catch (error) {
            console.error("Login Error:", error);
        }
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
                                    Categories
                                </Typography>
                                <Grid
                                    item
                                    container
                                    spacing={3}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ marginTop: "-24px" }}
                                >
                                    <Grid item>
                                        <CategoryDropdown categories={categories} setCategories={setCategories} />
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
                                    Full Text Search
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
                            <Grid
                                item
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                xs="5">
                                <Card sx={{ minWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        alt="category image"
                                        height="155"
                                        image={category}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Categories Results
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Results go here
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Download</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid
                                item
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                xs="5">
                                <Card sx={{ minWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        alt="fulltext image"
                                        height="155"
                                        image={fullsearch}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Full Text Search Results
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Results go here
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Download</Button>
                                    </CardActions>
                                </Card>
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