<template>
  <base-info label="Sortenverteilung">
    <div v-if="dataAvailable">
      <div class="chart__labels">
        <div v-for="(variation, index) in variations" class="chart__label">
          <div
            class="chart__color"
            :style="{ 'background-color': colors[index] }"
          ></div>
          <div class="chart__text">
            {{ variation }} ({{ formattedPercentages[variation] }})
          </div>
        </div>
      </div>
      <div class="chart" :style="chartGradient"></div>
    </div>
    <p v-else>N/A</p>
  </base-info>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      colors: ["#20a4f3", "#59f8e8", "#c1cfda", "#941c2f"],
    };
  },
  computed: {
    variations() {
      return Object.keys(this.stats);
    },
    dataAvailable() {
      return this.variations.some((variation) => {
        return this.stats[variation] > 0;
      });
    },
    totalUnits() {
      return this.variations.reduce((result, variation) => {
        return result + this.stats[variation];
      }, 0);
    },
    chartGradient() {
      const angles = this.variations.map((variation) => {
        const percentage = this.stats[variation] / this.totalUnits;
        return Math.round(percentage * 360);
      });
      const segments = angles.map((angle, index) => {
        const color = this.colors[index];
        if (!index) {
          return `${color} 0deg ${angle}deg`;
        } else if (index === angles.length - 1) {
          return `${color} ${angles[index - 1]}deg 360deg`;
        } else {
          return `${color} ${angles[index - 1]}deg ${angle}deg`;
        }
      });
      return { "background-image": `conic-gradient(${segments.join(", ")}` };
    },
    formattedPercentages() {
      const summary = {};
      for (let variation of this.variations) {
        const percentage = (100 * this.stats[variation]) / this.totalUnits;
        const multiple = Math.round(percentage * 10).toString();
        const { length } = multiple;
        summary[variation] = percentage
          ? `${multiple.slice(0, length - 1)},${multiple.slice(length - 1)}%`
          : "0,0%";
      }
      return summary;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.chart {
  width: 100%;
  padding-bottom: 100%;
  border-radius: 50%;
  margin-top: 0.5rem;
  &__labels {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  &__label {
    display: flex;
    align-items: center;
  }
  &__color {
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    margin-right: 0.5rem;
  }
}
</style>
