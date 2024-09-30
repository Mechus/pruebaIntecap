const mongoose = require('mongoose');
const { productSchema, categorySchema, supplierSchema } = require('./schemas');

const productModel = mongoose.model('Product', productSchema);
const categoryModel = mongoose.model('Category', categorySchema);
const supplierModel = mongoose.model('Supplier', supplierSchema);

module.exports = {
  productModel, categoryModel, supplierModel
};
