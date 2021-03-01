import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';

export const query = graphql`
  query pizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        name
        price
        id
        slug {
          current
        }
        toppings {
          id
          name
          vegetarian
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

const PizzasPage = ({ data, pageContext }) => {
  console.log(data);
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas With ${pageContext.topping}`
            : `All Pizzas`
        }
      />
      <h1>Pizza. Best served shared with company, with individual pizzas.</h1>
      {/* this passes in the ACTIVETOPPING via our gatsby node file — where we have passed the context to the component of the active component, then in the toppings filter component we pass the activeTopping prop in */}
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} id="flavours" />
    </>
  );
};
export default PizzasPage;
