import _ from 'lodash'
import { computed, ref } from 'vue'

export default function createGame(deck) {
  const newPlayer = ref(true)

  const startGame = () => {
    newPlayer.value = false

    restartGame()
  }

  const restartGame = () => {
    deck.value = _.shuffle(deck.value)

    deck.value = deck.value.map((card, index) => {
      return {
        ...card,
        matched: false,
        position: index,
        visible: false
      }
    })
  }

  const status = computed(() => {
    if (matchesFound.value === 8) {
      return 'Player wins!'
    } else {
      return `Matches found: ${matchesFound.value}`
    }
  })

  const matchesFound = computed(() => {
    const matchedCards = deck.value.filter(card => card.matched === true).length

    return matchedCards / 2
  })

  return {
    matchesFound,
    newPlayer,
    restartGame,
    startGame,
    status
  }
}
