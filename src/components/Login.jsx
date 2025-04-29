import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInAnonymously, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import "../Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-btn login-btn">Login</button>
        <div className="auth-btns">
          <button type="button" className="auth-btn google" onClick={handleGoogleLogin} title="Login with Google">
            <img src="/google.png" alt="Google icon" className="icon-img" />
          </button>
          <button type="button" className="auth-btn guest" onClick={handleAnonymousLogin} title="Continue as Guest">
            <span className="material-icons">person</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
