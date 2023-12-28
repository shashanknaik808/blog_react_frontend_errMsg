import './App.css';
import Header from './components/Header';
import React, { useState } from 'react';
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import AddBlog from "./components/AddBlog";
import UserBlogs from './components/UserBlogs';
import BlogDetail from "./components/BlogDetail";

import { Route, Routes } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <React.Fragment >
      <header>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? <Route path='/auth' element={<Auth setIsLoggedIn={setIsLoggedIn} />} /> :
            <>
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/myBlogs' element={<UserBlogs />} />
              <Route path='/myBlogs/:id' element={<BlogDetail />} />
              <Route path='/blogs/add' element={<AddBlog />} />
            </>}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;