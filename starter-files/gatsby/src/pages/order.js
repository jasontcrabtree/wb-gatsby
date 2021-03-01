import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

/*
This page is an advanced contact form — not a dominoes pizza tracker or something on that level of being dynamic
*/

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        price
        image {
          asset {
            fluid(maxWidth: 100) {
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

export default function OrderPage({ data }) {
  // curly bracket not square bracket on our state instantiation because we're returning a state OBJECT, NOT an ARRAY
  /* we import our useForm custom hook, pass in an object and set the default values inside the object of name + email as a blank string */
  /* you have to explicitly set the default values of your inputs or react will error on new uncontrolled values */
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    // coupon: 'FREESHIPPING',
  });
  // debugging the updateValue not being a function
  // should be spelt with no s, as in updateValue
  // console.log(values, updateValue);

  // next is the menu input = we need to map over the entire menu to display as options. we're going to do this using a static query, bc there's no dynamic element to this bit
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <SEO title="Order a Pizza!" />
      <h1>Order a Pizza</h1>
      <form>
        <fieldset>
          <legend>Your info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              // value is set to our values.name object from useForm
              value={values.name}
              // onChange is set to updateValue stateSetter via useForm useState custom function
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
          {/* we can also use our useForm function to set deault values e.g. for a coupon */}
          {/*           <label htmlFor="coupon">
            <input
              type="text"
              name="coupon"
              value={values.coupon}
              onChange={updateValue}
            />
          </label> */}
        </fieldset>

        <fieldset>
          <legend>Menu</legend>
        </fieldset>

        <fieldset>
          <legend>Order</legend>
          {pizzas.map((pizza) => (
            <div key={pizza.id}>
              <Img
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
                width="50"
                height="50"
              />
              <h2>{pizza.name}</h2>
              <div>
                {['S', 'M', 'L'].map((size, i) => (
                  <button type="button" key={i}>
                    {/* the price templating is a bit complex — we use our formatMoney function to change how the money is presented. we use the calculatePizzaPrice to workout the price, which is a function of pizza.price MULTIPLIED by the size, a price modifier. js function goes outside in. we could simplify this but it needs to be inside the map still */}
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                    {/* video 35 = styling order form */}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </fieldset>
      </form>
    </>
  );
}
