function setupSketchArea(dimension = 16) {
  createSketchArea(dimension);
  addCellEventLister();
}

function createSketchArea(dimension) {
  const area = document.querySelector('.sketch-area');
  cellDimension = area.scrollWidth / dimension;
  // console.log(cellDimension);
  for (let i = 0; i < dimension; i++) {
    const row = document.createElement('div');
    area.appendChild(row);
    row.style.height = `${cellDimension}px`;
    row.classList.add('row');
    for (let j = 0; j < dimension; j++) {
      const cell = document.createElement('div');
      cell.style.display = 'inline-block';
      cell.style.height = `${cellDimension}px`;
      cell.style.width = `${cellDimension}px`;
      cell.classList.add('cell');
      row.appendChild(cell);
    }
  }
}

function generateRandomColor() {
  const randomNumber = () => Math.floor(Math.random() * 256);
  return `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`
}

function addCellEventLister() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('mouseover', (event) => {
      if (!cell.style.background) {
        cell.style.background = generateRandomColor();
        cell.style.filter = 'brightness(100%)';
      } else {
        const re = /\D+/;
        const brightness = cell.style.filter;
        const percentage = parseInt(brightness.replace(re, ''));
        if (percentage > 0) {
          cell.style.filter = `brightness(${percentage - 10}%)`;
        }
      }
    });
  });
}

function addDimensionChangeEventListener() {
  const button = document.querySelector('#size');
  button.addEventListener('click', (event) => {
    const userInput = parseInt(
      prompt("Number of squares per side? (max is 100)")
    );
    if (
      Number.isInteger(userInput)
      && userInput <= 100
      && userInput > 0
    ) {
      const rows = document.querySelectorAll('.row');
      rows.forEach((row) => {
        row.remove();
      });
      setupSketchArea(userInput);
    }
  });
}

function addClearEventListener() {
  const button = document.querySelector('#clear');
  button.addEventListener('click', (event) => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.style.background = '';
      if (cell.style.filter) {
        cell.style.filter = '';
      }
    });
  });
}

function main() {
  setupSketchArea();
  addDimensionChangeEventListener();
  addClearEventListener();
}

main();
