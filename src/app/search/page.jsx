"use client";

import { useState, useEffect } from "react";
import "../Styles/base/globals.css";
import "../Styles/components/main.css";
import "../Styles/components/utils.css";
import MovieCard from "../components/MovieCard";
import { useSelector } from "react-redux";
import Confirmation from "../components/Confirmation";

function Search() {
    const [query, setQuery] = useState("");
    const [popularMovies, setPopularMovies] = useState([]);
    const [moviesByQuery, setMoviesByQuery] = useState([]);
    const imgPath = "https://image.tmdb.org/t/p/original",
        confirmation = useSelector((state) => state.confirmation.value);

    useEffect(() => {
        async function fetchPopularMovies() {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=bbe7a02e2ee350e3770f054fe907f423`
                );
                const data = await response.json();
                setPopularMovies(data.results);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
            }
        }

        if (query) {
            async function fetchMoviesByQuery() {
                try {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=bbe7a02e2ee350e3770f054fe907f423`
                    );
                    const data = await response.json();
                    setMoviesByQuery(data.results);
                } catch (error) {
                    console.error("Error fetching movies by query:", error);
                }
            }

            fetchMoviesByQuery();
        }

        fetchPopularMovies();
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Confirmation confirmation={confirmation} />
            <div className="search">
                <h1 className="mx-2">Search</h1>
                <form
                    className="searchBar"
                    action="#"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="search-icon icon">
                        <ion-icon name="search"></ion-icon>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for a movie..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div
                        className="delete-icon icon"
                        onClick={() => setQuery("")}
                    >
                        <ion-icon name="close"></ion-icon>
                    </div>
                </form>
                {query && moviesByQuery.length === 0 ? (
                    <div className="loader-wrapper mt-5">
                        <div className="loader"></div>
                        <div className="loader"></div>
                        <div className="loader"></div>
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div className="movies mt-4">
                        {moviesByQuery.map((movie) => (
                            <MovieCard
                                id={movie.id}
                                title={movie.title}
                                image={imgPath + movie.poster_path}
                                key={movie.id}
                            />
                        ))}
                    </div>
                )}
                {!query && popularMovies.length === 0 ? (
                    <div className="loader-wrapper mt-4">
                        <div className="loader"></div>
                        <div className="loader"></div>
                        <div className="loader"></div>
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div className="movies mt-4">
                        {popularMovies.map((movie) => (
                            <MovieCard
                                id={movie.id}
                                title={movie.title}
                                image={imgPath + movie.poster_path}
                                key={movie.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Search;
