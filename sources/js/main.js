(function () {

  const tones = [{value:'C', color:'white'}, {value:'CIS', color:'black'}, {value:'D', color:'white'}, {value:'DIS', color:'black'}, {value:'E', color:'white'}, {value:'F', color:'white'}, {value:'FIS', color:'black'}, {value:'G', color:'white'}, {value:'GIS', color:'black'}, {value:'A', color:'white'}, {value:'AIS', color:'black'}, {value:'B', color:'white'}, {value:'C2', color:'white'}]

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
    }, 1000)
   
    i++

    setTimeout(function () {
      i = 0
    }, 1000)
    
    if (i > 2) {
      e.target.disabled = true;
      setTimeout(function () {
        e.target.disabled = false;
      }, 3000)
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
      if(button.innerHTML === tone.value) {
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
    const buttonText = document.createTextNode(tone.value)

    tone.user = color
    tone.amount = 0

    button.appendChild(buttonText)
    button.classList.add(tone.color)
    button.addEventListener('click', function (e) {
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
    console.log(checkBoxLabel.innerHTML)
    console.log(e.target.checked)
    if(e.target.checked === true) {
      checkBoxLabel.innerHTML = 'Block mode'
    } else {
      checkBoxLabel.innerHTML = 'Side by side'
    }
    
    
  })

}) ()

