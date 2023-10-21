"use client";

import { useState } from "react";
import "../Styles/components/nav.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { changeDetails } from "@/redux/features/details";
import { changeAlbumsStatus } from "@/redux/features/albumsStatus";

function Navbar() {
    const [selectedIconIndex, setSelectedIconIndex] = useState(0);
    const dispatch = useDispatch();

    const items = [
        { inactive: "home-outline", active: "home" },
        { inactive: "search-outline", active: "search", linkUrl: "/search" },
        {
            inactive: "albums-outline",
            active: "albums",
            isAlbums: true,
        },
        {
            inactive: "settings-outline",
            active: "settings",
        },
    ];

    const closeDialogs = () => {
        dispatch(changeDetails({ id: 0, status: false }));

        for (const item of items) {
            if (item.isAlbums) {
                dispatch(changeAlbumsStatus(true));
            }
        }
    };

    return (
        <div className="navbar">
            {items.map((item, index) => (
                <Link
                    href={item.linkUrl ? item.linkUrl : "/"}
                    key={index}
                    onClick={closeDialogs}
                >
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
