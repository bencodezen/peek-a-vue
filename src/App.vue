<template>
  <h1>Peek-a-Vue</h1>
  <section class="game-board">
    <Card v-for="card in cardList" :key="card.value" :card="card" />
  </section>
</template>

<script>
import { ref } from 'vue'
import Card from './components/Card'

export default {
  name: 'App',
  components: {
    Card
  },
  setup() {
    const cardList = ref([])

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value: i
      })
    }

    return {
      cardList
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
