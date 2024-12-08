const gridSize = 4;
const grid = document.getElementById('grid');
let tiles = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));


function addTile() {
    let emptyTiles = [];
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (tiles[r][c] === 0) emptyTiles.push([r, c]);
        }
    }
    if (emptyTiles.length > 0) {
        let [row, col] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        tiles[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}




function show() {
    grid.innerHTML = '';
    tiles.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            if (value > 0) {
                tile.textContent = value;
                tile.setAttribute('data-value', value);
            }
            grid.appendChild(tile);
        });
    });
}


function slide(row) {
    let arr = row.filter(val => val);
    let newRow = Array(row.length).fill(0);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i + 1]) {
            newRow[i] = arr[i] * 2;
            arr[i + 1] = 0;
        } else {
            newRow[i] = arr[i];
        }
    }
    return newRow.filter(val => val).concat(Array(row.length - arr.filter(val => val).length).fill(0));
}

function handleKeyPress(event) {
    let flipped = false;
    let rotated = false;
    let moved = false;

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        tiles = rotateGrid(tiles);
        rotated = true;
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        tiles = flipGrid(tiles);
        flipped = true;
    }

    const oldTiles = JSON.stringify(tiles);
    tiles = tiles.map(row => slide(row));
    if (JSON.stringify(tiles) !== oldTiles) moved = true;

    if (flipped) tiles = flipGrid(tiles);
    if (rotated) tiles = rotateGrid(tiles, true);

    if (moved) {
        addTile();
        show();
        if (isOver()) alert('Game Over!');
    }
}


function rotateGrid(matrix, counterClockwise = false) {
    const result = matrix[0].map((z, index) => matrix.map(row => row[index]));
    return counterClockwise ? result.reverse() : result.map(row => row.reverse());
}




function flipGrid(matrix) {
    return matrix.map(row => row.reverse());
}
function isOver() {
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (tiles[r][c] === 0) return false;
            if (r > 0 && tiles[r][c] === tiles[r - 1][c]) return false;
            if (c > 0 && tiles[r][c] === tiles[r][c - 1]) return false;
        }
    }
    return true;
}

addTile();
addTile();
show();
window.addEventListener('keydown', handleKeyPress);
