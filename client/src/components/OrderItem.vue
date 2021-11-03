<template>
  <div class="order">
    <div class="order__header">
      <h3 class="order__name">{{ customerName }}</h3>
      <div class="order__total">{{ formattedTotal }}</div>
    </div>
    <div class="order__content">
      <div class="order__items">
        <div v-for="item in items" :key="item.id" class="order__item">
          {{ item.quantity }} x {{ item.name
          }}{{ item.variation ? ` (${item.variation})` : "" }}
        </div>
      </div>
      <p v-if="comments" class="order__comments">{{ comments }}</p>
      <div class="order__footer">
        <div class="order__warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="order__warning-icon"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
            />
          </svg>
          <span>Barzahlung</span>
        </div>
        <div class="order__actions">
          <button class="order__button" @click="completeOrder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="order__button-icon"
              viewBox="0 0 16 16"
            >
              <path
                d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
          <button class="order__button" @click="cancelOrder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="order__button-icon"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
              />
              <path
                fill-rule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      default: "",
    },
  },
  computed: {
    formattedTotal() {
      const multiple = (this.total * 100).toString();
      const { length } = multiple;
      return `€${multiple.slice(0, length - 2)},${multiple.slice(length - 2)}`;
    },
  },
  methods: {
    completeOrder() {
      this.$store.dispatch("orders/completeOrder", this.id);
    },
    cancelOrder() {
      console.log(this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.order {
  background-color: $color-grey-light;
  border-radius: 0.5rem;
  overflow: hidden;
  &__header {
    background-color: $color-green;
    color: $color-white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
  }
  &__name,
  &__total {
    font-weight: 700;
    font-size: 1.25rem;
  }
  &__content {
    padding: 1rem;
  }
  &__items {
    font-weight: 700;
    display: grid;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  &__comments {
    margin-bottom: 1rem;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
    flex-grow: 1;
  }
  &__button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    color: $color-gold;
    border: 0.125rem solid $color-gold;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.125s ease, color 0.125s ease;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: $color-gold;
      color: $color-white;
    }
  }
  &__button-icon {
    fill: currentColor;
    height: 67%;
  }
  &__warning {
    color: $color-red;
    display: flex;
    align-items: center;
  }
  &__warning-icon {
    fill: currentColor;
    height: 1.5rem;
    margin-right: 0.25rem;
  }
}
</style>
