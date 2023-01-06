const {floor, round, min, max, random} = Math;

let button = {
    titlebar_minimize: document.getElementById("titlebar_minimize"),
    titlebar_toggle_maximize: document.getElementById("titlebar_toggle_maximize"),
    titlebar_close: document.getElementById("titlebar_close")
};

button.titlebar_minimize.addEventListener("click", function () {
    api.minimizeWindow();
});
button.titlebar_toggle_maximize.addEventListener("click", function () {
    api.toggleMaximizeWindow().then((isMaximized)=>{
        console.log(isMaximized);
        if (isMaximized) {
            button.titlebar_toggle_maximize.src = "img/shrink.png";
        } else {
            button.titlebar_toggle_maximize.src = "img/maximize.png";
        }
    });
});
button.titlebar_close.addEventListener("click", function () {
    api.closeWindow();
});

let keys = {};
let clicked = false;

function mouseClicked(event) {
    clicked = true;
}

function keyPressed(event) {
    keys[event.key.toLowerCase()] = true;
}

function keyReleased(event) {
    keys[event.key.toLowerCase()] = false;
}

let canvas;
let icon;
let font;
let prevScene;
let scene = "game";
let sceneFade = 0;
let splash;
let menu;
let game;
let tiles = [];
let gameActive = false;

let colors;

function preload() {
    colors = {
        solid: color(198, 198, 198),
        greyed: color(139, 139, 139),
        dark: color(88, 86, 89),
        outline: color(6, 6, 6),
    };
    icon = loadImage("icon.png");
    splash = loadImage("icon.png");

    for (let i = 0; i < 4; i++) {
        tiles[i] = loadImage("tiles/" + i + ".png");
    }
}

function setup() {
    canvas = createCanvas(floor(windowWidth), floor(windowHeight));

    let windowSize = [ceil(windowWidth), ceil(windowHeight - 2)];
    menu = createGraphics(windowSize[0], windowSize[1]);
    game = createGraphics(windowSize[0], windowSize[1]);
}

function windowResized() {
    resizeCanvas(floor(windowWidth), floor(windowHeight));

    let windowSize = [ceil(windowWidth), ceil(windowHeight - 2)];
    if (menu){
        menu.resizeCanvas(windowSize[0], windowSize[1]);
    }
    if (game){
        game.resizeCanvas(windowSize[0], windowSize[1]);
    }
}

