import Product from "../models/Product.js";

export default {
  async getShopItems(req, res, next) {
    const keys = ["name", "price", "variations"];
    const products = await Product.getAll(keys);
    return res.json({ products });
  },
};
