"use client";

import { useFeed } from "@/context/feed-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Clock, TrendingUp } from "lucide-react";

export default function FeedFilters() {
  const { sortBy, setSortBy, filter, setFilter } = useFeed();

  const sortOptions = [
    { value: "recent", label: "Most Recent", icon: Clock },
    { value: "popular", label: "Most Popular", icon: TrendingUp },
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
        <div className="flex rounded-md border">
          <Button
            variant="ghost"
            className={`rounded-none ${filter === "all" ? "bg-muted" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant="ghost"
            className={`rounded-none ${filter === "solved" ? "bg-muted" : ""}`}
            onClick={() => setFilter("solved")}
          >
            Solved
          </Button>
          <Button
            variant="ghost"
            className={`rounded-none ${
              filter === "unsolved" ? "bg-muted" : ""
            }`}
            onClick={() => setFilter("unsolved")}
          >
            Unsolved
          </Button>
        </div>

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
      </div>
    </div>
  );
}
