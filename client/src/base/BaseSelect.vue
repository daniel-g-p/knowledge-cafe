<template>
  <div class="select" :class="errorClass">
    <label class="select__label" :for="name">{{ name }}</label>
    <div class="select__box">
      <select
        class="select__field"
        :id="name"
        :value="modelValue"
        @change="setOption"
      >
        <option v-for="option in options" :key="option.id" :value="option.id">
          {{ option.label }}
        </option>
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="select__icon"
        viewBox="0 0 16 16"
      >
        <path
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
      validator(value) {
        return value.every((item) => {
          return item.id && item.label;
        });
      },
    },
    name: {
      type: String,
      required: true,
    },
    error: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue", "remove-error"],
  computed: {
    errorClass() {
      return { "select--error": this.error };
    },
  },
  methods: {
    setOption($event) {
      this.$emit("update:modelValue", $event.target.value);
      this.$emit("remove-error");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.select {
  &__label {
    font-size: 0.875rem;
    color: $color-gold;
  }
  &__box {
    position: relative;
    margin-top: 0.25rem;
  }
  &__field {
    border: 0.125rem solid $color-green;
    border-radius: 0.25rem;
    width: 100%;
    height: 100%;
    padding: 0.5em;
    transition: background-color 0.25s ease, border-color 0.25s ease;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: $color-grey-light;
    }
  }
  &__icon {
    pointer-events: none;
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    fill: $color-gold;
    height: 1.5rem;
  }
  &--error {
    animation: error-animation 0.5s linear forwards;
    .select__field {
      border-color: $color-red;
    }
  }
}

@keyframes error-animation {
  0% {
    transform: translateX(0);
  }
  10% {
    transform: translateX(0.25rem);
  }
  30% {
    transform: translateX(-0.25rem);
  }
  50% {
    transform: translateX(0.25rem);
  }
  70% {
    transform: translateX(-0.25rem);
  }
  90% {
    transform: translateX(0.25rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
