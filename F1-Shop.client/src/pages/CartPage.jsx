import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const CartPage = () => {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>🛒 Кошничка</CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <p className="text-center">Кошничката е празна.</p>
          ) : (
            <div className="space-y-4">
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <strong>{item.name}</strong> × {item.quantity}
                      <br />
                      <span className="text-sm text-muted-foreground">
                        {item.price} ден по парче
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{item.price * item.quantity} ден</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: item._id,
                          })
                        }
                      >
                        Избриши
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>

              <Separator />

              <div className="text-right text-lg font-semibold">
                Вкупно: {total} ден
              </div>

              <div className="text-right">
                <Link to="/checkout">
                  <Button>Продолжи на Checkout →</Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CartPage;
