"use client";

import { useFeed } from "@/context/feed-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Clock, CheckCircle, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCategories } from "@/lib/api";

export default function FeedFilters() {
  const { sortBy, setSortBy, category, setCategory } = useFeed();
  const categories = ["all", ...getCategories()];

  const sortOptions = [
    { value: "recent", label: "Most Recent", icon: Clock },
    { value: "solved", label: "Solved Only", icon: CheckCircle },
    { value: "most-discussed", label: "Most Discussed", icon: MessageSquare },
  ];

  const currentSort = sortOptions.find((option) => option.value === sortBy);

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold">Discover Objects</h2>
        <p className="text-muted-foreground">
          Help identify mysterious objects from the community
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              <currentSort.icon className="h-4 w-4" />
              {currentSort.label}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className="gap-2"
              >
                <option.icon className="h-4 w-4" />
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              Categories
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {categories.map((cat) => (
              <DropdownMenuItem
                key={cat}
                onClick={() => setCategory(cat)}
                className="capitalize"
              >
                {cat === "all" ? "All Categories" : cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {category !== "all" && (
          <Badge
            variant="secondary"
            className="flex items-center gap-1 capitalize"
          >
            {category}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => setCategory("all")}
            >
              ×
            </Button>
          </Badge>
        )}
      </div>
    </div>
  );
}
