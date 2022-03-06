let guessContainer = document.getElementById("guessContainer")
let startButton = document.getElementById("startButton")
let wordButton = document.getElementById("wordButton")
let possibleWords = ["baby","clarify","imposter","peanut","discrimination","scheme","retiree","world","swarm","brain","quote","run","turn","goalkeeper","husband","problem","prey","headline","pig","order","quarter","density","sell","dose","no","bomb","sheep","emotion","language","agent","referee","voyage","basin","accessible","ministry","queen","persist","access","flawed","strategic","observer","grandfather","copy","corruption","torture","city","interactive","pole","bronze","pledge"]
let yourGuessContainer = document.getElementById("yourGuessContainer")
let yourGuessField = document.getElementById("yourGuess")
let chosenWord = ""
let usedLetters = []
let usedLettersContainer = document.getElementById("usedLetters")
let hp = 11
let hpContainer = document.getElementById("hp")
let resultContainer = document.getElementById("resultContainer")



hpContainer.parentNode.classList.add("d-none")
resultContainer.classList.add("d-none")
yourGuessContainer.classList.add("d-none")
guessContainer.classList.add("d-none")
usedLettersContainer.classList.add("d-none")
hpContainer.append(hp)

startButton.addEventListener("click",function(e){
    e.preventDefault()
    hpContainer.parentNode.classList.remove("d-none")
    resultContainer.classList.add("d-none")
    yourGuessContainer.classList.remove("d-none")
    yourGuessContainer.classList.add("d-flex")
    guessContainer.classList.remove("d-none")
    usedLettersContainer.classList.remove("d-none")
    yourGuessField.focus()
    usedLetters = []
    chosenWord = getWord()
    console.log(chosenWord)
    let childs = guessContainer.lastElementChild
    while (childs) {
        guessContainer.removeChild(guessContainer.lastElementChild)
        childs = guessContainer.lastElementChild
    }
    inputBuild(chosenWord)
    usedLettersContainer.innerText = "Used letters: "
    hp = 11
    checkHp()
    return chosenWord
})

yourGuessField.addEventListener("keyup",function(event){
    let keycode = event.which
    let itOk = true
    let isItLetter = true
    if (keycode != 65  && keycode != 66 && keycode != 67 && keycode != 68 && keycode != 69 && keycode != 70 && keycode != 71 && keycode != 72 && keycode != 73 && keycode != 74 && keycode != 75 && keycode != 76 && keycode != 77 && keycode != 78 && keycode != 79 && keycode != 80 && keycode != 81 && keycode != 82 && keycode != 83 && keycode != 84 && keycode != 85 && keycode != 86 && keycode != 87 && keycode != 88 && keycode != 89 && keycode != 90        ) {
        yourGuessField.value = ""
        isItLetter = false
    }
    for (let i = 0; i < usedLetters.length; i++) {
        if (yourGuessField.value == usedLetters[i]) {
            itOk = false
        }
    }
    if (itOk && isItLetter) {
        answerCheck()
        usedLetters.push(yourGuessField.value)
        usedLettersContainer.append(`${yourGuessField.value}, `)
    } else if (!isItLetter) {
        yourGuessField.blur()
        document.querySelector(".alert").innerText = "Please only use letters."
        document.querySelector(".alert").style.opacity = 100
        document.querySelector(".alert").style.zIndex = 10
        setTimeout(() => {
            document.querySelector(".alert").style.opacity = 0
            yourGuessField.focus()
            document.querySelector(".alert").style.zIndex = -1
        }, 2000);
    } else {
        yourGuessField.blur()
        document.querySelector(".alert").innerText = "You have already used this letter! Try another."
        document.querySelector(".alert").style.opacity = 100
        document.querySelector(".alert").style.zIndex = 10
        setTimeout(() => {
            document.querySelector(".alert").style.opacity = 0
            yourGuessField.focus()
            document.querySelector(".alert").style.zIndex = -1
        }, 2000);
    }
    setTimeout(() => {
        yourGuessField.value = ""
    }, 100);
})

function getWord() {
    return possibleWords[getRandomInt(possibleWords.length - 1)]
}



function inputBuild(word) {
    let inputSplit = word.split("")
    for (let i = 0; i < inputSplit.length; i++) {
        let inputField = document.createElement("input")
        inputField.setAttribute("data-letter",inputSplit[i])
        inputField.setAttribute("readonly", "readonly")
        inputField.classList.add("my-4")
        inputField.classList.add("letters")
        guessContainer.append(inputField)
    }
    return word
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function answerCheck() {
    let match = false
    let allLetters = document.getElementsByClassName("letters")
    let matchFound = 0
    for (let i = 0; i < allLetters.length; i++) {
        if (yourGuessField.value == allLetters[i].getAttribute("data-letter")) {
            allLetters[i].style.backgroundColor = "green"
            allLetters[i].setAttribute("value", allLetters[i].getAttribute("data-letter"))
            match = true
        }
        if (allLetters[i].value != "") {
            matchFound += 1
        }
        if (matchFound == allLetters.length) {
            setTimeout(() => {
                hpContainer.parentNode.classList.add("d-none")
                yourGuessContainer.classList.add("d-none")
                guessContainer.classList.add("d-none")
                usedLettersContainer.classList.add("d-none")
                document.getElementById("youWon").style.opacity = 100
                document.getElementById("youWon").style.zIndex = 100
                document.getElementById("youWon").childNodes[0].style.opacity = 100
                document.getElementById("youWon").childNodes[0].style.fontSize = "100px"
                setTimeout(() => {
                    document.getElementById("youWon").style.opacity = 0
                    document.getElementById("youWon").style.zIndex = -1
                    document.getElementById("youWon").childNodes[0].style.opacity = 0
                    document.getElementById("youWon").childNodes[0].style.fontSize = "50px"
                }, 5000);
            }, 100);
        }
    }
    if (matchFound == allLetters.length) {

    }
    if (!match) {
        hp -= 1
        checkHp()
    }
}

function checkHp(){
    hpContainer.innerText = hp
    let resultImage = document.getElementById("resultImg")
    if (hp == 0) {
        hpContainer.parentNode.classList.add("d-none")
        yourGuessContainer.classList.add("d-none")
        guessContainer.classList.add("d-none")
        usedLettersContainer.classList.add("d-none")
        document.getElementById("youDied").style.opacity = 100
        document.getElementById("youDied").style.zIndex = 100
        document.getElementById("youDied").childNodes[0].style.opacity = 100
        document.getElementById("youDied").childNodes[0].style.fontSize = "100px"
        setTimeout(() => {
            document.getElementById("youDied").style.opacity = 0
            document.getElementById("youDied").style.zIndex = -1
            document.getElementById("youDied").childNodes[0].style.opacity = 0
            document.getElementById("youDied").childNodes[0].style.fontSize = "50px"
        }, 5000);
    }
}