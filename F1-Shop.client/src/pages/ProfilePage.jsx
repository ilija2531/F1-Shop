import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../api/users";
import axios from "axios";

const ProfilePage = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [message, setMessage] = useState("");

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/users/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAvatar(res.data.avatar);
    } catch (err) {
      console.error("Upload error:", err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateProfile({ name, password, avatar });
      login({ user: updated, token: localStorage.getItem("token") });
      setMessage("✅ Профилот е успешно ажуриран.");
    } catch (err) {
      console.error("Profile update error:", err.message);
      setMessage("❌ Неуспешно ажурирање на профилот.");
    }
  };

  if (!user) return <p>Мора да сте најавени за да го видите профилот.</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>👤 Мој профил</h2>
      <form onSubmit={handleSubmit}>
        {avatar && (
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <img
              src={`http://localhost:5000${avatar}`}
              alt="avatar"
              style={{ width: "100px", borderRadius: "50%" }}
            />
          </div>
        )}
        <div style={{ marginBottom: "1rem" }}>
          <label>Име:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Е-пошта:</label>
          <input
            type="email"
            value={user.email}
            disabled
            style={{ width: "100%", padding: "0.5rem", backgroundColor: "#f0f0f0" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Нова лозинка:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="(остави празно ако не менуваш)"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Профилна слика:</label>
          <input type="file" accept="image/*" onChange={handleAvatarUpload} />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Зачувај промени
        </button>
        {message && <p style={{ marginTop: "1rem", textAlign: "center" }}>{message}</p>}
      </form>
    </div>
  );
};

export default ProfilePage;