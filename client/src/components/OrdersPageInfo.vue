<template>
  <div class="info">
    <p v-if="!eventActive" class="info__text">
      Der Verkauf ist zurzeit nicht freigegeben. Aktiviere ihn, um Bestellungen
      entgegennehmen zu können.
    </p>
    <p v-else-if="!ordersLength" class="info__text">
      Es gibt zurzeit keine Bestellungen, nutzt die Zeit doch einfach, um
      <span class="info__text--strikethrough"
        >euch selbst einen Kaffee zu kochen</span
      >
      den Kaffeestand auf Vordermann zu bringen ;)
    </p>
  </div>
</template>

<script>
export default {
  props: {
    eventActive: {
      type: Boolean,
      required: true,
    },
    ordersLength: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.info {
  &__text {
    line-height: 1.25;
    margin-bottom: 1rem;
    &--strikethrough {
      text-decoration: line-through;
    }
  }
}
</style>
