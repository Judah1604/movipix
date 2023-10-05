"use client";

import { useSelector } from "react-redux";
import "../Styles/base/globals.css";
import "../Styles/components/main.css";
import "../Styles/components/utils.css";
import MovieCard from "../components/MovieCard";
import Confirmation from "../components/Confirmation";

function Albums() {
    const favourites = useSelector((state) => state.favourites.value),
        confirmation = useSelector((state) => state.confirmation.value);

    const imgPath = "https://image.tmdb.org/t/p/original";
    return (
        <div className="albums">
            <Confirmation confirmation={confirmation} />
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
