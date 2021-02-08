/*
This is a reusable pagination component that can be used in many different places with different data
*/

import { Link } from 'gatsby';
import React from 'react';

function Pagination(props) {
  const { pageSize, totalCount, currentPage, skip, base } = props;

  // make some more variables
  const totalPages = Math.ceil(totalCount / pageSize);
  // check if page has a next or previous page to create a link to that page
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const hasPrevPage = prevPage >= 1;
  const hasNextPage = nextPage <= totalPages;

  return (
    <div>
      {/* we use base in the nested URL structure to increase reusability of the component */}
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        Prev
      </Link>
      {/* Create an automatic array using the context passed in via gatsby node page creation. This lets use automatically create a numbered list of the correct pages */}

      {/* UP TO VIDEO 31 MINUTE 13:02 */}
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link>{i + 1}</Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next
      </Link>
    </div>
  );
}

export default Pagination;
