import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/users";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

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

  if (!user?.isAdmin) return <p className="text-center text-destructive">❌ Немате пристап.</p>;
  if (!userInfo) return <p className="text-center">Вчитување...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>👤 Детали за корисник</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Име:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Admin:</strong> {userInfo.isAdmin ? "Да" : "Не"}</p>
          <p><strong>Регистриран на:</strong> {new Date(userInfo.createdAt).toLocaleString()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserDetails;
