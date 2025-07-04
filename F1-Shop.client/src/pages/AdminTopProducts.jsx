import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { exportTopProductsToExcel } from "../../utils/exportTopProductsToExcel";
import FadeIn from "../components/FadeIn";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminTopProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
const loadTopProducts = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Нема token – најави се како админ.");
      return;
    }

    const { data } = await axios.get("http://localhost:5000/api/orders/top-products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(data);
    console.log("Top Products Data:", data);
  } catch (err) {
    console.error("Грешка при вчитување топ производи:", err.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadTopProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <FadeIn>
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>🏆 Најкупувани производи</CardTitle>
            {!loading && products.length > 0 && (
              <Button variant="outline" onClick={() => exportTopProductsToExcel(products)}>
                📥 Експорт во Excel
              </Button>
            )}
          </CardHeader>

          <CardContent>
            {loading ? (
              <p>Вчитување...</p>
            ) : products.length === 0 ? (
              <p>Нема податоци.</p>
            ) : (
              <ScrollArea className="overflow-x-auto">
                <table className="w-full text-sm border">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-2 border">#</th>
                      <th className="p-2 border">Назив</th>
                      <th className="p-2 border">Категорија</th>
                      <th className="p-2 border">Цена</th>
                      <th className="p-2 border">Продадено</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, i) => (
                      <tr key={i} className="hover:bg-muted/30">
                        <td className="p-2 border text-center">{i + 1}</td>
                        <td className="p-2 border">{p.name}</td>
                        <td className="p-2 border">{p.category?.name || "—"}</td>
                        <td className="p-2 border">{p.price} ден</td>
                        <td className="p-2 border font-semibold">{p.totalSold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default AdminTopProducts;
