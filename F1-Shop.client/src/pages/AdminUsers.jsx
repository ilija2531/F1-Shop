import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllUsers } from "../api/users";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    return <p className="text-center text-destructive">❌ Немате пристап до оваа страница.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>👥 Регистрирани корисници</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-2 border">Име</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Admin</th>
                  <th className="p-2 border">Регистриран</th>
                  <th className="p-2 border">Детали</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-muted/30">
                    <td className="p-2 border">{u.name}</td>
                    <td className="p-2 border">{u.email}</td>
                    <td className="p-2 border">{u.isAdmin ? "✅ Да" : "❌ Не"}</td>
                    <td className="p-2 border">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="p-2 border">
                      <Link to={`/admin/users/${u._id}`}>
                        <Button size="sm" variant="outline">
                          Погледни
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
