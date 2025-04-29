import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {createUserWithEmailAndPassword,signInAnonymously,GoogleAuthProvider,signInWithPopup,} from "firebase/auth";
import { auth } from "../firebase";
import "../Auth.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAnonymousRegister = async () => {
    try {
      await signInAnonymously(auth);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
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
        <button type="submit" className="auth-btn login-btn">Register</button>
        <div className="auth-btns">
          <button type="button" className="auth-btn google" onClick={handleGoogleRegister} title="Register with Google">
            <img src="/google.png" alt="Google icon" className="icon-img" />
          </button>
          <button type="button" className="auth-btn guest" onClick={handleAnonymousRegister} title="Continue as Guest">
            <span className="material-icons">person</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
