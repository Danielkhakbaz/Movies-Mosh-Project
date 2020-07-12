import React from "react";
import Form from "../../Common/Form/Form";
import { getGenres } from "../../../Services/MoviesServices/fakeGenreService";
import { getMovie } from "../../../Services/MoviesServices/fakeMovieService";
import Joi from "joi-browser";

class MoviePage extends Form {
    state = {
        data: {
            title: "",
            genreId: "",
            dailyRentalRate: "",
            numberInStock: "",
        },
        errors: {},
        genres: [],
    };
    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        dailyRentalRate: Joi.number()
            .min(0)
            .max(10)
            .required()
            .label("Daily Rental Rate"),
        numberInStock: Joi.number()
            .min(0)
            .max(100)
            .integer()
            .required()
            .label("Number In Stock"),
    };
    componentDidMount() {
        const { match, history } = this.props;

        this.setState({ genres: getGenres() });

        const movieID = match.params.id;
        if (movieID === "New") {
            return;
        }

        const movie = getMovie(movieID);
        if (!movie) {
            return history.replace("/NotFound");
        }

        this.setState({ data: this.viewMovieModel(movie) });
    }
    render() {
        return (
            <>
                <h1>Movie Page</h1>
                <form>
                    {this.renderInputForm("title", "Title", "text")}
                    {this.renderOptionForm(
                        "genreId",
                        "Genre",
                        this.state.genres
                    )}
                    {this.renderInputForm(
                        "dailyRentalRate",
                        "Daily Rental Rate",
                        "text"
                    )}
                    {this.renderInputForm(
                        "numberInStock",
                        "Number In Stock",
                        "text"
                    )}
                    {this.renderSubmitButton("Save")}
                </form>
            </>
        );
    }
    viewMovieModel = (movie) => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            dailyRentalRate: movie.dailyRentalRate,
            numberInStock: movie.numberInStock,
        };
    };
}

export default MoviePage;
