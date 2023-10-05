import React from "react";
import { useSelector } from "react-redux";

export default function Confirmation({ confirmation }) {
    return (
        <div className={confirmation ? "confirmation active" : "confirmation"}>
            <ion-icon name="checkmark-circle"></ion-icon>
            You have successfully added a movie to your watchlist
        </div>
    );
}
