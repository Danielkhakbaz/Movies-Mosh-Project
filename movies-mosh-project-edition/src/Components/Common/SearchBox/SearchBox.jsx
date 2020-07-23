import React from "react";
import PropTypes from "prop-types";

const SearchBox = ({ value, onChange }) => {
    return (
        <>
            <div className="form-group">
                <input
                    className="my-3 form-control"
                    name="query"
                    type="search"
                    placeholder="...Search"
                    value={value}
                    onChange={(e) => onChange(e.currentTarget.value)}
                />
            </div>
        </>
    );
};

SearchBox.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SearchBox;
