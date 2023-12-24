let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer =  document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        audio.play();
        if(turnO) {
            box.innerText = "O";
            box.style.color = "#476C9B";
            turnO = false;
        }
        else {
            box.innerText= "X";
            box.style.color = "#984447";
            turnO =true;
        }
        box.disabled = true;
        count++;
        checkWinner();

        let isWinner = checkWinner();

        if(count == 9 && !isWinner){
            gameDraw();
        }

    })
})

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const gameDraw = (winner) => {
    msg.innerText = "Match is Tied, Lets! have a tiebreaker";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let patterns of winPatterns) {
        let pos1Value = boxes[patterns[0]].innerText;
        let pos2Value = boxes[patterns[1]].innerText;
        let pos3Value = boxes[patterns[2]].innerText;

        if(pos1Value != "" && pos2Value != "" && pos3Value != "") {
            if(pos1Value == pos2Value && pos2Value == pos3Value) {
                showWinner(pos1Value);
                return true;
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
