document.querySelector(".control-buttons span").onclick = () => {
  let yourName = prompt("enter your name ");
  if (!yourName) {
    document.querySelector(".name span").innerHTML = "UnKnown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }

  document.querySelector(".control-buttons").remove();
  Shuffle();
};

const duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

//let orderRange = Array.from(Array(blocks.length).keys());

function Shuffle() {
  blocks.forEach((block) => {
    let randomOrder = Math.floor(Math.random() * 16);
    block.style.order = randomOrder;

      block.classList.add("is-flipped");
      setTimeout(() => {
        block.classList.remove("is-flipped");
      }, 1500);
    block.addEventListener("click", () => {
      flipBlock(block);
    });
  });
};

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let AllFiliped = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (AllFiliped.length === 2) {
    stopClicking();
    checkMatchBlock(AllFiliped[0], AllFiliped[1]);
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function checkMatchBlock(firstBlock, secondBlock) {
  let Tries = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    Tries.innerHTML = parseInt(Tries.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, 1000);
  }
}
