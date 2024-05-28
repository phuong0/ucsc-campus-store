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
import ai from "../assets/ai.png";

import {getcategories, categoryFile, fullTextFile, fullTextSummary} from "../server"

/*
- files page
*/


const originUrl = window.location.origin;

const sections = [
    { title: "Home", url: originUrl + "/home" },
    { title: "Log Out", url: originUrl + "/home" },
];

export default function File() {
    const [categories, setCategories] = React.useState([]);
    const [files, setFiles] = React.useState([]);
    const [label, setLabel] = React.useState('');
    const [keywords, setKeywords] = React.useState('');
    const [userid, setUserId] = React.useState('');


    React.useEffect(() => {
        sendReq();
        const storedUserId = sessionStorage.getItem('userid');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, [categories]);

    const handleKeywords = (event) => {
        setKeywords(event.target.value)
    }

    const sendReq = async () => {
        try {
            const cat = await getcategories(sessionStorage.getItem('selectedProject'), userid);
            setCategories(cat)
            
        } catch (error) {
            console.error("Login Error:", error);
        }
    }

    const handleFullTextDownload = async () => {
        
        try {
            const keys = keywords.split(",")
            const keys2 = keys.map((key) => key.trim())
            const response = await fullTextFile(keys2, sessionStorage.getItem('selectedProject'), userid);
      
            if (!response.ok) {
              throw new Error('Failed to fetch');
            }
            console.log(response)
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${keywords}.xlsx`);
            link.style.display = 'none';
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            console.log('done')
          } catch (error) {
            console.error("Login Error:", error);
          }
    }

    const downloadCategories = async () => {
        try {
            const response = await categoryFile([label], sessionStorage.getItem('selectedProject'), userid);
      
            if (!response.ok) {
              throw new Error('Failed to fetch');
            }
            console.log(response)
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${label}.xlsx`);
            link.style.display = 'none';
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            console.log('done')
          } catch (error) {
            console.error("Login Error:", error);
          }
    }

    const handleFullTextSearch = async () => {
        try {
            const keys = keywords.split(",")
            const keys2 = keys.map((key) => key.trim())
            const response = await fullTextSummary(keys2, sessionStorage.getItem('selectedProject'), userid);
            if (!response.ok) {
              throw new Error('Failed to fetch');
            }
            console.log(response)

            const data = await response.json();
            const dataString = JSON.stringify(data);
            console.log(dataString);

            let p = document.getElementById("full_text");
            p.innerText = dataString

          } catch (error) {
            console.error("Login Error:", error);
          }
    }

    return (
        <Container>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Cruz Store Analyzer" sections={sections} userid={userid} />
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
                                    <Grid item style={{ marginTop: "2px" }}>
                                        <CategoryDropdown categories={categories} setCategories={setCategories} label={label} setLabel={setLabel}/>
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
                                    style={{ marginTop: "-35px" }}
                                >
                                    <Grid item>
                                        <TextField
                                            margin="normal"
                                            id="full-search"
                                            label="Full Search"
                                            name="full-search"
                                            autoFocus
                                            onChange={handleKeywords}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            onClick={handleFullTextSearch}
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
                                xs="4"
                            >
                                <Typography variant="h5" color="inherit" paragraph>
                                    AI Search
                                </Typography>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={3}
                                    style={{ marginTop: "-35px" }}
                                >
                                    <Grid item>
                                        <TextField
                                            margin="normal"
                                            id="ai-search"
                                            label="AI Search"
                                            name="ai-search"
                                            autoFocus
                                            onChange={handleKeywords}
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
                                        <Typography variant="body2" color="text.secondary" id="catergory">
                                            Results go here
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={downloadCategories} size="small">Download</Button>
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
                                        <Typography variant="body2" color="text.secondary" id="full_text">
                                            Results go here
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={handleFullTextDownload} size="small">Download</Button>
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
                                        alt="ai image"
                                        height="155"
                                        image={ai}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            AI Search Results
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" id="ai">
                                            Results go here
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={downloadCategories} size="small">Download</Button>
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