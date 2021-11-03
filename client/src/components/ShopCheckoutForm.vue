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
      <base-select
        :options="paymentOptions"
        :error="errors.paymentMethod"
        name="Zahlungsmethode"
        v-model="paymentMethod"
        @remove-error="removeError('paymentMethod')"
      ></base-select>
      <base-textbox
        type="textarea"
        label="Sonderwünsche"
        id="comments"
        v-model="comments"
      ></base-textbox>
      <base-button :loading="buttonLoading">Bestellen</base-button>
    </form>
  </transition>
  <base-modal :open="modal.open" :title="modal.title" @close-modal="closeModal">
    <p>{{ modal.text }}</p>
  </base-modal>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["confirm-order"],
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
      modal: {
        open: false,
        title: "",
        text: "",
      },
      buttonLoading: false,
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
      if (!this.validateForm()) {
        return;
      }
      const order = {
        name: this.name,
        comments: this.comments,
        paymentMethod: this.paymentMethod,
        items: this.$store.getters["shop/cartItems"],
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      };
      this.buttonLoading = true;
      fetch(`${process.env.VUE_APP_API}/shop`, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          if (res.status !== 200) {
            this.modal.title = "Fehler";
            this.modal.text = res.message;
            this.modal.open = true;
          } else {
            this.$emit("confirm-order", res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },
    closeModal() {
      this.modal.open = false;
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
