// get div with the id "grid", will serve as the container for all the cells
const grid = document.querySelector("#grid");

// create div that will become the cell for the grid
const cell = document.createElement("div");

// buttons below
const smallButton = document.querySelector(".small");
const mediumButton = document.querySelector(".medium");
const largeButton = document.querySelector(".large");

const regularButton = document.querySelector(".regular-color");
const multiColorButton = document.querySelector(".multi-color");

const erase = document.querySelector(".erase");

const gridButtons = {
    types: ["small", "regular"]
}

const gridSize = {
    "small": [16, 0],
    "medium": [32, 1],
    "large": [64, 2] 
}

// create cell depending on the size of the grid the user wants
function createCell(dimension) {
    const dimensions = (704 / dimension);
    cell.classList.add("cell");
    cell.style.width = `${dimensions}px`;
    cell.style.height = `${dimensions}px`;
}

// generate random color
function generateRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

// add event listeners to every clone cell created, as cloning nodes doesn't copy event listeners 
function addListeners(parentNode){
    if (parentNode.hasChildNodes()){
        let children = parentNode.childNodes;
        for(const node of children){
            node.addEventListener("mouseenter", () => {
                if (gridButtons.types[1] === "regular"){
                    node.style.backgroundColor = "#808080";
                } else {
                    node.style.backgroundColor = `${generateRandomColor()}`;
                }
            });
            node.addEventListener("mouseout", () => {
                if (gridButtons.types[1] === "regular"){
                    node.style.backgroundColor = "#808080";
                } else {
                    node.style.backgroundColor = `${generateRandomColor()}`;
                }
            });
        }
    }
}

// create parent node of all the cloned cells that will become a row
const row = document.createElement("div");

// create a row of cells
function createRow(cellMultiplier, node) {
    // calculate how many cells will be in the row
    // will be more cells than rows in the grid
    const dimension = 22 * (2**cellMultiplier);
    for(i = 0; i < dimension; i++){
        const cellClone = cell.cloneNode(true);
        node.appendChild(cellClone);
    }
}

function removeAllChildNodes(parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}

// generates all the cells that will be in the grid
function createGrid(dimension, gridSize, color){
    removeAllChildNodes(row);
    removeAllChildNodes(grid);
    // create the cell
    createCell(dimension);
    // add the class name to make the div flex
    row.classList.add("row");

    createRow(gridSize, row);
    for(i = 0; i < dimension; i++){
        const rowClone = row.cloneNode(true);
        addListeners(rowClone, color);
        grid.appendChild(rowClone);
    }
    
}

// const selectAllCells = document.querySelectorAll(".cell");
// function addListeners(){
//     selectAllCells.forEach((cell) => {
//         cell.addEventListener("mouseenter", () => {
//             cell.style.backgroundColor = "#808080";
//         });
//         cell.addEventListener("mouseout", () => {
//             cell.style.backgroundColor = "#808080";
//         });
//     });
// }
createGrid(16, 0);
smallButton.addEventListener("click", () => {
    gridButtons.types[0] = "small";
    createGrid(gridSize[gridButtons['types'][0]][0], gridSize[gridButtons['types'][0]][1]);
});

mediumButton.addEventListener("click", () => {
    gridButtons.types[0] = "medium";
    createGrid(gridSize[gridButtons['types'][0]][0], gridSize[gridButtons['types'][0]][1]);
});

largeButton.addEventListener("click", () => {
    gridButtons.types[0] = "large";
    createGrid(gridSize[gridButtons['types'][0]][0], gridSize[gridButtons['types'][0]][1]);
});

regularButton.addEventListener('click', () => {
    gridButtons.types[1] = "regular";
    createGrid(gridSize[gridButtons['types'][0]][0], gridSize[gridButtons['types'][0]][1]);
});

multiColorButton.addEventListener('click', () => {
    gridButtons.types[1] = "colors";
    createGrid(gridSize[gridButtons['types'][0]][0], gridSize[gridButtons['types'][0]][1]);
});


erase.addEventListener("click", () => {
    
});