import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStyles } from './utils';

function Header(props) {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true' || false);

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };

    const { isLoggedIn } = props;
    const classes = useStyles();
    const [value, setValue] = useState(1);

    function handleLogout() {
        localStorage.clear();
        props.setIsLoggedIn(false);
    }

    return (
        <AppBar
            position="sticky"
            sx={{
                background: darkMode
                    ? '#000' // Dark mode background color
                    : 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,19,121,1) 0%, rgba(0,212,255,1) 100%)', // Light mode background color
            }}
        >
            <Toolbar>
                <Typography className={classes.font} variant="h4">
                    Blog App
                </Typography>
                {props.isLoggedIn && (
                    <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
                        <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                            <Tab className={classes.font} LinkComponent={Link} to="/blogs" label="All Blogs" />
                            <Tab className={classes.font} LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                            <Tab className={classes.font} LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
                        </Tabs>
                    </Box>
                )}
                <Box display="flex" marginLeft={'auto'}>
                    <Button
                        onClick={toggleDarkMode}
                        variant="contained"
                        sx={{ margin: 1, borderRadius: 10 }}
                        color="warning"
                    >
                        {darkMode ? 'Light Mode' : 'Dark Mode'} {darkMode ? '🌙' : '☀️'}
                    </Button>
                    {!isLoggedIn ? (
                        <>
                            <Button
                                LinkComponent={Link}
                                to="/auth"
                                variant="contained"
                                sx={{ margin: 1, borderRadius: 10 }}
                                color="warning"
                            >
                                Login
                            </Button>
                            <Button
                                LinkComponent={Link}
                                to="/auth"
                                variant="contained"
                                sx={{ margin: 1, borderRadius: 10 }}
                                color="warning"
                            >
                                Signup
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={handleLogout}
                            LinkComponent={Link}
                            to="/auth"
                            variant="contained"
                            sx={{ margin: 1, borderRadius: 10 }}
                            color="warning"
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
