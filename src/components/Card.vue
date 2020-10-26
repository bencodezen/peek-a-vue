<script>
import { ref } from 'vue'

export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  setup() {
    const visible = ref(false)

    const flipCard = () => {
      visible.value = !visible.value
    }

    return {
      flipCard,
      visible
    }
  }
}
</script>

<template>
  <div class="card" @click="flipCard">
    <div v-if="visible" class="card-face is-front">
      {{ card.value }}
    </div>
    <div v-else class="card-face is-back">
      Back
    </div>
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
