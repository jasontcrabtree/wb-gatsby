import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

export const query = graphql`
  # setup our graphql to expect to take a TYPED argument (of the slug)
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      toppings {
        name
        _id
        vegetarian
      }
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

const PizzaGridStyles = styled.main`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

function SinglePizzaPage({ data: { pizza } }) {
  const { toppings, image } = pizza;

  // console.log(image);

  return (
    <>
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
      <PizzaGridStyles>
        <Img fluid={image.asset.fluid} alt={pizza.name} />
        <div>
          <h1 className="mark">{pizza.name}</h1>
          <ul>
            {toppings.map((topping, i) => (
              <li key={(topping._id, i)}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </PizzaGridStyles>
    </>
  );
}

export default SinglePizzaPage;
