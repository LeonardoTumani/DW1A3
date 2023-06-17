function startGame() {
    setScreen()
    document.getElementById('score').classList.add('active')
    
    if (gameReset == false) {
        document.getElementById('start-screen').classList.remove('active')
    } else {
        despawnAllWasps()
        score = 0
        document.getElementById('restart-screen').classList.remove('active')
    }

    gameReset = true
    gameUpdateIntervalID = setInterval(gameUpdate, gameUpdateMs)
}

var gameUpdateCount = 0

function gameUpdate() {
    gameUpdateCount++

    adjustScreen()
    adjustDevice()
    updateScore()
    movePlayer()
    spawnWasp()
    moveWasps()
    detectCollision()
}

function gameOver() {
    clearInterval(gameUpdateIntervalID)
    recordUpdate()

    document.getElementById('restart-screen').classList.add('active')
    document.getElementById('score').classList.remove('active')
}

var record = localStorage.getItem('record')
var restartScoreText = document.getElementById('restart-score')
var topScoreText = document.getElementById('top-score')


function recordUpdate() {
    if (scoreShown > record) {
        record = scoreShown
        localStorage.setItem('record', record)
    }

    topScoreText.textContent = 'Your top score: ' + record
    restartScoreText.textContent = 'Your score: ' + scoreShown
}