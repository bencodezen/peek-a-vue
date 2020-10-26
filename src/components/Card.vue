<script>
export default {
  props: {
    matched: {
      type: Boolean,
      default: false
    },
    position: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['user-selected'],
  setup(props, context) {
    const flipCard = () => {
      if (props.matched) {
        return
      } else {
        if (!props.visible) {
          context.emit('user-selected', {
            value: props.value,
            position: props.position
          })
        }
      }
    }

    return {
      flipCard
    }
  }
}
</script>

<template>
  <div class="card" @click="flipCard">
    <div v-if="visible" class="card-face is-front">
      {{ value }} - {{ matched }}
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
