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
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const selectCard = () => {
      context.emit('select-card', {
        position: props.position,
        faceValue: props.value
      })
    }

    return {
      selectCard
    }
  }
}
</script>

<template>
  <div class="card" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      <img :src="`/images/${value}.png`" :alt="value" />
      <img v-if="matched" src="/images/checkmark.svg" class="icon-checkmark" />
    </div>
    <div v-else class="card-face is-back"></div>
  </div>
</template>

<style>
.card {
  position: relative;
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-face.is-front {
  background-image: url('/images/card-bg.png');
  color: white;
}

.card-face.is-back {
  background-image: url('/images/card-bg-empty.png');
  color: white;
}

.icon-checkmark {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
