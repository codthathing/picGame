let pictures =["../IMAGE/tunnel.jpg","../IMAGE/unique.jpg","../IMAGE/board1.jpeg",
    "../IMAGE/laptop_imp.jpg","../IMAGE/project.jpg","../IMAGE/board4.jpeg",
    // "../IMAGE/calculator.jpg","../IMAGE/birthday.jpg","../IMAGE/services.jpeg"
]

let showIntro = true
window.addEventListener("load", ()=> {
    if(showIntro) {
        setTimeout(()=> {
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
            }, 250)
        }, 250)
        setTimeout(()=> {
            document.getElementById("introDiv").classList.add("showIntroDiv")
        }, 11000)
    }
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

function posBox(id, pos) {
    let posbox = ``
    posbox = `
        <i class="imgPos">${pos}</i>
    `
    document.getElementById(id).innerHTML += posbox
}
function showImgPos(id, clicked) {
    document.getElementById(id).addEventListener("click", ()=> {
        if(clicked) {
            posArray.push(posArray.length)
            clicked = false
        }
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
        posBox(id, posNum)
    })
}
showImgPos("img-box1", posClicked[0])
showImgPos("img-box2", posClicked[1])
showImgPos("img-box3", posClicked[2])
showImgPos("img-box4", posClicked[3])
showImgPos("img-box5", posClicked[4])
showImgPos("img-box6", posClicked[5])
showImgPos("img-box7", posClicked[6])
showImgPos("img-box8", posClicked[7])
showImgPos("img-box9", posClicked[8])

function genImg(id, clicked) {
    document.getElementById(id).addEventListener("click", (e) => {
        if(clicked) {
            e.target.src = `${pictures[Math.floor(Math.random() * 6)]}`
            loadImg.push(e.target.src)
            clicked = false
        }
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
                if(document.getElementById("pass").textContent > document.getElementById("fail").textContent) {
                    document.getElementById("resText").innerHTML = "You passed this set."
                } else if(document.getElementById("fail").textContent > document.getElementById("pass").textContent) {
                    document.getElementById("resText").innerHTML = "You failed this set."
                } else {
                    document.getElementById("resText").innerHTML = "You tied this set."
                }
                document.getElementById("resDiv").classList.add("showResDiv")
                setTimeout(()=> {
                    document.getElementById("resTextDiv").classList.add("showTextDiv")
                }, 250)
            }
        }
    })
}

function clearGame(idImage, picClicked, posClicked, idBox) {
    document.getElementById(idImage).src = ''
    document.getElementById(idBox).innerHTML = ''
    picClicked = true
    posClicked = true
}

document.getElementById("canRes").addEventListener("click", ()=> {
    document.getElementById("resDiv").classList.remove("showResDiv")
    posArray = []
    loadImg = []
    totalScore = []
    document.getElementById("pass").innerHTML = ""
    document.getElementById("fail").innerHTML = ""
    // window.location.reload();
    clearGame("one", allClicked[0], posClicked[0], "img-box1")
    clearGame("two", allClicked[1], posClicked[1], "img-box2")
    clearGame("three", allClicked[2], posClicked[2], "img-box3")
    clearGame("four", allClicked[3], posClicked[3], "img-box4")
    clearGame("five", allClicked[4], posClicked[4], "img-box5")
    clearGame("six", allClicked[5], posClicked[5], "img-box6")
    clearGame("seven", allClicked[6], posClicked[6], "img-box7")
    clearGame("eight", allClicked[7], posClicked[7], "img-box8")
    clearGame("nine", allClicked[8], posClicked[8], "img-box9")
})

genImg("one", allClicked[0])
genImg("two", allClicked[1])
genImg("three", allClicked[2])
genImg("four", allClicked[3])
genImg("five", allClicked[4])
genImg("six", allClicked[5])
genImg("seven", allClicked[6])
genImg("eigth", allClicked[7])
genImg("nine", allClicked[8])