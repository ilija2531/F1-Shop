import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Пораката е испратена успешно!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Контакт</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Име"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Textarea
          name="message"
          placeholder="Порака"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full">
          Испрати
        </Button>
      </form>
    </div>
  );
};

export default ContactPage;
