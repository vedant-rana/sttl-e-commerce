import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        name: {
          type: String,
          require: true,
        },
        price: {
          type: Number,
          require: true,
        },
        image: {
          type: String,
          require: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = model("Cart", cartSchema);
