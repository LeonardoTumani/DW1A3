// Random numbers
var randSpawn
var randSpawnMs = 10
var randPosition
var randWaspSize
var randWaspSpeedX
var randWaspSpeedY

var soldierWaspSpawnChance = 0.5

// Function that spawns a different wasp randomly
function spawnDifferentWasp(chance) {
    return Math.random() < chance;
}

// IDs of the spawned and despawned wasps
var spawnedWasp
var spawnedWaspID
var spawnedWaspSize
var spawnedWaspType
var spawnedWaspSpeedX
var spawnedWaspSpeedY
var despawnedWasp
var despawnedWaspID

// Wasp counting variables
var arrayWasps = []
var dictWaspSize = {}
var dictWaspType = {}
var dictWaspSpeedX = {}
var dictWaspSpeedY = {}
var dictWaspPosition = {}
var howManyWasps = 0
var waspCounter = 0

var waspSizeVariation = 20

var waspMaxSpeedX = 8
var waspMinSpeedX = 4

var waspMaxSpeedY = 2
var waspMinSpeedY = 0

// Screen offset - the higher, the longer it takes for wasps to despawn after leaving the screen
var screenBounds = 80

// Max amount of wasps that can appear on the screen
var maxWaspQuantity = 80



function spawnWasp() {
    // Random chance of spawning a new wasp
    if (gameUpdateCount % randSpawnMs == 0) {
        randSpawn = Math.floor(Math.random() * 2) + 1
    }

    howManyWasps = arrayWasps.length

    if (randSpawn == 1 && howManyWasps <= maxWaspQuantity) {
        randSpawn = 0
        waspCounter += 1

        // Spawn next wasp
        spawnedWasp = document.createElement('img')

        if(spawnDifferentWasp(soldierWaspSpawnChance)) {
            spawnedWasp.src = soldierWaspImageSource
            spawnedWaspType = 'soldierWasp'
        } else {
            spawnedWasp.src = waspImageSource
            spawnedWaspType = 'wasp'
        }

        spawnedWasp.className = 'wasp'
        spawnedWaspID = spawnedWasp.id = 'wasp' + waspCounter

        // Set spawned wasp size and speed
        randWaspSize = Math.floor(Math.random() * (waspSizeVariation * 2))
        spawnedWaspSize = spawnedWasp.style.width = beeWidth - waspSizeVariation + randWaspSize + 'px'

        spawnedWaspSpeedX = randWaspSpeedX = (Math.random() * waspMaxSpeedX) + waspMinSpeedX
        spawnedWaspSpeedY = randWaspSpeedY = (Math.random() * waspMaxSpeedY) + waspMinSpeedY
        spawnedWaspSpeedY *= Math.round(Math.random()) ? 1 : -1

        // Set spawned wasp position
        screen.appendChild(spawnedWasp)
        spawnedWasp.style.left = screenWidth + screenBounds + 'px'

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
        dictWaspType[spawnedWaspID] = spawnedWaspType
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
    howManyWasps = arrayWasps.length

    for (im = 0; im < howManyWasps; im++) {        
        currentWasp = document.getElementById(arrayWasps[im])
        currentWaspID = currentWasp.id

        currentWaspSpeedX = dictWaspSpeedX[currentWaspID]
        currentWaspX = currentWasp.offsetLeft - currentWaspSpeedX
        currentWasp.style.left = currentWaspX + 'px'

        currentWaspY = dictWaspPosition[currentWaspID]
        currentWaspSpeedY = dictWaspSpeedY[currentWaspID]
        currentWaspY -= currentWaspSpeedY
        currentWasp.style.bottom = currentWaspY + 'px'

        dictWaspPosition[currentWaspID] = currentWaspY

        rotateSprite(currentWasp, currentWaspSpeedY)
    }
}

var waspOutOfBounds
var despawnedWaspIndex
var despawnedWaspY

function despawnWasps() {
    howManyWasps = arrayWasps.length

    for (ids = 0; ids < howManyWasps; ids++) {   
        despawnedWasp = document.getElementById(arrayWasps[ids])
        despawnedWaspID = despawnedWasp.id

        despawnedWaspY = dictWaspPosition[despawnedWaspID]

        waspOutOfBounds = (despawnedWasp.offsetLeft < -screenBounds || despawnedWaspY < -screenBounds)
    
        if (waspOutOfBounds) {
            // Delete the wasp from the array
            despawnedWaspIndex = arrayWasps.indexOf(despawnedWaspID)

            arrayWasps.splice(despawnedWaspIndex, 1)
            howManyWasps = arrayWasps.length

            // Delete the wasp from the wasp properties' dictionary
            delete dictWaspSpeedX[despawnedWaspID]
            delete dictWaspSpeedY[despawnedWaspID]
            delete dictWaspPosition[despawnedWaspID]
            delete dictWaspSize[despawnedWaspID]
            delete dictWaspType[despawnedWaspID]

            // Remove the wasp from the screen
            screen.removeChild(despawnedWasp)
        }
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
        delete dictWaspType[deletedWaspID]

        // Remove the wasp from the screen
        screen.removeChild(deletedWasp)
    }
}