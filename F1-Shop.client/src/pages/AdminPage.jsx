import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminPage = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    team: "",
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
      setForm({ name: "", team: "", description: "", price: "" });
      setImageFile(null);
    } catch (err) {
      alert(err.response?.data?.message || "Грешка при додавање производ.");
      console.error(err);
    }
  };

  if (!user || !user.isAdmin) {
    return <p>❌ Немате пристап до оваа страница.</p>;
  }

  return (
    <div>
      <h2>Админ Панел – Додади Производ</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          gap: "10px",
        }}
      >
        <input
          name="name"
          placeholder="Име"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="team"
          placeholder="Тим"
          value={form.team}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Опис"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Цена"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Додади производ</button>
      </form>
    </div>
  );
};

export default AdminPage;
