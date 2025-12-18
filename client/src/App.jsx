import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './components/Login';
import ClassPage from './pages/ClassPage';
import AddResourcePage from './pages/AddResourcePage';
import PrivatePage from './pages/PrivatePage';
import PublicLibrary from './pages/PublicLibrary';
import Home from './pages/Home';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="resources" element={<PublicLibrary />} />
          <Route path="class/:id" element={<ClassPage />} />
          <Route path="add-resource" element={<AddResourcePage />} />
          <Route path="private" element={<PrivatePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
