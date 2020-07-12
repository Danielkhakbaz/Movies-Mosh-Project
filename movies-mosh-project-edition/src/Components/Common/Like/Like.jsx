import React from "react";
import PropTypes from "prop-types";

const Like = ({ liked, onLike }) => {
    let classes = "table__button--like fa fa-heart";
    if (!liked) {
        classes += "-o";
    }
    return (
        <>
            <i className={classes} onClick={onLike} />
        </>
    );
};

Like.propTypes = {
    liked: PropTypes.bool,
    onLike: PropTypes.func.isRequired,
};

export default Like;
