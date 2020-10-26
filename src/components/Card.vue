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
      <img :src="`/images/${value}.png`" :alt="value" />
      <img
        v-if="matched"
        class="card-check"
        src="../assets/checkmark.svg"
        alt="green checkmark"
      />
    </div>
    <div v-else class="card-face is-back"></div>
  </div>
</template>

<style>
.card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-check {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.card-face {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.card-face.is-front {
  background-image: url('../../public/images/CardBackground-Icon.png');
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-face.is-back {
  background-image: url('../../public/images/CardBackground-Empty.png');
}
</style>
