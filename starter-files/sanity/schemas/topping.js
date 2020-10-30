import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  // computer name/label
  name: 'topping',
  // visible human title
  title: 'Toppings',
  //   schema type
  type: 'document',
  // icon (react component)
  icon,
  //   array of fields
  fields: [
    {
      // name of topping
      name: 'name',
      //   human readable title
      title: 'Topping Name',
      // input type
      type: 'string',
      //   input description
      description: 'What toppings do you want to include?',
    },
    {
      // name of topping
      name: 'vegetarian',
      //   human readable title
      title: 'Vegetarian',
      // input type
      type: 'boolean',
      //   input description
      description: 'Is the topping vegetarian?',
      // options for layout
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: ({ name, vegetarian }) => ({
      title: `${name} ${vegetarian ? '🥬' : ''}`,
    }),
  },
};
