<script>
import { ref, watch } from 'vue'
import createDeck from './features/createDeck'
import createGame from './features/createGame'
import { launchConfetti } from './utilities/confetti'
import AppFooter from './components/AppFooter'
import AppHero from './components/AppHero'
import GameBoard from './components/GameBoard'
import NewGameButton from './components/NewGameButton'
import halloweenDeck from './data/halloweenDeck.json'

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHero,
    GameBoard,
    NewGameButton
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
    const userCanFlipCard = ref(true)

    const startNewGame = () => {
      if (newPlayer) {
        startGame()
      } else {
        restartGame()
      }
    }

    const flipCard = payload => {
      if (userCanFlipCard.value) {
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
      } else {
        return
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
          // Disable ability to flip cards
          userCanFlipCard.value = false

          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true
            cardList.value[cardTwo.position].matched = true
            userCanFlipCard.value = true
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false
              cardList.value[cardTwo.position].visible = false
              // Allow user to flip a new card
              userCanFlipCard.value = true
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
      startNewGame,
      newPlayer
    }
  }
}
</script>

<template>
  <AppHero />
  <NewGameButton :newPlayer="newPlayer" @start-new-game="startNewGame" />
  <GameBoard :cardList="cardList" :status="status" @flip-card="flipCard" />
  <AppFooter />
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

.status {
  font-family: 'Titillium Web', sans-serif;
  font-size: 18px;
  text-transform: uppercase;
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

.shuffle-card-move {
  transition: transform 0.8s ease-in;
}
</style>
