import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Auth(props) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: "",
        serverError: ""
    });
    const [isSignup, setIsSignup] = useState(false);

    function handleChange(e) {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            emailError: "",
            passwordError: "",
            serverError: ""
        }));
    }

    async function sendRequest(type) {
        try {
            const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password
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

            setErrors((prevErrors) => ({
                ...prevErrors,
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
            if (isSignup) {
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
                    <Typography padding={3} textAlign='center'>{isSignup ? "Sign Up" : "Login"}</Typography>
                    {isSignup && <TextField name='name' onChange={handleChange} value={inputs.name} variant='outlined' label='Name' margin='normal' />}{" "}
                    <TextField
                        name='email'
                        onChange={handleChange}
                        value={inputs.email}
                        variant='outlined'
                        label='Email'
                        margin='normal'
                        error={!!errors.emailError}
                        helperText={errors.emailError}
                    />
                    <TextField
                        name='password'
                        onChange={handleChange}
                        value={inputs.password}
                        variant='outlined'
                        label='Password'
                        type='password'
                        margin='normal'
                        error={!!errors.passwordError}
                        helperText={errors.passwordError}
                    />
                    <Button type='submit' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }} color='warning'>Submit</Button>
                    <Button onClick={() => setIsSignup(!isSignup)} sx={{ borderRadius: 3, marginTop: 3 }}>Change to {isSignup ? "Login" : "Sign up"}</Button>
                    {errors.serverError && (
                        <Typography color="error" marginTop={2}>
                            {errors.serverError}
                        </Typography>
                    )}
                </Box>
            </form>
        </div>
    );
}

export default Auth;
