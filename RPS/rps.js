let userChoice;
let computerChoice;
let winCounter = 0;
let loseCounter = 0;
function play(userChoice) {
  let result = "";
  computerChoice = Math.random();
  if (computerChoice <= 1 / 3) computerChoice = "scissors";
  else if (computerChoice > 1 / 3 && computerChoice <= 2 / 3)
    computerChoice = "paper";
  else computerChoice = "rock";
  if (computerChoice === userChoice) {
    result = `It's a DRAW`;
  } else if (
    (computerChoice === "rock" && userChoice === "scissors") ||
    (computerChoice === "paper" && userChoice === "rock") ||
    (computerChoice === "scissors" && userChoice === "paper")
  ) {
    result = "YOU LOSE";
    loseCounter++;
  } else {
    result = "YOU WIN";
    winCounter++;
  }
  document.getElementById("player-score").innerText = winCounter;
  document.getElementById("computer-score").innerText = loseCounter;
  if (result) document.querySelector(".scissors-div").style.display = "none";
  document.querySelector(".paper-rock-div").style.display = "none";
  const resultDisplay = document.getElementById("result-display");
  resultDisplay.style.display = "flex";
  resultDisplay.style.justifyContent = "space-around";
  resultDisplay.style.alignItems = "center";

  resultDisplay.innerHTML = `
  <div style="text-align:center;">
    <p style="font-size:32px; font-weight:bold;">YOU</p>
    <div style="width:160px; height:160px; border-radius:50%; background:white; display:flex; align-items:center; justify-content:center; margin:auto;">
      <img src="${userChoice}.png" style="max-width:130px; max-height:130px; border-radius:50%" />
    </div>
  </div>
  <div style="text-align:center;">
    <p style="font-size: 32px; font-weight: bold;">${result}</p>
     <div style="margin-top: 30px;">
    <button onclick="resetGame()" style="
      padding: 10px 20px;
      font-size: 18px;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      background-color: white;
      color: #333;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
    ">
      Play Again
    </button>
  </div>
  </div>
  <div style="text-align:center;">
    <p style="font-size:32px; font-weight:bold;">COMPUTER</p>
    <div style="width:160px; height:160px; border-radius:50%; background:white; display:flex; align-items:center; justify-content:center; margin:auto;">
      <img src="${computerChoice}.png" style="max-width:130px; max-height:130px; border-radius:50%" />
    </div>
  </div>
`;
}
function resetGame() {
  document.getElementById("result-display").style.display = "none";
  document.querySelector(".scissors-div").style.display = "flex";
  document.querySelector(".paper-rock-div").style.display = "flex";
}
function resetScore() {
  winCounter = 0;
  loseCounter = 0;
  document.getElementById("player-score").innerText = 0;
  document.getElementById("computer-score").innerText = 0;
}
