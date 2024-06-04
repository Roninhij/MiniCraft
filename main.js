const btn = document.querySelector(".start-gamebtn");
let tool = "shovel";
const block = [
  { name: "dirt", texture: "./images/grass.webp" },
  { name: "gold", texture: "./images/gold.webp" },
  { name: "diamond", texture: "./images/diamond.webp" },
];
const skycolor = "rgba(111, 157, 243, 0.973)";
const size = [16, 30];
btn.addEventListener("click", () => {
  document.querySelector("#intro-container").style.display = "none";
  document.querySelector("#ingame-screen").style.display = "flex";
  document.querySelector("body").style.backgroundImage = "none";
  startGame();
});

function startGame() {
  const container = document.querySelector("#game-container");
  changeTool();
  for (let i = 0; i < size[0]; i++) {
    const row = document.createElement("div");
    row.classList = "row";
    container.appendChild(row);
    for (let j = 0; j < size[1]; j++) {
      newTile(row, i);
    }
  }
}

function newTile(container, rowId) {
  const num = Math.floor(Math.random() * 3);
  const tile = document.createElement("div");
  tile.classList = "tile";
  const isFirstRow = rowId === size[0] / 2 + 1 ? true : false;
  //   tile.style.border = "2px solid white";
  const blockname = isFirstRow ? block[0].name : block[num].name;
  tile.style.height = "50px";
  tile.style.width = "50px";
  if (rowId <= size[0] / 2) {
    tile.style.backgroundColor = skycolor;
  } else {
    tile.style.backgroundImage = isFirstRow
      ? `url(${block[0].texture})`
      : `url(${block[num].texture})`;
  }
  tile.addEventListener("click", () => {
    console.log(tool, blockname);
    if (tool === "shovel" && blockname === "dirt") {
      tile.style.backgroundImage = "none";
      tile.style.backgroundColor = skycolor;
    }
    if (tool === "axe" && blockname === "wood") {
      tile.style.backgroundImage = "none";
      tile.style.backgroundColor = skycolor;
    }
    if (
      tool === "pickaxe" &&
      (blockname === "gold" || blockname === "diamond")
    ) {
      tile.style.backgroundImage = "none";
      tile.style.backgroundColor = skycolor;
    }
  });
  container.appendChild(tile);
}

function changeTool() {
  const shovel = document.querySelector("#shovel");
  const axe = document.querySelector("#axe");
  const pickaxe = document.querySelector("#pickaxe");
  shovel.addEventListener("click", () => {
    tool = "shovel";
  });
  axe.addEventListener("click", () => {
    tool = "axe";
  });
  pickaxe.addEventListener("click", () => {
    tool = "pickaxe";
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "m") {
    const audio = document.getElementById("background-music");
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        audio.volume = 1;
      })
      .catch((error) => {
        console.error("Failed to play the audio:", error);
      });
  }
});
