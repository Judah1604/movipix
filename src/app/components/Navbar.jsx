"use client";

import { useState } from "react";
import "../Styles/components/nav.css";
import Link from "next/link";

function Navbar() {
    const [selectedIconIndex, setSelectedIconIndex] = useState(0);

    const items = [
        { inactive: "home-outline", active: "home", linkUrl: "/" },
        { inactive: "search-outline", active: "search", linkUrl: '/search' },
        { inactive: "albums-outline", active: "albums", linkUrl: '/albums' },
        { inactive: "settings-outline", active: "settings", linkUrl: '/settings', demo: true },
    ];

    return (
        <div className="navbar">
            {items.map((item, index) => (
                <Link href={item.demo ? '/' : item.linkUrl} key={index}>
                    <div className="menuItem">
                        <ion-icon
                            name={
                                selectedIconIndex === index
                                    ? item.active
                                    : item.inactive
                            }
                            onClick={() => setSelectedIconIndex(index)}
                        ></ion-icon>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Navbar;
