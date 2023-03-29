import React, { Suspense } from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css'
import LoadingSpinner from './components/LoadingSpinner';

const UsersList = React.lazy(() => import('./components/UserList.jsx'));

export default function App() {

  return (
    <div className="container">
      <Suspense fallback={<LoadingSpinner/>}>
      <Routes>
        <Route path='/' element={<UsersList />} />
      </Routes>
      </Suspense>
    </div>
  );
}
