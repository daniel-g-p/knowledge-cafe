<template>
  <transition name="form-">
    <form v-if="!collapsed" class="form" @submit.prevent="submitForm">
      <base-textbox
        label="Name"
        id="name"
        :error="errors.name"
        v-model="name"
        @remove-error="removeError('name')"
      ></base-textbox>
      <base-textbox
        type="textarea"
        label="Sonderwünsche"
        id="comments"
        v-model="comments"
      ></base-textbox>
      <base-select
        :options="paymentOptions"
        :error="errors.paymentMethod"
        name="Zahlungsmethode"
        v-model="paymentMethod"
        @remove-error="removeError('paymentMethod')"
      ></base-select>
      <base-button>Bestellen</base-button>
    </form>
  </transition>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      required: true,
    },
  },
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
      errors: {
        name: false,
        paymentMethod: false,
      },
    };
  },
  methods: {
    removeError(property) {
      this.errors[property] = false;
    },
    validateForm() {
      if (!this.name) {
        this.errors.name = true;
      }
      if (!this.paymentMethod) {
        this.errors.paymentMethod = true;
      }
      return this.name && this.paymentMethod ? true : false;
    },
    submitForm() {
      const valid = this.validateForm();
    },
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
  &--enter-active {
    transition: opacity 0.75s ease 0.5s, transform 0.75s ease 0.5s;
  }
  &--enter-from,
  &--leave-to {
    opacity: 0;
    transform: translateY(1rem);
  }
  &--leave-active {
    transition-delay: 0.5s;
  }
}
</style>
