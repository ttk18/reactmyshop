import React, { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import { UserContext } from "./UserContext";
const App = () => {
  let [user, setUser] = useState({
    isLoginIn: localStorage?.getItem("isLogin"),
    currentUserId: localStorage?.getItem("userId"),
    currentUserName: localStorage?.getItem("username"),
  });
 
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div>{<NavBar />}</div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
