import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import http from 'http'
import url from 'url'
import WebSocket from 'ws'
import { Game, Player, GamesRoom, Lobby } from './game'

dotenv.config()
const app = express()
const port = process.env.SERVER_PORT || 8080
process.title = process.env.APP_NAME || 'TicTacToe'

app.use(express.static(path.join(__dirname, '../dist')))
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

// let gamesPlaying = []
// let gamesLobby = []
// let clients = []
wss.on('connection', function connection(ws, req) {
  // const location = url.parse(req.url, true)
  // let player =

  Lobby.AddPlayer(new Player(ws))

  displayStats()
})

server.listen(port, () => {
  console.log(`Magic happens on port ${port}`)
})

function displayStats() {
  let inGame = GamesRoom.GamesCount
  let inLobby = Lobby.Games.length
  console.log('game count: ' + inGame)
  console.log('in lobby: ' + inLobby)
  console.log('total players: ' + (inGame * 2 + inLobby))
}
