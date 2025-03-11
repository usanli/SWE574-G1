"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/context/auth-context";
import { useSearch } from "@/context/search-context";
import { Menu, Plus, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  const { isAuthenticated, user, logout, quickLogin } = useAuth();
  const { searchQuery, setSearchQuery, isSearching, setIsSearching } =
    useSearch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  // Initialize local search query from context
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
    setIsSearching(!!localSearchQuery);
  };

  // Clear search
  const clearSearch = () => {
    setLocalSearchQuery("");
    setSearchQuery("");
    setIsSearching(false);
    setShowSearchBar(false);
  };

  // Toggle search bar on mobile
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (!showSearchBar) {
      // Focus the search input when showing
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <Sidebar isMobile={true} />
            </SheetContent>
          </Sheet>

          {/* Logo - hide on mobile when search is active */}
          {!showSearchBar && (
            <Link href="/" className="flex items-center space-x-2">
              <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">N</span>
              </span>
              <span className="font-bold hidden sm:inline-block">
                NameThatFor.me
              </span>
              <span className="font-bold sm:hidden">NTFM</span>
            </Link>
          )}

          {/* Search bar - desktop */}
          <div className="hidden md:flex relative w-full max-w-md">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search objects..."
                  className="pl-8 pr-8"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                />
                {localSearchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Search bar - mobile (conditionally shown) */}
          {showSearchBar && (
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-input"
                  type="search"
                  placeholder="Search objects..."
                  className="pl-8 pr-8"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Search toggle - mobile only */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSearchBar}
            aria-label={showSearchBar ? "Close search" : "Search"}
          >
            {showSearchBar ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>

          <ThemeToggle />

          {/* Only show these buttons when search bar is not active on mobile */}
          {(!showSearchBar || window.innerWidth >= 768) && (
            <>
              <Link href="/submit">
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Submit Object</span>
                  <span className="sm:hidden">Submit</span>
                </Button>
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link href={`/profile/${user?.username || "TestUser"}`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user?.profile_picture_url} />
                        <AvatarFallback>
                          {user?.name?.substring(0, 2).toUpperCase() || "TU"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline">
                        {user?.name || "Test User"}
                      </span>
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={quickLogin}>
                    Quick Login
                  </Button>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" size="sm">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Search indicator */}
      {isSearching && (
        <div className="container py-2 text-sm text-muted-foreground flex items-center justify-between">
          <div>
            Searching for:{" "}
            <span className="font-medium text-foreground">"{searchQuery}"</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="h-auto py-1"
          >
            Clear search
          </Button>
        </div>
      )}
    </header>
  );
}
