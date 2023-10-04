"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import "./Styles/base/globals.css";
import "./Styles/components/main.css";
import "./Styles/components/utils.css";

export default function Home() {
    const [toggleConfirmation, setToggleConfirmation] = useState(false),
        [bannerMovieId, setBannerMovieId] = useState(0),
        [bannerMovie, setBannerMovie] = useState({}),
        [movies, setMovies] = useState([]),
        imgPath = "https://image.tmdb.org/t/p/original";

    const handleConfirmationActive = () => {
        setToggleConfirmation(true);

        setTimeout(() => {
            setToggleConfirmation(false);
        }, 2000);
    };

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch(
                    "https://api.themoviedb.org/3/movie/popular?api_key=bbe7a02e2ee350e3770f054fe907f423"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const responseData = await response.json();
                setMovies(responseData.results);
                console.log(responseData);
                setBannerMovieId(movies[1].id);
            } catch (error) {
                // Handle errors here
                console.error("Error fetching data:", error);
            }
        }
        async function fetchMoviebyId() {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${bannerMovieId}?api_key=bbe7a02e2ee350e3770f054fe907f423`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const responseData = await response.json();
                setBannerMovie(responseData);
                console.log(bannerMovie);
            } catch (error) {
                // Handle errors here
                console.error("Error fetching data:", error);
            }
        }

        fetchMovies();
        fetchMoviebyId();
    });

    const genres = bannerMovie.genres || [];
    const newGenres = genres.map((genre) => genre.name);

    return (
        <div>
            <div
                className={
                    toggleConfirmation ? "confirmation active" : "confirmation"
                }
            >
                <ion-icon name="checkmark-circle"></ion-icon>
                You have successfully added a movie to your watchlist
            </div>
            <div className="banner">
                <div
                    className={
                        Object.keys(bannerMovie).length === 0
                            ? "loader"
                            : "loader d-none"
                    }
                ></div>
                <div
                    className={
                        Object.keys(bannerMovie).length === 0
                            ? "wrapper d-none"
                            : "wrapper"
                    }
                >
                    <Image
                        className="img-fluid image"
                        src={imgPath + bannerMovie.backdrop_path}
                        alt={bannerMovie.title}
                        width={500}
                        height={500}
                        layout="responsive"
                        priority
                    />
                    <div
                        className="blur"
                        style={{
                            backgroundImage:
                                "url(" +
                                imgPath +
                                bannerMovie.backdrop_path +
                                ")",
                        }}
                    ></div>
                    <Image
                        className="img-fluid logo"
                        src={"/images/logo.png"}
                        alt="MoviPix"
                        width={150}
                        height={100}
                    />
                    <div className="text">
                        <div className="content">
                            <h1>{bannerMovie.title}</h1>
                            <p>{newGenres.join(" | ")}</p>
                            <p>{bannerMovie.overview}</p>
                            <p>
                                {bannerMovie.release_date} |{" "}
                                {bannerMovie.runtime} min
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="popular mt-5">
                <h2 className="fs-1">Popular Movies</h2>
                {movies.length === 0 ? (
                    <div className="loader-wrapper mt-5">
                        <div className="loader"></div>
                        <div className="loader"></div>
                        <div className="loader"></div>
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div className="movies mt-4">
                        {movies.map((movie) => (
                            <MovieCard
                                id={movie.id}
                                title={movie.title}
                                image={imgPath + movie.poster_path}
                                key={movie.id}
                                handleConfirmationActive={
                                    handleConfirmationActive
                                }
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
