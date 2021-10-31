<template>
  <form class="form">
    <base-textbox label="Name" id="name" v-model="name"></base-textbox>
    <base-textbox
      type="textarea"
      label="Sonderwünsche"
      id="comments"
      v-model="comments"
    ></base-textbox>
    <base-select
      :options="paymentOptions"
      name="Zahlungsmethode"
      v-model="paymentMethod"
    ></base-select>
    <base-button>Bestellen</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      comments: "",
      paymentMethod: "",
      paymentOptions: [
        { id: "cash", label: "Bar an der Kasse" },
        { id: "card", label: "Karte" },
        { id: "paypal", label: "Paypal" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.form {
  padding: 1rem;
  background-color: $color-white;
  color: $color-black;
  border-radius: 0.25rem;
  display: grid;
  gap: 0.75rem;
  margin-top: 3rem;
}
</style>
