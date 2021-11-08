const condition = (condition, message) => {
  return condition ? { valid: true } : { valid: false, message };
};

const validate = (data, ...conditions) => {
  for (let condition of conditions) {
    if (!condition.valid) {
      return condition;
    }
  }
  return { valid: true, data };
};

export const orderSchema = (order) => {
  return validate(
    order,
    condition(order.name, "Bitte gebe deinen Namen an."),
    condition(
      order.paymentMethod &&
        ["cash", "card", "paypal"].includes(order.paymentMethod),
      "Bitte wähle eine Zahlungsmethode."
    )
  );
};

export const loginSchema = (login) => {
  return validate(
    login,
    condition(
      login.user,
      "Bitte gebe deinen Benutzernamen oder deine Email an."
    ),
    condition(login.password, "Bitte gebe dein Passwort ein.")
  );
};

export const productSchema = (product) => {
  return validate(
    product,
    condition(product.name, "Bitte gebe einen Produktnamen ein."),
    condition(product.tag, "Bitte gebe ein Produktkürzel ein."),
    condition(
      product.tag.length <= 4,
      "Das Produktkürzel muss zwischen 1 und 4 Zeichen lang sein."
    ),
    condition(product.price, "Bitte gebe einen verkaufspreis ein."),
    condition(
      (product.price * 100) % 1 === 0,
      "Der eingegebene Verkauspreis ist ungültig."
    ),
    condition(
      !product.variations.length || product.variations.length > 1,
      "Bitte gebe mindestens zwei Sorten an bzw. lasse das Feld leer."
    )
  );
};

export const userEditsSchema = (user) => {
  const data = {
    name: user.name.trim(),
    email: user.email.toLowerCase().trim(),
    username: user.username.toLowerCase().trim(),
  };
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const usernameRegex = /^[a-zA-Z0-9._-]+$/;
  return validate(
    data,
    condition(data.name, "Bitte gebe einen Namen ein."),
    condition(
      data.email && emailRegex.test(data.email),
      "Bitte gebe eine gültige Emailadresse ein."
    ),
    condition(
      data.username && usernameRegex.test(data.username),
      "Bitte gebe einen gültigen Benutzernamen ein."
    )
  );
};

export const changePasswordSchema = (data) => {
  const passwordRegex =
    /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[._\-!?@#$%^&+=])./;
  return validate(
    data,
    condition(data.oldPassword, "Bitte gebe dein altes Passwort ein."),
    condition(data.newPassword, "Bitte gebe ein neues Passwort ein."),
    condition(
      passwordRegex.test(data.newPassword),
      "Dein Passwort muss mindestens 1 Großbuchstaben, 1 Kleinbuchstaben, 1 Zahl, und ein Sonderzeichen enthalten."
    ),
    condition(data.confirmPassword, "Bitte bestätige dein Passwort."),
    condition(
      data.confirmPassword === data.newPassword,
      "Die Passwörter stimmen nicht überein."
    )
  );
};

export const newUserSchema = (user) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const data = {
    email: user.email.toLowerCase().trim(),
    role: user.role.toLowerCase() === "admin" ? "admin" : "user",
  };
  return validate(
    data,
    condition(data.email, "Bitte gebe eine Emailadresse ein."),
    condition(
      emailRegex.test(data.email),
      "Bitte gebe eine gültige Emailadresse ein."
    ),
    condition(data.role, "Ungültiger Status.")
  );
};
