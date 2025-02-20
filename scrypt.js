const game = (function () {
    let fields = Array(9)
    let playedRounds = 0
    let turn = "x"

    const playRound = (field, doOnSuccess) => {
        const index = field.getAttribute("data-index")

        if (fields[index] == null) {
            fields.splice(index, 1, field)

            field
                .querySelector(".game-board-field-state")
                .setAttribute("data-field-state", turn)

            const winnerFields = calculateWinner()

            if (winnerFields != null) {
                winnerFields.forEach(field => {
                    animate(field)
                    field.classList.add("data-field-winner")
                })
                displayController.incrementScore(turn)
                reset(); return
            } else {
                changeTurn()
                doOnSuccess()
            }

            if (++playedRounds === 9) {
                console.log(`played rounds = ${playedRounds}`)
                displayController.incrementScore("tie")
                reset()
            }
            console.log(`played rounds = ${playedRounds}`)
        }
    }

    const changeTurn = () => {
        turn = (turn === "x") ? "o" : "x"
        setTurn(turn)
    }

    const setTurn = (turn) => {
        gameBoardFields.forEach((field) => {
            field
                .querySelector(".game-board-field-state")
                .setAttribute("data-field-turn", turn)
        })
        turnDisplay.setAttribute("data-field-turn", turn)
    }

    const reset = () => {
        fields = Array(9)
        playedRounds = 0
        turn = "x"

        gameBoardFields.forEach((field) => {
            field.classList.remove("data-field-winner")

            const fieldState = field.querySelector(".game-board-field-state")
            fieldState.setAttribute("data-field-state", "")
            fieldState.setAttribute("data-field-turn", turn)
        })

        turnDisplay.setAttribute("data-field-turn", turn)
    }

    const calculateWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const line of lines) {
            const fieldArray = line.map(index => {
                return fields[index]
            })

            const values = fieldArray
                .map(field => {
                    return field ? field.querySelector(".game-board-field-state") : null
                })
                .map(state => {
                    return state ? state.getAttribute("data-field-state") : null
                })

            if (values[0] && values[0] === values[1] && values[0] === values[2]) {
                return fieldArray
            }
        }

        return null
    }

    return { playRound, reset }
})()

const displayController = (function () {
    const displayForX = document.querySelector(".player-x-score > .score-display-value")
    const displayForO = document.querySelector(".player-o-score > .score-display-value")
    const displayForTie = document.querySelector(".tie-score > .score-display-value")

    const incrementScore = (turn) => {
        switch (turn) {
            case "tie":
                incrementScoreFor(displayForTie); break
            case "x":
                incrementScoreFor(displayForX); break
            case "o":
                incrementScoreFor(displayForO)
        }
    }

    const incrementScoreFor = (element) => {
        let currentValue = element.textContent.trim()
        let numericValue = currentValue === "" ? 0 : parseInt(currentValue, 10)
        element.textContent = numericValue + 1
    }

    return { incrementScore }
})()

const turnDisplay = document.querySelector(".player-turn-display")
const restartBtn = document.querySelector(".restart-btn")
const gameBoardFields = document.querySelectorAll(".game-board-field")

restartBtn.addEventListener("click", () => {
    game.reset()
    animate(restartBtn)
})

gameBoardFields.forEach((field) => {
    field.addEventListener("click", () => {
        game.playRound(field, () => animate(field))
    })
})

function animate(element) {
    function removeTransition(event) {
        if (event.propertyName !== "transform") return
        event.target.classList.remove("clicked")
    }

    element.classList.add("clicked")
    element.addEventListener("transitionend", removeTransition)
}
