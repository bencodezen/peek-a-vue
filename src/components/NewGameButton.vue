<script>
export default {
  props: {
    newPlayer: {
      type: Boolean,
      default: true
    }
  },
  setup(props, ctx) {
    const startNewGame = () => {
      ctx.emit('start-new-game')
    }

    return {
      startNewGame
    }
  }
}
</script>

<template>
  <button v-if="newPlayer" @click="startNewGame" :class="$style.button">
    <div :class="$style['button-icon']">
      <img
        :class="$style['icon-play']"
        src="/images/play.svg"
        alt="Play Icon"
      /><img
        :class="$style['icon-ghost']"
        src="/images/cute-ghost.svg"
        alt="Cute Ghost"
      />
    </div>
    Start Game
  </button>
  <button v-else @click="startNewGame" :class="$style.button">
    <img src="/images/restart.svg" alt="Restart Icon" />Restart Game
  </button>
</template>

<style module>
.button {
  background-color: #e78805;
  color: white;
  padding: 8px 16px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-weight: bold;
  font-family: 'Titillium Web', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  border: 0;
  border-radius: 10px;
  transition: 0.2s all ease-in;
  border: 2px solid #e78805;
}

.button:hover {
  border: 2px solid #e78805;
  background-color: transparent;
}

.button:hover .icon-ghost {
  opacity: 1;
}

.button:hover .icon-play {
  opacity: 0;
}

.button img {
  padding-right: 12px;
  transition: 0.2s opacity ease-in;
}

.button .icon-ghost {
  position: absolute;
  left: -6px;
  opacity: 0;
}

.button .icon-play {
  position: absolute;
  left: -6px;
  opacity: 1;
}

.button-icon {
  position: relative;
  width: 24px;
  height: 24px;
}
</style>
