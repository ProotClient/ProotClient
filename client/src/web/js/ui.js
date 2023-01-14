function draw() {
    angleMode(DEGREES);
    noStroke();
    clear();

    if (scene == "menu") {
        drawMenu();
        image(menu, 0, 0);
    } else if (scene == "game") {
        drawGame();
        image(game, 0, 0);
    } else if (scene == "splash") {
        background(40, 20, 20);
        imageMode(CENTER);
        image(splash, windowWidth / 2, windowHeight / 2, 120, 120);
        imageMode(CORNER);
    } else {
        background(40, 20, 20);
    }

    fill(88, 86, 89);
    rect(0, 0, windowWidth, 2);

    clicked = false;

    fill(0, 0, 0);
    text(round(1000 / deltaTime), 5, 20);
}
