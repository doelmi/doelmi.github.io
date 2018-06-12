
function Player(i, j) {
    this.i = i;
    this.j = j;

    this.goLeft = function () {
        if (this.i > 0 && grid[this.i-1][this.j].wall === false) {
            this.i -= 1;
        }
        
    }

    this.goRight = function () {
        if (this.i < cols - 1 && grid[this.i+1][this.j].wall === false) {
            this.i += 1;
        }
    }

    this.goUp = function () {
        if (this.j > 0 && grid[this.i][this.j-1].wall === false) {
            this.j -= 1;
        }
    }

    this.goDown = function () {
        if (this.j < rows - 1 && grid[this.i][this.j+1].wall === false) {
            this.j += 1;
        }
    }

    this.show = function () {
        fill(255, 0, 0);
        noStroke();
        ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 1.25, h / 1.25);
//        rect(this.i * w, this.j * h, w, h);
    }
}