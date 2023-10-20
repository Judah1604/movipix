"use client";

import Image from "next/image";
import "../Styles/base/globals.css";
import "../Styles/components/main.css";
import "../Styles/components/utils.css";
import { useDispatch, useSelector } from "react-redux";
import { add } from "@/redux/features/favourites";
import { useEffect, useState } from "react";
import { changeDetails } from "@/redux/features/details";
import { changeStatus } from "@/redux/features/confirmation";

export default function MovieDetails() {
    const [data, setData] = useState({});
    const details = useSelector((state) => state.details.value);

    const dispatch = useDispatch();
    const imgPath = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${details.id}?api_key=bbe7a02e2ee350e3770f054fe907f423`
        )
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error("Error fetching movie data:", error);
            });
    }, [details.id]);

    const genres = data.genres || [];
    const newGenres = genres.map((genre) => genre.name);

    const addToFavourites = () => {
        dispatch(
            add({ id: data.id, title: data.title, image: data.poster_path })
        );
        dispatch(changeStatus(true));

        setTimeout(() => {
            dispatch(changeStatus(false));
        }, 2000);
    };

    const closeDialog = () => {
        dispatch(changeDetails({ id: details.id, status: false }));
    }

    return (
        <div className={details.status ? "details active" : "details"}>
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
                            <div className="d-flex">
                                <button
                                    className="btn"
                                    onClick={addToFavourites}
                                >
                                    <ion-icon name="add-outline"></ion-icon> Add
                                    to Watchlist
                                </button>
                                <button
                                    className="btn mx-3"
                                    onClick={closeDialog}
                                >
                                    <ion-icon name="close-outline"></ion-icon>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
