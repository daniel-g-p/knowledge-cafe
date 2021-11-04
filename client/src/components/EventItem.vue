<template>
  <div class="event" @click="selectEvent">
    <h2 class="event__title">{{ title }}</h2>
    <p class="event__date">{{ formattedDate }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  emits: ["select-event"],
  computed: {
    formattedDate() {
      const date = new Date(this.date);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
  },
  methods: {
    selectEvent() {
      this.$emit("select-event", this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.event {
  padding: 1rem;
  background-color: $color-grey-light;
  border-radius: 0.5rem;
  transition: background-color 0.25s ease;
  cursor: pointer;
  &:hover {
    background-color: darken($color-grey-light, 5);
  }
  &__title {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }
}
</style>
