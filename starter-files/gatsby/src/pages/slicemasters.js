import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
        slug {
          current
        }
      }
    }
  }
`;

const SlicemasterGrid = styled.ul`
  padding: 0px;
  margin: 0px;
  padding-inline-start: 0px;

  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  li {
    list-style-type: none;
    padding: 0px;
  }
`;

const Slicemaster = styled.li`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    font-size: 4rem;
    margin-bottom: -2rem;
    text-align: center;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
  }
`;

function SlicemastersPage({ data, pageContext }) {
  const sliceMasters = data.slicemasters.nodes;
  // console.log(sliceMasters);
  return (
    <>
      <SEO title={`Slicemasters - Page ${pageContext.currentPage || 1}`} />
      <h1>Slice selection extravaganza.</h1>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SlicemasterGrid>
        {sliceMasters.map((person, i) => (
          <Slicemaster key={i}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </Slicemaster>
        ))}
      </SlicemasterGrid>
    </>
  );
}

export default SlicemastersPage;
