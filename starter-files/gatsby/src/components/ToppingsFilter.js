import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 0.75rem;
    align-items: center;
    border-radius: 4px;
    padding: 4px;
    background: var(--grey);
    .count {
      background: white;
      padding: 2px 5px;
      border-radius: 2px;
    }
    &.active,
    &[aria-current='page']
    /* aria-current=Page works to find the active filter component using gatsby current page api, but DOESN'T work with the link to anchor tag ON THE FILTERED LINKS to skip filters, meaning each page navigation jumps around */
    /* &[aria-current='page'] */ {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // return the pizzas with counts
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((accumulator, topping) => {
      // check if this is an existing topping
      const existingTopping = accumulator[topping.id];
      if (existingTopping) {
        // console.log('Existing Topping', existingTopping.name);
        // if the topping exists increment the accumulator count of that particular topping by 1
        existingTopping.count += 1;
      } else {
        // console.log('New Topping', topping.name);

        // otherwise if the topping doesnt exist create a new entry in our accumulator and set the value to 1
        accumulator[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }

      // at the end of the reduce function return the accumulator
      return accumulator;
    }, {});
  // start the reduce with an empty object (second input of curly brackets)
  // finally, sort the toppings based on their count (number of toppings)
  const sortedToppings = Object.values(counts).sort(
    (higher, lower) => lower.count - higher.count
  );
  return sortedToppings;
}

function ToppingsFilter({ activeTopping }) {
  // Get a list of all the toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          name
          id
          toppings {
            name
            id
            vegetarian
          }
        }
      }
    }
  `);
  console.clear();

  // Get a list of all the Pizzas with their toppings

  // Count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  // console.log(toppingsWithCounts);

  return (
    <>
      <p>
        There are {pizzas.nodes.length} flavors of Pizza with{' '}
        {toppings.nodes.length} different Toppings!
      </p>
      <ToppingsStyles>
        <Link to="/pizzas">
          {console.log(activeTopping)}
          {console.log(toppings)}
          <span className="name">All Flavours {toppings.nodes.length}</span>
        </Link>
        {/* // Loop over the list of toppings and display
        the topping (category) and the count of  pizzas in
        that topping (category) */}
        {toppingsWithCounts.map((topping) => (
          // Link to each topping
          <Link
            to={`/topping/${topping.name}/#flavours`}
            key={topping.id}
            className={topping.name === activeTopping ? 'active' : ''}
          >
            <span>{topping.name}</span>
            <span className="count">{topping.count}</span>
          </Link>
        ))}
      </ToppingsStyles>
    </>
  );
}

export default ToppingsFilter;
