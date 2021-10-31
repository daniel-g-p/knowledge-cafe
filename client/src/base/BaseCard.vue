<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.card {
  border-radius: 0.25rem;
  overflow: hidden;
}
</style>
