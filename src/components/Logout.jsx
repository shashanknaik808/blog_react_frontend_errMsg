import React from 'react';

function Logout({ setLoggedIn }) {
    const handleLogout = () => {
        setLoggedIn(false);
        window.location.replace('/');
        localStorage.clear();
    };

    return <div onClick={handleLogout}></div>;
}

export default Logout;
