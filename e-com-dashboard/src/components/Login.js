import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

 

  const handleLogin = async () => {
    if (email !== "" || password !== "") {
      let result = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();

      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      } else {
        alert("Invalid Username or Password");
      }
    } else {
      alert("Fill Login Form Properly");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter Password"
      />
      <button onClick={handleLogin} className="appButton" type="button">
        Login
      </button>
     
    </div>
  );
};

export default Login;
