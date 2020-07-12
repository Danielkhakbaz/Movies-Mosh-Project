import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ totalMovies, currentPage, pageItems, onPaginate }) => {
    const pageCounts = Math.ceil(totalMovies / pageItems);
    const pages = _.range(1, pageCounts + 1);
    if (pageCounts === 1) {
        return null;
    }

    return (
        <>
            <nav>
                <ul className="pagination">
                    {pages.map((page) => (
                        <li
                            className={
                                currentPage === page
                                    ? "page-item active"
                                    : "page-item"
                            }
                            key={page}
                        >
                            <button
                                className="page-link"
                                onClick={() => onPaginate(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

Pagination.propTypes = {
    totalMovies: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageItems: PropTypes.number.isRequired,
    onPaginate: PropTypes.func.isRequired,
};

export default Pagination;
