import { defineType } from 'sanity';

const productSchema = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'productId',
      title: 'Product ID',
      type: 'number',
      validation: (Rule) => Rule.required().positive().integer(),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    },
    {
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    },
    {
      name: 'discount',
      title: 'Discount Percentage',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
    },
    {
      name: 'reviews',
      title: 'Number of Reviews',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Jackets', value: 'jackets' },
          { title: 'Shirts', value: 'shirts' },
          { title: 'Pants', value: 'pants' },
          { title: 'Flash Sales', value: 'flash-sales' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colors',
      title: 'Available Colors',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.unique(),
    },
    {
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.unique(),
    },
    {
      name: 'stock',
      title: 'Stock',
      type: 'number',
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .integer()
          .error('Stock must be a positive integer or zero'),
    },
  ],
});

export default productSchema;
