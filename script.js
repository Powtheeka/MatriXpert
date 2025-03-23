// Generate matrix input grids dynamically
function generateMatrixInput() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);
    createGrid('matrixAInput', rows, cols, 'A');
    createGrid('matrixBInput', rows, cols, 'B');
}

// Create grid for matrix input
function createGrid(containerId, rows, cols, matrixName) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
    container.className = 'matrix-grid';
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

// Determinant (2x2 matrix)
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
    displayResult(inv, `Inverse Matrix ${matrixType}`);
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

// Graphical Matrix Visualization
function graphMatrix() {
    const matrix = getMatrix('A', 2, 2);
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cellSize = 40;
    matrix.forEach((row, i) => {
        row.forEach((val, j) => {
            ctx.fillStyle = '#4CAF50';
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            ctx.strokeStyle = '#fff';
            ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
            ctx.fillStyle = '#000';
            ctx.fillText(val, j * cellSize + 15, i * cellSize + 25);
        });
    });
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
    const A = getMatrix('A', 2, 2);
    const B = getMatrix('B', 2, 2);

    let result;
    switch (operation) {
        case 'add':
            result = addMatrices(A, B);
            displayResult(result, 'Addition Result');
            break;
        case 'subtract':
            result = subtractMatrices(A, B);
            displayResult(result, 'Subtraction Result');
            break;
        case 'multiply':
            result = multiplyMatrices(A, B);
            displayResult(result, 'Multiplication Result');
            break;
        default:
            displayResult('Invalid operation');
    }
}

// Display results dynamically
function displayResult(result, title = '') {
    if (Array.isArray(result)) {
        const resultStr = result.map(row => row.join(', ')).join('\n');
        document.getElementById('result').innerHTML = `<strong>${title}:</strong>\n${resultStr}`;
    } else {
        document.getElementById('result').innerHTML = result;
    }
}
