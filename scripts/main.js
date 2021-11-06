let currentMode = 0;                // 0 - normal, 1 - rainbow, 2 - eraser
let prevMode = 0;

const container = document.querySelector('.container');
const clearBtn = document.querySelector('.clear-button');
const colorInput = document.querySelector('.color-picker');
const slider = document.querySelector('.slider');
const normBtn = document.querySelector('.normal-button');
const randBtn = document.querySelector('.random-button');
const eraseBtn = document.querySelector('.eraser-button');

// color value grabbed from color input
// once when page is loaded and dynamically on 'change' event
let color = colorInput.value;

// function to create the grid
function createGrid(size) {
    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.className = 'grid-row';

        for (let j = 0; j < size; j++) {
            const square = document.createElement('div');
            square.className = 'grid-square';
            square.addEventListener('mouseover', changeColor);
            row.appendChild(square);
        }

        container.appendChild(row);
    }
}

function normMode() {
    if (currentMode === 1) {
        prevMode = currentMode;
        currentMode = 0;
        normBtn.classList.add('active');
        randBtn.classList.remove('active');
    }
    else if (currentMode === 2) {
        prevMode = currentMode;
        currentMode = 0;
        normBtn.classList.add('active');
        eraseBtn.classList.remove('active');
    }
}
function getRandomVal() {
    return Math.floor(Math.random() * (256 - 0) + 0);
}

function getRandomColor() {
    return 'rgb(' + getRandomVal() + ', ' + getRandomVal() + ', ' + getRandomVal() + ')';
}

function randomMode() {
    randBtn.classList.toggle('active');
    prevMode = currentMode;
    if (currentMode === 0) {
        currentMode = 1;
        normBtn.classList.remove('active');
    }
    else if (currentMode === 1) {             // toggle random color off
        currentMode = 0;
        normBtn.classList.add('active');
    }
    else if (currentMode === 2) {
        currentMode = 1;
        eraseBtn.classList.remove('active');
    }
}

function eraserMode() {
    eraseBtn.classList.toggle('active');
    prevMode = currentMode;
    if (currentMode === 0) {
        currentMode = 2;
        normBtn.classList.remove('active');
    }
    else if (currentMode === 1) {
        currentMode = 2;
        randBtn.classList.remove('active');
    }
    else if (currentMode === 2) {
        currentMode = 0;
        normBtn.classList.add('active');
    }
}

function changeColor(e) {
    if (currentMode === 0) {
        e.target.style.backgroundColor = `${color}`;
    }
    else if (currentMode === 1) {
        e.target.style.backgroundColor = `${getRandomColor()}`;
    }
    else if (currentMode === 2) {
        e.target.style.backgroundColor = `#e9e9e9`;
    }
    
}

function clearGrid() {
    const squares = document.querySelectorAll('.grid-square');

    squares.forEach(square => {
        square.style.backgroundColor = 'transparent';
    })
}

function reloadGrid(size) {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    createGrid(size);
}

// display slider value above the slider
function rangeSlide(value) {
    document.getElementById('slider-value').textContent = `${value} x ${value}`;
}

// Initializes a 16x16 grid when page is loaded
createGrid(16);

colorInput.addEventListener('change', () => {
    color = colorInput.value;
});


normBtn.addEventListener('click', normMode);
randBtn.addEventListener('click', randomMode);
eraseBtn.addEventListener('click', eraserMode);
clearBtn.addEventListener('click', clearGrid);

// event handler to display slider value changing
slider.addEventListener('mousemove', e => rangeSlide(e.target.value));

// event handler to rebuild the grid with new slider value
//slider.addEventListener('input', (e) => reloadGrid(e.target.valueAsNumber));
slider.addEventListener('change', (e) => reloadGrid(e.target.valueAsNumber));

