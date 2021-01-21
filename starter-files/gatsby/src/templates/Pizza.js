import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

// We get the pizza data (from the dynamically created pages) from gatsby node into our template via a context object in our createPage actions

// This needs to be dynamic based on the slug passed in context via Gatsby to gatsby-node
// As seen by me trying to template data myself, it only renders once every few times (e.g. the name of the pizza persists)
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

function SinglePizzaPage({ data }) {
  const { toppings, image } = data.pizza;

  console.log(image);

  return (
    <PizzaGridStyles>
      <Img fluid={image.asset.fluid} alt={data.pizza.name} />
      <div>
        <h1 className="mark">{data.pizza.name}</h1>
        <ul>
          {toppings.map((topping, i) => (
            <li key={(topping._id, i)}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </PizzaGridStyles>
  );
}

export default SinglePizzaPage;
