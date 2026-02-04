const board = document.getElementById("gameBoard");
const gridSizeSelect = document.getElementById("gridSize");
const resetBtn = document.getElementById("resetBtn");

let tiles = [];
let flippedTiles = [];

function generateBoard(size) {
  board.innerHTML = "";

  const totalTiles = size * 2;

  const columns = Math.ceil(Math.sqrt(totalTiles));
  board.style.gridTemplateColumns = `repeat(${columns}, 60px)`;

  
  const numbers = [];
  for (let i = 1; i <= totalTiles / 2; i++) {
    numbers.push(i, i);
  }

  
  numbers.sort(() => Math.random() - 0.5);

  tiles = numbers.map(num => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.value = num;
    tile.addEventListener("click", () => flipTile(tile));
    board.appendChild(tile);
    return tile;
  });
}

function flipTile(tile) {
  if (tile.classList.contains("flipped") || tile.classList.contains("matched")) return;

  tile.classList.add("flipped");
  tile.textContent = tile.dataset.value;
  flippedTiles.push(tile);

  if (flippedTiles.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [tile1, tile2] = flippedTiles;
  if (tile1.dataset.value === tile2.dataset.value) {
    tile1.classList.add("matched");
    tile2.classList.add("matched");
    flippedTiles = [];
  } else {
    tile1.classList.add("wrong");
    tile2.classList.add("wrong");
    setTimeout(() => {
      tile1.classList.remove("flipped", "wrong");
      tile2.classList.remove("flipped", "wrong");
      tile1.textContent = "";
      tile2.textContent = "";
      flippedTiles = [];
    }, 800);
  }
}

resetBtn.addEventListener("click", () => {
  const gridSize = parseInt(gridSizeSelect.value);
  generateBoard(gridSize);
});

generateBoard(parseInt(gridSizeSelect.value));
