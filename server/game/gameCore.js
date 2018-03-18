import uuidv1 from 'uuid/v1'
import { GamesRoom, Lobby } from './'
// import { send } from './utilities'

class Game {
  constructor(player) {
    // game id
    this._id = uuidv1()
    // random pick first player
    this._turn = Math.floor(Math.random() * 2) + 1
    // winner = 0 until someone wins
    this._winner = 0

    const status = 'waiting'
    this._status = status

    // set game related socket actions
    player.GameAction = this.gameAction
    player.DisconnectAction = this.disconnectAction

    player.gameId = this._id
    player.send({ status })
    this._playerOne = player

    // width/height of board
    this._size = 3

    this.initializeBoard()
  }
  initializeBoard() {
    // generate blank board filled with 0's
    // [
    //  [0, 0, 0]
    //  [0, 0, 0]
    //  [0, 0, 0]
    // ]
    this._board = []
    for (let i = 0; i < this._size; ++i) {
      let row = []
      for (let j = 0; j < this._size; ++j) {
        row.push(0)
      }
      this._board.push(row)
    }
  }
  set playerTwo(player) {
    this._status = 'playing'
    player.gameId = this._id
    player.GameAction = this.gameAction
    player.DisconnectAction = this.disconnectAction
    this._playerTwo = player
  }
  get playerOne() {
    return this._playerOne
  }
  get playerTwo() {
    return this._playerTwo
  }
  get boardSize() {
    return this._size
  }
  get turn() {
    return this._turn
  }
  get id() {
    return this._id
  }
  gameAction = message => {
    let result = ''
    try {
      result = JSON.parse(message)
      // console.log(result)

      if (result && result.status) {
        switch (result.status) {
          case 'player-move':
            if (result.row >= 0 && result.column >= 0) {
              // console.log('move')
              this.makeMove(result.row, result.column)
              this.nextTurn()
              this.notify()
            }
            break
          case 'reset-game':
            // leave and join lobby
            break
        }
      }
    } catch (e) {
      console.log(e)
      console.log('NOT VALID JSON')
      console.log(message)
    }
  }
  disconnectAction = e => {
    if (GamesRoom.HasGame(this)) {
      GamesRoom.RemoveGame(this)

      let remainingPlayer = this._playerOne.available
        ? this._playerOne
        : this._playerTwo.available ? this._playerTwo : false
      if (remainingPlayer) {
        remainingPlayer.send({ status: 'waiting' })
        Lobby.AddPlayer(remainingPlayer)
      } else {
        console.log('gameCore.js[line 106]: no player is available')
      }
    } else if (Lobby.HasGame(this)) {
      console.log('gameCore.js[line 109]: lobby disconnect')
      Lobby.RemoveGame(this)
    }
  }
  nextTurn() {
    this._turn = this._turn % 2 + 1
  }
  hasPlayer(player) {
    return (
      (this.playerOne && player.id === this.playerOne.id) ||
      (this.playerTow && player.id === this.playerTwo.id)
    )
  }
  makeMove(row, column) {
    if (this._status !== 'playing') return

    this._board[row][column] = this._turn

    let winner = this.checkWins()
    if (winner) {
      this._status = 'game-over'
      this._winner = winner
    }
  }
  notify() {
    const shared = {
      status: this._status,
      turn: this._turn,
      board: this._board,
      winner: this._winner,
    }
    if (this._playerOne.available) {
      this._playerOne.send({ ...shared, player: 1 })
    } else {
      console.log('NO PLAYER ONE')
    }
    if (this._playerTwo.available) {
      this._playerTwo.send({ ...shared, player: 2 })
    } else {
      console.log('NO PLAYER TWO')
    }
  }
  checkWins() {
    let diagonal = [],
      backDiagonal = []

    // for (let i = 0; i < this._size; ++i) {
    for (const i in this._board) {
      let row = [],
        column = []

      // for (let j = 0; j < this._size; ++j) {
      for (const j in this._board[i]) {
        row = [...row, this._board[i][j]]
        column = [...column, this._board[j][i]]
      }

      diagonal = [...diagonal, this._board[i][i]]
      backDiagonal = [...backDiagonal, this._board[i][this._size - 1 - i]]

      if (!!row.reduce((a, b) => (a === b ? a : NaN))) {
        return this._board[i][0]
      }

      if (!!column.reduce((a, b) => (a === b ? a : NaN))) {
        return this._board[0][i]
      }
    }

    if (!!diagonal.reduce((a, b) => (a === b ? a : NaN))) {
      return this._board[0][0]
    }

    if (!!backDiagonal.reduce((a, b) => (a === b ? a : NaN))) {
      return this._board[0][this._size - 1]
    }

    return false
  }
  startGame() {
    console.log('gameCore.js[line 217]: game started')
    let turn = this._turn
    let status = 'playing'
    let size = this._size

    this._playerOne.send({ status, turn, size, player: 1 })
    this._playerTwo.send({ status, turn, size, player: 2 })
  }
}

export { Game }
