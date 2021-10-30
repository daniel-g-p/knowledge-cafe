import AdminPage from "../pages/AdminPage.vue";
import OrdersPage from "../pages/OrdersPage.vue";
import EventsPage from "../pages/EventsPage.vue";
import ProductsPage from "../pages/ProductsPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import SettingsPage from "../pages/SettingsPage.vue";

export default {
  name: "dashboard",
  path: "/admin",
  component: AdminPage,
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
