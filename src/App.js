import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/auth/Dashboard";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswsordResetEmail from "./pages/auth/SendPasswordResetEmail";
import StudentsInStandardList from "./pages/managment/StudentsInStandardList";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentToken, setCredentials } from "./features/authSlice";
import AboutMe from "./pages/AboutMe";

//
function App() {
  const access_token = useSelector(getCurrentToken);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<AboutMe />} />
          <Route
            path="login"
            element={
              !access_token ? <LoginReg /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="sendpasswordresetemail"
            element={<SendPasswsordResetEmail />}
          />
          <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={access_token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/standard/:id" element={<StudentsInStandardList />} />
        </Route>

        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
