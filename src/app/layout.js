import "../styles/globals.css";
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";
import Footer from "../components/Footer";

export const metadata = {
  title: "CodeKitHub",
  description: "Buy and sell digital developer products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}