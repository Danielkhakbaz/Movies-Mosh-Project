import React from "react";
import PropTypes from "prop-types";

const Input = ({ name, label, errors, ...rest }) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input
                    id={name}
                    className="form-control"
                    name={name}
                    autoComplete="false"
                    {...rest}
                />
            </div>
            {errors && <div className="alert alert-danger">{errors}</div>}
        </>
    );
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    errors: PropTypes.string,
};

export default Input;
