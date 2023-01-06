let world = [];
let worldSize = { x: 1000, y: 400 };
let player = {
	pos: { x: worldSize.x / 2, y: worldSize.y / 2 },
	motion: { x: 0, y: 0 },
	facing: 0,
	onGround: false,
	health: 20,
	hunger: 20,
	items: []
};

for (let i = 0; i < worldSize.x; i++) {
    for (let j = 0; j < worldSize.y; j++) {
        if (j > worldSize.y / 2) {
            world[i * worldSize.y + j] = 1;
        } else {
            world[i * worldSize.y + j] = 0;
        }
    }
}

const interval = setInterval(function() {
    if (gameActive) {
        
    }
}, 50);

function drawGame() {
    if (keys.a) {
        player.pos.x -= deltaTime * 0.01;
    }
    if (keys.d) {
        player.pos.x += deltaTime * 0.01;
    }


    game.noSmooth();
    game.background(150, 200, 255);
    game.push();
    game.translate(game.width / 2, game.height / 2);
    //game.scale(0.5);

    let screenTiles = {x: game.width / 48, y: game.height / 48};

    for (let i = max(0, floor(player.pos.x - screenTiles.x / 2)); i < min(worldSize.x, ceil(player.pos.x + screenTiles.x / 2)); i++) {
        for (let j = max(0, floor(player.pos.y - screenTiles.y / 2)); j < min(worldSize.y, ceil(player.pos.y + screenTiles.y / 2)); j++) {
            let tile = world[i * worldSize.y + j];
            if (tile > 0) {
                game.image(tiles[tile - 1], (i - player.pos.x) * 48, (j - player.pos.y) * 48, 48, 48);
            }
        }
    }

    game.pop()
}
