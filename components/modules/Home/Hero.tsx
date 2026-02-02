"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroImages = [
  "/hero-food.jpg",
  "/hero-food-2.jpg",
  "/hero-food-3.jpg",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center hero-bg overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-primary/10 text-primary rounded-full text-sm font-medium">
              <Sparkles size={16} />
              #1 Food Delivery Platform
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Your Favorite Food,{" "}
              <span className="text-primary">Delivered Fast</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg">
              Discover amazing food from multiple providers in one place. Order
              from local restaurants and get it delivered to your door in
              minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="destructive">
                Browse Restaurants
                <ArrowRight size={20} />
              </Button>

              <Link href="/providers/become-provider">
                <Button variant="outline" size="lg">
                  Become a Provider
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <Stat title="500+" subtitle="Restaurants" />
              <Divider />
              <Stat title="50k+" subtitle="Happy Customers" />
              <Divider />
              <Stat title="15 min" subtitle="Avg Delivery" />
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <div className="relative w-full h-[420px] lg:h-[520px]">
            {heroImages.map((img, index) => (
              <Image
                key={img}
                src={img}
                alt="Food"
                fill
                priority={index === 0}
                className={`object-cover rounded-3xl shadow-2xl transition-all duration-1000 ${
                  index === current
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              />
            ))}

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  🚀
                </div>
                <div>
                  <p className="font-semibold">Fast Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Order is on the way!
                  </p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {heroImages.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition ${
                    i === current ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Small helpers */
const Stat = ({ title, subtitle }: any) => (
  <div>
    <p className="text-2xl sm:text-3xl font-bold">{title}</p>
    <p className="text-sm text-muted-foreground">{subtitle}</p>
  </div>
);

const Divider = () => <div className="w-px h-12 bg-border" />;
