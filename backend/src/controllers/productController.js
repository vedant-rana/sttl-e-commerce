import { sendResponse } from "../utils/features/customResponse.js";
import { Product } from "../models/Product.js";

export const createProduct = async (req, res, next) => {
  const { name, price, description, category } = req.body;
  console.log(name, price, description, category);

  if (!name || !category || !description || !price) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const productImage = req.file;
  console.log(productImage);
  if (!productImage)
    return next(new ErrorHandler("Product image is required", 400));

  const newProduct = await Product.create({
    name,
    price,
    description,
    category: category.toLowerCase(),
    image: productImage?.path,
  });

  if (!newProduct)
    return next(new ErrorHandler("Product creation failed, try again", 500));

  return sendResponse(res, true, 201, "Product created successfully");
};

export const getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  return sendResponse(res, true, 200, null, products);
};

export const getProductById = async (req, res, next) => {
  const { id } = req.params;

  if (id.length !== 24)
    return next(new ErrorHandler("Product is not available", 400));
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product is not available", 404));
  return sendResponse(res, true, 200, null, product);
};
