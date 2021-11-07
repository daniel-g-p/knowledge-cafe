import Product from "../models/Product.js";

import { productSchema } from "../utilities/validation.js";

export default {
  async newProduct(req, res, next) {
    const { data, valid, message } = productSchema(req.body);
    if (!valid) {
      return res.status(400).json({ message });
    }
    const { name, tag, price, description, variations } = data;
    const product = new Product(name, tag, price, description, variations);
    const { insertedId } = await product.create();
    return res.status(200).json({ _id: insertedId.toString(), status: 200 });
  },
  async getProducts(req, res, next) {
    const products = await Product.getAll();
    return res.status(200).json({ products, status: 200 });
  },
  async editProduct(req, res, next) {
    const { productId } = req.params;
    const { data, valid, message } = productSchema(req.body);
    if (!valid) {
      return res.status(400).json({ message });
    }
    console.log(data);
    await Product.updateById(productId, data);
    return res.status(200).json({ status: 200 });
  },
  async deleteProduct(req, res, next) {
    const { productId } = req.params;
    await Product.deleteById(productId);
    return res.status(200).json({ status: 200 });
  },
};
