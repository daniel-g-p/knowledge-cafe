<template>
  <div class="title">
    <h1 class="title__text"><slot></slot></h1>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.title {
  color: $color-black;
  font-size: 2rem;
  padding: 0.25em;
  &__text {
    position: relative;
    font-size: inherit;
    font-weight: 300;
    &::before,
    &::after {
      position: absolute;
      display: block;
      content: "";
      opacity: 0.25;
      border-radius: 0.125em;
      width: 1em;
      height: 1em;
      pointer-events: none;
      z-index: -1;
    }
    &::before {
      background-color: $color-green;
      top: -0.25em;
      left: -0.25em;
    }
    &::after {
      background-color: $color-gold;
      top: 0.25em;
      left: 0.25em;
    }
  }
}
</style>
