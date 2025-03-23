// Utility to get matrix input
function getMatrix(matrixId, rows, cols) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let value = parseFloat(document.getElementById(`${matrixId}_${i}_${j}`).value) || 0;
            row.push(value);
        }
        matrix.push(row);
    }
    return matrix;
}

// Generate matrix input
function generateMatrix(matrixId) {
    let rows = parseInt(document.getElementById(`rows${matrixId}`).value);
    let cols = parseInt(document.getElementById(`cols${matrixId}`).value);
    let container = document.getElementById(`matrix${matrixId}`);
    container.innerHTML = '';

    let grid = document.createElement('div');
    grid.className = 'matrix-grid';
    grid.style.gridTemplateColumns = `repeat(${cols}, 50px)`;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.id = `${matrixId}_${i}_${j}`;
            grid.appendChild(input);
        }
    }
    container.appendChild(grid);
}

// Display result as grid
function displayResult(matrix) {
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h3>Result:</h3>';

    let rows = matrix.length;
    let cols = matrix[0].length;

    let grid = document.createElement('div');
    grid.className = 'result-grid';
    grid.style.gridTemplateColumns = `repeat(${cols}, 50px)`;

    matrix.forEach(row => {
        row.forEach(val => {
            let box = document.createElement('div');
            box.innerHTML = val.toFixed(3); // 3 decimal places
            grid.appendChild(box);
        });
    });
    resultDiv.appendChild(grid);
}

// Matrix operations
function addMatrices() {
    let rowsA = parseInt(document.getElementById('rowsA').value);
    let colsA = parseInt(document.getElementById('colsA').value);
    let matrixA = getMatrix('A', rowsA, colsA);

    let rowsB = parseInt(document.getElementById('rowsB').value);
    let colsB = parseInt(document.getElementById('colsB').value);
    let matrixB = getMatrix('B', rowsB, colsB);

    if (rowsA !== rowsB || colsA !== colsB) {
        alert('Matrices must have the same dimensions for addition.');
        return;
    }

    let result = [];
    for (let i = 0; i < rowsA; i++) {
        let row = [];
        for (let j = 0; j < colsA; j++) {
            row.push(matrixA[i][j] + matrixB[i][j]);
        }
        result.push(row);
    }
    displayResult(result);
}

// Determinant calculation
function calculateDeterminant(matrixId) {
    let rows = parseInt(document.getElementById(`rows${matrixId}`).value);
    let cols = parseInt(document.getElementById(`cols${matrixId}`).value);
    if (rows !== cols) {
        alert('Matrix must be square to calculate determinant.');
        return;
    }
    let matrix = getMatrix(matrixId, rows, cols);
    let det = math.det(matrix);
    document.getElementById('result').innerHTML = `<h3>Determinant: ${det.toFixed(3)}</h3>`;
}

// Inverse calculation
function calculateInverse(matrixId) {
    let rows = parseInt(document.getElementById(`rows${matrixId}`).value);
    let cols = parseInt(document.getElementById(`cols${matrixId}`).value);
    if (rows !== cols) {
        alert('Matrix must be square to calculate inverse.');
        return;
    }
    let matrix = getMatrix(matrixId, rows, cols);
    try {
        let inverse = math.inv(matrix);
        displayResult(inverse);
    } catch (e) {
        document.getElementById('result').innerHTML = '<h3>Error: Matrix is singular, inverse cannot be calculated.</h3>';
    }
}

// Generate LaTeX Output
function generateLaTeX(matrixId) {
    let rows = parseInt(document.getElementById(`rows${matrixId}`).value);
    let cols = parseInt(document.getElementById(`cols${matrixId}`).value);
    let matrix = getMatrix(matrixId, rows, cols);

    let latex = '\\\\begin{bmatrix}';
    for (let i = 0; i < rows; i++) {
        latex += matrix[i].join(' & ');
        if (i !== rows - 1) {
            latex += '\\\\';
        }
    }
    latex += '\\\\end{bmatrix}';
    document.getElementById('result').innerHTML = `<h3>LaTeX Matrix: \\( ${latex} \\)</h3>`;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'result']);
}
