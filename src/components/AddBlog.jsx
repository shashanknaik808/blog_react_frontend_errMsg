import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './utils.jsx';

function AddBlog() {
    const classes = useStyles();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        imageURL: ""
    });

    const [errors, setErrors] = useState({
        titleError: "",
        descriptionError: "",
        imageURLError: ""
    });

    function handleChange(e) {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            titleError: "",
            descriptionError: "",
            imageURLError: ""
        }));
    }

    async function sendRequest() {
        try {
            const res = await axios.post(`http://localhost:5000/api/blog/add`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.imageURL,
                user: localStorage.getItem("userID")
            });

            const data = await res.data;
            return data;
        } catch (err) {
            let errors = [];

            if (err.response?.status === 400) {
                errors.push("Validation error");
            }

            if (errors.length === 0) {
                errors.push("Internal server error");
            }

            setErrors((prevErrors) => ({
                ...prevErrors,
                titleError: errors.includes("Validation error") ? "Validation error" : "",
                descriptionError: errors.includes("Validation error") ? "Validation error" : "",
                imageURLError: errors.includes("Validation error") ? "Validation error" : "",
            }));

            throw err;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        sendRequest()
            .then(data => console.log(data))
            .then(() => navigate("/blogs"))
            .catch(error => console.error("Error:", error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    border={3}
                    borderColor='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,19,121,1) 0%, rgba(0,212,255,1) 100%)'
                    borderRadius={10}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    margin={"auto"}
                    marginTop={3}
                    display='flex'
                    flexDirection={'column'}
                    width={"80%"}
                >
                    <Typography
                        className={classes.font}
                        fontWeight={'bold'}
                        padding={3}
                        color="grey"
                        variant='h2'
                        textAlign='center'
                    >
                        Post Your Blog
                    </Typography>
                    <TextField
                        name='title'
                        onChange={handleChange}
                        value={inputs.title}
                        margin='normal'
                        variant='outlined'
                        label='Title'
                        error={!!errors.titleError}
                        helperText={errors.titleError}
                    />
                    <TextField
                        name='description'
                        onChange={handleChange}
                        value={inputs.description}
                        margin='normal'
                        variant='outlined'
                        label='Description'
                        error={!!errors.descriptionError}
                        helperText={errors.descriptionError}
                    />
                    <TextField
                        name='imageURL'
                        onChange={handleChange}
                        value={inputs.imageURL}
                        margin='normal'
                        variant='outlined'
                        label='Image'
                        error={!!errors.imageURLError}
                        helperText={errors.imageURLError}
                    />
                    <Button type="submit" sx={{ mt: 2, borderRadius: 4 }} variant='contained' color='warning'>
                        Submit
                    </Button>
                </Box>
            </form>
        </div>
    );
}

export default AddBlog;
