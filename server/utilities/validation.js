const condition = (condition, message) => {
  return condition ? { valid: true } : { valid: false, message };
};

const validate = (data, ...conditions) => {
  for (let condition of conditions) {
    if (!condition.valid) {
      return condition;
    }
  }
  return { status: 200, valid: true, data };
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
