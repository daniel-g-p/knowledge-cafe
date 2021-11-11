import AccountPage from "../pages/AccountPage.vue";
import RegistrationForm from "../components/RegistrationForm.vue";
import ResetRequestForm from "../components/ResetRequestForm.vue";
import ResetPasswordForm from "../components/ResetPasswordForm.vue";

export default {
  name: "account",
  path: "/account",
  redirect: "/account/login",
  component: () => import("../pages/AccountPage.vue"),
  children: [
    {
      name: "login",
      path: "login",
      component: () => import("../components/LoginForm.vue"),
      beforeEnter(to, from, next) {
        fetch(`${process.env.VUE_APP_API}/account/login`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.ok) {
              next({ name: "orders" });
            } else {
              next();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    {
      name: "registration",
      path: "registrieren/:userId",
      component: () => import("../components/RegistrationForm.vue"),
    },
    {
      name: "forgot-password",
      path: "passwort-vergessen",
      redirect: "/account/login",
      // component: () => import("../components/ResetRequestForm.vue"),
    },
    {
      name: "reset-password",
      path: "neues-passwort/:resetToken",
      redirect: "/account/login",
      // component: () => import("../components/ResetPasswordForm.vue"),
    },
  ],
};
