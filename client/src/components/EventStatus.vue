<template>
  <aside class="status">
    <div class="status__text">
      Verkaufsstatus: <span>{{ eventActive ? "Aktiv" : "Inaktiv" }}</span>
    </div>
    <div class="status__toggle" :class="toggleClass" @click="toggleStatus">
      <div></div>
    </div>
  </aside>
  <div class="status__separator"></div>
</template>

<script>
export default {
  data() {
    return {
      eventActive: false,
    };
  },
  computed: {
    toggleClass() {
      return {
        "status__toggle--active": this.eventActive,
        "status__toggle--inactive": !this.eventActive,
      };
    },
  },
  methods: {
    toggleStatus() {
      this.eventActive = !this.eventActive;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;

.status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $color-grey-light;
  padding: 1.5rem;
  border-radius: 0.5rem;
  &__text {
    font-size: 1.25rem;
    & > span {
      font-weight: 700;
    }
  }
  &__toggle {
    position: relative;
    display: block;
    width: 2.5rem;
    height: 1rem;
    border-radius: 1rem;
    background-color: $color-grey-medium;
    cursor: pointer;
    transition: color 0.25s ease;
    & > div {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background-color: currentColor;
      transition: left 0.25s ease;
    }
    &--active {
      color: $color-green;
      & > div {
        left: 1rem;
      }
      &:hover {
        color: lighten($color-green, 10);
      }
    }
    &--inactive {
      color: $color-red;
      & > div {
        left: 0;
      }
      &:hover {
        color: lighten($color-red, 10);
      }
    }
  }
  &__separator {
    display: block;
    width: 100%;
    height: 0.125rem;
    background-color: $color-grey-light;
    border-radius: 1rem;
    margin: 1rem 0;
  }
}
</style>
