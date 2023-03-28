import React, { useState, useEffect } from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css'
import UsersList from './components/UserList';
export default function App() {

  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<UsersList />} />
      </Routes>
    </div>
  );
}
