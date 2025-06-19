import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllUsers } from "../api/users";

const AdminUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error("Грешка при вчитување корисници:", err.message);
      }
    };

    if (user?.isAdmin) load();
  }, [user]);

  if (!user?.isAdmin) {
    return <p>❌ Немате пристап до оваа страница.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👥 Регистрирани корисници</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead style={{ backgroundColor: "#000", color: "#fff" }}>
          <tr>
            <th>Име</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Регистриран</th>
            <th>Детали</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isAdmin ? "✅ Да" : "❌ Не"}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              <td>
                <a href={`/admin/users/${u._id}`} style={{ color: "#007bff", textDecoration: "none" }}>
                  Погледни
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
