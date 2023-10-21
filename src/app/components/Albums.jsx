"use client";

import { useDispatch, useSelector } from "react-redux";
import "../Styles/base/globals.css";
import "../Styles/components/main.css";
import "../Styles/components/utils.css";
import MovieCard from "./MovieCard";
import { changeAlbumsStatus } from "@/redux/features/albumsStatus";

function Albums() {
    const favourites = useSelector((state) => state.favourites.value),
        albumsStatus = useSelector((state) => state.albumsStatus.value),
        dispatch = useDispatch();

    const imgPath = "https://image.tmdb.org/t/p/original";
    return (
        <div
            className={
                albumsStatus
                    ? "albums panel-overlay active"
                    : "albums panel-overlay"
            }
        >
            <div className="close" onClick={() => dispatch(changeAlbumsStatus(false))}>
                <ion-icon name="close-outline"></ion-icon>
            </div>
            <h1>Albums</h1>
            <p>**Note: Click on a movie card to see the details</p>
            {favourites.length == 0 ? (
                <p className="text-center">No favourite movie added yet</p>
            ) : (
                <div
                    className={
                        favourites.length < 3 ? "movies grid-2" : "movies"
                    }
                >
                    {favourites.map((favourite, index) => (
                        <MovieCard
                            id={favourite.id}
                            title={favourite.title}
                            image={imgPath + favourite.image}
                            key={index}
                            isAlbum={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Albums;
