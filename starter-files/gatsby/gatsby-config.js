import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slick's Slices`,
    siteUrl: 'https://gatsby.pizza',
    twitter: '@SlicksSlices',
    description: `Slick's slices rock. The best pizzastone parlour in Hamilton`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '8vqlnhcw',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
