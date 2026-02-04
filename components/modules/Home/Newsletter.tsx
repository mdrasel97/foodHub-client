"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    // TODO: connect API here
    console.log("Subscribed Email:", email);

    setEmail("");
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-primary-foreground/80">
                  Get the latest food deals, offers, and updates delivered
                  straight to your inbox.
                </p>
              </div>

              {/* Right Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative w-full">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-9 text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" variant="secondary">
                  Subscribe
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
