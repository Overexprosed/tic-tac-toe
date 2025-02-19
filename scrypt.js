const game = (function () {
    let squares = Array(9)
    let turn = "x"

    const playRound = (index, doOnSuccess) => {
        if (squares[index] == null) {
            squares.splice(index, 1, turn)

            const winner = calculateWinner()

            if (winner != null) {
                // winner logic
            } else {
                changeTurn()
                doOnSuccess()
            }
        }
    }

    const changeTurn = () => {
        turn = (turn === "x") ? "o" : "x"
        setTurn(turn)
    }

    const setTurn = (turn) => {
        gameBoardFields.forEach((gameBoardField) => {
            const fieldIndex = gameBoardField.getAttribute("data-index")
            const fieldValue = squares[fieldIndex]

            const fieldState = gameBoardField.querySelector(".game-board-field-state")
            fieldState.setAttribute("data-field-turn", turn)
            fieldState.setAttribute("data-field-state", fieldValue)

            turnDisplay.setAttribute("data-field-turn", turn)
        })
    }

    const reset = () => {
        squares = Array(9)
        turn = "x"
        setTurn("x")
    }

    const calculateWinner = () => {
        // Winning combinations. If X or O occupy this indexes, they're winners
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
            const [a, b, c] = line;

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    return { playRound, reset }
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
        const fieldIndex = field.getAttribute("data-index")
        const doOnSuccess = () => animate(field)

        game.playRound(fieldIndex, doOnSuccess)
    })
})

function animate(element) {
    function removeTransition(event) {
        if (event.propertyName !== "transform") return;
        event.target.classList.remove("clicked");
    }

    element.classList.add("clicked");
    element.addEventListener("transitionend", removeTransition);
}
