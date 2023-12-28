import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Auth(props) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [isSignup, setIsSignup] = useState(false);

    function handleChange(e) {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    async function sendRequest(type) {
        const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        }).catch(err => {
            if (err.response?.status === 404) {
                alert("User does not exist");
                props.setIsLoggedIn(false);
            } else if (err.response?.status === 400) {
                alert("Invalid password");
                props.setIsLoggedIn(false);
            }
        });

        const data = await res.data;
        return data;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(inputs);

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
                    alignItems={"center"}
                    justifyContent={"center"}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    margin='auto'
                    marginTop={5}
                    borderRadius={5}
                >
                    <Typography padding={3} textAlign='center'>{isSignup ? "Sign Up" : "Login"}</Typography>
                    {isSignup && <TextField name='name' onChange={handleChange} value={inputs.name} type='name' placeholder='Name' margin='normal' />}{" "}
                    <TextField name='email' onChange={handleChange} value={inputs.email} type='email' placeholder='Email' margin='normal' />
                    <TextField name='password' onChange={handleChange} value={inputs.password} type='password' placeholder='Password' margin='normal' />
                    <Button type='submit' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }} color='warning'>Submit</Button>
                    <Button onClick={() => setIsSignup(!isSignup)} sx={{ borderRadius: 3, marginTop: 3 }} >Change to {isSignup ? "Login" : "Sign up"}</Button>
                </Box>
            </form>
        </div>
    );
}

export default Auth;
