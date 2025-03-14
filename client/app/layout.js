import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import { AuthProvider } from "@/context/auth-context";
import { SearchProvider } from "@/context/search-context";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
  maximumScale: 1.0,
  userScalable: false,
  themeColor: "#4f46e5",
};

export const metadata = {
  title: "NameThatFor.me",
  description: "Identify mysterious objects with help from the community",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NameThatFor.me",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <SearchProvider>
              <div className="flex min-h-screen flex-col pb-16 md:pb-0">
                <Navbar />
                <div className="flex flex-1">{children}</div>
                <MobileBottomNav />
              </div>
            </SearchProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
