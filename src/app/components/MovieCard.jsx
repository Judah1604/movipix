import { add, deleteItem } from "@/redux/features/favourites";
import { changeId, update } from "@/redux/features/details";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeStatus } from "@/redux/features/confirmation";

function MovieCard({ id, title, image, isAlbum }) {
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false);

    const addToFavourites = () => {
        setIsAdded(!isAdded);

        if (isAdded) {
            dispatch(deleteItem(id));
        } else {
            dispatch(add({ id: id, title: title, image: image }));
            dispatch(changeStatus(true));

            setTimeout(() => {
                dispatch(changeStatus(false));
            }, 2000);
        }
    };

    const removeFromFavourites = () => {
        dispatch(deleteItem(id));
    };

    const updateDetails = () => {
        dispatch(update({ id: id, status: true }));
    };

    return (
        <div className="movie shadow">
            <Image
                className="image img-fluid"
                src={image}
                alt={title}
                width={200}
                height={200}
                layout="responsive"
                onClick={updateDetails}
            />
            {isAlbum ? (
                <div className="delete" onClick={removeFromFavourites}>
                    <ion-icon name="trash-outline"></ion-icon>
                </div>
            ) : (
                <div
                    className={isAdded ? "heart filled" : "heart"}
                    onClick={addToFavourites}
                >
                    <ion-icon
                        name={isAdded ? "heart" : "heart-outline"}
                    ></ion-icon>
                </div>
            )}

            <div
                className="blur"
                style={{ backgroundImage: "url(" + image + ")" }}
            ></div>
            <h3 className="mt-4">{title}</h3>
        </div>
    );
}

export default MovieCard;
