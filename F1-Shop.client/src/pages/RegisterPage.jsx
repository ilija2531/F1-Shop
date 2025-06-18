import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Регистрацијата е успешна. Најавете се.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Регистрација не успеа.");
    }
  };

  return (
    <div>
      <h2>Регистрација</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Име" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Лозинка" onChange={handleChange} required />
        <button type="submit">Регистрирај се</button>
      </form>
    </div>
  );
};

export default RegisterPage;
