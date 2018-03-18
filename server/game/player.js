import uuidv1 from 'uuid/v1'

class Player {
  constructor(socket) {
    // save socket connection
    this._socket = socket

    // generate unique timebased id
    this._id = uuidv1()

    // has not yet joined a game
    this._gameId = false
  }
  set nick(nickname) {
    // not yet implimented
    this._nick = nickname
  }
  get nick() {
    return this._nick
  }
  get id() {
    return this._id
  }
  get ws() {
    return this._socket
  }
  set gameId(id) {
    this._gameId = id
  }
  get gameId() {
    return this._gameId
  }
  set GameAction(action) {
    this._socket.on('message', action)
  }
  set DisconnectAction(action) {
    this._socket.on('close', action)
  }

  send(json) {
    this._socket.send(JSON.stringify(json))
    // this._socket.send(JSON.stringify(json), error => {
    //   if (error !== undefined) {
    //     console.log('error sending...')
    //     console.log(error)
    //   }
    // })
  }
  get available() {
    return this._socket.readyState === this._socket.OPEN
  }
  terminate() {
    this._socket.terminate()
  }
}

export { Player }
