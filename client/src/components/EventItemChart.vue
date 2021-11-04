<template>
  <div class="chart">
    <div class="chart__labels">
      <div v-for="label in labels" :key="label" class="chart__label">
        {{ label }}
      </div>
    </div>
    <div class="chart__frame">
      <div class="chart__bars">
        <div v-for="label in labels" :key="label" class="chart__bar-container">
          <div class="chart__bar" :style="widths[label]"></div>
          <div class="chart__bar-label">{{ products[label] }}</div>
        </div>
      </div>
      <div class="chart__guide chart__guide--0"></div>
      <div class="chart__guide chart__guide--10"></div>
      <div class="chart__guide chart__guide--20"></div>
      <div class="chart__guide chart__guide--30"></div>
      <div class="chart__guide chart__guide--40"></div>
      <div class="chart__guide chart__guide--50"></div>
      <div class="chart__guide chart__guide--60"></div>
      <div class="chart__guide chart__guide--70"></div>
      <div class="chart__guide chart__guide--80"></div>
      <div class="chart__guide chart__guide--90"></div>
      <div class="chart__guide chart__guide--100"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    units: {
      type: Number,
      required: true,
    },
    products: {
      type: Object,
      required: true,
    },
  },
  computed: {
    labels() {
      return Object.keys(this.products).sort((a, b) => {
        return this.products[b] > this.products[a] ? 1 : -1;
      });
    },
    widths() {
      const widths = {};
      for (let label of this.labels) {
        widths[label] = {
          width: `${(100 * this.products[label]) / this.units}%`,
        };
      }
      return widths;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.chart {
  display: flex;
  padding-bottom: 1rem;
  padding-right: 0.5rem;
  &__labels {
    margin-right: 0.25rem;
  }
  &__label {
    text-transform: uppercase;
    padding: 0.5rem 0;
  }
  &__bars {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: space-between;
  }
  &__bar-container {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
  }
  &__bar {
    display: block;
    width: 2rem;
    height: 1rem;
    background-color: $color-green;
    flex-shrink: 0;
  }
  &__bar-label {
    font-size: 0.875rem;
    font-weight: 400;
    color: $color-green;
    margin-left: 0.25rem;
  }
  &__frame {
    flex-grow: 1;
    align-items: center;
    border-left: 0.125rem solid $color-black;
    border-bottom: 0.125rem solid $color-black;
    position: relative;
  }
  &__guide {
    position: absolute;
    display: block;
    background-color: $color-grey-light;
    width: 0.125rem;
    height: 100%;
    top: 0;
    &::after {
      position: absolute;
      top: 100%;
      transform: translateX(-50%);
      padding-top: 0.25rem;
      font-weight: 400;
      font-size: 0.875rem;
    }
    &--0 {
      left: 0;
      background-color: transparent;
      &::after {
        content: "0";
      }
    }
    &--10 {
      left: 10%;
    }
    &--20 {
      left: 20%;
      &::after {
        content: "20";
      }
    }
    &--30 {
      left: 30%;
    }
    &--40 {
      left: 40%;
      &::after {
        content: "40";
      }
    }
    &--50 {
      left: 50%;
    }
    &--60 {
      left: 60%;
      &::after {
        content: "60";
      }
    }
    &--70 {
      left: 70%;
    }
    &--80 {
      left: 80%;
      &::after {
        content: "80";
      }
    }
    &--90 {
      left: 90%;
    }
    &--100 {
      left: 100%;
      &::after {
        content: "100";
      }
    }
  }
}
</style>
