let matrixA = [];
let matrixB = [];

// Generate Matrix A or B
function generateMatrix(matrix) {
    let rows = parseInt(document.getElementById(`rows${matrix}`).value);
    let cols = parseInt(document.getElementById(`cols${matrix}`).value);
    let matrixDiv = document.getElementById(`matrix${matrix}`);

    let grid = `<div class="matrix-grid" style="grid-template-columns: repeat(${cols}, 1fr);">`;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid += `<input type="number" class="matrix-cell" id="${matrix}${i}${j}" value="0">`;
        }
    }
    grid += `</div>`;
    matrixDiv.innerHTML = grid;
}

// Get Matrix Values
function getMatrix(matrix) {
    let rows = parseInt(document.getElementById(`rows${matrix}`).value);
    let cols = parseInt(document.getElementById(`cols${matrix}`).value);
    let values = [];

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push(parseFloat(document.getElementById(`${matrix}${i}${j}`).value));
        }
        values.push(row);
    }
    return values;
}

// Display Matrix as Grid
function displayMatrix(matrix, title) {
    let rows = matrix.length;
    let cols = matrix[0].length;
    let grid = `<h4>${title}:</h4><div class="result-grid" style="grid-template-columns: repeat(${cols}, 1fr);">`;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid += `<div class="result-cell">${matrix[i][j].toFixed(2)}</div>`;
        }
    }
    grid += `</div>`;
    document.getElementById('result').innerHTML = grid;
}

// Matrix Addition
function addMatrices() {
    matrixA = getMatrix('A');
    matrixB = getMatrix('B');
    if (!validateMatrices(matrixA, matrixB)) return;
    let result = matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j]));
    displayMatrix(result, "Addition Result");
}

// Matrix Subtraction
function subtractMatrices() {
    matrixA = getMatrix('A');
    matrixB = getMatrix('B');
    if (!validateMatrices(matrixA, matrixB)) return;
    let result = matrixA.map((row, i) => row.map((val, j) => val - matrixB[i][j]));
    displayMatrix(result, "Subtraction Result");
}

// Matrix Multiplication
function multiplyMatrices() {
    matrixA = getMatrix('A');
    matrixB = getMatrix('B');
    if (matrixA[0].length !== matrixB.length) {
        alert("Matrix multiplication requires Matrix A columns to be equal to Matrix B rows.");
        return;
    }
    let result = math.multiply(matrixA, matrixB);
    displayMatrix(result, "Multiplication Result");
}

// Determinant Calculation
function calculateDeterminant(matrix) {
    let mat = getMatrix(matrix);
    if (mat.length !== mat[0].length) {
        alert("Determinant can only be calculated for square matrices.");
        return;
    }
    let determinant = math.det(mat);
    document.getElementById('result').innerHTML = `<h4>Determinant of Matrix ${matrix}:</h4><p>${determinant.toFixed(2)}</p>`;
}

// Inverse Calculation
function calculateInverse(matrixName) {
    let matrix = getMatrix(matrixName);
    let det = math.det(matrix);

    if (det === 0) {
        document.getElementById("result").innerHTML = `<strong>Inverse of Matrix ${matrixName}: </strong> Matrix is singular, so inverse does not exist.`;
        return;
    }

    try {
        let inverse = math.inv(matrix);
        displayResult(inverse, `Inverse of Matrix ${matrixName}`);
    } catch (error) {
        document.getElementById("result").innerHTML = `<strong>Error:</strong> ${error.message}`;
    }
}


// Eigenvalues Calculation
function calculateEigenvalues(matrix) {
    let mat = getMatrix(matrix);
    if (mat.length !== mat[0].length) {
        alert("Eigenvalues can only be calculated for square matrices.");
        return;
    }
    try {
        let eig = math.eigs(mat);
        document.getElementById('result').innerHTML = `<h4>Eigenvalues of Matrix ${matrix}:</h4><p>${eig.values.map(v => v.toFixed(2)).join(', ')}</p>`;
    } catch (error) {
        alert("Error calculating eigenvalues.");
    }
}

// Generate LaTeX Output
function generateLaTeX() {
    matrixA = getMatrix('A');
    matrixB = getMatrix('B');

    let latexA = `\\begin{bmatrix}`;
    matrixA.forEach(row => {
        latexA += row.join(' & ') + ' \\\\ ';
    });
    latexA += `\\end{bmatrix}`;

    let latexB = `\\begin{bmatrix}`;
    matrixB.forEach(row => {
        latexB += row.join(' & ') + ' \\\\ ';
    });
    latexB += `\\end{bmatrix}`;

    document.getElementById('result').innerHTML = `
        <h4>LaTeX Output:</h4>
        <p>Matrix A: \\[${latexA}\\]</p>
        <p>Matrix B: \\[${latexB}\\]</p>
    `;
    MathJax.typesetPromise();
}

// Validate Matrix Dimensions
function validateMatrices(matrixA, matrixB) {
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        alert("Matrix dimensions must match for addition and subtraction.");
        return false;
    }
    return true;
}
