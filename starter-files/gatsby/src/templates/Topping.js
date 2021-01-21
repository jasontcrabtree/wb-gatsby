/*

THIS WAS MY ATTEMPT AT BUILDING A PER TOPPING PAGE

WES USED A DIFFERENT APPROACH — RE USING THE PARENT PIZZAS PAGE, AND JUST FILTERING FOR THE RELEVANT TOPPINGS

SAVED THIS PAGE AS REFERENCE

17 DEC 2020

*/

import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

// We get the pizza data (from the dynamically created pages) from gatsby node into our template via a context object in our createPage actions

// This needs to be dynamic based on the slug passed in context via Gatsby to gatsby-node
// As seen by me trying to template data myself, it only renders once every few times (e.g. the name of the pizza persists)
// export const query = graphql`
/*   # setup our graphql to expect to take a TYPED argument (of the slug)
  # query($slug: String!) {
  #   pizza: sanityPizza(slug: { current: { eq: $slug } }) {
  #     name
  #     id
  #     toppings {
  #       name
  #       _id
  #       vegetarian
  #     }
  #     image {
  #       asset {
  #         fluid(maxWidth: 800) {
  #           ...GatsbySanityImageFluid
  #         }
  #       }
  #     }
  #   }
  # }
  # query($name: String!) {
  #   toppings: sanityTopping(name: {{ eq: $name }}) {
  #     name
  #     vegetarian
  #   }
  # } */
// `;

const PizzaGridStyles = styled.main``;

function SingleToppingPizza(props) {
  console.log(props);

  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

export default SingleToppingPizza;
