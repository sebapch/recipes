import Link from "next/link";
import { Navigation } from "./components/Navigation";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>Que comemos hoy?</title>
      </head>
      <body>
         {/*  <Navigation /> */}
        {children}
      </body>
    </html>
  );
}
