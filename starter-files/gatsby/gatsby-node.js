import path from 'path';

async function turnPizzaIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      //   what is the URL for the new page
      path: `pizza/${pizza.slug.current}`,
      // define template component for the new page
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically with gatsby node
  // 1. Pizzas
  await turnPizzaIntoPages(params);
  // 2. Toppings
  // 3. Slicemasters
  // Instead of making a massive function with all dynamic page generation, Wes likes to create a second function
}
