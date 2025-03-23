// Generate matrix inputs based on rows and columns
function generateMatrixInput() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);
    createMatrixInputs('matrixAInput', rows, cols, 'A');
    createMatrixInputs('matrixBInput', rows, cols, 'B');
}

// Create matrix input dynamically
function createMatrixInputs(containerId, rows, cols, matrixName) {
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

// Get matrix values from user input
function getMatrixValues(matrixName) {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            const value = parseFloat(document.getElementById(`${matrixName}_${i}_${j}`).value) || 0;
            row.push(value);
        }
        matrix.push(row);
    }
    return matrix;
}

// Matrix operations: addition, subtraction, multiplication
function performOperation(operation) {
    const matrixA = getMatrixValues('A');
    const matrixB = getMatrixValues('B');
    let result = [];

    switch (operation) {
        case 'add':
            result = matrixAddition(matrixA, matrixB);
            break;
        case 'subtract':
            result = matrixSubtraction(matrixA, matrixB);
            break;
        case 'multiply':
            result = matrixMultiplication(matrixA, matrixB);
            break;
    }

    if (result) {
        displayResult(result);
    }
}

// Matrix addition
function matrixAddition(A, B) {
    return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}

// Matrix subtraction
function matrixSubtraction(A, B) {
    return A.map((row, i) => row.map((val, j) => val - B[i][j]));
}

// Matrix multiplication
function matrixMultiplication(A, B) {
    const result = [];
    const rowsA = A.length, colsA = A[0].length, colsB = B[0].length;
    for (let i = 0; i < rowsA; i++) {
        result[i] = [];
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
                sum += A[i][k] * B[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

// Display result in grid format
function displayResult(result) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-result';
    matrixContainer.style.gridTemplateColumns = `repeat(${result[0].length}, 40px)`;

    result.forEach(row => {
        row.forEach(val => {
            const cell = document.createElement('div');
            cell.className = 'result-cell';
            cell.innerText = val.toFixed(2);
            matrixContainer.appendChild(cell);
        });
    });

    resultContainer.appendChild(matrixContainer);
}

// Determinant calculation for both matrices
function calculateDeterminant(matrixName) {
    const matrix = getMatrixValues(matrixName);
    if (matrix.length !== matrix[0].length) {
        alert(`Matrix ${matrixName} must be square to calculate determinant`);
        return;
    }
    const det = determinant(matrix);
    document.getElementById('result').innerHTML = `Determinant of Matrix ${matrixName}: ${det.toFixed(2)}`;
}

// Recursive function to calculate determinant
function determinant(matrix) {
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    let det = 0;
    for (let i = 0; i < n; i++) {
        const subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
        det += (i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(subMatrix);
    }
    return det;
}

// Inverse calculation for both matrices
function calculateInverse(matrixName) {
    const matrix = getMatrixValues(matrixName);
    if (matrix.length !== matrix[0].length) {
        alert(`Matrix ${matrixName} must be square to calculate inverse`);
        return;
    }
    const det = determinant(matrix);
    if (det === 0) {
        alert(`Matrix ${matrixName} has no inverse (determinant is zero).`);
        return;
    }
    const inverse = invertMatrix(matrix);
    displayResult(inverse);
}

// Function to invert a matrix
function invertMatrix(matrix) {
    const n = matrix.length;
    const identity = matrix.map((row, i) => row.map((_, j) => (i === j ? 1 : 0)));
    for (let i = 0; i < n; i++) {
        let scale = matrix[i][i];
        for (let j = 0; j < n; j++) {
            matrix[i][j] /= scale;
            identity[i][j] /= scale;
        }
        for (let k = 0; k < n; k++) {
            if (k !== i) {
                let factor = matrix[k][i];
                for (let j = 0; j < n; j++) {
                    matrix[k][j] -= factor * matrix[i][j];
                    identity[k][j] -= factor * identity[i][j];
                }
            }
        }
    }
    return identity;
}

// Eigenvalues and eigenvectors for matrix A and B
function calculateEigen(matrixName) {
    const matrix = getMatrixValues(matrixName);
    if (matrix.length !== matrix[0].length) {
        alert(`Matrix ${matrixName} must be square to calculate eigenvalues`);
        return;
    }
    const eig = numeric.eig(matrix);
    const eigenValues = eig.lambda.x.map(val => val.toFixed(2));
    document.getElementById('result').innerHTML = `
        Eigenvalues of Matrix ${matrixName}: [${eigenValues.join(', ')}]
    `;
}

// Generate LaTeX output for both matrices
function generateLaTeX() {
    const matrixA = getMatrixValues('A');
    const matrixB = getMatrixValues('B');

    let latexA = '\\begin{pmatrix}';
    let latexB = '\\begin{pmatrix}';

    matrixA.forEach(row => latexA += row.join(' & ') + '\\\\');
    matrixB.forEach(row => latexB += row.join(' & ') + '\\\\');

    latexA += '\\end{pmatrix}';
    latexB += '\\end{pmatrix}';

    document.getElementById('result').innerHTML = `
        <p>Matrix A: \${latexA}\</p>
        <p>Matrix B: \${latexB}\</p>
    `;
    MathJax.typeset();
}
