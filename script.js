// Helper function to parse matrix input
function parseMatrix(input) {
    return input.split(';').map(row => row.split(',').map(Number));
}

// Matrix addition
function addMatrices(A, B) {
    return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}

// Matrix subtraction
function subtractMatrices(A, B) {
    return A.map((row, i) => row.map((val, j) => val - B[i][j]));
}

// Matrix multiplication
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

// Scalar multiplication for Matrix A or B
function scalarMultiply(matrixType) {
    const matrixInput = matrixType === 'A' ? document.getElementById('matrixA').value : document.getElementById('matrixB').value;
    const matrix = parseMatrix(matrixInput);
    const scalar = parseFloat(document.getElementById('scalar').value);
    const result = matrix.map(row => row.map(val => val * scalar));
    displayResult(result, `Scalar Multiplication Result for Matrix ${matrixType}`);
}

// Determinant calculation for Matrix A or B (2x2 only for simplicity)
function calculateDeterminant(matrixType) {
    const matrixInput = matrixType === 'A' ? document.getElementById('matrixA').value : document.getElementById('matrixB').value;
    const matrix = parseMatrix(matrixInput);

    if (matrix.length === 2 && matrix[0].length === 2) {
        const det = (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
        displayResult(`Determinant of Matrix ${matrixType}: ${det}`);
    } else {
        displayResult(`Currently supports only 2x2 matrices for determinant of Matrix ${matrixType}.`);
    }
}

// Inverse calculation for Matrix A or B (2x2 only for now)
function calculateInverse(matrixType) {
    const matrixInput = matrixType === 'A' ? document.getElementById('matrixA').value : document.getElementById('matrixB').value;
    const matrix = parseMatrix(matrixInput);

    if (matrix.length === 2 && matrix[0].length === 2) {
        const det = (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
        if (det === 0) {
            displayResult(`Matrix ${matrixType} has no inverse (determinant is zero).`);
            return;
        }
        const inv = [
            [matrix[1][1] / det, -matrix[0][1] / det],
            [-matrix[1][0] / det, matrix[0][0] / det]
        ];
        displayResult(inv, `Inverse Matrix ${matrixType}`);
    } else {
        displayResult(`Currently supports only 2x2 matrices for inverse of Matrix ${matrixType}.`);
    }
}

// Eigenvalues for Matrix A or B (2x2 matrix using formula)
function calculateEigenvalues(matrixType) {
    const matrixInput = matrixType === 'A' ? document.getElementById('matrixA').value : document.getElementById('matrixB').value;
    const matrix = parseMatrix(matrixInput);

    if (matrix.length === 2 && matrix[0].length === 2) {
        const trace = matrix[0][0] + matrix[1][1];
        const determinant = (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
        const discriminant = Math.sqrt((trace ** 2) - (4 * determinant));

        const eigen1 = (trace + discriminant) / 2;
        const eigen2 = (trace - discriminant) / 2;

        displayResult(`Eigenvalues of Matrix ${matrixType}: λ1 = ${eigen1.toFixed(2)}, λ2 = ${eigen2.toFixed(2)}`);
    } else {
        displayResult(`Eigenvalues supported for 2x2 matrices only for Matrix ${matrixType}.`);
    }
}

// Main function to perform matrix operations
function performOperation(operation) {
    const A = parseMatrix(document.getElementById('matrixA').value);
    const B = parseMatrix(document.getElementById('matrixB').value);

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
