<template>
  <section>
    <base-title>Events</base-title>
    <div class="events">
      <event-item
        v-for="event in events"
        :key="event._id"
        :id="event._id"
        :title="event.title"
        :date="event.start"
        @select-event="showStats"
      ></event-item>
    </div>
    <p v-if="!events.length">
      Es wurden keine Events gefunden.
    </p>
    <base-modal title="Statistiken" :open="infoOpen" @close-modal="closeInfo">
      <event-item-details
        :title="activeEvent.title"
        :start="activeEvent.start"
        :end="activeEvent.end"
        :stats="activeEvent.stats"
      ></event-item-details>
    </base-modal>
  </section>
</template>

<script>
import EventItem from "../components/EventItem.vue";
import EventItemDetails from "../components/EventItemDetails.vue";

export default {
  components: {
    EventItem,
    EventItemDetails,
  },
  data() {
    return {
      infoOpen: false,
      activeEvent: {},
    };
  },
  computed: {
    events() {
      return this.$store.getters["events/eventList"];
    },
  },
  methods: {
    showStats(eventId) {
      const event = this.events.find((event) => event._id === eventId);
      this.activeEvent = event;
      this.infoOpen = true;
    },
    closeInfo() {
      this.infoOpen = false;
    },
  },
  mounted() {
    if (!this.events.length) {
      this.$store.dispatch("events/fetchEvents");
    }
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;
.events {
  display: grid;
  gap: 1rem;
}
</style>
