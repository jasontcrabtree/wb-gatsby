import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// TODO VIDEO PROGRESS 9:30M on video

export default {
  siteMetadata: {
    title: `Slick's Pizza`,
    siteUrl: 'https://gatsby.pizza',
    description: `Slick's slices rock. The best pizzastone parlour in Hamilton`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
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
