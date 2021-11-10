import database from "../database/access.js";
import newProduct from "../models2/product.js";

export default {
  async getAllProducts() {
    const fields = ["name", "price", "variations"];
    const sort = { name: 1 };
    return database.find("products", {}, fields, sort);
  },
};
