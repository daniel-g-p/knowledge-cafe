<template>
  <main>
    <router-view></router-view>
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
