let matrixA = [];
let matrixB = [];

// Generate Matrix Input Grid
function generateMatrix(matrix) {
    let rows = parseInt(document.getElementById(`rows${matrix}`).value);
    let cols = parseInt(document.getElementById(`cols${matrix}`).value);
    let matrixDiv = document.getElementById(`matrix${matrix}`);
    
    let matrixHTML = "<table>";
    for (let i = 0; i < rows; i++) {
        matrixHTML += "<tr>";
        for (let j = 0; j < cols; j++) {
            matrixHTML += `<td><input type="number" id="${matrix}${i}${j}" value="0"></td>`;
        }
        matrixHTML += "</tr>";
    }
    matrixHTML += "</table>";
    matrixDiv.innerHTML = matrixHTML;
}

// Get Matrix Values
function getMatrix(matrix) {
    let rows = parseInt(document.getElementById(`rows${matrix}`).value);
    let cols = parseInt(document.getElementById(`cols${matrix}`).value);
    let result = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push(parseFloat(document.getElementById(`${matrix}${i}${j}`).value));
        }
        result.push(row);
    }
    return result;
}

// Display Result in Grid
function displayResult(matrix, operation) {
    let resultHTML = `<h3>${operation} Result:</h3><table>`;
    for (let i = 0; i < matrix.length; i++) {
        resultHTML += "<tr>";
        for (let j = 0; j < matrix[i].length; j++) {
            resultHTML += `<td>${matrix[i][j].toFixed(3)}</td>`;
        }
        resultHTML += "</tr>";
    }
    resultHTML += "</table>";
    document.getElementById("result").innerHTML = resultHTML;
}

// Matrix Operations
function performOperation(operation) {
    matrixA = getMatrix('A');
    matrixB = getMatrix('B');

    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        alert("Matrix dimensions do not match for this operation!");
        return;
    }

    let rows = matrixA.length;
    let cols = matrixA[0].length;
    let result = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (operation === 'add') result[i][j] = matrixA[i][j] + matrixB[i][j];
            if (operation === 'subtract') result[i][j] = matrixA[i][j] - matrixB[i][j];
            if (operation === 'multiply') result[i][j] = matrixA[i][j] * matrixB[i][j];
        }
    }
    displayResult(result, operation.charAt(0).toUpperCase() + operation.slice(1));
}

// Determinant Calculation
function calculateDeterminant(matrix) {
    let mat = getMatrix(matrix);
    if (mat.length !== mat[0].length) {
        alert("Determinant can only be calculated for square matrices.");
        return;
    }
    let det = math.det(mat);
    document.getElementById("result").innerHTML = `<h3>Determinant of Matrix ${matrix}:</h3><p>${det.toFixed(3)}</p>`;
}

// Inverse Calculation
function calculateInverse(matrix) {
    let mat = getMatrix(matrix);
    if (mat.length !== mat[0].length) {
        alert("Inverse can only be calculated for square matrices.");
        return;
    }
    let det = math.det(mat);
    if (det === 0) {
        alert("Matrix is singular, inverse cannot be calculated.");
        return;
    }
    let inverse = math.inv(mat);
    displayResult(inverse, `Inverse of Matrix ${matrix}`);
}

// Eigenvalues Calculation
function calculateEigenvalues(matrix) {
    let mat = getMatrix(matrix);
    if (mat.length !== mat[0].length) {
        alert("Eigenvalues can only be calculated for square matrices.");
        return;
    }
    let eigenvalues = math.eigs(mat).values;
    document.getElementById("result").innerHTML = `<h3>Eigenvalues of Matrix ${matrix}:</h3><p>${eigenvalues.map(val => val.toFixed(3)).join(', ')}</p>`;
}

// Generate LaTeX Output
function generateLaTeX(matrix, matrixName) {
    matrix = getMatrix(matrixName);
    let latex = `\\begin{bmatrix}`;
    for (let i = 0; i < matrix.length; i++) {
        latex += matrix[i].join(" & ");
        latex += (i < matrix.length - 1) ? " \\\\" : "";
    }
    latex += `\\end{bmatrix}`;
    
    let latexOutput = `<h3>LaTeX Output for Matrix ${matrixName}:</h3>`;
    latexOutput += `<pre>$$${latex}$$</pre>`;
    
    document.getElementById("latexResult").innerHTML = latexOutput;
    MathJax.typeset(); // Ensure MathJax updates dynamically
}
