<script setup>
import Card from "./Card.vue";

defineProps({
  cardList: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const emits = defineEmits(["flip-card"]);

const selectCard = payload => {
  emits("flip-card", payload);
};
</script>

<template>
  <transition-group tag="section" class="game-board" name="shuffle-card">
    <Card
      v-for="card in cardList"
      :key="`${card.value}-${card.variant}`"
      :matched="card.matched"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      @select-card="selectCard"
    />
  </transition-group>
  <h2 class="status">{{ status }}</h2>
</template>

<style></style>
