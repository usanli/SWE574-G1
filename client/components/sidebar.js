"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

const categories = [
  { id: "natural", label: "Natural Objects" },
  { id: "artifacts", label: "Artifacts" },
  { id: "geological", label: "Geological Finds" },
  { id: "biological", label: "Biological Specimens" },
  { id: "historical", label: "Historical Items" },
  { id: "technological", label: "Technological Devices" },
  { id: "unusual", label: "Unusual Phenomena" },
];

export default function Sidebar({ isMobile = false }) {
  return (
    <div
      className={`${
        isMobile ? "w-full" : "w-64"
      } shrink-0 border-r bg-background p-4 hidden md:block`}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Search</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search objects..."
              className="pl-8"
            />
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={category.id} />
                <Label
                  htmlFor={category.id}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Status</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="identified" />
              <Label
                htmlFor="identified"
                className="text-sm font-normal cursor-pointer"
              >
                Identified
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="unidentified" />
              <Label
                htmlFor="unidentified"
                className="text-sm font-normal cursor-pointer"
              >
                Unidentified
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="in-progress" />
              <Label
                htmlFor="in-progress"
                className="text-sm font-normal cursor-pointer"
              >
                In Progress
              </Label>
            </div>
          </div>
        </div>
        <Separator />
        <Button className="w-full">Apply Filters</Button>
      </div>
    </div>
  );
}
