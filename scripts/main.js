let currentMode = 0;                // 0 - normal, 1 - rainbow
let prevMode = 0;

const container = document.querySelector('.container');
const clearBtn = document.querySelector('.clear-button');
const colorInput = document.querySelector('.color-picker');
const slider = document.querySelector('.slider');
const normBtn = document.querySelector('.normal-button');
const randBtn = document.querySelector('.random-button');

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
}
function getRandomVal() {
    return Math.floor(Math.random() * (256 - 0) + 0);
}

function getRandomColor() {
    return 'rgb(' + getRandomVal() + ', ' + getRandomVal() + ', ' + getRandomVal() + ')';
}

function randomMode() {
    randBtn.classList.toggle('active');
    if (currentMode === 0) {
        prevMode = currentMode;
        currentMode = 1;
        normBtn.classList.remove('active');
    }
    else if (currentMode === 1) {             // toggle random color off
        prevMode = 1;
        currentMode = 0;
        normBtn.classList.add('active');
    }
}

function changeColor(e) {
    if (currentMode === 0) {
        e.target.style.backgroundColor = `${color}`;
    }
    else if (currentMode == 1) {
        e.target.style.backgroundColor = `${getRandomColor()}`;
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
clearBtn.addEventListener('click', clearGrid);

// event handler to display slider value changing
slider.addEventListener('mousemove', e => rangeSlide(e.target.value));

// event handler to rebuild the grid with new slider value
slider.addEventListener('input', (e) => reloadGrid(e.target.valueAsNumber));
slider.addEventListener('change', (e) => reloadGrid(e.target.valueAsNumber));

