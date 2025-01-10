let picDetails = [
  {
    name: "Animals",
    pics: [
      "images/Animals/bears.webp",
      "images/Animals/birds.webp",
      "images/Animals/dogs.webp",
      "images/Animals/horses.webp",
      "images/Animals/lions.webp",
      "images/Animals/sharks.webp",
    ],
  },
  {
    name: "Cars",
    pics: [
      "images/Cars/car1.webp",
      "images/Cars/car2.webp",
      "images/Cars/car3.webp",
      "images/Cars/car4.webp",
      "images/Cars/car5.webp",
      "images/Cars/car6.webp",
    ],
  },
  {
    name: "Flowers",
    pics: [
      "images/Flowers/Chrysanthemum.webp",
      "images/Flowers/iris.webp",
      "images/Flowers/lotus.webp",
      "images/Flowers/orchid.webp",
      "images/Flowers/rose.webp",
      "images/Flowers/tulip.webp",
    ],
  },
  {
    name: "Places",
    pics: [
      "images/Places/bali.webp",
      "images/Places/canyon.webp",
      "images/Places/london.webp",
      "images/Places/newyork.webp",
      "images/Places/paris.webp",
      "images/Places/rome.webp",
    ],
  },
  {
    name: "Teams",
    pics: [
      "images/Teams/barcelona-logo.webp",
      "images/Teams/bayern_munich-logo.webp",
      "images/Teams/chelsea-logo.webp",
      "images/Teams/juventus-logo.webp",
      "images/Teams/PSG-logo.webp",
      "images/Teams/real_madrid-logo.webp",
    ],
  },
];
// sessionStorage.clear();
function conText(words) {
  document.getElementById("introDiv").classList.add("showIntroDiv");
  document.getElementById("introTextDiv").classList.add("showIntroTextDiv");

  let countLetter = 1;
  const target = document.getElementById("introTextDiv");

  target.setAttribute("style", "color: " + "black");
  const addLetterInterval = setInterval(() => {
    if (countLetter <= words.length) {
      target.innerHTML = words.substring(0, countLetter);
      countLetter += 1;
    } else {
      clearInterval(addLetterInterval);
      setTimeout(() => {
        document.getElementById("introDiv").classList.remove("showIntroDiv");
      }, 1000);
    }
  }, 150); // The time taken to write each letter, symbol, and space.
}

let introFromSession = sessionStorage.getItem("introSeen") || false;
if (!introFromSession) {
  // setTimeout(() => {
    conText("You choose 2 boxes that display same or different images, 4 times per set.");
    sessionStorage.setItem("introSeen", true);
  // }, 500);
};

let loadImg = [];
let totalScore = [];
let allClicked = [true, true, true, true, true, true, true, true, true];
let posArray = [];
let posNum = "";
let posClicked = [true, true, true, true, true, true, true, true, true];

let x = 0;
function addPass() {
  x += 1;
  return x;
}
let y = 0;
function addFail() {
  y += 1;
  return y;
}

function posBox(idEnt, pos) {
  let posbox = ``;
  posbox = `
        <i class="imgPos">${pos}</i>
    `;
  document.getElementById(idEnt).innerHTML += posbox;
}
function showImgPos(id, clicked, idEnt) {
  document.getElementById(id).addEventListener("click", () => {
    if (clicked) {
      posArray.push(posArray.length);
      clicked = false;
      for (let x = 0; x < posArray.length; x++) {
        if (x <= 1) {
          posNum = 1;
        }
        if (x <= 3 && x >= 2) {
          posNum = 2;
        }
        if (x <= 5 && x >= 4) {
          posNum = 3;
        }
        if (x <= 7 && x >= 6) {
          posNum = 4;
        }
      }
      posBox(idEnt, posNum);
    }
  });
}
showImgPos("img-box1", posClicked[0], "entBox1");
showImgPos("img-box2", posClicked[1], "entBox2");
showImgPos("img-box3", posClicked[2], "entBox3");
showImgPos("img-box4", posClicked[3], "entBox4");
showImgPos("img-box5", posClicked[4], "entBox5");
showImgPos("img-box6", posClicked[5], "entBox6");
showImgPos("img-box7", posClicked[6], "entBox7");
showImgPos("img-box8", posClicked[7], "entBox8");
showImgPos("img-box9", posClicked[8], "entBox9");

let picDetGen = picDetails[Math.floor(Math.random() * 5)];
document.getElementById("gamePlayed").innerHTML = picDetGen.name;

function genImg(id, clicked) {
  document.getElementById(id).addEventListener("click", () => {
    if (clicked) {
      let imagesGen = picDetGen.pics[Math.floor(Math.random() * 6)];
      let imgGenerated = ``;
      imgGenerated = `<img src="${imagesGen}" class="main-img" alt="">`;
      document.getElementById(id).innerHTML = imgGenerated;
      loadImg.push(imagesGen);
      clicked = false;
      for (let x = 0; x < loadImg.length; x++) {
        if (x === 1) {
          if (loadImg[0] === loadImg[1]) {
            let x = 0;
            x += 1;
            totalScore.push(x);
            document.getElementById("pass").innerHTML = addPass();
          } else if (loadImg[0] !== loadImg[1]) {
            let x = 0;
            x += 1;
            totalScore.push(x);
            document.getElementById("fail").innerHTML = addFail();
          }
          loadImg = [];
        }
      }
      for (let x = 0; x < totalScore.length; x++) {
        if (x === 3) {
          setTimeout(() => {
            let pass = Number(document.getElementById("pass").textContent);
            let fail = Number(document.getElementById("fail").textContent);
            if (pass > fail) {
              conText("You passed this set.");
            } else if (fail > pass) {
              conText("You failed this set.");
            } else {
              conText("You tied this set.");
            }
          }, 100);
        }
      }
    }
  });
}

genImg("entImgBox1", allClicked[0]);
genImg("entImgBox2", allClicked[1]);
genImg("entImgBox3", allClicked[2]);
genImg("entImgBox4", allClicked[3]);
genImg("entImgBox5", allClicked[4]);
genImg("entImgBox6", allClicked[5]);
genImg("entImgBox7", allClicked[6]);
genImg("entImgBox8", allClicked[7]);
genImg("entImgBox9", allClicked[8]);
