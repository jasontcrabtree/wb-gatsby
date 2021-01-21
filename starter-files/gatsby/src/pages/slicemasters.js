import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

export const query = graphql`
  query {
    slicemasters: allSanityPerson {
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
`;

function SlicemastersPage({ data }) {
  const sliceMasters = data.slicemasters.nodes;
  console.log(sliceMasters);
  return (
    <>
      <h1>Slice selection extravaganza.</h1>
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
