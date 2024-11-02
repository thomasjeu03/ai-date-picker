import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notion like editor",
  description: "Notion like editor + IA du gheto qui tourne avec Chat GPT 4o mini",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body
              className={inter.className + cn(
                  "min-h-screen bg-background font-sans antialiased"
              )}
          >
          {children}
          </body>
      </html>
  );
}
