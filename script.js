// Function to generate matrix input dynamically
function generateMatrix(matrixId, rows, cols) {
    let container = document.getElementById(matrixId);
    container.innerHTML = ''; // Clear any existing matrix

    let matrixGrid = document.createElement('div');
    matrixGrid.className = 'matrix-grid';
    matrixGrid.style.gridTemplateColumns = `repeat(${cols}, 60px)`; // Box size fixed

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.id = `${matrixId}-${i}-${j}`;
            input.placeholder = `${i + 1},${j + 1}`;
            input.className = 'matrix-input';
            matrixGrid.appendChild(input);
        }
    }
    container.appendChild(matrixGrid);
}

// Function to get matrix values from inputs
function getMatrix(matrixId, rows, cols) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let value = parseFloat(document.getElementById(`${matrixId}-${i}-${j}`).value);
            row.push(isNaN(value) ? 0 : value);
        }
        matrix.push(row);
    }
    return math.matrix(matrix);
}

// Perform matrix operations (add, subtract, multiply)
function performOperation(operation) {
    let rowsA = parseInt(document.getElementById('rowsA').value);
    let colsA = parseInt(document.getElementById('colsA').value);
    let rowsB = parseInt(document.getElementById('rowsB').value);
    let colsB = parseInt(document.getElementById('colsB').value);

    let matrixA = getMatrix('matrixA', rowsA, colsA);
    let matrixB = getMatrix('matrixB', rowsB, colsB);
    let result;

    try {
        switch (operation) {
            case 'add':
                result = math.add(matrixA, matrixB);
                break;
            case 'subtract':
                result = math.subtract(matrixA, matrixB);
                break;
            case 'multiply':
                result = math.multiply(matrixA, matrixB);
                break;
        }
        displayMatrix(result, 'result');
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error: ' + error.message;
    }
}

// Function to calculate determinant
function calculateDeterminant(matrixType) {
    let matrix = matrixType === 'A' ? getMatrix('matrixA', 2, 2) : getMatrix('matrixB', 2, 2);
    try {
        let det = math.det(matrix);
        document.getElementById('result').innerHTML = `Determinant of Matrix ${matrixType}: ${det.toFixed(2)}`;
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error: Invalid matrix!';
    }
}

// Function to calculate inverse
function calculateInverse(matrixType) {
    let matrix = matrixType === 'A' ? getMatrix('matrixA', 2, 2) : getMatrix('matrixB', 2, 2);
    try {
        let inverse = math.inv(matrix);
        displayMatrix(inverse, 'result');
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error: Matrix not invertible!';
    }
}

// Function to calculate eigenvalues
function calculateEigenvalues(matrixType) {
    let matrix = matrixType === 'A' ? getMatrix('matrixA', 2, 2) : getMatrix('matrixB', 2, 2);
    try {
        let eigenvalues = math.eigs(matrix).values;
        document.getElementById('result').innerHTML = `Eigenvalues of Matrix ${matrixType}: ${eigenvalues.map(v => v.toFixed(2)).join(', ')}`;
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error: Invalid matrix!';
    }
}

// Display result matrix as a grid
function displayMatrix(matrix, elementId) {
    let container = document.getElementById(elementId);
    container.innerHTML = '';
    let matrixGrid = document.createElement('div');
    matrixGrid.className = 'matrix-grid';
    matrixGrid.style.gridTemplateColumns = `repeat(${matrix.size()[1]}, 60px)`;

    matrix.forEach(function (value) {
        let cell = document.createElement('div');
        cell.className = 'matrix-cell';
        cell.innerText = value.toFixed(2);
        matrixGrid.appendChild(cell);
    });
    container.appendChild(matrixGrid);
}

// Generate LaTeX Output
function generateLaTeX() {
    let rowsA = parseInt(document.getElementById('rowsA').value);
    let colsA = parseInt(document.getElementById('colsA').value);
    let matrixA = getMatrix('matrixA', rowsA, colsA)._data;

    let latexCode = `\\begin{pmatrix}`;
    for (let i = 0; i < matrixA.length; i++) {
        latexCode += matrixA[i].join(' & ');
        if (i !== matrixA.length - 1) {
            latexCode += ` \\\\ `;
        }
    }
    latexCode += `\\end{pmatrix}`;

    document.getElementById('latexOutput').innerText = latexCode;
}
