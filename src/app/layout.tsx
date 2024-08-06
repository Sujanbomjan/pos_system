import { inter, lexendDeca } from "@/app/fonts";
import "@/app/globals.css";
import MyToaster from "@/components/Toaster/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import NextProgress from "@/components/ui/next-progress";
import AuthProvider from "@/providers/AuthProvider";
import NiceModalProvider from "@/providers/NiceModalProvider";
import QueryProvider from "@/providers/QueryProviders";
import StoreProvider from "@/providers/StoreProvider";
import { cn } from "@/utils/class-names";
import type { Metadata } from "next";
import GlobalDrawer from "./shared/drawer-views/container";

export const metadata: Metadata = {
  title: "Jhattai RMS",
  description:
    "Jhattai Rms with POS (Point of Sale) module is a web application that allows you to manage your sales and inventory on site. Update your stock information, make purchases and view sales data from anywhere whether in the office, at home, in the warehouse, or on the go. All you need to access this a device with internet connection. SajiloRms has built-in Invoice and Inventory System. Invoice System has Tax and Discounts. These will be really helpful to apply taxes and discounts automatically and the ability to generate invoice from quotation.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      // 💡 Prevent next-themes hydration warning
      suppressHydrationWarning
    >
      <body
        // 💡 Prevent hydration warnings caused by third-party extensions, such as Grammarly.
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, "font-inter")}
      >
        <QueryProvider>
          <AuthProvider>
            <StoreProvider>
              <NiceModalProvider>
                <ThemeProvider>
                  <NextProgress />
                  {children}
                  <GlobalDrawer />
                  <MyToaster />
                </ThemeProvider>
              </NiceModalProvider>
            </StoreProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
