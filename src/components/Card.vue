<script>
import { ref } from 'vue'

export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  emits: ['user-selected'],
  setup(props, context) {
    const visible = ref(false)

    const flipCard = () => {
      if (props.card.matched) {
        visible.value = true
      } else {
        visible.value = !visible.value

        if (visible.value) {
          context.emit('user-selected', {
            value: props.card.value,
            position: props.card.position
          })
        }
      }
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
      {{ card.value }} - {{ card.matched }}
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
