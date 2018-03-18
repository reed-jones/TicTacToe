import Vue from 'vue'
import App from './App.vue'

const URL = 'localhost:8000'

window.ws = new WebSocket(`ws://${URL}`)
// event emmited when connected
ws.onopen = () => {
  console.log('websocket is connected ...')
  // sending a send event to websocket server
  const status = 'connected'
  ws.send(JSON.stringify({ status }))
}

new Vue({
  el: '#app',
  render: h => h(App),
})
