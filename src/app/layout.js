import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Toaster from "@/components/Toaster";
import Providers from "@/providers";
import classNames from "@/utils/classNames";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Easy Shop",
  description:
    "Easy Shop is a simple e-commerce app built with Next.js and Firebase.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className="transition-all">
      <body
        className={classNames(
          roboto.variable,
          "container mx-auto px-2 font-roboto"
        )}
      >
        <Providers>
          <div className="flex min-h-screen flex-col justify-between">
            <div className="">
              <Header />
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
