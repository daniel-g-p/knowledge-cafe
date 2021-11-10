import database from "../database/access.js";
import newProduct from "../models2/product.js";

export default {
  async getAllProducts() {
    const fields = ["name", "price", "variations"];
    const sort = { name: 1 };
    return database.find("products", {}, fields, sort);
  },
  async updateProductStats(orders) {
    const products = [];
    for (let order of orders) {
      for (let item of order.items) {
        const itemId = item.id.toString();
        const index = products.findIndex((p) => p.id === itemId);
        if (index !== -1) {
          products[index].revenue =
            products[index].revenue + item.quantity * products[index].price;
          products[index].unitsSold += item.quantity;
          if (item.variation) {
            products[index].variations[item.variation]++;
          }
        } else {
          const fields = ["price", "stats"];
          const data = await database.findById("products", itemId, fields);
          const { price, stats } = data;
          const { revenue, unitsSold, variations } = stats;
          const newProduct = {
            id: itemId,
            price,
            revenue: revenue + item.quantity * price,
            unitsSold: unitsSold + item.quantity,
            variations,
          };
          if (item.variation) {
            newProduct.variations[item.variation] += item.quantity;
          }
          products.push(newProduct);
        }
      }
    }
    for (let product of products) {
      const { revenue, unitsSold, variations } = product;
      const stats = { revenue, unitsSold, variations };
      await database.updateById("products", product.id, { stats });
    }
  },
};
