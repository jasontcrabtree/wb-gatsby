import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const PizzaGridStyles = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  display: grid;
  gap: 4rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  grid-auto-rows: auto auto 240px;
`;

const PizzaStyles = styled.li`
  list-style-type: none;
  margin: 0px;
  padding: 0px;

  display: grid;

  /* Polyfill */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 280px;
  }
  /* Subgrid instructs browswer to take the row sizing from the parent PizzaGridStyles sizing */
  /* Subgrid Not supported in chrome 13 Nov 2020 */
  grid-template-rows: var(--rows, subgrid);

  grid-row: span 3;
  grid-gap: 1rem;

  h2,
  p {
    margin: 0px;
  }
`;

function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzaStyles>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  );
}
