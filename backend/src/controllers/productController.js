import { sendResponse } from "../utils/features/customResponse.js";
import { Product } from "../models/Product.js";

/**
 * @purpose to create a new product with al required fields
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const createProduct = async (req, res, next) => {
  const { name, price, description, category } = req.body;

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

/**
 * @purpose to get details of all products
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const getAllProducts = async (req, res, next) => {
  const productsCount = await Product.countDocuments();
  // const products = await Product.find();
  const products = await Product.aggregate([
    { $sample: { size: productsCount } },
  ]);

  return sendResponse(res, true, 200, null, products);
};

/**
 * @purpose to get details of single product through id
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const getProductById = async (req, res, next) => {
  const { id } = req.params;

  if (id.length !== 24)
    return next(new ErrorHandler("Product is not available", 400));
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product is not available", 404));
  return sendResponse(res, true, 200, null, product);
};
