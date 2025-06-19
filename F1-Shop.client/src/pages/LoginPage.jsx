import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      login(res.data);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Најавувањето не успеа.");
    }
  };

  return (
    <div>
      <h2>Најава</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Лозинка" onChange={handleChange} required />
        <button type="submit">Најави се</button>
      </form>
    </div>
  );
};

export default LoginPage;
