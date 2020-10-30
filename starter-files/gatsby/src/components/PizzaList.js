import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const StyledPizzaList = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;

  li {
    margin-top: 2rem;
  }
`;

function SinglePizza({ pizza }) {
  return (
    <li>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
      </Link>
    </li>
  );
}

export default function PizzaList({ pizzas }) {
  console.log(pizzas);
  return (
    <StyledPizzaList>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </StyledPizzaList>
  );
}
