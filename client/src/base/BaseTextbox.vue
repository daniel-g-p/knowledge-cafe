<template>
  <div class="textbox" :class="errorClass">
    <label class="textbox__label" :for="id">{{ label }}</label>
    <textarea
      v-if="type === 'textarea'"
      class="textbox__input textbox__input--textarea"
      :id="id"
      :value="modelValue"
      @input="setValue"
    ></textarea>
    <input
      v-else
      class="textbox__input"
      :class="[emailClass, passwordClass]"
      :type="type"
      :id="id"
      :value="modelValue"
      @input="setValue"
    />
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        return ["text", "textarea", "email", "password"].includes(value);
      },
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["remove-error", "update:modelValue"],
  computed: {
    errorClass() {
      return { "textbox--error": this.error ? true : false };
    },
    emailClass() {
      return { "textbox__input--email": this.type === "email" };
    },
    passwordClass() {
      return { "textbox__input--email": this.type === "password" };
    },
  },
  methods: {
    setValue($event) {
      this.$emit("remove-error");
      this.$emit("update:modelValue", $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.textbox {
  display: flex;
  flex-direction: column;
  &--error {
    animation: error-animation 0.5s linear forwards;
    .textbox__input {
      border-color: $color-red;
    }
  }
  &__label {
    color: $color-gold;
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }
  &__input {
    border: 0.125rem solid $color-green;
    border-radius: 0.25rem;
    padding: 0.5em;
    transition: background-color 0.25s ease;
    &:hover,
    &:focus {
      background-color: $color-grey-light;
    }
    &--textarea {
      resize: none;
      height: 4.5rem;
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
