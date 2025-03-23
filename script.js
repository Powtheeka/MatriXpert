// Generate matrix dynamically based on input dimensions
function generateMatrix(matrixId, containerId) {
    let rows = parseInt(document.getElementById(`rows${matrixId.charAt(6)}`).value);
    let cols = parseInt(document.getElementById(`cols${matrixId.charAt(6)}`).value);

    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous matrix

    let table = document.createElement('table');
    table.className = 'matrix-grid';

    for (let i = 0; i < rows; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.id = `${matrixId}-${i}-${j}`;
            input.placeholder = `${i + 1},${j + 1}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);
}

// Get matrix data from input
function getMatrixData(matrixId) {
    let rows = document.querySelectorAll(`#${matrixId}Container tr`).length;
    let cols = document.querySelectorAll(`#${matrixId}Container tr:first-child td`).length;
    let matrix = [];

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let value = parseFloat(document.getElementById(`${matrixId}-${i}-${j}`).value) || 0;
            row.push(value);
        }
        matrix.push(row);
    }
    return math.matrix(matrix);
}

// Display matrix as a grid
function displayMatrix(matrix, elementId) {
    let container = document.getElementById(elementId);
    container.innerHTML = '';
    let table = document.createElement('table');
    table.className = 'matrix-grid';

    let matrixArray = matrix.toArray();
    for (let i = 0; i < matrixArray.length; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < matrixArray[i].length; j++) {
            let cell = document.createElement('td');
            cell.innerText = matrixArray[i][j].toFixed(2);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);
}

// Matrix addition
function addMatrices() {
    let A = getMatrixData('matrixA');
    let B = getMatrixData('matrixB');
    try {
        let result = math.add(A, B);
        displayMatrix(result, 'result');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Matrix subtraction
function subtractMatrices() {
    let A = getMatrixData('matrixA');
    let B = getMatrixData('matrixB');
    try {
        let result = math.subtract(A, B);
        displayMatrix(result, 'result');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Matrix multiplication
function multiplyMatrices() {
    let A = getMatrixData('matrixA');
    let B = getMatrixData('matrixB');
    try {
        let result = math.multiply(A, B);
        displayMatrix(result, 'result');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Calculate determinant
function calculateDeterminant(matrixId) {
    let matrix = getMatrixData(matrixId);
    try {
        let det = math.det(matrix);
        document.getElementById('result').innerHTML = `Determinant: ${det.toFixed(2)}`;
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Calculate inverse
function calculateInverse(matrixId) {
    let matrix = getMatrixData(matrixId);
    try {
        let inverse = math.inv(matrix);
        displayMatrix(inverse, 'result');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Calculate eigenvalues
function calculateEigenvalues(matrixId) {
    let matrix = getMatrixData(matrixId);
    try {
        let eigenvalues = math.eigs(matrix).values;
        document.getElementById('result').innerHTML = `Eigenvalues: ${eigenvalues.map(v => v.toFixed(2)).join(', ')}`;
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Generate LaTeX Output
function generateLatex() {
    let A = getMatrixData('matrixA');
    let B = getMatrixData('matrixB');
    let latexOutput = `
    \\[
    A = ${math.format(A, { notation: 'fixed', precision: 2 })}
    \\]
    \\[
    B = ${math.format(B, { notation: 'fixed', precision: 2 })}
    \\]
    `;
    document.getElementById('result').innerHTML = latexOutput;
}
