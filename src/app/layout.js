import "./globals.css";
import { Poppins } from 'next/font/google';
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: "Global X",
  description: "Aplicativo de investimentos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <main className={`dark ${poppins.className} p-5 w-screen h-screen flex flex-col`}>
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
