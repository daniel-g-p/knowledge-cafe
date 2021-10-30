import ShopPage from "../pages/ShopPage.vue";
import ShopCheckout from "../components/ShopCheckout.vue";
import ShopConfirmation from "../components/ShopConfirmation.vue";

export default {
  name: "shop",
  path: "/karte",
  component: ShopPage,
  children: [
    {
      name: "checkout",
      path: "bestellen",
      component: ShopCheckout,
    },
    {
      name: "order-confirmation",
      path: "danke",
      component: ShopConfirmation,
    },
  ],
};
