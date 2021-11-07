<template>
  <div class="member">
    <div class="member__name" @click="select('view')">{{ name }}</div>
    <button class="member__button member__button--edit" @click="select('edit')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="member__icon"
        viewBox="0 0 16 16"
      >
        <path
          d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
        />
      </svg>
    </button>
    <button
      class="member__button member__button--delete"
      @click="select('delete')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="member__icon"
        viewBox="0 0 16 16"
      >
        <path
          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
        />
        <path
          fill-rule="evenodd"
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    select(mode) {
      this.$emit("select-member", mode, this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;

.member {
  display: flex;
  gap: 0.5rem;
  &__name {
    background-color: $color-grey-light;
    padding: 1rem;
    flex-grow: 1;
    border-radius: 0.5rem;
    transition: background-color 0.25s ease;
    &:hover {
      background-color: darken($color-grey-light, 5);
      cursor: pointer;
    }
  }
  &__button {
    background-color: $color-grey-light;
    border-radius: 0.5rem;
    padding: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.25s ease;
    &:hover {
      background-color: darken($color-grey-light, 5);
      cursor: pointer;
    }
    &--edit {
      color: $color-green;
    }
    &--delete {
      color: $color-red;
    }
  }
  &__icon {
    height: 1.5rem;
    fill: currentColor;
  }
}
</style>
