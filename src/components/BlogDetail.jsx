import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const labelStyle = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };

function BlogDetail(props) {
    const navigate = useNavigate();
    const [blog, setBlog] = useState();
    const id = useParams().id;
    const [inputs, setInputs] = useState();

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const fetchDetails = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
            const data = res.data;
            setBlog(data.blog);
            setInputs({ title: data.blog.title, description: data.blog.description });
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    useEffect(() => {
        fetchDetails();
    }, [fetchDetails, id]);

    async function sendRequest() {
        const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
            title: inputs.title,
            description: inputs.description
        }).catch(err => console.log(err));

        const data = await res.data;
        return data;
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then(data => console.log(data))
            .then(() => navigate("/myBlogs"));
    }

    return (
        <div>
            {inputs && (
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
                            fontWeight={'bold'}
                            padding={3}
                            color="grey"
                            variant='h2'
                            textAlign='center'
                        >
                            Update Blog
                        </Typography>
                        <InputLabel sx={labelStyle}>Title</InputLabel>
                        <TextField name='title' onChange={handleChange} value={inputs.title} margin='auto' variant='outlined' />
                        <InputLabel sx={labelStyle}>Description</InputLabel>
                        <TextField name='description' onChange={handleChange} value={inputs.description} margin='auto' variant='outlined' />
                        <Button type="submit" sx={{ mt: 2, borderRadius: 4 }} variant='contained' color='warning'>
                            Submit
                        </Button>
                    </Box>
                </form>
            )}
        </div>
    );
}

export default BlogDetail;
