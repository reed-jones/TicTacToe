import { Game } from './'

class GamesRoom {
  static _games = []

  static AddGame(game) {
    this._games = [...this._games, game]
    // this._games.push(game)

    game.startGame()
  }
  static get Games() {
    return this._games
  }
  static get GamesCount() {
    return this._games.length
  }
  static RemoveGame(game) {
    this._games = this._games.filter(g => g.id !== game.id)
  }
  static RemoveGameById(gameID) {
    this._games = this._games.filter(g => g.id !== id)
  }
  static HasGame(game) {
    return this._games.find(g => g.id === game.id) !== undefined
  }
}

class Lobby {
  static _games = []
  static AddPlayer(player) {
    if (this._games.length) {
      this.BeginGame(player)
    } else {
      this.AddGame(new Game(player))
    }
  }
  static get Games() {
    return this._games
  }
  static AddGame(game) {
    this._games = [game]
  }
  static RemoveGame(game) {
    this._games = this._games.filter(g => g.id !== game.id)
  }
  static HasGame(game) {
    return this._games.find(g => g.id === game.id) !== undefined
  }
  static BeginGame(playerTwo) {
    let game = this._games[0]
    game.playerTwo = playerTwo
    GamesRoom.AddGame(game)
    Lobby.RemoveGame(game)
  }
}

export { GamesRoom, Lobby }
