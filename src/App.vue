<template>
  <h1>Peek-a-Vue</h1>
  <section class="game-board">
    <Card
      v-for="card in cardList"
      :key="card.value"
      v-bind="card"
      @user-selected="registerSelection"
    />
  </section>
  <p>{{ userSelection }}</p>
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
          }, 2000)
        }
      } else {
        console.log('nope')
      }
    })

    for (let i = 0; i < 16; i++) {
      if (i % 2 === 0) {
        cardList.value.push({
          value: 2,
          position: i,
          matched: false
        })
      } else {
        cardList.value.push({
          value: 1,
          position: i,
          matched: false
        })
      }
    }

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
  margin-top: 60px;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(4, 100px);
  grid-row-gap: 30px;
  grid-column-gap: 30px;
  justify-content: center;
}
</style>
