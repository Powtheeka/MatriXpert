// Generate Matrix Inputs
function generateMatrix(matrixId) {
    let rows = parseInt(document.getElementById(`rows${matrixId}`).value);
    let cols = parseInt(document.getElementById(`cols${matrixId}`).value);
    let matrixDiv = document.getElementById(`matrix${matrixId}`);
    matrixDiv.innerHTML = ''; // Clear previous matrix

    matrixDiv.style.gridTemplateColumns = `repeat(${cols}, 60px)`;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.className = 'matrix-cell';
            input.id = `${matrixId}_${i}_${j}`;
            matrixDiv.appendChild(input);
        }
    }
}

// Get Matrix Data
function getMatrixData(matrixId) {
    let rows = parseInt(document.getElementById(`rows${matrixId}`).value);
    let cols = parseInt(document.getElementById(`cols${matrixId}`).value);
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

// Matrix Operations
function performOperation(operation) {
    let matrixA = getMatrixData('A');
    let matrixB = getMatrixData('B');
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
        displayMatrixResult(result);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Display Result in Grid Format
function displayMatrixResult(matrix) {
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h4>Result:</h4>';
    let matrixHTML = '<div class="matrix-grid" style="grid-template-columns: repeat(' + matrix[0].length + ', 60px);">';
    matrix.forEach(row => {
        row.forEach(cell => {
            matrixHTML += `<div class="matrix-cell">${cell.toFixed(2)}</div>`;
        });
    });
    matrixHTML += '</div>';
    resultDiv.innerHTML += matrixHTML;
}

// Calculate Determinant
function calculateDeterminant(matrixId) {
    let matrix = getMatrixData(matrixId);
    try {
        let det = math.det(matrix);
        document.getElementById('result').innerHTML = `Determinant of Matrix ${matrixId}: ${det.toFixed(2)}`;
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Calculate Inverse
function calculateInverse(matrixId) {
    let matrix = getMatrixData(matrixId);
    try {
        let inverse = math.inv(matrix);
        displayMatrixResult(inverse);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Calculate Eigenvalues
function calculateEigenvalues(matrixId) {
    let matrix = getMatrixData(matrixId);
    try {
        let eigenResult = math.eigs(matrix);
        let eigenvalues = eigenResult.values.toArray(); // Corrected conversion
        document.getElementById('result').innerHTML = `Eigenvalues of Matrix ${matrixId}: ${eigenvalues.map(v => v.toFixed(2)).join(', ')}`;
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Generate LaTeX Output
function generateLaTeX() {
    let matrixA = getMatrixData('A');
    let matrixB = getMatrixData('B');
    let latexA = matrixToLaTeX(matrixA);
    let latexB = matrixToLaTeX(matrixB);
    document.getElementById('result').innerHTML = `LaTeX Matrix A: \\[${latexA}\\]<br>LaTeX Matrix B: \\[${latexB}\\]`;
}

// Convert Matrix to LaTeX
function matrixToLaTeX(matrix) {
    let latex = '\\begin{bmatrix}';
    matrix.forEach(row => {
        latex += row.join(' & ') + '\\\\';
    });
    latex += '\\end{bmatrix}';
    return latex;
}
