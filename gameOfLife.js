const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight; //* 0.99;
canvas.width = window.innerWidth;

const playerFps = document.getElementById("inputFps");
const fpsDisplay = document.getElementById("fpsDisplay");

const tileAmount = 400;
let running = 0;

let fps = 1;

const tilesArray = [];

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    handleTiles();
});

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        if(running === 0){
            running = 1;
            animate();
        } else {
            running = 0;
        }
    }
});

canvas.addEventListener('click', function(event) {
    var x = event.pageX,
        y = event.pageY;
    console.log(x, y);
    tilesArray.forEach(function(tile) {
        if (y > tile.y && y < tile.y + 25 && x > tile.x && x < tile.x + 25) {
            console.log(x + " " + y);
            tile.update();
            tile.draw();
        }
    });

}, false);

playerFps.addEventListener('input', function (event) {
    fpsDisplay.innerHTML = this.value;
    fps = this.value;
    playerFps.setAttribute("value", playerFps.value);
});



class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
        this.state = 0;
    }

    update() {
        if(this.state === 0){
            this.state = 1;
        } else {
            this.state = 0;
        }
    }

    draw() {
        if(this.state === 0) {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x, this.y, this.width, this.height);

        } else {
            ctx.fillStyle = 'lightblue';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

function handleTiles() {
    for(i = 0; i < tilesArray.length; i++){
        tilesArray[i].draw();
    }
}

function createMap() {
    for(i = 0; i < tileAmount; i++){
        for (j = 0; j < tileAmount; j++){
            tilesArray.push(new Tile(j * 25, i * 25));

        }
    }
    handleTiles();
}

createMap();


function checkMates(){

    const updateArray = [];

    for(i = 0; i < tilesArray.length; i++){

        var mates = 0;

        if((i + 1) % tileAmount === 1) {
            console.log((i + 1) + " - left coming soon");
        } else if((i + 1) % tileAmount === 0){
            console.log((i + 1) +  " - right coming soon");
        } else if(i + 1 < tileAmount){
            console.log((i + 1) + " - top coming soon");
        } else if(i + 1 > (tileAmount * tileAmount) - tileAmount) {
            console.log((i + 1) + " - bottom coming soon");
        } else {

            //check for de 8 rundt omlæggende på i

            //3 tiles above:
            if(tilesArray[(i - tileAmount) - 1].state === 1){ mates = mates + 1; }
            if(tilesArray[i - tileAmount].state === 1){ mates = mates + 1; }
            if(tilesArray[(i - tileAmount) + 1].state === 1){ mates = mates + 1; }

            //3 tiles bottom
            if(tilesArray[(i + tileAmount) - 1].state === 1){ mates = mates + 1; }
            if(tilesArray[i + tileAmount].state === 1){ mates = mates + 1; }
            if(tilesArray[(i + tileAmount) + 1].state === 1){ mates = mates + 1; }

            //left & right
            if(tilesArray[i - 1].state === 1){ mates = mates + 1; }
            if(tilesArray[i + 1].state === 1){ mates = mates + 1; }

            //checking mates if 1
            if(tilesArray[i].state === 1){
                if(mates > 3 || mates < 2) {
                // if(mates !== 2 || mates !== 3 || mates !== 4 || mates !== 7){
                    updateArray.push(i);
                }
            } else if(tilesArray[i].state === 0) {
                if(mates === 1) {
                    updateArray.push(i);
                }
            }
        }
    }
    updateArrayFunc(updateArray);
    //for each tile in tilesArray <-forloop
        //var mates = 0;
        //var ts = tile[i].state
        //if tile[i+1].state === ts<- care out of bound
            //mates += 1;


    //if i == ..
    // if i % tileamount == 1 - venstre side
    // if i % tileamount == 0 højre side
    // if i < tileamount -- topen
    // if i > ((tileamount * tileamount) - tileamount) -- bunden
    // else
    //  if tile[i].state == 1 ->
}

function updateArrayFunc(updateArray) {
    updateArray.forEach(function(n) {
        tilesArray[n].update();
        tilesArray[n].draw();

    });
}

function animate(){
    if(running === 1){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleTiles();
        checkMates();

        setTimeout(() => {
            requestAnimationFrame(animate);
        }, 1000 / fps);
    } else {
        cancelAnimationFrame(animate);
    }
}

