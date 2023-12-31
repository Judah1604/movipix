import { Outfit } from "next/font/google";
import Navbar from "./components/Navbar";
import Script from "next/script";
import "@/../bootstrap/dist/css/bootstrap.min.css";
import { ReduxProvider } from "@/redux/provider";
import MovieDetails from "./components/MovieDetails";
import Albums from "./components/Albums";

const outfit = Outfit({ weight: "400", subsets: ["latin"] });

export const metadata = {
    title: "MoviPix - Movies Site",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="shortcut icon"
                    href="/images/favicon.png"
                    type="image/x-icon"
                />
            </head>
            <body className={outfit.className}>
                <main>
                    <ReduxProvider>
                        <Navbar />
                        <div className="main">
                            {children}
                            <MovieDetails />
                            <Albums />
                            <footer className="text-center mt-5">
                                Made by Judah Oyedele (
                                <a href="https://twitter.com/judahoyedele">
                                    @judahoyedele
                                </a>
                                )
                            </footer>
                        </div>
                    </ReduxProvider>
                </main>
            </body>
            <Script src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js" />
            <Script src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js" />
        </html>
    );
}
