import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useStyles } from './utils';

function Blog(props) {
    const classes = useStyles();
    console.log(props.title, props.isUser);
    const navigate = useNavigate();

    function handleEdit(e) {
        navigate(`/myBlogs/${props.id}`)
    }

    async function deleteRequest() {
        const res = await axios.delete(`http://localhost:5000/api/blog/${props.id}`)
            .catch(err => console.log(err))
        const data = await res.data;
        return data;
    }
    function handleDelete() {
        deleteRequest().then(() => navigate("/")).then(() => navigate("/blogs"))
    }
    return (
        <Card sx={{
            width: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc",
            ":hover": {
                boxShadow: "10px 10px 20px #ccc"
            }
        }}>

            {props.isUser && (
                <Box display='flex'>
                    <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}><EditIcon color='warning' /></IconButton>
                    <IconButton onClick={handleDelete}><DeleteForeverIcon color='warning' /></IconButton>
                </Box>
            )}
            <CardHeader
                avatar={
                    <Avatar className={classes.font} sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {props.user ? props.user.charAt(0) : ""}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.title}
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image={props.imageURL}
                alt="Paella dish"
            />
            <CardContent>
                <Typography className={classes.font} variant="body2" color="text.secondary">
                    <b>{props.user}</b>{":"}
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Blog;