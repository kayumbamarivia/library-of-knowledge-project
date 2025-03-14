import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import New from './pages/New';
import Books from './pages/Books';
import Header from './components/Header';
import Search from './pages/Search';
import About from './pages/About';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Landing from './pages/Landing';
import Users from './pages/Users';
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/home' element={<Books />} />
          <Route path='/new' element={<New />} />
          <Route path='/users' element={<Users />} />
          <Route path='/search' element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}