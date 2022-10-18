import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddUser from './pages/AddUser';
import EditUsers from './pages/EditUsers';
import Layout from './pages/Layout';

function App() {
  return (
     <Router>
       <Routes>
         <Route path='/' element={<Layout />} />
         <Route path='/edituser' element={<EditUsers />} />
         <Route path='/newuser' element={<AddUser />} />
      </Routes>
     </Router>
    
  );
}

export default App;
