"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";



interface AddressForm {
  fullName: string;
  phone: string;
  address: string;
  city: string;
}

/* =====================
   Component
===================== */

export default function CheckoutPage() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = 0;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = () => {
    console.log("Order placed");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* =====================
            Address Form
        ===================== */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="John Doe" />
              </div>

              <div>
                <Label>Phone Number</Label>
                <Input placeholder="01XXXXXXXXX" />
              </div>
            </div>

            <div>
              <Label>Full Address</Label>
              <Textarea
                placeholder="House no, road, area"
                rows={3}
              />
            </div>

            <div>
              <Label>City</Label>
              <Input placeholder="Dhaka" />
            </div>
          </CardContent>
        </Card>

        {/* =====================
            Order Summary
        ===================== */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ৳ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <Separator />

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳ {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>৳ {tax}</span>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳ {total.toFixed(2)}</span>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
