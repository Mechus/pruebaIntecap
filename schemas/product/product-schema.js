const joi = require("joi");

const getProductByIdSchema = joi.object().keys({
  productId: joi.string().required(),
}); 

const postProductSchema = joi.object().keys({
  name: joi.string().required(),
  price: joi.number().required(),
  quantity: joi.number().integer().optional(),
  categoryId: joi.string().required(),
  supplierId: joi.string().required(),
}); 

const putProductSchema = joi.object().keys({
  productId: joi.string().required(),
  name: joi.string().required(),
  price: joi.number().required(),
  quantity: joi.number().integer().optional(),
  categoryId: joi.string().required(),
  supplierId: joi.string().required(),
}); 

const deleteProductSchema = joi.object().keys({
  productId: joi.string().required(),
}); 

module.exports = {
  getProductByIdSchema,
  postProductSchema,
  putProductSchema,
  deleteProductSchema,
};
