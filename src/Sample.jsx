import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Sample() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        isLoggedIn: false,
        emailError: "",
        passwordError: "",
        serverError: "",
        successMessage: "",
    });

    function handleChange(e) {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
            emailError: "",
            passwordError: "",
            serverError: "",
            successMessage: "",
        }));
    }

    async function sendRequest() {
        try {
            const res = await axios.post("http://localhost:5000/api/user/login", {
                email: formData.email,
                password: formData.password
            });

            const data = await res.data;
            return data;
        } catch (err) {
            let errors = [];

            if (err.response?.status === 404) {
                errors.push("User does not exist");
            }

            if (err.response?.status === 400) {
                errors.push("Invalid password");
            }

            if (errors.length === 0) {
                errors.push("Internal server error");
            }

            setFormData((prevData) => ({
                ...prevData,
                emailError: errors.includes("User does not exist") ? "User does not exist" : "",
                passwordError: errors.includes("Invalid password") ? "Invalid password" : "",
                serverError: errors.includes("Internal server error") ? "Internal server error" : "",
            }));

            throw err;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = await sendRequest();
            const userId = data?.user?._id;
            localStorage.setItem("userID", userId);
            setFormData((prevData) => ({
                ...prevData,
                isLoggedIn: true,
                successMessage: "Login successful",
            }));
            navigate("/blogs");
        } catch (error) {
            console.error("Error:", error);
            setFormData((prevData) => ({
                ...prevData,
            }));
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={400}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    margin="auto"
                    marginTop={5}
                    borderRadius={5}
                >
                    <Typography padding={3} textAlign="center">Login</Typography>
                    <TextField
                        id="outlined-helperText"
                        label="Email"
                        value={formData.email}
                        variant="outlined"
                        name="email"
                        onChange={handleChange}
                        margin="normal"
                        error={!!formData.emailError}
                        helperText={formData.emailError}
                    />
                    <TextField
                        id="outlined-helperText"
                        label="Password"
                        type="password"
                        value={formData.password}
                        variant="outlined"
                        name="password"
                        onChange={handleChange}
                        margin="normal"
                        error={!!formData.passwordError}
                        helperText={formData.passwordError}
                    />
                    <Button type="submit" variant="contained" sx={{ borderRadius: 3, marginTop: 3 }} color="warning">Submit</Button>
                    {formData.serverError && (
                        <Typography color="error" marginTop={2}>
                            {formData.serverError}
                        </Typography>
                    )}
                </Box>
            </form>
            {formData.successMessage && (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginTop={2}
                >
                    <Typography component="h1" variant="h5" style={{ color: 'green' }}>
                        {formData.successMessage}
                    </Typography>
                </Box>
            )}
        </div>
    );
}

export default Sample;