<template>
  <base-modal :title="name" :open="open" @close-modal="closeModal"></base-modal>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    variations: {
      type: Array,
      default: [],
    },
  },
  emits: ["close-modal"],
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
