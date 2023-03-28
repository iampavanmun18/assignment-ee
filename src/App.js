import React, { useState, useEffect } from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css'
import UsersList from './components/UserList';
export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((er) => console.log(er));
  }, []);


  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<UsersList />} />
      </Routes>
    </div>
  );
}
