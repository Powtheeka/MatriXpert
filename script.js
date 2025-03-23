// Generate matrix input grids dynamically
function generateMatrixInput() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);

    if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
        alert('Please enter valid dimensions for the matrix.');
        return;
    }

    createGrid('matrixAInput', rows, cols, 'A');
    createGrid('matrixBInput', rows, cols, 'B');
}

// Create grid for matrix input
function createGrid(containerId, rows, cols, matrixName) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${cols}, 40px)`;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'matrix-cell';
            input.id = `${matrixName}_${i}_${j}`;
            container.appendChild(input);
        }
    }
}

// Parse matrix from grid inputs
function getMatrix(matrixName, rows, cols) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            const val = parseFloat(document.getElementById(`${matrixName}_${i}_${j}`).value) || 0;
            row.push(val);
        }
        matrix.push(row);
    }
    return matrix;
}

// Matrix Operations
function addMatrices(A, B) {
    return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}
function subtractMatrices(A, B) {
    return A.map((row, i) => row.map((val, j) => val - B[i][j]));
}
function multiplyMatrices(A, B) {
    let result = Array(A.length).fill(0).map(() => Array(B[0].length).fill(0));
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
            for (let k = 0; k < A[0].length; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
}

// Determinant (2x2 matrix only for now)
function calculateDeterminant(matrixType) {
    const matrix = getMatrix(matrixType, 2, 2);
    const det = (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
    displayResult(`Determinant of Matrix ${matrixType}: ${det}`);
}

// Inverse (2x2 matrix)
function calculateInverse(matrixType) {
    const matrix = getMatrix(matrixType, 2, 2);
    const det = (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
    if (det === 0) {
        displayResult(`Matrix ${matrixType} has no inverse.`);
        return;
    }
    const inv = [
        [matrix[1][1] / det, -matrix[0][1] / det],
        [-matrix[1][0] / det, matrix[0][0] / det]
    ];
    displayResult(inv, `Inverse of Matrix ${matrixType}`);
}

// Eigenvalues (2x2 matrix)
function calculateEigenvalues(matrixType) {
    const matrix = getMatrix(matrixType, 2, 2);
    const trace = matrix[0][0] + matrix[1][1];
    const determinant = (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
    const discriminant = Math.sqrt((trace ** 2) - (4 * determinant));

    const eigen1 = (trace + discriminant) / 2;
    const eigen2 = (trace - discriminant) / 2;

    displayResult(`Eigenvalues of Matrix ${matrixType}: λ1 = ${eigen1.toFixed(2)}, λ2 = ${eigen2.toFixed(2)}`);
}

// LaTeX Output
function generateLaTeX() {
    const matrix = getMatrix('A', 2, 2);
    let latexString = `\\begin{bmatrix}`;
    matrix.forEach(row => {
        latexString += row.join(' & ') + ` \\\\ `;
    });
    latexString += `\\end{bmatrix}`;
    document.getElementById('result').innerHTML = `LaTeX Code: \${latexString} \`;
    MathJax.typeset();
}

// Main function for matrix operations
function performOperation(operation) {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);

    if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
        alert('Please enter valid matrix dimensions.');
        return;
    }

    const A = getMatrix('A', rows, cols);
    const B = getMatrix('B', rows, cols);

    let result;
    switch (operation) {
        case 'add':
            result = addMatrices(A, B);
            displayMatrixResult(result, 'Addition Result');
            break;
        case 'subtract':
            result = subtractMatrices(A, B);
            displayMatrixResult(result, 'Subtraction Result');
            break;
        case 'multiply':
            result = multiplyMatrices(A, B);
            displayMatrixResult(result, 'Multiplication Result');
            break;
        default:
            displayResult('Invalid operation');
    }
}

// Display matrix results dynamically in grid format
function displayMatrixResult(matrix, title) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `<h3>${title}</h3>`;
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-result';
    matrixContainer.style.gridTemplateColumns = `repeat(${matrix[0].length}, 40px)`;

    matrix.forEach(row => {
        row.forEach(val => {
            const cell = document.createElement('div');
            cell.className = 'result-cell';
            cell.innerText = val;
            matrixContainer.appendChild(cell);
        });
    });

    resultContainer.appendChild(matrixContainer);
}
