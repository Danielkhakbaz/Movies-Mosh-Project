import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ columns, sortColumn, onSort }) => {
    const handleSorting = (column) => {
        if (!column.key) {
            const allSortColumn = { ...sortColumn };
            if (sortColumn.path === column.path) {
                allSortColumn.order =
                    allSortColumn.order === "asc" ? "desc" : "asc";
            } else {
                allSortColumn.path = column.path;
                allSortColumn.order = "asc";
            }
            onSort(allSortColumn);
        }
    };
    const handleSortingIcons = (column) => {
        if (sortColumn.path === column.path) {
            if (sortColumn.order === "asc") {
                return <i className="table__thead--icon fa fa-sort-asc" />;
            } else {
                return <i className="table__thead--icon fa fa-sort-desc" />;
            }
        }
    };

    return (
        <>
            <thead className="table__thead">
                <tr>
                    {columns.map((column) => (
                        <th
                            className="table__thead--heading"
                            key={column.path || column.key}
                            onClick={() => handleSorting(column)}
                        >
                            {column.label}
                            {handleSortingIcons(column)}
                        </th>
                    ))}
                </tr>
            </thead>
        </>
    );
};

TableHeader.propTypes = {
    columns: PropTypes.array.isRequired,
    sortColumn: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
};

export default TableHeader;
