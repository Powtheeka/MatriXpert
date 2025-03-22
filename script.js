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

// Scalar multiplication
function scalarMultiply() {
    const A = parseMatrix(document.getElementById('matrixA').value);
    const scalar = parseFloat(document.getElementById('scalar').value);
    const result = A.map(row => row.map(val => val * scalar));
    displayResult(result, 'Scalar Multiplication Result');
}

// Determinant calculation (2x2 only for simplicity)
function calculateDeterminant() {
    const A = parseMatrix(document.getElementById('matrixA').value);
    if (A.length === 2 && A[0].length === 2) {
        const det = (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
        displayResult(`Determinant: ${det}`);
    } else {
        displayResult('Currently supports only 2x2 matrices for determinant.');
    }
}

// Inverse calculation (2x2 only for now)
function calculateInverse() {
    const A = parseMatrix(document.getElementById('matrixA').value);
    if (A.length === 2 && A[0].length === 2) {
        const det = (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
        if (det === 0) {
            displayResult('Matrix A has no inverse (determinant is zero).');
            return;
        }
        const inv = [
            [A[1][1] / det, -A[0][1] / det],
            [-A[1][0] / det, A[0][0] / det]
        ];
        displayResult(inv, 'Inverse Matrix');
    } else {
        displayResult('Currently supports only 2x2 matrices for inverse.');
    }
}

// Eigenvalues (2x2 matrix using formula)
function calculateEigenvalues() {
    const A = parseMatrix(document.getElementById('matrixA').value);
    if (A.length === 2 && A[0].length === 2) {
        const trace = A[0][0] + A[1][1];
        const determinant = (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
        const discriminant = Math.sqrt((trace ** 2) - (4 * determinant));

        const eigen1 = (trace + discriminant) / 2;
        const eigen2 = (trace - discriminant) / 2;

        displayResult(`Eigenvalues: λ1 = ${eigen1.toFixed(2)}, λ2 = ${eigen2.toFixed(2)}`);
    } else {
        displayResult('Eigenvalues supported for 2x2 matrices only.');
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
