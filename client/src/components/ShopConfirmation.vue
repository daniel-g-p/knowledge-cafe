<template>
  <base-modal :open="open" title="Danke!" @close-modal="closeModal">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="modal__icon"
      viewBox="0 0 16 16"
    >
      <path
        class="modal__icon--1"
        d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"
      />
      <path
        class="modal__icon--2"
        d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"
      />
    </svg>
    <p class="modal__text">{{ message }}</p>
  </base-modal>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  emits: ["close-confirmation"],
  methods: {
    closeModal() {
      this.$emit("close-confirmation");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.modal {
  &__icon {
    height: 4.5rem;
    &--1 {
      fill: $color-green;
    }
    &--2 {
      fill: $color-gold;
    }
  }
  &__text {
    line-height: 1.25;
  }
}
</style>
