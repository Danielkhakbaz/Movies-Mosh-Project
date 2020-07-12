import React from "react";
import TableHeader from "../TableHeader/TableHeader";
import TableBody from "../TableBody/TableBody";
import PropTypes from "prop-types";

const Table = ({ movies, listed, columns, sortColumn, onSort }) => {
    if (movies.length === 0) {
        return (
            <p className="table__p--length">
                Showing No Movies from the Database.
            </p>
        );
    }

    return (
        <>
            <p className="table__p--length">
                Showing {movies.length} Movies from the Database.
            </p>
            <table className="table">
                <TableHeader
                    columns={columns}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />
                <TableBody movies={listed} columns={columns} />
            </table>
        </>
    );
};

Table.propTypes = {
    movies: PropTypes.array.isRequired,
    listed: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    sortColumn: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
};

export default Table;
