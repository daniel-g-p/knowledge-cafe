import AdminPage from "../pages/AdminPage.vue";
import OrdersPage from "../pages/OrdersPage.vue";
import EventsPage from "../pages/EventsPage.vue";
import ProductsPage from "../pages/ProductsPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import SettingsPage from "../pages/SettingsPage.vue";

export default {
  name: "dashboard",
  path: "/admin",
  redirect: "/admin/bestellungen",
  component: AdminPage,
  beforeEnter(to, from, next) {
    const url = `${process.env.VUE_APP_API}/account/login`;
    const options = { credentials: "include" };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          next();
        } else {
          next({ name: "login" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  children: [
    {
      name: "orders",
      path: "bestellungen",
      component: OrdersPage,
    },
    {
      name: "events",
      path: "events",
      component: EventsPage,
    },
    {
      name: "products",
      path: "produkte",
      component: ProductsPage,
    },
    {
      name: "team",
      path: "team",
      component: TeamPage,
    },
    {
      name: "settings",
      path: "einstellungen",
      component: SettingsPage,
    },
  ],
};
