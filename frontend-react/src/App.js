import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct'
import UpdateProduct from './pages/UpdateProduct'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './pages/Header'


import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = "application/json"
axios.defaults.headers.post['Accept'] = "application/json"
axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='/update/:id' element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
