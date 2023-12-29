import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Auth(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        isSignup: false,
        errors: {
            emailError: "",
            passwordError: "",
            serverError: "",
        },
    });

    function handleChange(e) {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
            errors: {
                ...prevData.errors,
                emailError: "",
                passwordError: "",
                serverError: "",
            },
        }));
    }

    async function sendRequest(type) {
        try {
            const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
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
                errors: {
                    ...prevData.errors,
                    emailError: errors.includes("User does not exist") ? "User does not exist" : "",
                    passwordError: errors.includes("Invalid password") ? "Invalid password" : "",
                    serverError: errors.includes("Internal server error") ? "Internal server error" : "",
                },
            }));

            throw err;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (formData.isSignup) {
                await sendRequest("signup");
                navigate("/auth");
            } else {
                const data = await sendRequest("login");
                const userId = data?.user?._id;
                localStorage.setItem("userID", userId);
                props.setIsLoggedIn(true);
                navigate("/blogs");
            }
        } catch (error) {
            console.error("Error:", error);
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
                    margin='auto'
                    marginTop={5}
                    borderRadius={5}
                >
                    <Typography padding={3} textAlign='center'>{formData.isSignup ? "Sign Up" : "Login"}</Typography>
                    {formData.isSignup && <TextField name='name' onChange={handleChange} value={formData.name} variant='outlined' label='Name' margin='normal' />}{" "}
                    <TextField
                        name='email'
                        onChange={handleChange}
                        value={formData.email}
                        variant='outlined'
                        label='Email'
                        margin='normal'
                        error={!!formData.errors.emailError}
                        helperText={formData.errors.emailError}
                    />
                    <TextField
                        name='password'
                        onChange={handleChange}
                        value={formData.password}
                        variant='outlined'
                        label='Password'
                        type='password'
                        margin='normal'
                        error={!!formData.errors.passwordError}
                        helperText={formData.errors.passwordError}
                    />
                    <Button type='submit' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }} color='warning'>Submit</Button>
                    <Button onClick={() => setFormData((prevData) => ({ ...prevData, isSignup: !prevData.isSignup }))} sx={{ borderRadius: 3, marginTop: 3 }}>
                        Change to {formData.isSignup ? "Login" : "Sign up"}
                    </Button>
                    {formData.errors.serverError && (
                        <Typography color="error" marginTop={2}>
                            {formData.errors.serverError}
                        </Typography>
                    )}
                </Box>
            </form>
        </div>
    );
}

export default Auth;
