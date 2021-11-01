<template>
  <main class="main">
    <router-view></router-view>
  </main>
</template>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.main {
  padding: 2rem 1rem;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: $screen-mobile-m;
  margin: 0 auto;
  @include responsive($screen-mobile-m) {
    padding: 3rem 1.5rem;
  }
}
</style>
