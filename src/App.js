import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Chat from "./pages/Chat.jsx";
import ChatContainer from "./pages/ChatContainer.jsx";
import Sidebar from "./pages/Sidebar.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";

function App() {

  const {currentUser} = useContext(AuthContext)
  
  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/Login" />
    }
    return children
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
         <ProtectedRoute>
          <Chat />
         </ProtectedRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
