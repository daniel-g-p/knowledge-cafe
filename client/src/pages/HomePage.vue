<template>
  <main class="home">
    <div class="home__background"></div>
    <div class="home__content">
      <icon-logo color="color" :height="6"></icon-logo>
      <h1 class="home__title">Willkommen im Knowledge Café!</h1>
      <base-button
        button-color="gold"
        button-type="link"
        :button-link="buttonLink"
      >
        Zur Karte
      </base-button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      buttonLink: { name: "shop" },
    };
  },
};
</script>

<style lang="scss">
@use "../styles/index.scss" as *;
.home {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: $color-black;
  &__content {
    text-align: center;
    max-width: 20rem;
  }
  &__background {
    position: absolute;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/coffee-background.webp");
    background-size: cover;
    &::after {
      position: inherit;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($color-white, 0.5);
    }
  }
  &__title {
    font-weight: 400;
    margin-top: 1rem;
    margin-bottom: 2rem;
    line-height: 1.25;
  }
}
</style>
