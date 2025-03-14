import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/context/auth-context";
import { SearchProvider } from "@/context/search-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NameThatForMe",
  description: "A community-driven platform for identifying mysterious objects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <SearchProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex flex-1">{children}</div>
              </div>
            </SearchProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
