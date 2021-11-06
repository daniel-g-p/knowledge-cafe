import Product from "../models/Product.js";

export default {
  async getProducts(req, res, next) {
    const products = await Product.getAll();
    return res.status(200).json({ products, status: 200 });
  },
};
