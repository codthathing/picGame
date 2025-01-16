let picDetails = [
  {
    id: 0,
    name: "Animals",
    pics: [
      { id: 0, clicked: false, image: "images/Animals/bears.webp", position: 0 },
      { id: 1, clicked: false, image: "images/Animals/birds.webp", position: 0 },
      { id: 2, clicked: false, image: "images/Animals/dogs.webp", position: 0 },
      { id: 3, clicked: false, image: "images/Animals/horses.webp", position: 0 },
      { id: 4, clicked: false, image: "images/Animals/lions.webp", position: 0 },
      { id: 5, clicked: false, image: "images/Animals/sharks.webp", position: 0 },
    ],
  },
  {
    id: 1,
    name: "Cars",
    pics: [
      { id: 0, clicked: false, image: "images/Cars/car1.webp", position: 0 },
      { id: 1, clicked: false, image: "images/Cars/car2.webp", position: 0 },
      { id: 2, clicked: false, image: "images/Cars/car3.webp", position: 0 },
      { id: 3, clicked: false, image: "images/Cars/car4.webp", position: 0 },
      { id: 4, clicked: false, image: "images/Cars/car5.webp", position: 0 },
      { id: 5, clicked: false, image: "images/Cars/car6.webp", position: 0 },
    ],
  },
  {
    id: 2,
    name: "Flowers",
    pics: [
      { id: 0, clicked: false, image: "images/Flowers/Chrysanthemum.webp", position: 0 },
      { id: 1, clicked: false, image: "images/Flowers/iris.webp", position: 0 },
      { id: 2, clicked: false, image: "images/Flowers/lotus.webp", position: 0 },
      { id: 3, clicked: false, image: "images/Flowers/orchid.webp", position: 0 },
      { id: 4, clicked: false, image: "images/Flowers/rose.webp", position: 0 },
      { id: 5, clicked: false, image: "images/Flowers/tulip.webp", position: 0 },
    ],
  },
  {
    id: 3,
    name: "Places",
    pics: [
      { id: 0, clicked: false, image: "images/Places/bali.webp", position: 0 },
      { id: 1, clicked: false, image: "images/Places/canyon.webp", position: 0 },
      { id: 2, clicked: false, image: "images/Places/london.webp", position: 0 },
      { id: 3, clicked: false, image: "images/Places/newyork.webp", position: 0 },
      { id: 4, clicked: false, image: "images/Places/paris.webp", position: 0 },
      { id: 5, clicked: false, image: "images/Places/rome.webp", position: 0 },
    ],
  },
  {
    id: 4,
    name: "Teams",
    pics: [
      { id: 0, clicked: false, image: "images/Teams/barcelona-logo.webp", position: 0 },
      { id: 1, clicked: false, image: "images/Teams/bayern_munich-logo.webp", position: 0 },
      { id: 2, clicked: false, image: "images/Teams/chelsea-logo.webp", position: 0 },
      { id: 3, clicked: false, image: "images/Teams/juventus-logo.webp", position: 0 },
      { id: 4, clicked: false, image: "images/Teams/PSG-logo.webp", position: 0 },
      { id: 5, clicked: false, image: "images/Teams/real_madrid-logo.webp", position: 0 },
    ],
  },
];
// sessionStorage.clear();
function conText(words, calFunction, showCancelIcon = false) {
  document.getElementById("introDiv").classList.add("showIntroDiv");
  document.getElementById("introTextDiv").classList.add("showIntroTextDiv");
  document.getElementById("cancel-icon").style.display = showCancelIcon ? "block" : "none";

  let countLetter = 1;
  const target = document.getElementById("introTextParagraph");

  target.setAttribute("style", "color: " + "black");
  const addLetterInterval = setInterval(() => {
    if (countLetter <= words.length) {
      target.innerHTML = words.substring(0, countLetter);
      countLetter += 1;
    } else {
      clearInterval(addLetterInterval);
      if(showCancelIcon) {
        document.getElementById("cancel-icon").addEventListener("click", () => {
          document.getElementById("introDiv").classList.remove("showIntroDiv");   
          calFunction();       
        })
      } else {
        setTimeout(() => {
          document.getElementById("introDiv").classList.remove("showIntroDiv");
        }, 1000);
      };
    };
  }, 150); // The time taken to write each letter, symbol, and space.
}

let introFromSession = sessionStorage.getItem("introSeen") || false;
if (!introFromSession) {
  setTimeout(() => {
    conText("You choose 2 boxes that display same or different images, 4 times per set.");
    sessionStorage.setItem("introSeen", true);
  }, 500);
}

let passDiv = document.getElementById("pass");
let failDiv = document.getElementById("fail");

function playGame() {
  let generatedGameArray = [];
  let gameDetailsCount = { played: 0, correct: 0, wrong: 0, comparison: [], result: "" };
  passDiv.innerHTML = gameDetailsCount.correct;
  failDiv.innerHTML = gameDetailsCount.wrong;

  function generateGameDetails() {
    const generateRandomNumber = Math.floor(Math.random() * 5);
    const { name, pics } = picDetails.find((game) => game.id === generateRandomNumber);
    document.getElementById("gamePlayed").innerHTML = name;
    for (let i = 0; i < 9; i++) {
      const generateNumber = Math.floor(Math.random() * 6);
      const { clicked, image } = pics.find((picture) => picture.id === generateNumber);
      generatedGameArray.push({ id: i, clicked, image });
    }
    createGameDivs(generatedGameArray);
  }
  generateGameDetails();

  function createGameDivs(gameArray) {
    document.getElementById("container").innerHTML = gameArray
      .map(({ id, clicked, image, position }) => {
        return `
        <div class="img-box" onclick="updateGeneratedGameArray(${id}, '${image}', ${clicked})" style="background: ${clicked ? `url('${image}')` : "white"}; background-repeat: no-repeat; background-position: center; background-size: cover;">
          ${clicked ? `<span class="imgPos">${position}</span>` : ""}
        </div>
      `;
      })
      .join("");
  }

  window.updateGeneratedGameArray = function (id, image, clicked) {
    if (gameDetailsCount.played < 4) {
      generatedGameArray = generatedGameArray.map((game) => {
        if (game.id === id && game.clicked !== true) {
          return { ...game, clicked: true, position: gameDetailsCount.played + 1 };
        } else {
          return game;
        }
      });
      determineGameOutcome(image, clicked);
      createGameDivs(generatedGameArray);
    }

    if (gameDetailsCount.played === 4) {
      if (gameDetailsCount.correct > gameDetailsCount.wrong) {
        gameDetailsCount.result = "You won this set.";
      } else if (gameDetailsCount.wrong > gameDetailsCount.correct) {
        gameDetailsCount.result = "You lost this set.";
      } else {
        gameDetailsCount.result = "You tied this set.";
      }
      conText(gameDetailsCount.result, playGame, true);
    }
  };

  function determineGameOutcome(image, clicked) {
    if (!clicked) gameDetailsCount.comparison.push(image);
    if (gameDetailsCount.comparison.length === 2) {
      if (gameDetailsCount.comparison[0] === gameDetailsCount.comparison[1]) {
        gameDetailsCount.correct += 1;
        passDiv.innerHTML = gameDetailsCount.correct;
      } else {
        gameDetailsCount.wrong += 1;
        failDiv.innerHTML = gameDetailsCount.wrong;
      }
      gameDetailsCount.played += 1;
      gameDetailsCount.comparison = [];
    }
  }
}

playGame();
