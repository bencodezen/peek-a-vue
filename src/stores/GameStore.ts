import { defineStore } from "pinia";
import createDeck from "../features/createDeck";
import createGame from "../features/createGame";
import halloweenDeck from "../data/halloweenDeck.json";

export const useGameStore = defineStore('GameStore', {
   state: () => {
      const { cardList } = createDeck(halloweenDeck);
      const { newPlayer, startGame, restartGame, matchesFound, status } = createGame(
        cardList
      );

      return {
         cardList,
         newPlayer,
         startGame,
         restartGame,
         matchesFound,
         status,
      }
   }
})
