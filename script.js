const game = document.getElementById('game')
const character = document.getElementById('character')
let aud = new Audio('game.mp3')
let audO = new Audio('over.mp3')

let interval;
let both = 0
let counter = 0
let currentBlocks = []

if (confirm('Ready to Play Fall Game! 🐦\nUse Left & Right key to guide wall down & prevent it from colliding with the Upper Wall!')
) {
    aud.play()
}
else (location.reload())

let blocks = setInterval(() => {
    var blockLast = document.getElementById('block' + (counter - 1))
    var holeLast = document.getElementById('block' + (counter - 1))
    var blockLastTop = 0
    var holeLastTop = 0

    if (counter > 0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue('top'))
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue('top'))
    }

    if (blockLastTop < 420 || counter == 0) {
        var block = document.createElement('div')
        var hole = document.createElement('div')

        block.setAttribute('class', 'block')
        hole.setAttribute('class', 'hole')

        block.setAttribute('id', 'block' + counter)
        hole.setAttribute('id', 'hole' + counter)

        block.style.top = blockLastTop + 100 + 'px'
        hole.style.top = holeLastTop + 100 + 'px'

        var random = Math.floor(Math.random() * 360)
        hole.style.left = random + 'px'

        game.appendChild(block)
        game.appendChild(hole)
        currentBlocks.push(counter)
        counter++
    }

    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    var drop = 0

    if (characterTop <= 0) {
        audO.play()
        aud.pause()
        confirm('Game Over! Score : ' + (counter - 9) + '\nPlay Again ?')
        clearInterval(blocks)
        location.reload()
    }

    for (let i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i]
        let ihole = document.getElementById('hole' + current)
        let iblock = document.getElementById('block' + current)

        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue('top'))
        let iholeTop = parseFloat(window.getComputedStyle(ihole).getPropertyValue('top'))
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue('left'))

        iblock.style.top = iblockTop - 0.5 + 'px'
        ihole.style.top = iholeTop - 0.5 + 'px'

        if (iblockTop < 0) {
            currentBlocks.shift()
            iblock.remove()
            ihole.remove()
        }
        if (iblockTop -40 <= characterTop && iblockTop > characterTop) {
            drop++
            if (iholeLeft <= characterLeft && iholeLeft + 20 > characterLeft) {
                drop = 0
            }
        }
    }
    if (drop == 0) {
        if (characterTop < 480) {
            character.style.top = characterTop + 2 + 'px'
        }
    } else {
        character.style.top = characterTop - 0.5 + 'px'
    }
}, 5)


function moveLeft() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    if (left > 0) {
        character.style.left = (left - 2) + 'px'
    }
}
function moveRight() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    if (left < 380) {
        character.style.left = (left + 2) + 'px'
    }
}

document.addEventListener('keydown', (e) => {
    if (both == 0) {
        both++
        if (e.key === 'ArrowLeft') {
            interval = setInterval(moveLeft, 5)
        }
        if (e.key === 'ArrowRight') {
            interval = setInterval(moveRight, 5)
        }
    }
})

document.addEventListener('keyup', () => {
    clearInterval(interval)
    both = 0
})

// hole.addEventListener('animationiteration', () => {
//     var random = -((Math.random() * 300) + 150)
//     // returns value from -450px to -150px - range valid is -500px to 0px
//     hole.style.top = random + 'px'
// })

// setInterval(() => {
//     var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
//     if (jumping == 0) {
//         character.style.top = (characterTop + 3) + 'px'
//     }
//     let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'))
//     let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue('top'))
//     let cTop = -(500-characterTop)
//     if( (characterTop>480) || ( (blockLeft<20) && (blockLeft>-50) && ((cTop<holeTop)||(cTop>holeTop+130)) )){
//         hole.classList.remove('animation')
//         block.classList.remove('animation')
//         audO.play()    
//         aud.pause()
//         aud.currentTime= 0
//         if(confirm(`Game Over! Your Score : ${score} \nPlay Again ?`)){
//             hole.classList.add('animation')
//             block.classList.add('animation')        
//             character.style.top = 100+'px';
//             jumpCount = 0
//             score = 0
//             aud.play()
//         }
//         else{
//             location.reload()
//         }
//     }
// }, 10);

// setTimeout(() => {
//     setInterval(() => {
//         score+=1
//     }, 2000);
// }, 2000);


// function jump() {
//     jumping = 1
//     let jumpCount = 0
//     var jumpInterval = setInterval(() => {
//         var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
//         if ((characterTop > 6) && (jumpCount < 15)) {
//             character.style.top = (characterTop - 5) + 'px'
//         }
//         if (jumpCount > 20) {
//             clearInterval(jumpInterval)
//             jumping = 0
//             jumpCount = 0
//         }
//         jumpCount++;
//     }, 10);
// }

// window.addEventListener('keydown', () => {
//     jump()
// })
