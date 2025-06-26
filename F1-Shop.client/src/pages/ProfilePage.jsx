import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../api/users";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


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

  if (!user) return <p className="text-center">Мора да сте најавени за да го видите профилот.</p>;

  return (
   <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">👤 Мој профил</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {avatar && (
              <div className="text-center">
                <img
                  src={`http://localhost:5000${avatar}`}
                  alt="avatar"
                  className="mx-auto w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
            <div>
              <Label htmlFor="name">Име</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Е-пошта</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="password">Нова лозинка</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="(остави празно ако не менуваш)"
              />
            </div>
            <div>
              <Label htmlFor="avatar">Профилна слика</Label>
              <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarUpload} />
            </div>
            <Button type="submit" className="w-full">Зачувај промени</Button>
            {message && <p className="text-center text-sm mt-2">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
    
  );
};

export default ProfilePage;
