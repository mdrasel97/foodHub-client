"use client";

import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";


interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  calories: number;
  cuisine?: string;
  dietary?: string[];
  spiceLevel?: string;
  isAvailable: boolean;
  mealType?: string;
  category?:{};
  provider?: {};
  quantity: number;
  pricePerUnit?: number;
}

/* =====================
   Component
===================== */

const ShoppingCartItem = () => {
  const { cartItems, updateCart } = useCart();
  const router = useRouter()
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

  /* =====================
     Quantity Change
  ===================== */

  const handleQuantityChange = (id: string, delta: number) => {
    const updatedCart = cartItems.map((item: CartItem) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(1, item.quantity + delta),
          }
        : item
    );

    updateCart(updatedCart);
  };

  /* =====================
     Delete Item
  ===================== */

  const handleDeleteItem = (id: string) => {
    const updatedCart = cartItems.filter(
      (item: CartItem) => item.id !== id
    );

    updateCart(updatedCart);
    toast.success("Item removed from cart");
  };

  /* =====================
     Clear Cart
  ===================== */

  const handleClearCart = () => {
    updateCart([]);
    toast.success("Cart cleared");
  };

  /* =====================
     Calculations
  ===================== */

  const subtotal = cartItems.reduce(
    (sum: number, item: CartItem) =>
      sum + item.price * item.quantity,
    0
  );

  const tax = +(subtotal * 0.0).toFixed(2);
  const shipping = 0;
  const total = (subtotal + tax + shipping).toFixed(2);

  /* =====================
     Checkout
  ===================== */

  const handleCheckout = async () => {
    try {
    //   const orderData = {
    //     // userEmail: user?.email,
    //     cartItems,
    //     total,
    //     createdAt: new Date(),
    //   };

    //   const response = await axiosSecure.post(
    //     "/cartCheckOut",
    //     orderData
    //   );

      if (cartItems.length > 0) {
        toast.success("🛒 Order placed successfully!");
        router.push("/checkout");
        // updateCart([]);
      } else {
        toast.error("❌ Failed to place order");
      }
    } catch (err: any) {
      toast.error("🚫 Server Error");
      console.error(err?.message);
    }
  };

  /* =====================
     JSX
  ===================== */

  return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            Your cart is empty
          </div>
        ) : (
          cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="border rounded-lg p-3 space-y-2"
            >
              <div className="flex justify-between">
                <h2 className="font-semibold text-sm">
                    {item.name}
                </h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      handleQuantityChange(item.id, -1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>

                  <span className="w-6 text-center">
                    {item.quantity}
                  </span>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      handleQuantityChange(item.id, 1)
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <span className="font-bold text-sm">
                  ৳ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}

              {cartItems.length > 0 && (
        <div className="border-t p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>৳ {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>৳ {total}</span>
          </div>

       
            
            <Button
            onClick={()=>handleCheckout()}
            className="w-full bg-primary text-white"
          >
            Checkout
          </Button>

          <Button
            variant="destructive"
            className="w-full"
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        </div>
       )} 

      </div>

  );
};

export default ShoppingCartItem;
