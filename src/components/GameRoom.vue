<template>
  <!-- <div>Room name: {{ roomStore.name }}</div> -->

  <div
    v-if="
      roomStore.gameState &&
      roomStore.gameState.isGameLive &&
      !roomStore.gameState.winner
    "
    class="board"
  >
    <div
      v-for="(player, index) in enemyPlayers"
      :key="player.id"
      class="hand-container hand-container--enemy"
    >
      <div class="hand">
        <Card
          v-for="(card, cardId, index) in player.hand"
          class="hand__card"
          :style="cardAngleComputedStyles[player.id][index]"
          :key="cardId"
          is-back
        />
      </div>
    </div>

    <div class="board__play-zone">
      <div class="deck-container">
        <p>Cards remaining: {{ roomStore.gameState.deck.cards.length }}</p>
        <div class="deck-container__deck">
          <Card is-back />
          <Card
            class="deck-container__trump"
            :suit="roomStore.gameState.deck.trump.suit"
            :label="roomStore.gameState.deck.trump.label"
          />
        </div>
      </div>

      <div
        v-for="card in roomStore.gameState.openedCards"
        :key="card.id"
        :suit="card.suit"
        :label="card.label"
        class="skirmish-card-container"
      >
        <Card :suit="card.attack.suit" :label="card.attack.label" />
        <Card
          v-if="card.defend"
          class="skirmish-card-container__defend-card"
          :suit="card.defend.suit"
          :label="card.defend.label"
        />
      </div>

      <div class="board__controls">
        <div v-if="isUserTurn">YOUR TURN</div>
        <Button
          v-if="
            roomStore.gameState.isGameLive &&
            isUserTurn &&
            !userPlayer.isAttacker
          "
          title="Take home"
          @click="handleTakeHome"
        />
        <Button
          v-if="isEndTurnVisible"
          @click="handleEndTurn"
          title="End Turn"
        />
      </div>
    </div>

    <div class="hand-container">
      <div class="hand">
        <Card
          v-for="(card, cardId, index) in userPlayer.hand"
          class="hand__card"
          @click="handleCardPlace(userPlayer, card, index)"
          :style="cardAngleComputedStyles[userPlayer.id][index]"
          :key="cardId"
          :suit="card.suit"
          :label="card.label"
        />
      </div>
    </div>
  </div>

  <!-- <div>
      BOARD PLAY:
      <div
        v-for="card in roomStore.gameState.openedCards"
        :key="card.id"
        :suit="card.suit"
        :label="card.label"
        class="skirmish-card-container"
      >
        <Card :suit="card.attack.suit" :label="card.attack.label" />
        <Card
          v-if="card.defend"
          class="skirmish-card-container__defend-card"
          :suit="card.defend.suit"
          :label="card.defend.label"
        />
      </div>
    </div>

    <div v-if="roomStore.gameState.isGameLive">
      TRUMP:
      <Card
        :suit="roomStore.gameState.deck.trump.suit"
        :label="roomStore.gameState.deck.trump.label"
      />
    </div>

    <div>
      DECK CARDS:
      <div class="hand" v-if="roomStore.gameState.deck.cards">
        <Card
          v-for="card in roomStore.gameState.deck.cards"
          :key="card.id"
          :suit="card.suit"
          :label="card.label"
        />
      </div>
      DISCARDED CARDS:
      <div class="hand">
        <Card
          v-for="discardedCard in roomStore.gameState.discardedCards"
          :key="discardedCard.id"
          :suit="discardedCard.suit"
          :label="discardedCard.label"
        />
      </div>
    </div>

  </div>

  <div v-if="roomStore.gameState.winner">
    WINNER IS {{ roomStore.gameState.winner.name }}
  </div>
  -->

  <div class="lobby" v-if="!roomStore.gameState.isGameLive">
    <div class="lobby__players">
      <h4>Players:</h4>
      <div v-for="player in roomStore.gameState.players" :key="player.id">
        <span>{{ player.name }}</span>
        <span v-if="player.isReady">✓</span>
      </div>
    </div>
    <h1 class="lobby__crypto-amount">
      MATIC: {{ roomStore.gameState.cryptoAmount }}
    </h1>
    <div>
      <Button title="Ready" @click="roomStore.ready" />

      <Button title="Leave room" @click="roomStore.leaveRoom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from "./Card.vue";
