import { MdPerson as icon } from 'react-icons/md';

export default {
  // computer name/label
  name: 'person',
  // visible human title
  title: 'Slicemasters',
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
      title: 'Name',
      // input type
      type: 'string',
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
        maxLength: 100,
      },
    },
    {
      // person description
      name: 'description',
      //   description title
      title: 'Description',
      // input type
      type: 'text',
      // description input
      description: 'Tell us about the slicemasters',
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
  ],
};
