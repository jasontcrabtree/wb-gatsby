/*
This is a reusable pagination component that can be used in many different places with different data
*/

import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  gap: 24px;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 4px;
  text-align: center;

  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);

    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: slategray;
    }
  }
`;

function Pagination(props) {
  const { pageSize, totalCount, currentPage, skip, base } = props;

  // make some more variables
  const totalPages = Math.ceil(totalCount / pageSize);
  // check if page has a next or previous page to create a link to that page
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;

  return (
    <PaginationStyles>
      {/* we use base in the nested URL structure to increase reusability of the component */}
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        Prev
      </Link>
      {/* Create an automatic array using the context passed in via gatsby node page creation. This lets use automatically create a numbered list of the correct pages */}

      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          to={`${base}/${i > 0 ? i + 1 : ''}`}
          key={i}
        >
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next
      </Link>
    </PaginationStyles>
  );
}

export default Pagination;
