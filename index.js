// get div with the id "grid", will serve as the container for all the cells
const grid = document.querySelector("#grid");

// create div that will become the cell for the grid
const cell = document.createElement("div");

// select all the buttons needed to the behavior of the grid and cells
const smallButton = document.querySelector(".small");
const mediumButton = document.querySelector(".medium");
const largeButton = document.querySelector(".large");

const regularButton = document.querySelector(".regular-color");
const multiColorButton = document.querySelector(".multi-color");

const erase = document.querySelector(".erase");

// keep track of which buttons are pressed and their values 
const gridActiveButtons = {
    size: "small",
    color: "regular-color"
}

// easily be able tor retrieve grid size depending on the value of the button the was pressed 
const gridSize = {
    "small": {rowAmount: 16, columnAmount: 0},
    "medium": {rowAmount: 32, columnAmount: 1},
    "large": {rowAmount: 64, columnAmount: 2}
}

const buttons = {
    "small": smallButton,
    "medium": mediumButton,
    "large": largeButton,
    "regular-color": regularButton,
    "multi-color": multiColorButton
}

// create cell depending on the size of the grid the user wants
function createCell(rowAmount) {
    const dimension = (704 / rowAmount);
    cell.classList.add("cell");
    cell.style.width = `${dimension}px`;
    cell.style.height = `${dimension}px`;
}

// generate random color
function generateRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

// create parent node of all the cloned cells that will become a row
const row = document.createElement("div");

// create a row of cells
function createRow(cellMultiplier, node) {
    // calculate how many cells will be in the row
    // will be more cells than rows in the grid
    const numberOfCells = 22 * (2**cellMultiplier);
    for(i = 0; i < numberOfCells; i++){
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
function createGrid(rowAmount, columnAmount){
    removeAllChildNodes(row);
    removeAllChildNodes(grid);
    // create the cell
    createCell(rowAmount);
    // add the class name to make the div flex
    row.classList.add("row");
    // generate a row full of cells
    createRow(columnAmount, row);
    for(i = 0; i < rowAmount; i++){
        const rowClone = row.cloneNode(true);
        // addListeners(rowClone);
        grid.appendChild(rowClone);
    }
}

// helper function to improve readability and redundancy 
function generateCells(){
    createGrid(gridSize[gridActiveButtons.size].rowAmount, gridSize[gridActiveButtons.size].columnAmount);
}

createGrid(16, 0);

// function to handle cell coloring
function colorCell(event) {
    if (event.target.classList.contains("cell")) {
        const cell = event.target;
        if (gridActiveButtons.color === "regular-color") {
            cell.style.backgroundColor = "#808080";
        } else {
            cell.style.backgroundColor = generateRandomColor();
        }
    }
}

// function to add event listeners for coloring
function addColoringListeners() {
    grid.addEventListener("mouseenter", colorCell, true);
    grid.addEventListener("mouseout", colorCell, true);
}

// function to remove event listeners for coloring
function removeColoringListeners() {
    grid.removeEventListener("mouseenter", colorCell, true);
    grid.removeEventListener("mouseout", colorCell, true);
}

// add mousedown and mouseup event listeners to the grid
grid.addEventListener("mousedown", (event) => {
    // only add listeners if the target is a cell
    if (event.target.classList.contains("cell")) {
        addColoringListeners();
    }

    // add mouseup listener to the document to handle the case when the mouse is released outside the grid
    document.addEventListener("mouseup", () => {
        removeColoringListeners();
    }, { once: true }); // { once: true } option so it automatically removes itself
}, true);

// add event listeners to change the value of the appropriate keys in gridActiveButtons or change grid's appearance 
smallButton.addEventListener("click", () => {
    buttons[gridActiveButtons.size].classList.remove("selected");
    smallButton.classList.add("selected");
    gridActiveButtons.size = "small";
    generateCells();
});

mediumButton.addEventListener("click", () => {
    buttons[gridActiveButtons.size].classList.remove("selected");
    mediumButton.classList.add("selected");
    gridActiveButtons.size = "medium";
    generateCells();
});

largeButton.addEventListener("click", () => {
    buttons[gridActiveButtons.size].classList.remove("selected");
    largeButton.classList.add("selected");
    gridActiveButtons.size = "large";
    generateCells();
});

regularButton.addEventListener('click', () => {
    buttons[gridActiveButtons.color].classList.remove("selected");
    regularButton.classList.add("selected");
    gridActiveButtons.color = "regular-color";
    generateCells();
});

multiColorButton.addEventListener('click', () => {
    buttons[gridActiveButtons.color].classList.remove("selected");
    multiColorButton.classList.add("selected");
    gridActiveButtons.color = "multi-color";
    generateCells();
});

erase.addEventListener("click", () => generateCells());