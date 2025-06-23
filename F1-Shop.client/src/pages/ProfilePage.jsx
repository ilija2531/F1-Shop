import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../api/users";

const ProfilePage = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateProfile({ name, password });
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
