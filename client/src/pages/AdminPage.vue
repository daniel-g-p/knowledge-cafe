<template>
  <main class="main">
    <div class="main__content">
      <router-view></router-view>
    </div>
    <the-navigation></the-navigation>
  </main>
</template>

<script>
import TheNavigation from "../layout/TheNavigation.vue";

export default {
  components: {
    TheNavigation,
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.main {
  &__content {
    max-width: $screen-tablet-s;
    min-height: 100vh;
    margin: 0 auto;
    padding: 2rem 1rem 5rem;
    @include responsive($screen-mobile-m) {
      padding: 3rem 1.5rem 5rem;
    }
  }
}
</style>
