// import { cartSchema } from './../../types/Cart';
import { groq } from 'next-sanity';

export const productQueries = {
  getAll: groq`*[_type == "product"] {
    _id,
    productId,
    name,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    "image": coalesce(image.asset->url, "https://via.placeholder.com/300"),
    colors,
    sizes,
    stock,
    category
  }`,

  getById: groq`*[_type == "product" && _id == $id][0] {
    _id,
    productId,
    name,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    "image": coalesce(image.asset->url, "https://via.placeholder.com/300"),
    colors,
    sizes,
    stock,
    category
  }`,

  // Get featured products with extended fields
  getFeatured: groq`*[_type == "product" && featured == true] {
    productId,
    name,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    "image": image.asset->url,
    colors,
    sizes,
    stock
  }`
};









export const featureQueries = {
  // Get all feature with extended fields
  getAll: groq`*[_type == "feature"] {
    featureId,
    name,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    "image": image.asset->url,
    colors,
    sizes,
    stock
  }`,

  // Get a feature by ID with extended fields
  getById: groq`*[_type == "feature" && _id == $id][0] {
    featureId,
    name,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    "image": image.asset->url,
    colors,
    sizes,
    stock
  }`,

  // Get featured feature with extended fields
  getFeatured: groq`*[_type == "feature" && featured == true] {
    featureId,
    name,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    "image": image.asset->url,
    colors,
    sizes,
    stock
  }`
};














export const sellingQueries = {
  // Get all selling with extended fields
  getAll: groq`*[_type == "selling"] {
    sellingId,
    name,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    "image": image.asset->url,
    colors,
    sizes,
    stock
  }`,

  // Get a selling by ID with extended fields
  getById: groq`*[_type == "selling" && _id == $id][0] {
    sellingId,
    name,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    "image": image.asset->url,
    colors,
    sizes,
    stock
  }`,

  // Get selling with extended fields
  getFeatured: groq`*[_type == "selling" && featured == true] {
    sellingId,
    name,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    "image": image.asset->url,
    colors,
    sizes,
    stock
  }`
};







export const cartSchemaqueries = {
  // Get all selling with extended fields
  getAll: groq`*[_type == "cartSchema"] {
    cartSchemaId,
    name,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    "image": image.asset->url,
    colors,
    sizes,
    stock
  }`,

  // Get a selling by ID with extended fields
  getById: groq`*[_type == "cartSchema" && _id == $id][0] {
    cartSchemaId,
    name,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    "image": image.asset->url,
    colors,
    sizes,
    stock
  }`,

  // Get selling with extended fields
  getFeatured: groq`*[_type == "cartSchema" && featured == true] {
    cartSchemaId,
    name,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    "image": image.asset->url,
    colors,
    sizes,
    stock
  }`
};
