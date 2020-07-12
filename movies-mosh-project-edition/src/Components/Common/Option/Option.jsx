import React from "react";
import PropTypes from "prop-types";

const Option = ({ name, label, genres, errors, ...rest }) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <select
                    id={name}
                    className="form-control"
                    name={name}
                    {...rest}
                >
                    <option value="" />
                    {genres.map((genre) => (
                        <option value={genre._id} key={genre._id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            {errors && <div className="alert alert-danger">{errors}</div>}
        </>
    );
};

Option.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    errors: PropTypes.string,
};

export default Option;
