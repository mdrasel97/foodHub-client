import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Truck,
  Clock,
  Star,
} from "lucide-react";

const features = [
  {
    title: "Trusted & Secure",
    description:
      "We prioritize security and reliability so you can order with confidence.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Delivery",
    description:
      "Quick and efficient delivery system to get your food on time.",
    icon: Truck,
  },
  {
    title: "24/7 Support",
    description:
      "Our support team is always available to help you anytime.",
    icon: Clock,
  },
  {
    title: "Top Rated Quality",
    description:
      "We maintain high-quality standards trusted by thousands of customers.",
    icon: Star,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-muted/40">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why People Love Our Service
          </h2>
          <p className="text-muted-foreground">
            We focus on quality, speed, and customer satisfaction to give you
            the best experience possible.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
