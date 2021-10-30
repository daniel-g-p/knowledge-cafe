import AccountPage from "../pages/AccountPage.vue";
import LoginForm from "../components/LoginForm.vue";
import RegistrationForm from "../components/RegistrationForm.vue";
import ResetRequestForm from "../components/ResetRequestForm.vue";
import ResetPasswordForm from "../components/ResetPasswordForm.vue";

export default {
  name: "account",
  path: "/benutzer",
  component: AccountPage,
  children: [
    {
      name: "login",
      path: "anmelden",
      component: LoginForm,
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
