import React, { useState } from "react";
import { Link } from "react-router-dom";
import Like from "../../Common/Like/Like";
import ListGroup from "../../Common/ListGroup/ListGroup";
import SearchBox from "../../Common/SearchBox/SearchBox";
import Table from "../../Common/Table/Table";
import Pagination from "../../Common/Pagination/Pagination";
import { Paginate } from "../../../Utils/Paginate/Paginate";
import { getMovies } from "../../../Services/MoviesServices/fakeMovieService";
import { getGenres } from "../../../Services/MoviesServices/fakeGenreService";
import "../../../Styles/css/Main.css";
import _ from "lodash";

const Movies = () => {
    const columns = [
        {
            path: "title",
            label: "Title",
            content: (movie) => (
                <Link to={`/Movies/${movie._id}`}>{movie.title}</Link>
            ),
        },
        { path: "genre.name", label: "Genre" },
        { path: "dailyRentalRate", label: "Rate" },
        { path: "numberInStock", label: "Stock" },
        {
            key: "onLike",
            content: (movie) => (
                <Like
                    liked={movie.liked}
                    onLike={() => handleLikeButton(movie)}
                />
            ),
        },
        {
            key: "onDelete",
            content: (movie) => (
                <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteButton(movie._id)}
                >
                    Delete
                </button>
            ),
        },
    ];

    const [movies, setMovies] = useState(getMovies());
    const [genres] = useState([
        { _id: "", name: "All Movies " },
        ...getGenres(),
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageItems = 4;
    const [selectedGenre, setSelectedGenre] = useState("");
    const [sortColumn, setSortColumn] = useState({
        path: "title",
        order: "asc",
    });
    const [searchQuery, setSearchQuery] = useState("");

    const handleLikeButton = (movie) => {
        const allMovies = [...movies];
        const index = allMovies.indexOf(movie);
        allMovies[index] = { ...movie };
        allMovies[index].liked = !allMovies[index].liked;
        setMovies(allMovies);
    };
    const handleDeleteButton = (movieID) => {
        const allMovies = movies.filter((movie) => movie._id !== movieID);
        setMovies(allMovies);
    };
    const handlePaginateButton = (page) => {
        setCurrentPage(page);
    };
    const handleGenreSelect = (genre) => {
        setCurrentPage(1);
        setSelectedGenre(genre);
        setSearchQuery("");
    };
    const handleSorting = (sortColumn) => {
        setSortColumn(sortColumn);
    };
    const handleSearching = (query) => {
        setCurrentPage(1);
        setSelectedGenre(null);
        setSearchQuery(query);
    };
    const getAllData = () => {
        let filtered = movies;
        if (searchQuery) {
            filtered = movies.filter((movie) =>
                movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        } else if (selectedGenre && selectedGenre._id) {
            filtered = movies.filter(
                (movie) => movie.genre._id === selectedGenre._id
            );
        }
        const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
        const listed = Paginate(sorted, currentPage, pageItems);
        return { filtered, sorted, listed };
    };

    const { filtered, listed } = getAllData();
    return (
        <>
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        genres={genres}
                        selectedGenre={selectedGenre}
                        onGenreSelect={handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <Link className="m-2 btn btn-primary" to="/Movies/New">
                        New Movie
                    </Link>
                    <SearchBox value={searchQuery} onChange={handleSearching} />
                    <Table
                        movies={filtered}
                        listed={listed}
                        columns={columns}
                        sortColumn={sortColumn}
                        onSort={handleSorting}
                    />
                    <Pagination
                        totalMovies={filtered.length}
                        currentPage={currentPage}
                        pageItems={pageItems}
                        onPaginate={handlePaginateButton}
                    />
                </div>
            </div>
        </>
    );
};

export default Movies;
