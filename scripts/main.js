const container = document.querySelector('.container');
const clearBtn = document.querySelector('.clear-button');
const colorInput = document.querySelector('.color-picker');
const slider = document.querySelector('.slider');

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

function changeColor(e) {
    e.target.style.backgroundColor = `${color}`;
}

function clearGrid() {
    squares.forEach(square => {
        square.style.backgroundColor = 'transparent';
    })
}

function reloadGrid(size) {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    createGrid(size);
}



// Initializes a 16x16 grid when page is loaded
createGrid(16);

// color value grabbed from color input
// once when page is loaded and dynamically on 'change' event
let color = colorInput.value;

colorInput.addEventListener('change', () => {
    color = colorInput.value;
});

clearBtn.addEventListener('click', clearGrid);

slider.addEventListener('input', (e) => reloadGrid(e.target.valueAsNumber));
slider.addEventListener('change', (e) => reloadGrid(e.target.valueAsNumber));