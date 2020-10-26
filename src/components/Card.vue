<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="card">
    {{ card.value }}
  </div>
</template>

<style>
.card {
  border: 5px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
