// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Part 1: https://youtu.be/aKYlikFAV4k
// Part 2: https://youtu.be/EaZxUCWAjb0
// Part 3: https://youtu.be/jwRT4PCT6RU

// Function to delete element from the array
function removeFromArray(arr, elt) {
    // Could use indexOf here instead to be more efficient
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === elt) {
            arr.splice(i, 1);
        }
    }
}

// An educated guess of how far it is between two points
function heuristic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);
    // var d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
}

var n = 10;

var m = 1;

// How many columns and rows?
var cols = (n * 2 + 1) * m;
var rows = cols;

// This will be the 2D array
var grid;

// Start and end
var start;
var end;

//Mulai Akhir
var indexMulai = [m, m];
var indexAkhir;

// Width and height of each cell of grid
var w, h;

var binaryTreeMaze = expandedBinaryTree(n, m);

var player1;

function initiateSpot() {
    grid = new Array(cols);
    // Making a 2D array

    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
            if (binaryTreeMaze[i][j] === 1) {
                grid[i][j].wall = true;
            } else if (binaryTreeMaze[i][j] === 2) {
                grid[i][j].finish = true;
                indexAkhir = [i-floor((m-1)/2), j-floor((m-1)/2)];
            }
        }
    }

    // All the neighbors
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }
}

function resetSpotValue() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].f = 0;
            grid[i][j].g = 0;
            grid[i][j].h = 0;
            grid[i][j].previous = undefined;
        }
    }
}

function setup() {
    var ukuran;
    if (windowWidth > windowHeight) {
        ukuran = windowHeight / 1.25;
    } else {
        ukuran = windowWidth / 1.25;
    }
    var canvas = createCanvas(ukuran, ukuran);
    canvas.parent("mazeSurvival");
    // Grid cell size
    w = width / cols;
    h = height / rows;

    initiateSpot();

    player1 = new Player(m, m);
}

function windowResized() {
    var ukuran;
    if (windowWidth > windowHeight) {
        ukuran = windowHeight / 1.25;
    } else {
        ukuran = windowWidth / 1.25;
    }
    resizeCanvas(ukuran, ukuran);

    w = width / cols;
    h = height / rows;
}

function AStar() {
    //inisialisasi mulai dan akhir

    // Open and closed set
    var openSet = [];
    var closedSet = [];
    frameRate(10);

    start = grid[floor(player1.i)][floor(player1.j)];
    end = grid[indexAkhir[0]][indexAkhir[1]];

    start.wall = false;
    end.wall = false;

    //reset nilai dari objek spot
    resetSpotValue();

    // openSet starts with beginning only
    openSet.push(start);
    // Am I still searching?
    while (true) {
        if (openSet.length > 0) {

            // Best next option
            var winner = 0;
            for (var i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[winner].f) {
                    winner = i;
                }
            }
            var current = openSet[winner];

            // Did I finish?
            if (current === end) {
                var path = [];
                var temp = current;
                path.push(temp);
                while (temp.previous) {
                    path.push(temp.previous);
                    temp = temp.previous;
                }
//                console.log("DONE!");

                return path;
            }

            // Best option moves from openSet to closedSet
            removeFromArray(openSet, current);
            closedSet.push(current);

            // Check all the neighbors
            var neighbors = current.neighbors;
            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];

                // Valid next spot?
                if (!closedSet.includes(neighbor) && !neighbor.wall) {
                    var tempG = current.g + heuristic(neighbor, current);

                    // Is this a better path than before?
                    var newPath = false;
                    if (openSet.includes(neighbor)) {
                        if (tempG < neighbor.g) {
                            neighbor.g = tempG;
                            newPath = true;
                        }
                    } else {
                        neighbor.g = tempG;
                        newPath = true;
                        openSet.push(neighbor);
                    }

                    // Yes, it's a better path
                    if (newPath) {
                        neighbor.h = heuristic(neighbor, end);
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.previous = current;
                    }
                }

            }
            // Uh oh, no solution
        } else {
            console.log('no solution');
            // Find the path by working backwards
            return;
        }
    }
}

function draw() {
    background(255);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();

        }
    }

    var thePath = AStar();
    noFill();
    stroke(10, 255, 100);
    strokeWeight(w / 4);
    beginShape();
    for (var i = 0; i < thePath.length; i++) {
        vertex(thePath[i].i * w + w / 2, thePath[i].j * h + h / 2);
    }
    endShape();
    if (keyIsDown(87)) {
        player1.goUp();
    }
    if (keyIsDown(83)) {
        player1.goDown();
    }
    if (keyIsDown(65)) {
        player1.goLeft();
    }
    if (keyIsDown(68)) {
        player1.goRight();
    }

    player1.show();
}

function keyPressed() {
    switch (key) {
        case ' ':
            noLoop();
            break;
    }
}