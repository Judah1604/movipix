'use client'

import Image from "next/image";
import "../Styles/base/globals.css";
import "../Styles/components/main.css";
import "../Styles/components/utils.css";
import { useDispatch, useSelector } from "react-redux";
import { add } from "@/redux/features/favourites";
import { useEffect, useState } from "react";

export default function MovieDetails() {
    const [data, setData] = useState({});
    const [isAdded, setIsAdded] = useState(false);
    const id = useSelector(state => state.id.value)

    const dispatch = useDispatch();
    const imgPath = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=bbe7a02e2ee350e3770f054fe907f423`
        )
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error("Error fetching movie data:", error);
            });
    }, [id]);

    const genres = data.genres || [];
    const newGenres = genres.map((genre) => genre.name);

    const addToFavourites = () => {
        dispatch(
            add({ id: data.id, title: data.title, image: data.poster_path })
        );
        setConfirmationActive();
    };

    const setConfirmationActive = () => {
        setIsAdded(true);

        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <div className="details">
            <div className={isAdded ? "confirmation active" : "confirmation"}>
                <ion-icon name="checkmark-circle"></ion-icon>
                You have successfully added a movie to your watchlist
            </div>
            <div className="banner">
                <div
                    className={
                        Object.keys(data).length === 0
                            ? "loader"
                            : "loader d-none"
                    }
                ></div>
                <div
                    className={
                        Object.keys(data).length === 0
                            ? "wrapper d-none"
                            : "wrapper"
                    }
                >
                    <Image
                        className="img-fluid image"
                        src={imgPath + data.backdrop_path}
                        alt={data.title}
                        width={500}
                        height={500}
                        layout="responsive"
                    />
                    <div
                        className="blur"
                        style={{
                            backgroundImage:
                                "url(" + (imgPath + data.backdrop_path) + ")",
                        }}
                    ></div>
                    <div className="text">
                        <div className="content">
                            <h1>{data.title}</h1>
                            <p className="genres">{newGenres.join(" | ")}</p>
                            <p className="overview">{data.overview}</p>
                            <p>Runtime: {data.runtime} minutes</p>
                            <p>Release Date: {data.release_date}</p>
                            <button className="btn" onClick={addToFavourites}>
                                <ion-icon name="add-outline"></ion-icon> Add to
                                Watchlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}