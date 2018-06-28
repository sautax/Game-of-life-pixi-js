// let canvas = document.getElementById('canvas');
// let ctx = canvas.getContext("2d");
let app = new PIXI.Application({
    width: 800,
    height: 600
});
document.body.appendChild(app.view);

app.renderer.backgroundColor = 0x000000;
app.renderer.autoResize = true;

let stage = app.stage
let WIDTH = 92;
let HEIGHT = 47;
let p = 0.8;
let scale = 20;
let steps = 1;
let play = false;
let show = true;
let tracing = false;
let mX = 0;
let mY = 0;
let ScaleValue = document.getElementById("ScaleValue");
let WidthValue = document.getElementById("WidthValue");
let HeightValue = document.getElementById("HeightValue");
let ProbabilityValue = document.getElementById("ProbabilityValue");
let StepsValue = document.getElementById("StepsValue");
app.renderer.resize(WIDTH*scale, HEIGHT*scale);
class grid {
    constructor(w, h) {
        this.grid = [
            []
        ];
        let line = [];
        let i = true;
        this.w = w;
        this.h = h;
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                line.push(false);
            }
            this.grid.push(line);
            line = [];
        }
        // for (let x = 0; x <= w; x++) {
        //     for (let y = 0; y < h; y++) {
        //         i = false
        //         if (Math.random() >= p) i = true
        //         line.push(i)
        //     }
        //     this.grid.push(line)
        //     line = []
        // }
    }
    show() {
        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                let  graphics = new PIXI.Graphics();
                let color = 0x010101
                if (this.grid[x][y])
                    color = 0xFFFFFF;
                graphics.beginFill(color);
                graphics.lineStyle(1, 0x101010);
                graphics.drawRect(x, y, this.w, this.h);
                stage.addChild(graphics);



                // ctx.beginPath();
                // ctx.rect(x * scale, y * scale, scale, scale);
                // ctx.fillStyle = "white";
                // if (this.grid[x][y])
                //     ctx.fillStyle = "black";
                // ctx.fill();
                // ctx.strokeStyle = "grey";
                // ctx.stroke();
                // ctx.closePath();
            }
        }
    }
    update() {
        let temp = [];
        let t = false;
        let line = [];
        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                let n = this.neighbours(x, y);
                if (this.grid[x][y]) {
                    t = true;
                    if (n === 2)
                        t = true;
                    if (n === 3)
                        t = true;
                    if (n > 3)
                        t = false;
                    if (n < 2)
                        t = false;
                } else {
                    t = false;
                    if (n === 3)
                        t = true;
                }
                line.push(t);
            }
            temp.push(line);
            line = [];
        }
        this.grid = temp;
    }
    neighbours(x, y) {
        let sum = 0;
        if (x !== 0) {
            if (this.grid[x - 1][y])
                sum += 1;
            if (y !== this.h - 1) {
                if (this.grid[x - 1][y + 1])
                    sum += 1;
            }
        }
        if (y !== 0) {
            if (this.grid[x][y - 1])
                sum += 1;
            if (x !== 0) {
                if (this.grid[x - 1][y - 1])
                    sum += 1;
            }
            if (x !== this.w - 1) {
                if (this.grid[x + 1][y - 1])
                    sum += 1;
            }
        }
        if (x !== this.w - 1) {
            if (this.grid[x + 1][y])
                sum += 1;
        }
        if (y !== this.h - 1) {
            if (this.grid[x][y + 1])
                sum += 1;
            if (x !== this.w - 1) {
                if (this.grid[x + 1][y + 1])
                    sum += 1;
            }
        }
        return sum;
    }
}
let cells = new grid(WIDTH, HEIGHT);
//keys listeners
addEventListener("mousedown", function (e) {
    tracing = true;
    let x = Math.floor(e.layerX / scale);
    let y = Math.floor(e.layerY / scale) - 1;
    if (cells.grid[x][y]) {
        cells.grid[x][y] = false;
    } else {
        cells.grid[x][y] = true;
    }
});
// canvas.addEventListener("click", function (e) {
//     let x = Math.floor(e.layerX / scale)
//     let y = Math.floor(e.layerY / scale) - 1
//     if (cells.grid[x][y]) {
//         cells.grid[x][y] = false
//     } else {
//         cells.grid[x][y] = true
//     }
// })
addEventListener("mouseup", function (e) {
    tracing = false;
    // let x = Math.floor(e.layerX / scale)
    // let y = Math.floor(e.layerY / scale) - 1
    // if (cells.grid[x][y]) {
    //     cells.grid[x][y] = false
    // } else {
    //     cells.grid[x][y] = true
    // }
});
addEventListener("mousemove", function (e) {
    let x = Math.floor(e.layerX / scale);
    let y = Math.floor(e.layerY / scale) - 1;
    if (x !== mX || y !== mY) {
        if (tracing) {
            if (cells.grid[x][y]) {
                cells.grid[x][y] = false;
            } else {
                cells.grid[x][y] = true;
            }
        }
        mX = x;
        mY = y;
    }
});
addEventListener("keypress", function (e) {
    if (e.key === " " || e.key === "p") {
        if (play) {
            play = false;
        } else {
            play = true;
        }
    }
    if (e.key === "r") {
        cells.grid = [];
        let i = false;
        let line = [];
        let h = cells.h;
        let w = cells.w;
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                i = false;
                if (Math.random() >= p)
                    i = true;
                line.push(i);
            }
            cells.grid.push(line);
            line = [];
        }
    }
    if (e.key === "c") {
        cells.grid = [
            []
        ];
        let line = [];
        let i = true;
        let w = cells.w;
        let h = cells.h;
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                line.push(false);
            }
            cells.grid.push(line);
            line = [];
        }
    }
    if (e.key === "o") {
        canvas.style.display = "none";
        let optionsDiv = document.getElementById("options");
        optionsDiv.style.display = "block";
        play = false;
        ScaleValue.value = scale.toString();
        WidthValue.value = WIDTH.toString();
        HeightValue.value = HEIGHT.toString();
        ProbabilityValue.value = p.toString();
        StepsValue.value = steps.toString();
    }
});

function validateOptions() {
    canvas.style.display = "block";
    let optionsDiv = document.getElementById("options");
    optionsDiv.style.display = "none";
    scale = parseInt(ScaleValue.value);
    WIDTH = parseInt(WidthValue.value);
    HEIGHT = parseInt(HeightValue.value);
    p = parseFloat(ProbabilityValue.value);
    steps = parseInt(StepsValue.value);
    app.renderer.resize(WIDTH*scale, HEIGHT*scale);
    cells.w = WIDTH;
    cells.h = HEIGHT;
    // clear the grid to the right format
    cells.grid = [
        []
    ];
    let line = [];
    let i = true;
    let w = cells.w;
    let h = cells.h;
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            line.push(false);
        }
        cells.grid.push(line);
        line = [];
    }
}
let f = 0;

function draw() {
    if (show)
        cells.show();
    requestAnimationFrame(draw);
    f += 1;
    if (f >= steps) {
        f = 0;
        if (play)
            cells.update();
    }
}
draw();