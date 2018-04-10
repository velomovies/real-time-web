(function () {

  const tones = ['C', 'CIS', 'D', 'DIS', 'E', 'F', 'FIS', 'G', 'GIS', 'A', 'AIS', 'B', 'C2']

  const socket = io()

  const piano = document.querySelector('.piano')

  let i = 0

  piano.addEventListener('click', function() {
    clearTimeout()
    i++
    setTimeout(function () {
      i = 0
    }, 500)
    
    if (i > 2) {
      piano.classList.add('hidden')
      setTimeout(function () {
        i = 0
        piano.classList.remove('hidden')
      }, 3000)
    }

    console.log(i)
  })

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

