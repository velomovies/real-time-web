(function () {

  const tones = [{value:'C', color:'white', key:'z'}, {value:'CIS', color:'black', key:'s'}, {value:'D', color:'white', key:'x'}, {value:'DIS', color:'black', key:'d'}, {value:'E', color:'white', key:'c'}, {value:'F', color:'white', key:'v'}, {value:'FIS', color:'black', key:'g'}, {value:'G', color:'white', key:'b'}, {value:'GIS', color:'black', key:'h'}, {value:'A', color:'white', key:'n'}, {value:'AIS', color:'black', key:'j'}, {value:'B', color:'white', key:'m'}, {value:'C2', color:'white', key:','}]

  const socket = io()

  const notesColor = document.querySelector('.notes')
  const checkBox = document.querySelector('#change')
  const checkBoxLabel = document.querySelector('#change + label')

  const piano = document.querySelector('.piano')
  const main = document.querySelector('main')
  const color = main.className

  let i = 0

  function antiSpam (e) {
    clearTimeout(function () {
      i = 0
    }, 500)
   
    i++

    setTimeout(function () {
      i = 0
    }, 500)
    
    if (i > 2) {
      e.target.disabled = true;
      setTimeout(function () {
        e.target.disabled = false;
      }, 2000)
    }
  }

  function pushNote (tone) {
    const div = document.createElement('div')
    div.classList.add('piano-note')
    div.style.backgroundColor = tone.user
    div.style.left = getPos(tone) + 'px'
    div.style.top = (checkAmount(tone) * 48) + 'px'
    notesColor.appendChild(div)
  }

  function checkAmount (tone) {
    let newAmount

    tones.forEach(function(oneTone) {
      if (checkBox.checked) {
        newAmount = oneTone.amount++
      } else if (tone.value === oneTone.value) {
        newAmount = oneTone.amount++
      }
    })

    if (newAmount > 8) {
      const topDivs = document.querySelectorAll('.piano-note')

      topDivs.forEach(function (div) {
        if (div.getBoundingClientRect().top === 0) {
          div.style.opacity = '0'
          setTimeout(function () {
            div.parentNode.removeChild(div)
          }, 500)
        }
        setTimeout(function () {
          let divNumber = Number(div.style.top.split('px')[0])
          div.style.top = (divNumber - 48) + 'px'
        }, 250)
      })
      newAmount = 8
      tone.amount = 10

      tones.forEach(function (oneTone) {
        if (oneTone.amount > 0) {
          oneTone.amount = oneTone.amount - 1
        }
      })
    }

    return newAmount
  }

  function getPos (tone) {
    let activatedButtons = piano.querySelectorAll('button')
    let pos
    activatedButtons.forEach(function (button) {
      if(button.dataset.key === tone.value) {
        pos = button.getBoundingClientRect().x
      }
    })
    return pos
  }

  function startTone (tone) {
    const pianoTone = new Audio(`../music/${tone.value}.wav`)
    pianoTone.play()
  }

  tones.forEach(function (tone) {
    const button = document.createElement('button')
    const keyboard = document.createElement('kbd')
    const keyboardText = document.createTextNode(tone.key)
    const buttonText = document.createTextNode(tone.value)

    tone.user = color
    tone.amount = 0

    keyboard.appendChild(keyboardText) 
    button.appendChild(buttonText)
    button.appendChild(keyboard)
    button.classList.add(tone.color)
    button.dataset.key = tone.value
    button.addEventListener('click', function (e) {
      e.target.classList.add('active')
      setTimeout(function () {
        e.target.classList.remove('active')
      }, 300)
      socket.emit('piano tone', {value: tone.value, user: color})
      startTone(tone)
      pushNote(tone)
      antiSpam(e)
    })
    piano.appendChild(button)
  })

  socket.on('piano tone', function(tone) {
    startTone(tone)
    pushNote(tone)
  })

  checkBox.addEventListener('change', function(e) {
    if(e.target.checked === true) {
      checkBoxLabel.innerHTML = 'Block mode'
    } else {
      checkBoxLabel.innerHTML = 'Side by side'
    }   
  })

  window.addEventListener('keydown', function (e) {
    switch (e.key) {
      case 'z':
        document.querySelector('[data-key="C"]').click()
      break
      case 's':
        document.querySelector('[data-key="CIS"]').click()
      break
      case 'x':
        document.querySelector('[data-key="D"]').click()
      break
      case 'd':
        document.querySelector('[data-key="DIS"]').click()
      break
      case 'c':
        document.querySelector('[data-key="E"]').click()
      break
      case 'v':
        document.querySelector('[data-key="F"]').click()
      break
      case 'g':
        document.querySelector('[data-key="FIS"]').click()
      break
      case 'b':
        document.querySelector('[data-key="G"]').click()
      break
      case 'h':
        document.querySelector('[data-key="GIS"]').click()
      break
      case 'n':
        document.querySelector('[data-key="A"]').click()
      break
      case 'j':
        document.querySelector('[data-key="AIS"]').click()
      break
      case 'm':
        document.querySelector('[data-key="B"]').click()
      break
      case ',':
        document.querySelector('[data-key="C2"]').click()
      break
    }
  })

}) ()

