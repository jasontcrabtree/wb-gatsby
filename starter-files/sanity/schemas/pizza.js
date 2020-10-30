import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  // computer name/label
  name: 'pizza',
  // visible human title
  title: 'Pizzas',
  //   schema type
  type: 'document',
  // icon (react component)
  icon,
  //   array of fields
  fields: [
    {
      // name of pizza
      name: 'name',
      //   human readable title
      title: 'Pizza Name',
      // input type
      type: 'string',
      //   input description
      description: 'Name of the pizza',
    },
    {
      // name of slug
      name: 'slug',
      //   slug title
      title: 'Slug',
      // slug type
      type: 'slug',
      // source and config of slug
      options: {
        source: 'name',
        maxLength: 50,
      },
    },
    {
      // image name
      name: 'image',
      //   image title
      title: 'Image',
      // image type
      type: 'image',
      // upload config
      options: {
        hotspot: true,
      },
    },
    {
      // price name
      name: 'price',
      //   price title
      title: 'Price',
      // price type
      type: 'number',
      // custom input component
      inputComponent: PriceInput,
      // price description
      description: 'Price of the pizza in cents',
      // validation on certain criteria (e.g. price)
      validation: (Rule) => Rule.min(1000).max(50000),
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      // 1. Filter undefined toppings out
      const tops = Object.values(toppings).filter(Boolean);
      // 2. return the preview object for the pizza
      return {
        title,
        media,
        subtitle: tops.join(', '),
      };
    },
  },
};
