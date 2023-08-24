let picDetails = [
    {
        name: 'Animals',
        pics:["images/Animals/bears.jpg","images/Animals/birds.jpg","images/Animals/dogs.jpeg",
            "images/Animals/horses.jpg","images/Animals/lions.jpg","images/Animals/sharks.jpg"]
    },    
    {
        name: 'Cars',
        pics:["images/Cars/car1.jpg","images/Cars/car2.jpeg","images/Cars/car3.jpeg",
            "images/Cars/car4.jpeg","images/Cars/car5.jpeg","images/Cars/car6.jpg"]
    },    
    {
        name: 'Flowers',
        pics:["images/Flowers/Chrysanthemum.jpeg","images/Flowers/iris.jpeg","images/Flowers/lotus.jpeg",
            "images/Flowers/orchid.jpeg","images/Flowers/rose.jpeg","images/Flowers/tulip.jpeg"]
    },    
    {
        name: 'Places',
        pics:["images/Places/bali.jpeg","images/Places/canyon.jpeg","images/Places/london.jpeg",
            "images/Places/newyork.jpeg","images/Places/paris.jpeg","images/Places/rome.jpeg"]
    },    
    {
        name: 'Teams',
        pics:["images/Teams/barcelona-logo.png","images/Teams/bayern_munich-logo.png",
            "images/Teams/chelsea-logo.png","images/Teams/juventus-logo.png",
            "images/Teams/PSG-logo.png","images/Teams/real_madrid-logo.png"]
    },
]

let introFromSession = sessionStorage.getItem("introSeen")
if(!introFromSession) {
    window.addEventListener("load", ()=> {
        setTimeout(()=> {
            document.getElementById("introDiv").classList.add("showIntroDiv")
            document.getElementById("introTextDiv").classList.add("showIntroTextDiv")
            setTimeout(()=> {
                conText([`You choose 2 boxes that display same or different images, 4 times per set.`],
                  'introText',['black'])
                function conText(words, id, colors) {
                    if (colors === undefined) colors = ['#990000'];
                    var countLetter = 1;
                    var x =1;
                    var waiting = false;
                    var target = document.getElementById(id)
                    target.setAttribute('style', 'color:' +colors[0])
                    window.setInterval(function() {
                        if(countLetter === 0 && waiting === false) {
                            waiting === true;
                            target.innerHTML = words[0].substring(0, countLetter)
                            window.setTimeout(()=> {
                                var usedColor = colors.shift();
                                colors.push(usedColor);
                                var usedWord = words.shift();
                                words.push(usedWord);
                                x = 1;
                                target.setAttribute('style', 'color:' +colors[0]);
                                countLetter += x;
                                waiting = false
                            }, 1000)
                        } 
                        else if( waiting === false) {
                            target.innerHTML = words[0].substring(0, countLetter);
                            countLetter += x
                        }
                    }, 120)
                }
            }, 550)
        }, 250)
        setTimeout(()=> {
            document.getElementById("introDiv").classList.remove("showIntroDiv")
        }, 11000)
    })
}

document.getElementById("canRes").addEventListener("click", ()=> {
    document.getElementById("resDiv").classList.remove("showResDiv")
    sessionStorage.setItem("introSeen", true)
    window.location.reload();
})

let loadImg = []
let totalScore = []
let allClicked = [true, true, true, true, true, true, true, true, true]
let posArray = []
let posNum = ""
let posClicked = [true, true, true, true, true, true, true, true, true]

let x = 0
function addPass() {
    x += 1
    return x
}
let y = 0
function addFail() {
    y += 1
    return y
}

function posBox(idEnt, pos) {
    let posbox = ``
    posbox = `
        <i class="imgPos">${pos}</i>
    `
    document.getElementById(idEnt).innerHTML += posbox
}
function showImgPos(id, clicked, idEnt) {
    document.getElementById(id).addEventListener("click", ()=> {
        if(clicked) {
            posArray.push(posArray.length)
            clicked = false
            for(let x = 0; x < posArray.length; x++) {
                if(x <= 1) {
                    posNum = 1
                } if(x <= 3 && x >= 2) {
                    posNum = 2
                } if(x <= 5 && x >= 4) {
                    posNum = 3
                } if(x <= 7 && x >= 6) {
                    posNum = 4
                }
            }
            posBox(idEnt, posNum)
        }
    })
}
showImgPos("img-box1", posClicked[0], "entBox1")
showImgPos("img-box2", posClicked[1], "entBox2")
showImgPos("img-box3", posClicked[2], "entBox3")
showImgPos("img-box4", posClicked[3], "entBox4")
showImgPos("img-box5", posClicked[4], "entBox5")
showImgPos("img-box6", posClicked[5], "entBox6")
showImgPos("img-box7", posClicked[6], "entBox7")
showImgPos("img-box8", posClicked[7], "entBox8")
showImgPos("img-box9", posClicked[8], "entBox9")

let picDetGen = picDetails[Math.floor(Math.random() * 5)]
document.getElementById("gamePlayed").innerHTML = picDetGen.name

function genImg(id, clicked) {
    document.getElementById(id).addEventListener("click", () => {
        if(clicked) {
            let imagesGen = picDetGen.pics[Math.floor(Math.random() * 6)]
            let imgGenerated = ``
            imgGenerated = `<img src="${imagesGen}" class="main-img" alt="">`
            document.getElementById(id).innerHTML = imgGenerated
            loadImg.push(imagesGen)
            clicked = false
            for(let x=0; x<loadImg.length; x++) {
                if(x === 1) {
                    if(loadImg[0] === loadImg[1]) {
                        let x = 0
                        x += 1
                        totalScore.push(x)
                        document.getElementById("pass").innerHTML = addPass()
                    } else if (loadImg[0] !== loadImg[1]) {
                        let x = 0
                        x += 1
                        totalScore.push(x)
                        document.getElementById("fail").innerHTML = addFail()
                    }
                    loadImg = []
                }
            }
            for(let x=0; x<totalScore.length; x++) {
                if(x === 3) {
                    setTimeout(() => {
                        let pass = Number(document.getElementById("pass").textContent)
                        let fail = Number(document.getElementById("fail").textContent)
                        if(pass > fail) {
                            document.getElementById("resText").innerHTML = "You passed this set."
                        } else if(fail > pass) {
                            document.getElementById("resText").innerHTML = "You failed this set."
                        } else {
                            document.getElementById("resText").innerHTML = "You tied this set."
                        }
                        document.getElementById("resDiv").classList.add("showResDiv")
                        setTimeout(() => {
                            document.getElementById("resTextDiv").classList.add("showTextDiv")
                        }, 250)
                    }, 100)
                }
            }
        }
    })
}

genImg("entImgBox1", allClicked[0])
genImg("entImgBox2", allClicked[1])
genImg("entImgBox3", allClicked[2])
genImg("entImgBox4", allClicked[3])
genImg("entImgBox5", allClicked[4])
genImg("entImgBox6", allClicked[5])
genImg("entImgBox7", allClicked[6])
genImg("entImgBox8", allClicked[7])
genImg("entImgBox9", allClicked[8])