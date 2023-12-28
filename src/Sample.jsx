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
        error: "",
        successMessage: "",
    });

    function handleChange(e) {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
            error: "",
            successMessage: "", // Clear success message when the user types
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
            if (err.response?.status === 404) {
                setFormData((prevData) => ({ ...prevData, error: "User does not exist" }));
            } else if (err.response?.status === 400) {
                setFormData((prevData) => ({ ...prevData, error: "Invalid password" }));
            } else {
                setFormData((prevData) => ({ ...prevData, error: "An error occurred. Please try again later." }));
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
            setFormData((prevData) => ({
                ...prevData,
                isLoggedIn: true,
                successMessage: "Login successful",
            }));
            navigate("/blogs");
        } catch (error) {
            console.error("Error:", error);
            setFormData((prevData) => ({ ...prevData, isLoggedIn: false }));
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
                    <TextField id="outlined-helperText" label="Email" value={formData.email} variant="outlined" name="email" onChange={handleChange} margin="normal" />
                    <TextField id="outlined-helperText" label="Password" type="password" value={formData.password} variant="outlined" name="password" onChange={handleChange} margin="normal" />
                    <Button type="submit" variant="contained" sx={{ borderRadius: 3, marginTop: 3 }} color="warning">Submit</Button>
                </Box>
            </form>
            {formData.error && (
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
                        value={formData.error}
                    />
                </Box>
            )}
            {formData.successMessage && (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginTop={2}
                >
                    <TextField
                        id="outlined-success"
                        label="Success"
                        value={formData.successMessage}
                        InputProps={{ style: { color: 'green' } }}
                    />
                </Box>
            )}
        </div>
    );
}

export default Sample;
