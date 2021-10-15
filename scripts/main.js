// function to create the grid
function createGrid() {
    const container = document.querySelector('.container');

    for (let i = 0; i < 16; i++) {
        const row = document.createElement('div');
        row.className = 'grid-row';

        for (let j = 0; j < 16; j++) {
            const square = document.createElement('div');
            square.className = 'grid-square'
            row.appendChild(square);
        }

        container.appendChild(row);
    }
}

createGrid();