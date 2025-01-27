import { defineType } from "sanity";

export const cartSchema = defineType({
  name: "cart",
  title: "Cart",
  type: "document",
  fields: [
    {
      name: "items",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "quantity", type: "number", title: "Quantity" },
            {
              name: "product",
              type: "reference",
              to: [{ type: "product" }],
              title: "Product",
            },
          ],
        },
      ],
    },
  ],
});
