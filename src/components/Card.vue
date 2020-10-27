<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>

<template>
  <div class="card">
    {{ value }}
  </div>
</template>

<style></style>
