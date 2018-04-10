(function () {

  const tones = ['C', 'CIS', 'D', 'DIS', 'E', 'F', 'FIS', 'G', 'GIS', 'A', 'AIS', 'B', 'C']

  const socket = io()

  const piano = document.querySelector('.piano')

  // const form = document.querySelector('form')
  // const messages = document.querySelector('#messages')
  // let input = document.querySelector('#m')

  // form.addEventListener('submit', function (e) {
  //   e.preventDefault()
  //   socket.emit('chat message', input.value)
  //   input.value = ''
  // })

  function startTone(tone) {
    const pianoTone = new Audio(`../music/${tone}.wav`)
    pianoTone.play()
  }

  tones.forEach(function (tone) {
    const button = document.createElement('button')
    const buttonText = document.createTextNode(tone)

    button.appendChild(buttonText)

    button.addEventListener('click', function (e) {
      socket.emit('piano tone', tone)
      startTone(tone)
    })
    piano.appendChild(button)
  })

  socket.on('piano tone', function(tone){
    startTone(tone)
  })

}) ()

