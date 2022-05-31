
let resSlider = document.getElementById("res_slider");
let resOutput = document.getElementById("res_slider_output");
let resLeftIncr = document.getElementById("res_slider_left");
let resRightIncr = document.getElementById("res_slider_right");
const resIncrStep = 1; // must be a multiple of html step attribute
resOutput.innerHTML = resSlider.value;
resSlider.oninput = function() {
    resOutput.innerHTML = this.value;
}
resLeftIncr.onclick = function() {
    resSlider.value = parseFloat(resSlider.value) - resIncrStep;
    resOutput.innerHTML = resSlider.value;
    resSliderChanged();
}
resRightIncr.onclick = function() {
    resSlider.value = parseFloat(resSlider.value) + resIncrStep;
    resOutput.innerHTML = resSlider.value;
    resSliderChanged();
}

resSlider.onchange = resSliderChanged;

function resSliderChanged() {
    cellSize = parseInt(resSlider.value);
    init();
}



const cvs = document.getElementById("cvs");
cvs.width = cvs.clientWidth;
cvs.height = cvs.clientHeight;
const ctx = cvs.getContext("2d");
let cellSize = 10; // side length of each square
const healthy = '#AAA';
const infected = '#511';
const dead = '#100505';
let deathChance = 0.1 / cellSize ** 2;
let cells = [];

init();
draw();

function init() {
    cells = [];
    for (let i = 0; i < cvs.width / cellSize; i++) {
        cells.push([]);
        for (let j = 0; j < cvs.height / cellSize; j++) {
            cells[i].push(healthy);
        }
    }

    // infect initial host
    let x = Math.floor(Math.random() * cells.length);
    let y = Math.floor(Math.random() * cells[0].length);
    cells[x][y] = infected;
    
    deathChance = 0.1 / cellSize ** 2;
}

           
function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            ctx.fillStyle = cells[i][j];
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
    act();
    requestAnimationFrame(draw);
}

function act() {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells.length; j++) {
            if (cells[i][j] == infected) {
                let distance = (1 / cellSize) / (Math.random()) ** 0.5
                let angle = 2 * Math.PI * Math.random();
                let x = i + Math.round(distance * Math.cos(angle));
                let y = j + Math.round(distance * Math.sin(angle));
                if (x < cells.length && x > 0 &&  y < cells[0].length && y > 0 && cells[x][y] != dead) {
                    cells[x][y] = infected;
                }
                if (Math.random() < deathChance) {
                    cells[i][j] = dead;
                }
            }
        }
    }
}