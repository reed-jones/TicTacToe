<template lang="pug">
div
  .board
    span.row(v-for='(r, row) in board')
      game-tile(
        v-for='(c, column) in r'
        :value='board[row][column]'
        :row='row'
        :column='column'
        @makeMove='moveMade')
  .next-player(v-if='status === "playing"') You: {{ visual[player] }} | Turn: {{ visual[turn] }}
  .next-player(v-else-if='status === "game-over"' @click='resetGame') Winner: {{ visual[winner] }}
  .next-player(v-else-if='status === "waiting"') Waiting...
  .next-player(v-else-if='status === "new-game"' @click='resetGame') New Game
</template>

<script>
import GameTile from './GameTile'

export default {
  name: 'BoardGame',
  components: {
    GameTile,
  },
  data: () => ({
    board: [],
    rows: 3,
    turn: 1,
    visual: ['', '❌', '⭕', '✔️'],
    player: 0,
    statuses: ['waiting', 'playing', 'game-over', 'new-game'],
    status: 'new-game',
    winner: 0,
  }),
  mounted() {
    ws.onmessage = this.handleWebSocket
  },
  methods: {
    handleWebSocket(e) {
      let json = JSON.parse(e.data)
      console.log(json)
      if (json.status) {
        if (json.status === 'playing' && json.size) {
          this.setupBoard(json.size)
        } else if (json.status === 'waiting') {
          this.board = []
        }

        this.status = json.status
      }
      if (json.turn) {
        this.turn = json.turn
      }
      if (json.player) {
        this.player = json.player
      }
      if (json.board) {
        this.board = json.board
      }
      if (json.winner) {
        this.winner = json.winner
      }
    },
    setupBoard(size) {
      this.rows = size
      this.board = []
      for (let i = 0; i < size; ++i) {
        let row = []
        for (let j = 0; j < size; ++j) {
          row.push(0)
        }
        this.board.push(row)
      }
    },
    resetGame() {
      const status = 'reset-game'

      this.send({ status })
    },
    moveMade(tile) {
      if (
        this.status === 'playing' &&
        this.player === this.turn &&
        !this.board[tile.row][tile.column]
      ) {
        const { row, column } = tile
        const status = 'player-move'
        const player = this.player

        this.send({
          status,
          player,
          row,
          column,
        })
      }
    },
    send(json) {
      ws.send(JSON.stringify(json))
    },
  },
}
</script>


<style lang="stylus" scoped>
.board
  height        530px
  width         530px
  background    #666
  padding       10px
  border-radius 5px
  margin        0 auto
  box-shadow    inset 2px 2px 25px 5px darken(#666, 25%),
                2px 2px 25px 5px darken(#666, 25%)
  .row
    display         flex
    flex-flow       row wrap
    align-items     center
    justify-content center
.next-player
  text-align  center
  margin-top  25px
  font-size   25px
</style>

