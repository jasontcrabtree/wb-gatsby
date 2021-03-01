import path from 'path';
import fetch from 'isomorphic-fetch';

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

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          vegetarian
        }
      }
    }
  `);
  // 3. Create page for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      //   what is the URL for the new page
      path: `topping/${topping.name}`,
      // define template component for the new page
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO: Regex for Topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Pass topping data to pizza.js
}

// Sourcing (source === putting data into gatsby api) Nodes (nodes === piece of data) Nodes in Gatsby — we want to put pieces of data in the gatsby api, e.g. external data sources, so we can access them to make pages

// technical detail — we are going to use XYZ. fetch is a browser API, not a node API (right now). In a Node file we have to use something called isomorphic-fetch

// async function to fetch beers
async function fetchBeersandTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. Fetch a list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  // 2. Loop over each beer
  // alternative way to loop over tiems (instead of a forOf loop)
  for (const beer of beers) {
    // create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer', // IMPORTANT = this bit is how gatsby adds the data to the schema of the graphql api, so you can query allBeer. quality stuff
        mediaType: 'application/json', // this specifies the type of data for other plugins that may need that information to parse the data
        contentDigest: createContentDigest(beer), // internal Gatsby API to watch if data has changed
      },
    };
    // 3. Create a node (data source) for that beer
    // ---
    // take our actions and run the createNode method to create an object of our data
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. Query all slicemasters  const { data } = await graphql(`
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  // TODO: 2. Turn each slicemaster into their own page
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });

  // 3. Figure out how many pages their are based on how many slicemasters there are, and how many per page!
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  /*   console.log(
    `There are ${data.slicemasters.totalCount} total people. That means we have ${pageCount} with ${pageSize} per page`
  ); */

  // 4. Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    // console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // this data is passed to the template when we create it
      context: {
        // how many to skip with the pagination
        // index * pageSize, so it incrementally increases
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby API
  // call the above fetchBeer function using a promise (incase multiple similar async data fetching functions)
  await Promise.all([fetchBeersandTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create pages dynamically with gatsby node
  // 1. and 2. are both promise based functions to create pages, and they SHOULD be run concurrently — they don't need to wait for each other

  // run both page create functions at the same time using an ARRAY of promises
  // wait for all promises to be resolved before finishing the function (for better build time performance)
  await Promise.all([
    turnPizzaIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);

  // 1. Pizzas
  /* await turnPizzaIntoPages(params); */

  // 2. Toppings
  /* await turnToppingsIntoPages(params); */

  // 3. Slicemasters
  // Instead of making a massive function with all dynamic page generation, Wes likes to create a second function
}
