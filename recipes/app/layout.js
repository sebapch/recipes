import Link from "next/link";
import { Navigation } from "./components/Navigation";
import "../styles/globals.css";
import Footer from "./components/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>Que comemos hoy?</title>
      </head>
      <body className='bg-black'>
         {/*  <Navigation /> */}
        {children}
        <Footer/>
      </body>
    </html>
  );
}
