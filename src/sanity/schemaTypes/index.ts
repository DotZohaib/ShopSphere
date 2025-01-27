
import { type SchemaTypeDefinition } from 'sanity';
import feature from '../../types/feature';
import product from '../../types/product';
import selling from "../../types/selling";
import { cartSchema } from '@/types/cart';

// Define your schema here, using the previously defined types.

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, feature, selling, cartSchema],
};
