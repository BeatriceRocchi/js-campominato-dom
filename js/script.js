const btnStart = document.getElementById("btn_start");
const gridContainer = document.querySelector(".grid_container");
const levelSelected = document.getElementById("game-level");
let bombsList = [];
const levels = [100, 81, 49];

let cellTotal;

//Inizio della partita: resettare, in base al livello selezionato stabilire il numero totale di celle, generare la griglia e generare le bombe
btnStart.addEventListener("click", function () {
  reset();

  cellTotal = levels[levelSelected.value];

  generateGrid();

  bombsList = generateBombs();
  console.log("Lista bombe", bombsList);
});

// ------ FUNCTIONS ------ //
//Reset del gioco
function reset() {
  gridContainer.innerHTML = "";
  bombsList = [];
}

//Generazione griglia: definizione dimensioni della griglia e generazione celle sulla base del numero totale di celle
function generateGrid() {
  defineGridDimension();

  for (let i = 1; i <= cellTotal; i++) {
    const cell = createCell(i);
    gridContainer.append(cell);
  }
}

//Definizione dimensioni griglia
function defineGridDimension() {
  if (cellTotal === levels[0]) {
    gridContainer.style.gridTemplateColumns = "repeat(10, 1fr)";
  } else if (cellTotal === levels[1]) {
    gridContainer.style.gridTemplateColumns = "repeat(9, 1fr)";
  } else if (cellTotal === levels[2]) {
    gridContainer.style.gridTemplateColumns = "repeat(7, 1fr)";
  }
}

//Creazione cella
function createCell(index) {
  const cellElement = document.createElement("div");
  cellElement.className = "cell";
  cellElement._cellID = index;

  cellElement.addEventListener("click", handleClickCell);

  return cellElement;
}

//Gestione click cella
function handleClickCell() {
  const cellNumber = this._cellID;
  console.log(cellNumber);

  if (bombsList.includes(cellNumber)) {
    this.classList.add("bomb");
    isEndGame();
  } else {
    this.classList.add("clicked");
  }

  // Check fine gioco
  // if (isEndGame() === cellTotal) {
  //   console.log("Gioco terminato");
  //   gridContainer.innerHTML = `
  //     <div class="output">Hai terminato il gioco!</div>`;
  // }
}

//Creazione bombe
function generateBombs() {
  const bombsNumber = 16;

  do {
    const bombID = Math.ceil(Math.random() * cellTotal);

    if (!bombsList.includes(bombID)) {
      bombsList.push(bombID);
    }
  } while (bombsList.length < bombsNumber);

  return bombsList;
}

function isEndGame() {
  console.log("FINE: Hai preso una bomba!");
  // const clickedCells = document.querySelectorAll(".clicked");
  // return clickedCells.length;
}
