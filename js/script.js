const btnStart = document.getElementById("btn_start");
const gridContainer = document.querySelector(".grid_container");
const messageContainer = document.querySelector(".message_container");
const levelSelected = document.getElementById("game-level");
const bombsNumber = 16;
let cellTotal;
let score = 0;
let bombsList = [];
const levels = [100, 81, 49];

//Inizio della partita: resettare, in base al livello selezionato stabilire il numero totale di celle, generare la griglia e generare le bombe
btnStart.addEventListener("click", function () {
  reset();

  cellTotal = levels[levelSelected.value];

  generateGrid();

  bombsList = generateBombs();
  console.log("Lista bombe", bombsList);
  // TODO: console.log da eliminare alla fine (solo per check)
});

// ------ FUNCTIONS ------ //
//Reset del gioco
function reset() {
  gridContainer.innerHTML = "";
  messageContainer.innerHTML = "";
  bombsList = [];
  score = 0;
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
  let isWin = false;
  console.log(cellNumber);

  //Check fine gioco per aver cliccato una bomba
  if (bombsList.includes(cellNumber)) {
    this.classList.add("bomb");
    isEndGame(isWin);
  } else {
    this.classList.add("clicked");
  }

  score = document.querySelectorAll(".clicked").length;

  // Check fine gioco per aver cliccato tutte le celle che non hanno bombe
  if (score === cellTotal - bombsNumber) {
    isWin = true;
    isEndGame(isWin);
  }
}

//Creazione bombe
function generateBombs() {
  do {
    const bombID = Math.ceil(Math.random() * cellTotal);

    if (!bombsList.includes(bombID)) {
      bombsList.push(bombID);
    }
  } while (bombsList.length < bombsNumber);

  return bombsList;
}

//Termine del gioco: apparizione di tutte le bombe, stampa messagio finale
function isEndGame(win) {
  showBombs();

  if (win) {
    messageContainer.innerHTML = "Complimenti, hai vinto!";
  } else {
    messageContainer.innerHTML = "Peccato, hai preso una bomba!";
  }

  messageContainer.innerHTML += `<div>Il tuo punteggio è di ${score} su ${cellTotal}</div>`;
}

//Apparizione di tutte le bombe
function showBombs() {
  const allCells = document.querySelectorAll(".cell");

  for (let i = 1; i <= cellTotal; i++) {
    if (bombsList.includes(i)) {
      allCells[i - 1].classList.add("bomb");
    }
  }
}
