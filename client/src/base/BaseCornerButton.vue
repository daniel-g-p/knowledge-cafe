<template>
  <button class="button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="button__icon"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
      />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.button {
  position: fixed;
  bottom: 5rem;
  right: 3rem;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-gold;
  transition: background-color 0.25s ease;
  &:hover,
  &:focus {
    background-color: lighten($color-gold, 10);
  }
  &__icon {
    height: 50%;
    fill: $color-white;
  }
}
</style>
