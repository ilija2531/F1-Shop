import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

const AdminPage = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    category: "",
    team: "",
    driver: "",
    description: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await axios.post(
          "http://localhost:5000/api/products/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      const productData = { ...form, image: imageUrl };

      await axios.post("http://localhost:5000/api/products", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Производот е успешно додаден!");
      setForm({
        name: "",
        category: "",
        team: "",
        driver: "",
        description: "",
        price: "",
      });
      setImageFile(null);
      window.location.href = "/products";
    } catch (err) {
      alert(err.response?.data?.message || "Грешка при додавање производ.");
      console.error(err);
    }
  };

  if (!user || !user.isAdmin) {
    return <p className="text-center text-destructive">❌ Немате пристап до оваа страница.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Админ Панел – Додади Производ</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Име</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Категорија</Label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-md px-2 py-1"
                required
              >
                <option value="">-- Избери категорија --</option>
                <option value="Облека">Облека</option>
                <option value="Кациги">Кациги</option>
                <option value="Постери">Постери</option>
                <option value="Маици">Маици</option>
                <option value="Капи">Капи</option>
              </select>
            </div>

            <div>
              <Label htmlFor="team">Тим</Label>
              <Input
                name="team"
                value={form.team}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="driver">Возач</Label>
              <select
                name="driver"
                value={form.driver}
                onChange={handleChange}
                className="w-full border rounded-md px-2 py-1"
                required
              >
                <option value="">-- Избери возач --</option>
                <option value="Max Verstappen">Max Verstappen</option>
                <option value="Lewis Hamilton">Lewis Hamilton</option>
                <option value="Charles Leclerc">Charles Leclerc</option>
                <option value="Fernando Alonso">Fernando Alonso</option>
                <option value="Lando Norris">Lando Norris</option>
              </select>
            </div>

            <div>
              <Label htmlFor="description">Опис</Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Цена</Label>
              <Input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Слика</Label>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <Button type="submit" className="w-full">
              Додади производ
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
