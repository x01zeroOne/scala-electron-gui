<template>
  <span> {{ value }} SCALA </span>
</template>

<script>
export default {
  name: "FormatScala",
  props: {
    amount: {
      type: Number,
      required: true
    },
    round: {
      type: Boolean,
      required: false,
      default: false
    },
    rawValue: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    value() {
      return this.amount / 1e2;
    }
  }
};
</script>

<style></style>
