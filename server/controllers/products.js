import Product from "../models/Product.js";

import { productSchema } from "../utilities/validation.js";

export default {
  async getProducts(req, res, next) {
    const products = await Product.getAll();
    return res.status(200).json({ products, status: 200 });
  },
  async editProduct(req, res, next) {
    const { productId } = req.params;
    const { data, valid, message } = productSchema(req.body);
    if (!valid) {
      return res.status(400).json({
        message: "Bitte überprüfe deine Angaben und versuche es erneut.",
      });
    }
    console.log(data);
    await Product.updateById(productId, data);
    return res.status(200).json({ status: 200 });
  },
};
