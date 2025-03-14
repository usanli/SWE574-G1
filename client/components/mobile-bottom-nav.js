"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Plus, User, Menu } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:hidden">
      <div className="flex h-16 items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center px-3 ${
            pathname === "/" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          href="/search"
          className={`flex flex-col items-center justify-center px-3 ${
            pathname === "/search" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Search className="h-6 w-6" />
          <span className="text-xs">Search</span>
        </Link>

        <Link
          href="/submit"
          className="flex flex-col items-center justify-center px-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Plus className="h-6 w-6" />
          </div>
        </Link>

        <Link
          href={
            isAuthenticated
              ? `/profile/${user?.username || "TestUser"}`
              : "/login"
          }
          className={`flex flex-col items-center justify-center px-3 ${
            pathname.startsWith("/profile") || pathname === "/login"
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs">
            {isAuthenticated ? "Profile" : "Login"}
          </span>
        </Link>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button
              className={`flex flex-col items-center justify-center px-3 ${
                isMobileMenuOpen ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Menu className="h-6 w-6" />
              <span className="text-xs">Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] p-0">
            <Sidebar isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
