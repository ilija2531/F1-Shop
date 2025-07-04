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
import FadeIn from "../components/FadeIn";

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
  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const uploadedImageUrls = [];

      for (let imageFile of imageFiles) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await axios.post(
          "http://localhost:5000/api/products/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        uploadedImageUrls.push(res.data.imageUrl);
      }

      const productData = {
        ...form,
        images: uploadedImageUrls,
      };

      await axios.post("http://localhost:5000/api/products", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Производот е успешно додаден!");
      setForm({
        name: "",
        category: "",
        team: "",
        driver: "",
        description: "",
        price: "",
      });
      setImageFiles([]);
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
      <FadeIn className="mb-6" delay={0.2} duration={0.8}>
        <Card>
          <CardHeader>
            <CardTitle>Админ Панел – Додади Производ</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Име</Label>
                <Input name="name" value={form.name} onChange={handleChange} required />
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
                  <option value="Патики">Патики</option>
                  <option value="Кациги">Кациги</option>
                  <option value="Комбинезони">Комбинезони</option>
                  <option value="Маици">Маици</option>
                  <option value="Капи">Капи</option>
                </select>
              </div>

              <div>
                <Label htmlFor="team">Тим</Label>
                <select
                  name="team"
                  value={form.team}
                  onChange={handleChange}
                  className="w-full border rounded-md px-2 py-1"
                >
                  <option value="">-- Избери тим --</option>
                  <option value="Red Bull">Red Bull</option>
                  <option value="Mercedes">Mercedes</option>
                  <option value="Ferrari">Ferrari</option>
                  <option value="McLaren">McLaren</option>
                  <option value="Alpine">Alpine</option>
                  <option value="Aston Martin">Aston Martin</option>
                  <option value="Haas">Haas</option>
                  <option value="Sauber">Sauber</option>
                  <option value="Williams">Williams</option>
                  <option value="Racing Bulls">Racing Bulls</option>
                </select>
              </div>

              <div>
                <Label htmlFor="driver">Возач</Label>
                <select
                  name="driver"
                  value={form.driver}
                  onChange={handleChange}
                  className="w-full border rounded-md px-2 py-1"
                >
                  <option value="">-- Избери возач --</option>
                  <option value="Max Verstappen">Max Verstappen</option>
                  <option value="Sergio Perez">Sergio Perez</option>
                  <option value="Carlos Sainz">Carlos Sainz</option>
                  <option value="Sebastian Vettel">Sebastian Vettel</option>
                  <option value="George Russell">George Russell</option>
                  <option value="Oscar Piastri">Oscar Piastri</option>
                  <option value="Lewis Hamilton">Lewis Hamilton</option>
                  <option value="Charles Leclerc">Charles Leclerc</option>
                  <option value="Fernando Alonso">Fernando Alonso</option>
                  <option value="Lando Norris">Lando Norris</option>
                  <option value="Michael Schumacher">Michael Schumacher</option>
                  <option value="Daniel Ricciardo">Daniel Ricciardo</option>
                  <option value="Jenson Button">Jenson Button</option>
                  <option value="Kimi Raikkonen">Kimi Raikkonen</option>
                  <option value="Esteban Ocon">Esteban Ocon</option>
                  <option value="Oliver Bearman">Oliver Bearman</option>
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
                <Label htmlFor="images">Слики</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </div>

              <Button type="submit" className="w-full">
                Додади производ
              </Button>
            </form>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default AdminPage;
