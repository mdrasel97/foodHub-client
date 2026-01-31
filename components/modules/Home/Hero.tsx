"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

// images
import hero1 from "../../../public/hero-food.jpg";
import hero2 from "../../../public/hero-food1.jpg";
import hero3 from "../../../public/hero-food2.jpg";

const heroImages = [
  { src: hero1, alt: "Delicious food delivery" },
  { src: hero2, alt: "Fresh meals from restaurants" },
  { src: hero3, alt: "Fast food delivery service" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center hero-bg overflow-hidden">
      {/* Background blur decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ================= LEFT CONTENT ================= */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium w-fit">
              <Sparkles size={16} />
              #1 Food Delivery Platform
            </span>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Hunger at Zero,{" "}
              <span className="text-primary">Delivery in a Hero.</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg">
              Discover amazing food from multiple providers in one place. Order
              from local restaurants and get it delivered to your door in
              minutes.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex items-center gap-2">
                Browse Restaurants
                <ArrowRight size={20} />
              </Button>
              <Button size="lg" variant="outline">
                Partner with Us
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Restaurants</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-2xl font-bold">50k+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-2xl font-bold">15 min</p>
                <p className="text-sm text-muted-foreground">Avg Delivery</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT CAROUSEL ================= */}
          <div className="relative">
            <Carousel
              opts={{ loop: true }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {heroImages.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="relative">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={600}
                        height={600}
                        className="w-full h-[420px] lg:h-[520px] object-cover rounded-3xl shadow-2xl"
                        priority
                      />

                      {/* Floating Card */}
                      <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">🚀</span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              Fast Delivery
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Order is on the way!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* <CarouselPrevious />
              <CarouselNext /> */}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
