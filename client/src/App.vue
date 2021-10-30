<template>
  <router-view></router-view>
</template>

<style lang="scss">
@use "./styles/index.scss" as *;
@include css-reset();
@include font-face("Roboto Slab", "roboto-slab-bold", 700);
@include font-face("Roboto Slab", "roboto-slab-regular", 400);
@include font-face("Roboto Slab", "roboto-slab-light", 300);
html {
  font: 400 100%/1 "Roboto Slab", sans-serif;
}
</style>
