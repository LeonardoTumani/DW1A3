// Random numbers
var randSpawn
var randSpawnMs = 10
var randPosition
var randWaspSize
var randWaspSpeedX
var randWaspSpeedY

// IDs of the spawned and despawned wasps
var spawnedWasp
var spawnedWaspID
var spawnedWaspSize
var spawnedWaspSpeedX
var spawnedWaspSpeedY
var despawnedWasp
var despawnedWaspID

// Wasp counting variables
var arrayWasps = []
var dictWaspSpeedX = {}
var dictWaspSpeedY = {}
var dictWaspPosition = {}
var dictWaspSize = {}
var howManyWasps = 0
var waspCounter = 0

var waspSizeVariation = 20
var waspMaxQuantity = 80

var waspMaxSpeedX = 8
var waspMinSpeedX = 4

var waspMaxSpeedY = 3
var waspMinSpeedY = 0



function spawnWasp() {
    // Random chance of spawning a new wasp
    if (gameUpdateCount % randSpawnMs == 0) {
        randSpawn = Math.floor(Math.random() * 2) + 1
    }

    if (randSpawn == 1) {
        randSpawn = 0
        waspCounter += 1

        howManyWasps = arrayWasps.length

        // Despawn the first wasp in the array if there are more wasps than the specified number
        if (howManyWasps >= waspMaxQuantity) {
            despawnedWasp = document.getElementById(arrayWasps[0])
            despawnedWaspID = despawnedWasp.id

            // Delete the wasp from the array
            arrayWasps.shift()
            howManyWasps = arrayWasps.length

            // Delete the wasp from the wasp properties' dictionary
            delete dictWaspSpeedX[despawnedWaspID]
            delete dictWaspSpeedY[despawnedWaspID]
            delete dictWaspPosition[despawnedWaspID]
            delete dictWaspSize[despawnedWaspID]

            // Remove the wasp from the screen
            screen.removeChild(despawnedWasp)
        }

        // Spawn next wasp
        spawnedWasp = document.createElement('img')
        spawnedWasp.src = './Components/images/wasp-gif.gif'
        spawnedWasp.className = 'wasp'
        spawnedWaspID = spawnedWasp.id = 'wasp' + waspCounter

        // Set spawned wasp size and speed 
        randWaspSize = Math.floor(Math.random() * (waspSizeVariation * 2))
        spawnedWaspSize = spawnedWasp.style.width = beeWidth - waspSizeVariation + randWaspSize + 'px'

        spawnedWaspSpeedX = randWaspSpeedX = Math.floor(Math.random() * waspMaxSpeedX) + waspMinSpeedX
        spawnedWaspSpeedY = randWaspSpeedY = Math.floor(Math.random() * waspMaxSpeedY) + waspMinSpeedY
        spawnedWaspSpeedY *= Math.round(Math.random()) ? 1 : -1

        // Set spawned wasp position
        screen.appendChild(spawnedWasp)
        spawnedWasp.style.left = screenWidth + 100 + 'px'

        randPosition = Math.floor(Math.random() * (screenTop - (waspSizeVariation)) + screenBottom)
        spawnedWasp.style.bottom = randPosition + 'px'

        // Add spawned wasp to the array
        arrayWasps.push(spawnedWaspID)
        howManyWasps = arrayWasps.length

        // Add spawned wasp to the wasp properties' dictionary
        dictWaspSpeedX[spawnedWaspID] = spawnedWaspSpeedX
        dictWaspSpeedY[spawnedWaspID] = spawnedWaspSpeedY
        dictWaspPosition[spawnedWaspID] = randPosition
        dictWaspSize[spawnedWaspID] = spawnedWaspSize
    }
}

function despawnAllWasps() {
    while (howManyWasps >= 1) {
        deletedWasp = document.getElementById(arrayWasps[0])
        deletedWaspID = deletedWasp.id

        // Delete the wasp from the array
        arrayWasps.shift()
        howManyWasps = arrayWasps.length

        // Delete the wasp from the wasp properties' dictionary
        delete dictWaspSpeedX[deletedWaspID]
        delete dictWaspSpeedY[deletedWaspID]
        delete dictWaspPosition[deletedWaspID]
        delete dictWaspSize[deletedWaspID]

        // Remove the wasp from the screen
        screen.removeChild(deletedWasp)
    }
}

// The current iteration's wasp's properties 
var currentWaspSpeedX
var currentWaspSpeedY
var currentWasp
var currentWaspID
var currentWaspY
var currentWaspX

function moveWasps() {
    for (im = 0; im < howManyWasps; im++) {
        currentWasp = document.getElementById(arrayWasps[im])
        currentWaspID = currentWasp.id

        currentWaspSpeedX = dictWaspSpeedX[currentWaspID]
        currentWaspX = currentWasp.offsetLeft - currentWaspSpeedX
        currentWasp.style.left = currentWaspX + 'px'

        currentWaspSpeedY = dictWaspSpeedY[currentWaspID]
        currentWaspY = dictWaspPosition[currentWaspID] - currentWaspSpeedY
        currentWasp.style.bottom = currentWaspY + 'px'

        dictWaspPosition[currentWaspID] = currentWaspY

        
    }
}