<template>
  <transition name="modal-">
    <div class="modal" v-if="open">
      <div class="modal__box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="modal__close"
          viewBox="0 0 16 16"
          @click="closeModal"
        >
          <path
            d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
          />
          <path
            d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
          />
        </svg>
        <h2 class="modal__title" v-if="title">{{ title }}</h2>
        <div class="modal__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close-modal"],
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.modal {
  background-color: $color-shadow;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.25s ease;
  &--enter-from,
  &--leave-to {
    opacity: 0;
    .modal__box {
      transform: scale(0.9);
    }
  }
  &--enter-to,
  &--leave-from {
    opacity: 1;
    .modal__box {
      transform: scale(1);
    }
  }
  &__box {
    position: relative;
    border-radius: 0.25rem;
    padding: 1rem;
    background-color: $color-white;
    color: $color-black;
    min-width: 15rem;
    max-width: 22.5rem;
    transition: transform 0.25s ease;
  }
  &__title {
    font-weight: 400;
    font-size: 1.5rem;
    padding-right: 1.5rem;
  }
  &__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    fill: $color-gold;
    height: 1.5rem;
    transition: fill 0.25s ease;
    cursor: pointer;
    &:hover {
      fill: lighten($color-gold, 10);
    }
  }
}
</style>
