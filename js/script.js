const btnStart = document.getElementById("btn_start");
const gridContainer = document.querySelector(".grid_container");
const levelSelected = document.getElementById("game-level");
const levels = [100, 81, 49];

let cellTotal;

//Generazione griglia di gioco
btnStart.addEventListener("click", function () {
  reset();

  cellTotal = levels[levelSelected.value];
  defineGridDimension();

  for (let i = 1; i <= cellTotal; i++) {
    const cell = createCell(i, cellTotal);
    gridContainer.append(cell);
  }
});

// ------ FUNCTIONS ------ //
function reset() {
  gridContainer.innerHTML = "";
}

function defineGridDimension() {
  if (cellTotal === levels[0]) {
    gridContainer.style.gridTemplateColumns = "repeat(10, 1fr)";
  } else if (cellTotal === levels[1]) {
    gridContainer.style.gridTemplateColumns = "repeat(9, 1fr)";
  } else if (cellTotal === levels[2]) {
    gridContainer.style.gridTemplateColumns = "repeat(7, 1fr)";
  }
}

function createCell(index, totalNumberOfCells) {
  const cellElement = document.createElement("div");
  cellElement.className = "cell";
  cellElement._cellID = index;

  cellElement.addEventListener("click", function () {
    const cellNumber = this._cellID;
    console.log(cellNumber);

    this.classList.add("clicked");

    // Check fine gioco
    if (isEndGame() === totalNumberOfCells) {
      console.log("Gioco terminato");
      gridContainer.innerHTML = `
      <div class="output">Hai terminato il gioco!</div>`;
    }
  });

  return cellElement;
}

function isEndGame() {
  const clickedCells = document.querySelectorAll(".clicked");
  return clickedCells.length;
}
