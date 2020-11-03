<script>
import { ref, watch } from 'vue'
import createDeck from './features/createDeck'
import createGame from './features/createGame'
import { launchConfetti } from './utilities/confetti'
import Card from './components/Card'
import halloweenDeck from './data/halloweenDeck.json'

export default {
  name: 'App',
  components: {
    Card
  },
  setup() {
    const { cardList } = createDeck(halloweenDeck)
    const {
      newPlayer,
      startGame,
      restartGame,
      matchesFound,
      status
    } = createGame(cardList)
    const userSelection = ref([])

    const flipCard = payload => {
      cardList.value[payload.position].visible = true

      if (userSelection.value[0]) {
        if (
          userSelection.value[0].position === payload.position &&
          userSelection.value[0].faceValue === payload.faceValue
        ) {
          return
        } else {
          userSelection.value[1] = payload
        }
      } else {
        userSelection.value[0] = payload
      }
    }

    watch(matchesFound, currentValue => {
      if (currentValue === 8) {
        launchConfetti()
      }
    })

    watch(
      userSelection,
      currentValue => {
        if (currentValue.length === 2) {
          const cardOne = currentValue[0]
          const cardTwo = currentValue[1]

          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true
            cardList.value[cardTwo.position].matched = true
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false
              cardList.value[cardTwo.position].visible = false
            }, 2000)
          }

          userSelection.value.length = 0
        }
      },
      { deep: true }
    )

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      restartGame,
      startGame,
      newPlayer
    }
  }
}
</script>

<template>
  <h1 class="sr-only">Peek-a-Vue</h1>
  <img
    srcset="/images/peek-a-vue-title@2x.png 2x, /images/peek-a-vue-title.png 1x"
    src="/images/peek-a-vue-title.png"
    alt="Peek-a-Vue"
    class="title"
  />
  <section class="description">
    <p>Welcome to Peek-a-Vue, a Halloween themed card matching game!</p>
    <p class="powered-wrapper">
      Powered by
      <a class="powered-link" href="https://v3.vuejs.org/">
        <img
          class="powered-logo"
          src="/images/vue-logo.svg"
          alt="Vue.js logo"
        />
        Vue.js 3
      </a>
      <span>, </span>
      <a
        class="powered-link"
        href="https://www.netlify.com/?utm_source=github&utm_medium=peekavue-bh&utm_campaign=devex"
      >
        <img
          class="powered-logo"
          src="/images/netliheart.svg"
          alt="Netlify Heart Logo"
        />
        Netlify
      </a>
      <span> & </span>
      <a
        class="powered-link"
        href="https://www.github.com/bencodezen/peek-a-vue"
      >
        <img
          class="powered-logo"
          src="/images/github-logo.svg"
          alt="GitHub Logo"
        />
        GitHub</a
      >
    </p>
  </section>
  <button v-if="newPlayer" @click="startGame" class="button">
    <div class="button-icon">
      <img class="icon-play" src="/images/play.svg" alt="Play Icon" /><img
        class="icon-ghost"
        src="/images/cute-ghost.svg"
        alt="Cute Ghost"
      />
    </div>
    Start Game
  </button>
  <button v-else @click="restartGame" class="button">
    <img src="/images/restart.svg" alt="Restart Icon" />Restart Game
  </button>
  <transition-group tag="section" class="game-board" name="shuffle-card">
    <Card
      v-for="card in cardList"
      :key="`${card.value}-${card.variant}`"
      :matched="card.matched"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      @select-card="flipCard"
    />
  </transition-group>
  <h2 class="status">{{ status }}</h2>
  <footer>Made by <a href="https://www.bencodezen.io">BenCodeZen</a></footer>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

html {
  background-image: url('/images/page-bg.png');
  background-color: #00070c;
}

h1 {
  margin-top: 0;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  color: #fff;
  padding: 60px 0;
}

.description {
  font-family: 'Titillium Web', sans-serif;
}

.description p {
  margin: 0;
  font-size: 1rem;
}

.description p:last-child {
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 0.9rem;
}

.status {
  font-family: 'Titillium Web', sans-serif;
  font-size: 18px;
  text-transform: uppercase;
}

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

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 60px);
  grid-template-rows: repeat(4, 60px);
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  justify-content: center;
}

@media screen and (min-width: 500px) {
  .game-board {
    grid-template-columns: repeat(4, 90px);
    grid-template-rows: repeat(4, 90px);
  }
}

@media screen and (min-width: 600px) {
  .game-board {
    grid-template-columns: repeat(4, 120px);
    grid-template-rows: repeat(4, 120px);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.title {
  padding-bottom: 30px;
}

.shuffle-card-move {
  transition: transform 0.8s ease-in;
}

.powered-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}

.powered-link {
  padding: 0 5px;
}

.powered-link:first-child,
.powered-link:last-child {
  padding-right: 0;
}

.powered-logo {
  width: 18px;
}
</style>
