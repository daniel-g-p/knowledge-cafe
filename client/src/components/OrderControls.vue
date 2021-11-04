<template>
  <div>
    <aside class="status">
      <div class="status__content">
        <div class="status__text">
          Verkaufsstatus: <span>{{ eventActive ? "Aktiv" : "Inaktiv" }}</span>
        </div>
        <div class="status__toggle" :class="toggleClass" @click="toggleStatus">
          <div></div>
        </div>
      </div>
      <base-button v-if="eventActive" type="link" :link="newOrderLink"
        >Neue Bestellung</base-button
      >
      <div class="status__separator"></div>
    </aside>
    <base-modal
      title="Bestätigung"
      :open="modalOpen"
      @close-modal="toggleModal"
    >
      <p>{{ modalText }}</p>
      <base-textbox
        v-if="eventActive"
        label="Name"
        id="eventName"
        :error="eventNameError"
        v-model="eventName"
        @remove-error="removeInputError"
      ></base-textbox>
      <base-button :loading="buttonLoading" @click="confirmToggle">{{
        modalButtonText
      }}</base-button>
    </base-modal>
  </div>
</template>

<script>
export default {
  emits: ["event-error"],
  props: {
    eventActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      modalOpen: false,
      buttonLoading: false,
      eventName: "",
      eventNameError: false,
    };
  },
  computed: {
    toggleClass() {
      return {
        "status__toggle--active": this.eventActive,
        "status__toggle--inactive": !this.eventActive,
      };
    },
    newOrderLink() {
      return { name: "shop" };
    },
    modalText() {
      return this.eventActive
        ? "Unter welchem Namen möchtest du diesen Verkauf speichern?"
        : "Sicher, dass du den Verkauf freigeben möchtest?";
    },
    modalButtonText() {
      return this.eventActive ? "Speichern" : "Freigeben";
    },
  },
  methods: {
    toggleModal() {
      this.modalOpen = !this.modalOpen;
      this.eventNameError = false;
    },
    toggleStatus() {
      this.toggleModal();
    },
    removeInputError() {
      this.eventNameError = false;
    },
    confirmToggle() {
      if (this.eventActive && !this.eventName) {
        this.eventNameError = true;
        return;
      }
      this.toggleModal();
      const url = `${process.env.VUE_APP_API}/events/${
        this.eventActive ? "close" : "open"
      }`;
      const options = {
        method: "POST",
        credentials: "include",
      };
      if (this.eventActive) {
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify({ eventName: this.eventName });
      }
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            this.$store.dispatch("orders/toggleEventStatus", this.eventActive);
          } else {
            this.$emit("event-error", res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/index.scss" as *;

.status {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $color-grey-light;
    padding: 1.5rem;
    border-radius: 0.5rem;
  }
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
  }
}
</style>
