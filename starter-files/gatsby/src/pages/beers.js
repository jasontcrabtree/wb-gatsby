import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

export const query = graphql`
  query allBeer {
    allBeer {
      nodes {
        name
        price
        rating {
          average
          reviews
        }
        image
      }
    }
  }
`;

const BeersList = styled.ul`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  list-style-type: none;
  padding-inline-start: 0px;

  li {
    border: 1px solid var(--grey);
    padding: 2rem;
    text-align: center;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: block;
    display: grid;
    align-items: center;
    font-size: 14px;
    background: var(--grey);
    color: black;
  }

  .inactiveStars {
    filter: grayscale(100%);
    /* grayscale the stars that AREN'T active ie. the reduced scores */
  }
`;

const BeersPage = ({ data }) => {
  const beersListData = data.allBeer.nodes;

  console.log(beersListData);

  return (
    <>
      <SEO title={`Beers! We have ${data.beers.nodes.length} in stock`} />
      <h2 className="center">
        We have {beersListData?.length} beers available! Dine in only!
      </h2>
      <BeersList>
        {beersListData.map((beer, i) => {
          const rating = Math.round(beer.rating.average);
          return (
            <li key={i}>
              {/* doesn't use gatsby image because the images are hosted externally */}
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              {/* <p>{beer.rating.average}</p> */}

              {/* we add a title to the p element to add usability for screen reader users or hovering over the emoji span with your mouse, referenceing the rating variable declared above to round */}
              <p title={`${rating} out of 5 stars`}>
                {/* MVP repeat JS method = repeats the star emoji based on the number of the beer rating average (rounded up with the Math.round method) */}
                {`⭐️`.repeat(Math.round(beer.rating.average))}
                {/* following span shows 5 - the rating, to show the max number of stars, styled differently */}
                <span className="inactiveStars">
                  {`⭐️`.repeat(5 - Math.round(beer.rating.average))}
                </span>
                <span> ({beer.rating.reviews})</span>
              </p>
            </li>
          );
        })}
      </BeersList>
    </>
  );
};

export default BeersPage;
