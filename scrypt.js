const restartBtn = document.querySelector(".restart-btn")
const gameBoardFields = document.querySelectorAll(".game-board-field")

restartBtn.addEventListener("click", () => {
    activateBtn(restartBtn)
})

gameBoardFields.forEach((gameBoardField) => {
    gameBoardField.addEventListener("click", () => {
        activateBtn(gameBoardField)
    })
})

/**
 * Activates a button by adding the "clicked" class
 * and setting up an event handler to remove this class after the transition (transform) ends.
 *
 * @param {HTMLElement} element - The button element to be activated.
 */
function activateBtn(element) {
    function removeTransition(event) {
        if (event.propertyName !== "transform") return;
        event.target.classList.remove("clicked");
    }

    element.classList.add("clicked");
    element.addEventListener("transitionend", removeTransition);
}
