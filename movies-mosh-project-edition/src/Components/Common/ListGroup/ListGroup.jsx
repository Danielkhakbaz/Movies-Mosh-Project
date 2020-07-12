import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({ genres, selectedGenre, onGenreSelect }) => {
    return (
        <>
            <ul className="m-2 list-group">
                {genres.map((genre) => (
                    <li
                        className={
                            selectedGenre === genre
                                ? "list-group-item active"
                                : "list-group-item"
                        }
                        key={genre._id}
                        onClick={() => onGenreSelect(genre)}
                    >
                        {genre.name}
                    </li>
                ))}
            </ul>
        </>
    );
};

ListGroup.propTypes = {
    genres: PropTypes.array.isRequired,
    selectedGenre: PropTypes.any,
    onGenreSelect: PropTypes.func.isRequired,
};

export default ListGroup;
