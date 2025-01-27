// src/sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity';
import productSchema from './product';
import featureSchema from './feature';
import sellingSchema from './selling';
import  {cartSchema}  from './cart';

export const schemaTypes: SchemaTypeDefinition[] = [
    productSchema,
    featureSchema,
    sellingSchema,
    cartSchema,
];
