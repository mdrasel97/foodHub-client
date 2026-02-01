"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

/* =====================
   Types
===================== */

interface Meal {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
}

/* =====================
   Dummy Data (replace with API)
===================== */

const MEALS: Meal[] = [
  { id: "1", name: "Burger", category: "Fast Food", price: 250 },
  { id: "2", name: "Pizza", category: "Fast Food", price: 600 },
  { id: "3", name: "Chicken Biryani", category: "Rice", price: 300 },
  { id: "4", name: "Beef Khichuri", category: "Rice", price: 350 },
  { id: "5", name: "Pasta", category: "Italian", price: 450 },
  { id: "6", name: "Fried Rice", category: "Rice", price: 280 },
  { id: "7", name: "Sandwich", category: "Fast Food", price: 180 },
  { id: "8", name: "Lasagna", category: "Italian", price: 700 },
  { id: "9", name: "Chicken Roll", category: "Fast Food", price: 200 },
  { id: "10", name: "Veg Burger", category: "Fast Food", price: 220 },
  { id: "11", name: "Paneer Pizza", category: "Italian", price: 650 },
  { id: "12", name: "Mutton Biryani", category: "Rice", price: 400 },
  { id: "13", name: "Veg Sandwich", category: "Fast Food", price: 150 },
  { id: "14", name: "Cheese Pasta", category: "Italian", price: 500 },
  { id: "15", name: "Beef Burger", category: "Fast Food", price: 300 },
  { id: "16", name: "Fried Chicken", category: "Fast Food", price: 350 },
  { id: "17", name: "Egg Fried Rice", category: "Rice", price: 320 },
  { id: "18", name: "Spaghetti", category: "Italian", price: 480 },
  { id: "19", name: "Chocolate Cake", category: "Desserts", price: 250 },
  { id: "20", name: "Vanilla Ice Cream", category: "Desserts", price: 150 },
  { id: "21", name: "Mango Shake", category: "Drinks", price: 120 },
  { id: "22", name: "Coffee", category: "Drinks", price: 100 },
  { id: "23", name: "Cheese Roll", category: "Fast Food", price: 180 },
  { id: "24", name: "Chicken Nuggets", category: "Fast Food", price: 250 },
  { id: "25", name: "Veg Fried Rice", category: "Rice", price: 280 },
  { id: "26", name: "Chicken Pizza", category: "Italian", price: 700 },
  { id: "27", name: "Fish Fry", category: "Fast Food", price: 320 },
  { id: "28", name: "Beef Steak", category: "Fast Food", price: 600 },
  { id: "29", name: "Prawn Biryani", category: "Rice", price: 450 },
  { id: "30", name: "Chocolate Muffin", category: "Desserts", price: 180 },
  { id: "31", name: "Strawberry Shake", category: "Drinks", price: 130 },
  { id: "32", name: "Veg Roll", category: "Fast Food", price: 160 },
  { id: "33", name: "Cheese Sandwich", category: "Fast Food", price: 200 },
  { id: "34", name: "Chicken Pasta", category: "Italian", price: 550 },
  { id: "35", name: "Beef Pizza", category: "Italian", price: 750 },
  { id: "36", name: "Egg Roll", category: "Fast Food", price: 150 },
  { id: "37", name: "Fried Fish", category: "Fast Food", price: 300 },
  { id: "38", name: "Veg Biryani", category: "Rice", price: 270 },
  { id: "39", name: "Vanilla Cake", category: "Desserts", price: 220 },
  { id: "40", name: "Chocolate Shake", category: "Drinks", price: 140 },
  { id: "41", name: "Paneer Roll", category: "Fast Food", price: 200 },
  { id: "42", name: "Chicken Sandwich", category: "Fast Food", price: 250 },
  { id: "43", name: "Seafood Pasta", category: "Italian", price: 680 },
  { id: "44", name: "Veg Lasagna", category: "Italian", price: 600 },
  { id: "45", name: "Mango Ice Cream", category: "Desserts", price: 160 },
  { id: "46", name: "Cold Coffee", category: "Drinks", price: 120 },
  { id: "47", name: "Chicken Burger", category: "Fast Food", price: 280 },
  { id: "48", name: "Beef Roll", category: "Fast Food", price: 300 },
  { id: "49", name: "Fried Noodles", category: "Rice", price: 290 },
  { id: "50", name: "Veg Sandwich Deluxe", category: "Fast Food", price: 210 },
];


/* =====================
   Constants
===================== */

const ITEMS_PER_PAGE = 20;

/* =====================
   Component
===================== */

export default function MealsPage() {
  const [sortOrder, setSortOrder] = useState<
    "lowToHigh" | "highToLow"
  >("lowToHigh");

  const [selectedCategories, setSelectedCategories] = useState<
    string[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);

  /* =====================
     Categories
  ===================== */

  const categories = Array.from(
    new Set(MEALS.map((meal) => meal.category))
  );

  /* =====================
     Filtering + Sorting
  ===================== */

  const filteredAndSortedMeals = useMemo(() => {
    let meals = [...MEALS];

    // filter by category
    if (selectedCategories.length > 0) {
      meals = meals.filter((meal) =>
        selectedCategories.includes(meal.category)
      );
    }

    // sort by price
    meals.sort((a, b) =>
      sortOrder === "lowToHigh"
        ? a.price - b.price
        : b.price - a.price
    );

    return meals;
  }, [sortOrder, selectedCategories]);

  /* =====================
     Pagination
  ===================== */

  const totalPages = Math.ceil(
    filteredAndSortedMeals.length / ITEMS_PER_PAGE
  );

  const paginatedMeals = filteredAndSortedMeals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder, selectedCategories]);

  /* =====================
     Handlers
  ===================== */

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  /* =====================
     JSX
  ===================== */

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        🍽️ Meals
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* =====================
            Sidebar
        ===================== */}
        <aside className="lg:col-span-1 hidden lg:block">
  <div className="sticky top-20 space-y-6">
    {/* ================= Sort Card ================= */}
    <Card>
      <CardHeader>
        <CardTitle>Sort By</CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          value={sortOrder}
          onValueChange={(value) =>
            setSortOrder(value as "lowToHigh" | "highToLow")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lowToHigh">Price: Low → High</SelectItem>
            <SelectItem value="highToLow">Price: High → Low</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>

    {/* ================= Category Card ================= */}
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <Checkbox
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => toggleCategory(category)}
            />
            <span>{category}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
</aside>


        {/* =====================
            Meals Grid
        ===================== */}
        <main className="lg:col-span-3">
          {paginatedMeals.length === 0 ? (
            <div className="text-center py-20">
              No meals found
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedMeals.map((meal) => (
                <Card key={meal.id}>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-semibold">
                      {meal.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {meal.category}
                    </p>
                    <p className="font-bold">
                      ৳ {meal.price}
                    </p>
                    <Button className="w-full mt-2">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* =====================
              Pagination
          ===================== */}
          {totalPages > 1 && (
            <>
              <Separator className="my-8" />
              <div className="flex justify-center gap-2">
                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <Button
                    key={page}
                    variant={
                      page === currentPage
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setCurrentPage(page)
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
