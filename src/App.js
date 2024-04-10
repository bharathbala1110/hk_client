import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Layout from "./pages/layout/Layout";
import { useDispatch, useSelector } from 'react-redux';
function App() {
 
  // const {user}= useSelector(state=>state.auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route index path="/layout//*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
