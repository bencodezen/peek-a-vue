<template>
  <h1><img src="../public/images/Peek-a-Vue-Header.png" alt="" /></h1>
  <section class="game-board">
    <Card
      v-for="card in cardList"
      :key="`${card.value}-${card.position}`"
      v-bind="card"
      @user-selected="registerSelection"
    />
  </section>
  <button class="button">
    <img src="./assets/restart.svg" alt="" />Restart Game
  </button>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import Card from './components/Card'

export default {
  name: 'App',
  components: {
    Card
  },
  setup() {
    const cardList = ref([])
    const userSelection = reactive([])

    const registerSelection = payload => {
      userSelection.push(payload)
      cardList.value[payload.position].visible = true
    }

    watch(userSelection, currentValue => {
      if (currentValue.length === 2) {
        if (currentValue[0].value === currentValue[1].value) {
          cardList.value[currentValue[0].position].matched = true
          cardList.value[currentValue[1].position].matched = true
          userSelection.length = 0
        } else {
          setTimeout(() => {
            cardList.value[currentValue[0].position].visible = false
            cardList.value[currentValue[1].position].visible = false
            userSelection.length = 0
          }, 1000)
        }
      }
    })

    const cardIcons = [
      'bat',
      'candy',
      'cauldron',
      'cupcake',
      'ghost',
      'moon',
      'pumpkin',
      'witchHat'
    ]

    cardIcons.forEach((icon, index) => {
      let card = {
        value: icon,
        matched: false
      }

      cardList.value.push({
        ...card,
        position: index * 2
      })
      cardList.value.push({
        ...card,
        position: index * 2 + 1
      })
    })

    return {
      cardList,
      userSelection,
      registerSelection
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #00070c;
  background-image: url('../public/images/spiderbackground.png');
  margin: 0;
  padding: 0;
  height: 100vh;
}

body {
  margin: 0;
  padding: 0;
}

h1 {
  margin: 0;
  padding-top: 60px;
  padding-bottom: 30px;
}

.button {
  background-color: #e78805;
  color: #fff;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  margin: 30px auto;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 120px);
  grid-template-rows: repeat(4, 120px);
  grid-row-gap: 24px;
  grid-column-gap: 24px;
  justify-content: center;
}
</style>