import { useRoomStore, COMMANDS } from "@/stores/room";
import { useUserStore } from "@/stores/user";
import { computed, onMounted, ref } from "vue";
import Button from "./Button.vue";

const roomStore = useRoomStore();
const userStore = useUserStore();

// const onCardHover = (index) => {
//   cardAngles.value[index] = {
//     ...cardAngles.value[index],
//     transform: `rotate(${cardAngles.value[index].big}deg) translate(0, -10%)`,
//   };
//   console.log(event);
// };

// const onCardUnhover = (index) => {
//   cardAngles.value[index] = {
//     ...cardAngles.value[index],
//     transform: `rotate(${cardAngles.value[index].big}deg) translate(0, 0)`,
//   };
// };

const userPlayer = computed(
  () =>
    roomStore.gameState.players.filter(
      (player) => player.id === userStore.id
    )[0]
);

const enemyPlayers = computed(() =>
  roomStore.gameState.players.filter((player) => player.id !== userStore.id)
);

const isUserTurn = computed(
  () => roomStore.gameState.currentPlayer.id === userStore.id
);

const isUserAttacker = computed(
  () => isUserTurn.value && userPlayer.value.isAttacker
);

const isEndTurnVisible = computed(
  () => isUserTurn.value && isUserAttacker.value
);

const handleCardPlace = (player, card) => {
  const isUserCards = player.id === userStore.id;

  if (!isUserCards) {
    console.log("Its not your cards");

    return;
  }

  const command = player.isAttacker ? "attack" : "defend";

  roomStore.gameCommand(player, card, command);
};

const handleTakeHome = () => {
  roomStore.gameCommand(userPlayer.value, null, COMMANDS.TAKE_OPENED_CARDS);
};

const handleEndTurn = () => {
  roomStore.gameCommand(userPlayer.value, null, COMMANDS.END_TURN);
};

const cardAngleComputedStyles = computed(() => {
  const totalarc = 90;

  return roomStore.gameState.players.reduce((acc, curr) => {
    const numOfCards = Object.keys(curr.hand).length;

    const styles = Array(numOfCards)
      .fill("")
      .map((_, index) => {
        const angle =
          (totalarc / numOfCards) * (index + 1) -
          (totalarc / 2 + totalarc / numOfCards / 2);
        const margin = (120 / numOfCards) * (index + 1);

        return {
          transform: `rotate(${angle}deg)`,
          marginLeft: `${margin}px`,
          zIndex: index + 1,
        };
      });

    return {
      ...acc,
      [curr.id]: styles,
    };
  }, {});
});
</script>

<style lang="scss" scoped>
.board {
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  &__play-zone {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__controls {
    margin-left: auto;
  }
}
.hand {
  height: 17rem;
  width: 100%;
  display: flex;
  justify-content: center;

  &__card {
    transition: all 0.25s ease-in-out;
    position: absolute;
    transform-origin: bottom center;
    top: 0;
    cursor: pointer;

    &:hover {
      top: -10%;
    }
  }
}

.lobby {
  min-width: 70rem;

  &__players {
    background-color: $secondary-background;
    padding: 2.4rem 2.4rem 1rem 2.4rem;
    border-radius: 1rem;
    height: 100%;
    width: 60%;
    display: inline-block;
  }

  &__crypto-amount {
    margin-left: auto;
    display: inline-block;
  }
}

.deck-container {
  margin-right: 0;

  &__deck {
    position: relative;
  }

  &__trump {
    top: 50%;
    transform: translate(0, -50%) rotate(90deg);
    position: absolute;
    left: 4rem;
    z-index: -1;
  }
}

.hand-container {
  position: relative;
  height: 17rem;
  width: 100%;

  &--enemy {
    transform: rotate(180deg);
  }
}

.skirmish-card-container {
  position: relative;
  margin-left: auto;
  margin-right: auto;

  &__defend-card {
    position: absolute;
    top: 0px;
    left: 22px;
  }
}
</style>
