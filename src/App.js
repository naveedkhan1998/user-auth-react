import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/auth/Dashboard";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswsordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import {useSelector} from 'react-redux'

//
function App() {
  const{access_token} = useSelector(state => state.auth)
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/user-auth-react" element={<Layout />}>
            <Route index element={<Home/>}/>
            <Route path="contact" element={<Contact/>}/>
            <Route path="login" element={!access_token ? <LoginReg/>:<Navigate to ='/dashboard'/>}/>
            <Route path="sendpasswordresetemail" element={<SendPasswsordResetEmail/>}/>
            <Route path="api/user/reset/:id/:token" element={<ResetPassword/>}/>  
          </Route>
          <Route path="/dashboard" element={access_token ?<Dashboard/>:<Navigate to="/login"/>}/>
          <Route path="*" element={<h1>404 Page Not Found</h1>}/>

        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
