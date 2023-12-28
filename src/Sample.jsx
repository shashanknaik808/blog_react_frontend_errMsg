import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Sample() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function handleChange(e) {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        // Clear the error and success messages when the user types
        setError("");
        setSuccessMessage("");
    }

    async function sendRequest() {
        try {
            const res = await axios.post("http://localhost:5000/api/user/login", {
                email: inputs.email,
                password: inputs.password
            });

            const data = await res.data;
            return data;
        } catch (err) {
            if (err.response?.status === 404) {
                setError("User does not exist");
            } else if (err.response?.status === 400) {
                setError("Invalid password");
            } else {
                setError("An error occurred. Please try again later.");
            }
            throw err;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = await sendRequest();
            const userId = data?.user?._id;
            localStorage.setItem("userID", userId);
            setIsLoggedIn(true);
            setSuccessMessage("Login successful");
            navigate("/blogs");
        } catch (error) {
            console.error("Error:", error);
            setIsLoggedIn(false);
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
                    <TextField id="outlined-helperText" label="Email" defaultValue={inputs.email} variant="outlined" name="email" onChange={handleChange} margin="normal" />
                    <TextField id="outlined-helperText" label="Password" type="password" defaultValue={inputs.password} variant="outlined" name="password" onChange={handleChange} margin="normal" />
                    <Button type="submit" variant="contained" sx={{ borderRadius: 3, marginTop: 3 }} color="warning">Submit</Button>
                </Box>
            </form>
            {error && (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginTop={2}
                >
                    <TextField
                        error
                        id="outlined-error"
                        label="Error"
                        defaultValue={error}
                    />
                </Box>
            )}
            {successMessage && (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginTop={2}
                >
                    <TextField
                        id="outlined-success"
                        label="Success"
                        defaultValue={successMessage}
                        sx={{ color: 'green' }}
                    />
                </Box>
            )}
        </div>
    );
}

export default Sample;
