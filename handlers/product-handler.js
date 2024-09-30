
const { productModel, categoryModel, supplierModel } = require('../models/models');
const connectDB = require('../models/connect');

const { getProductByIdSchema, postProductSchema, putProductSchema, deleteProductSchema } = require('../schemas/product/product-schema');

let DB_CONNECTION;

const postProduct = async (event) => {
  const body = JSON.parse(event.body);

  const { error, value } = postProductSchema.validate(body, { abortEarly: false, allowUnknown: true });
  if (error) {
    return {
        statusCode: 400,
        body: JSON.stringify(
          {
            error: true,
            message: error.details.map((e) => e.message)
          }
        ),
    };
  }

  if(!DB_CONNECTION) DB_CONNECTION = await connectDB();
  const product = new productModel({ ...value });
  const response = await product.save();
  
  return {
    statusCode: 200,
    body: JSON.stringify({ id: response.id, ...value }),
  };
};

const getAllProduct = async (_event) => {
  if(!DB_CONNECTION) DB_CONNECTION = await connectDB();
  const products = await productModel.find();
  
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};

const getProductById = async (event) => {
  const parameters = event.pathParameters;

  const { error, value } = getProductByIdSchema.validate(parameters, { abortEarly: false, allowUnknown: true });
  if (error) {
      return {
          statusCode: 400,
          body: JSON.stringify(
            {
              error: true,
              message: error.details.map((e) => e.message)
            }
          ),
      };
  }

  const { productId } = value; 

  if(!DB_CONNECTION) DB_CONNECTION = await connectDB();
  const product = await productModel.findById(productId);
  const suppliers = await supplierModel.find();
  const categories = await categoryModel.find();
  
  return {
    statusCode: 200,
    body: JSON.stringify({ product, suppliers, categories }),
  };
};

const putProduct = async (event) => {
  const body = JSON.parse(event.body);
  const parameters = event.pathParameters;

  const { error, value } = putProductSchema.validate({...parameters, ...body}, { abortEarly: false, allowUnknown: true });
  if (error) {
      return {
          statusCode: 400,
          body: JSON.stringify(
            {
              error: true,
              message: error.details.map((e) => e.message)
            }
          ),
      };
  }

  const { productId } = value; 

  if(!DB_CONNECTION) DB_CONNECTION = await connectDB();
  const product = await productModel.findByIdAndUpdate(productId, body, { new: true,  runValidators: true });
  
  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};

const deleteProduct = async (event) => {
  const parameters = event.pathParameters;

  const { error, value } = deleteProductSchema.validate(parameters, { abortEarly: false, allowUnknown: true });
  if (error) {
      return {
          statusCode: 400,
          body: JSON.stringify(
            {
              error: true,
              message: error.details.map((e) => e.message)
            }
          ),
      };
  }

  const { productId } = value; 

  if(!DB_CONNECTION) DB_CONNECTION = await connectDB();
  const product = await productModel.findByIdAndDelete(productId);
  
  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};

module.exports = {
  getAllProduct,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};
