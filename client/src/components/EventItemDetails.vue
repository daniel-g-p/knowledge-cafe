<template>
  <div class="details">
    <base-info label="Name">{{ title }}</base-info>
    <base-info label="Datum">{{ eventDate }}</base-info>
    <base-info label="Uhrzeit">{{ eventTime }}</base-info>
    <base-info label="Einnahmen">{{ revenue }}</base-info>
    <base-info label="Verkaufte Kaffees">{{ stats.unitsSold }}</base-info>
    <base-info label="Produktverteilung (%)">
      <event-item-chart
        :units="stats.unitsSold"
        :products="stats.products"
      ></event-item-chart>
    </base-info>
  </div>
</template>

<script>
import EventItemChart from "./EventItemChart.vue";

export default {
  components: {
    EventItemChart,
  },
  props: {
    title: {
      title: String,
      required: true,
    },
    start: {
      type: String,
    },
    end: {
      type: String,
      required: true,
    },
    stats: {
      type: Object,
      required: true,
    },
  },
  computed: {
    eventDate() {
      const date = new Date(this.start);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
    eventTime() {
      const start = new Date(this.start);
      const end = new Date(this.end);
      const details = {
        startHours: start.getHours(),
        startMinutes: start.getMinutes(),
        endHours: end.getHours(),
        endMinutes: end.getMinutes(),
      };
      ["startHours", "startMinutes", "endHours", "endMinutes"].forEach(
        (field) => {
          if (details[field] < 10) {
            details[field] = `0${details[field]}`;
          }
        }
      );
      return `${details.startHours}:${details.startMinutes} - ${details.endHours}:${details.endMinutes}`;
    },
    revenue() {
      if (!this.stats.revenue) {
        return "€0,00";
      }
      const multiple = (this.stats.revenue * 100).toString();
      const { length } = multiple;
      return `€${multiple.slice(0, length - 2)},${multiple.slice(length - 2)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.details {
  display: grid;
  gap: 1rem;
}
</style>
