import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FadeIn from "../components/FadeIn";

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
    <div className="flex justify-center items-center min-h-screen">
      <FadeIn className="w-full max-w-md" delay={0.2} duration={0.8}>
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className="text-center">📝 Регистрација</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Име</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Вашето име"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Лозинка</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">Регистрирај се</Button>
          </form>
        </CardContent>
      </Card>
      </FadeIn>
    </div>
  );
};

export default RegisterPage;
