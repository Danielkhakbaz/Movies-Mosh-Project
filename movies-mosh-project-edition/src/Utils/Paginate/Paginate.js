import _ from "lodash";

export function Paginate(totalMovies, currentPage, pageItems) {
    const startIndex = (currentPage - 1) * pageItems;
    return _(totalMovies).slice(startIndex).take(pageItems).value();
}
