import { add, deleteItem } from '@/redux/features/favourites';
import { changeId } from "@/redux/features/id";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function MovieCard({ id, title, image, handleConfirmationActive, isAlbum }) {
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false);

    const addToFavourites = () => {
        setIsAdded(!isAdded);

        if (isAdded) {
            dispatch(deleteItem(id));
        } else {
            dispatch(add({ id: id, title: title, image: image }));
            handleConfirmationActive();
        }
    };

    const removeFromFavourites = () => {
        dispatch(deleteItem(id));
    }

    const updateID = () => {
        dispatch(changeId(id))
    }

    return (
        <div className="movie shadow">
            <Link href={`/details`}>
                <Image
                    className="image img-fluid"
                    src={image}
                    alt={title}
                    width={200}
                    height={200}
                    layout="responsive"
                    onClick={updateID}
                />
            </Link>
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
