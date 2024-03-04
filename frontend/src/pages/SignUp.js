import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import cat from "../assets/cute_cat.jpg";

/*
- sign up page
*/

import { useState } from "react";
import axios from "axios";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                UCSC Campus Store
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default function SignUp() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        passcode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/create-data/", formData);
            console.log(response.data); // Handle success response
        } catch (error) {
            console.error("Error:", error); // Handle error
        }
    };

    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${cat})`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                        t.palette.mode === "light"
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit = {handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            onChange={handleChange}
                            value={formData.firstname}
                            name="firstname"
                            label="First Name"
                            required
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            onChange={handleChange}
                            value={formData.lastname}
                            name="lastname"
                            label="Last Name"
                            required
                            fullWidth
                        />
                        <TextField
                            onChange={handleChange}
                            value={formData.email}
                            name="email"
                            label="Email Address"
                            required
                            fullWidth
                            autoComplete="email"
                        />
                        <TextField
                            onChange={handleChange}
                            value={formData.passcode}
                            name="passcode"
                            label="Password"
                            type="password"
                            required
                            fullWidth
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}