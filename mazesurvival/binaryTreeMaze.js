function buatMatrik(n) {
    var matrik = [];
    for (var i = 0; i < n * 2 + 1; i++) {
        matrik[i] = [];
        for (var j = 0; j < n * 2 + 1; j++) {
            //ngeprint tok
            matrik[i][j] = 0;

            //pagar dan ruang
            if (i % 2 === 0 || j % 2 === 0) {
                matrik[i][j] = 1;
            }
        }
    }
    return matrik;
}
function buatMaze(matrik) {
    var x = 1, y;
    while (x < matrik.length) {
        y = 1;
        while (y < matrik[x].length) {
            var acak = Math.floor((Math.random() * 2));
            if (acak === 1) {
                if (y < matrik[x].length - 2) {
                    matrik[x][y + 1] = 0;
                } else if (x < matrik.length - 2) {
                    matrik[x + 1][y] = 0;
                }
            } else if (acak === 0) {
                if (x < matrik.length - 2) {
                    matrik[x + 1][y] = 0;
                } else if (y < matrik[x].length - 2) {
                    matrik[x][y + 1] = 0;
                }
            }
            y += 2;
        }
        x += 2;
    }
    return matrik;
}

function BinaryTree(n) {
    var matrik = buatMatrik(n);
    return buatMaze(matrik);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expandedBinaryTree(n, m = 4) {
    var theMatrik = buatMatrik(n);
    var BTMaze = buatMaze(theMatrik);

    var kolom = BTMaze.length;

    var randomX = getRandomInt(1, kolom-1);
    var randomY = getRandomInt(1, kolom-1);
    
    BTMaze[randomX][randomY] = 2;

    var matrik = [];
    for (var i = 0; i < kolom * m; i++) {
        matrik[i] = [];
        for (var j = 0; j < kolom * m; j++) {
            matrik[i][j] = 0;
        }
    }

    var counterX = 0;

    for (var i = 0; i < kolom; i++) {
        var counterY = 0;
        for (var j = 0; j < kolom; j++) {

            for (var k = counterX; k < counterX + m; k++) {
                for (var l = counterY; l < counterY + m; l++) {
                    matrik[k][l] = BTMaze[i][j];
                }
            }
            counterY += m;
        }
        counterX += m;
    }

    return matrik;
}