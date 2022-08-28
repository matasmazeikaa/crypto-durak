import { defineStore } from "pinia";
import { useSocket } from "@/hooks/useSocket";
import { useUserStore } from "@/stores/user";

export const COMMANDS = {
  ATTACK: "attack",
  DEFEND: "defend",
  TAKE_OPENED_CARDS: "take-opened-cards",
  END_TURN: "end-turn",
};

export const useRoomStore = defineStore({
  id: "room",
  state: () => ({
    id: "",
    name: "",
    players: [],
    gameState: {
      players: [],
      deck: {
        cards: [],
        trump: null,
      },
      discardedCards: [],
      openedCards: [],
      attacker: null,
      isGameLive: false,
      playerTurn: 0,
      currentPlayer: {
        id: null,
        name: null,
      },
      winner: null,
      cryptoAmount: 0,
    },
  }),
  getters: {
    isInRoom: (state) => !!state.id,
    isUserTurn: (state) => {
      const userStore = useUserStore();

      return state.gameState.currentPlayer.id === userStore.id;
    },
  },
  actions: {
    setPlayers(players) {
      this.players = players;
    },
    setRoom(room) {
      console.log(room);
      this.players = room.players;
      this.id = room.id;
      this.name = room.name;
      this.gameState = room.gameState;
    },
    leaveRoom() {
      const { leaveRoom } = useSocket();
      const userStore = useUserStore();

      leaveRoom(this.id, userStore.id);

      this.id = "";
      this.name = "";
      this.players = [];
    },
    updateRoomState(room) {},
    gameCommand(player: any, card: any, command) {
      const { gameCommand } = useSocket();
      const userStore = useUserStore();

      console.log(userStore.id);
      console.log(player.id);

      if (!this.isUserTurn) {
        console.log("Wrong Cards");
        return;
      }

      // if (playerIndex !== this.gameState.playerTurn) {
      //   console.log("Not your turn!");
      //   return;
      // }

      gameCommand(this.id, command, player, card);
    },
    startGame() {
      const { startGame } = useSocket();

      startGame(this.id);
    },
    ready() {
      const { readyRoom } = useSocket();

      readyRoom(this.id);
    },
  },
});
