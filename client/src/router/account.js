import AccountPage from "../pages/AccountPage.vue";
import LoginForm from "../components/LoginForm.vue";
import RegistrationForm from "../components/RegistrationForm.vue";
import ResetRequestForm from "../components/ResetRequestForm.vue";
import ResetPasswordForm from "../components/ResetPasswordForm.vue";

export default {
  name: "account",
  path: "/account",
  redirect: "/account/login",
  component: AccountPage,
  children: [
    {
      name: "login",
      path: "login",
      component: LoginForm,
      beforeEnter(to, from, next) {
        fetch(`${process.env.VUE_APP_API}/account/login`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status !== 200) {
              next();
            } else {
              next({ name: "orders" });
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
      component: RegistrationForm,
    },
    {
      name: "forgot-password",
      path: "passwort-vergessen",
      component: ResetRequestForm,
    },
    {
      name: "reset-password",
      path: "neues-passwort/:resetToken",
      component: ResetPasswordForm,
    },
  ],
};
