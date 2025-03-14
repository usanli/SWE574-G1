import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import { AuthProvider } from "@/context/auth-context";
import { SearchProvider } from "@/context/search-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NameThatFor.me",
  description: "A community-driven platform for identifying mysterious objects",
  manifest: "/manifest.json",
  themeColor: "#FFD700",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NameThatFor.me",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
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
