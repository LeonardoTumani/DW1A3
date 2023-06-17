addEventListener('DOMContentLoaded', setScreen)

// Elements of the game
var bee = document.getElementById('bee')
var screen = document.getElementById('screen')
var startScreen = document.getElementById('start-screen')
var restartScreen = document.getElementById('restart-screen')

// NodeLists of the game
var p = document.querySelectorAll('p')
var span = document.querySelectorAll('span')
var button = document.querySelectorAll('button')

var screenHeight
var screenWidth
var screenOffsetTop
var screenTop
var screenBottom

var positionX = 0

var ratio
var VHorVW

var modalHeight = 6
var modalWidth = 6
var fontSizeMultiplier



// Adjusts the screen every game tic
function adjustScreen() {
    adjustDevice()

    screenHeight = screen.clientHeight
    screenWidth = screen.clientWidth
    screenOffsetTop = 10
    screenTop = screenHeight - beeHeight + screenOffsetTop
    screenBottom = -4

    // Moves the background slightly to the left every game tic
    positionX -= 2
    screen.style.backgroundPosition = positionX + 'px 0px'

    if (screenHeight > screenWidth) {
        ratio = screenHeight / screenWidth
        VHorVW = 'vh'
    } else {
        ratio = screenWidth / screenHeight
        VHorVW = 'vw'
    }

    ratio = Math.min(10, Math.min(5, 15 / ratio))

    startScreen.style.height = ratio * modalHeight + VHorVW
    startScreen.style.width = ratio * modalWidth + VHorVW

    restartScreen.style.height = ratio * modalHeight + VHorVW
    restartScreen.style.width = ratio * modalWidth + VHorVW

    setNodeElementsSize(p, 0.5)
    setNodeElementsSize(span, 0.7)
    setNodeElementsSize(button, 0.6)

    scoreText.style.fontSize = ratio * 0.7 + VHorVW
}

function setNodeElementsSize(elementNodeList, fontSizeMultiplier) {
    elementNodeList.forEach(element => {
        element.style.fontSize = ratio * fontSizeMultiplier + VHorVW
    })
}

var gameReset = false

// Sets the screen once the game is started
function setScreen() {
    adjustScreen()

    bee.style.width = beeWidth + 'px'
    bee.style.bottom = screenBottom + 'px'
    bee.src = './Components/images/bee-gif.gif'
    beeY = screenBottom
}

var gameUpdateIntervalID