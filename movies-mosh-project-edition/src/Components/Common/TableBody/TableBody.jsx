import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ movies, columns }) => {
    const handleTableBodyContent = (movie, column) => {
        if (column.content) {
            return column.content(movie);
        }
        return _.get(movie, column.path);
    };

    return (
        <>
            <tbody className="table__tbody">
                {movies.map((movie) => (
                    <tr key={movie._id}>
                        {columns.map((column) => (
                            <td key={movie._id + (column.path || column.key)}>
                                {handleTableBodyContent(movie, column)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </>
    );
};

TableBody.propTypes = {
    movies: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

export default TableBody;
