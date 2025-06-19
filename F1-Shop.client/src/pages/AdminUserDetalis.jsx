import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/users";
import { useAuth } from "../context/AuthContext";

const AdminUserDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserById(id);
        setUserInfo(data);
      } catch (err) {
        console.error("Грешка при вчитување на корисникот:", err.message);
      }
    };

    if (user?.isAdmin) load();
  }, [id, user]);

  if (!user?.isAdmin) return <p>❌ Немате пристап.</p>;
  if (!userInfo) return <p>Вчитување...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👤 Детали за корисник</h2>
      <p><strong>Име:</strong> {userInfo.name}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Admin:</strong> {userInfo.isAdmin ? "Да" : "Не"}</p>
      <p><strong>Регистриран на:</strong> {new Date(userInfo.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default AdminUserDetails;
