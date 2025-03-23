// Function to generate matrix inputs dynamically
function generateMatrix(matrixName) {
    let rows = parseInt(document.getElementById(`rows${matrixName}`).value);
    let cols = parseInt(document.getElementById(`cols${matrixName}`).value);
    let container = document.getElementById(`matrix${matrixName}`);
    container.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        let rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.gap = '5px'; // Reduced space between boxes
        for (let j = 0; j < cols; j++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.style.width = '40px';
            input.style.marginBottom = '5px';
            input.id = `${matrixName}_${i}_${j}`;
            rowDiv.appendChild(input);
        }
        container.appendChild(rowDiv);
    }
}

// Function to get matrix values from input fields
function getMatrix(matrixName) {
    let rows = parseInt(document.getElementById(`rows${matrixName}`).value);
    let cols = parseInt(document.getElementById(`cols${matrixName}`).value);
    let matrix = [];

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let value = parseFloat(document.getElementById(`${matrixName}_${i}_${j}`).value);
            row.push(isNaN(value) ? 0 : value);
        }
        matrix.push(row);
    }
    return matrix;
}

// Function to display results properly in HTML
function displayResult(result, label) {
    let resultHTML = `<strong>${label}:</strong><br>`;
    if (Array.isArray(result)) {
        resultHTML += result.map(row => row.join(' , ')).join('<br>');
    } else {
        resultHTML += result.toFixed(2);
    }
    document.getElementById('result').innerHTML = resultHTML;
}

// Matrix Addition
function addMatrices() {
    let matrixA = getMatrix('A');
    let matrixB = getMatrix('B');

    try {
        let result = math.add(matrixA, matrixB);
        displayResult(result, 'Addition Result');
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error: Matrices must be of the same dimensions for addition.';
    }
}

// Matrix Subtraction
function subtractMatrices() {
    let matrixA = getMatrix('A');
    let matrixB = getMatrix('B');

    try {
        let result = math.subtract(matrixA, matrixB);
        displayResult(result, 'Subtraction Result');
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error: Matrices must be of the same dimensions for subtraction.';
    }
}

// Matrix Multiplication
function multiplyMatrices() {
    let matrixA = getMatrix('A');
    let matrixB = getMatrix('B');

    try {
        let result = math.multiply(matrixA, matrixB);
        displayResult(result, 'Multiplication Result');
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error: Invalid matrix dimensions for multiplication.';
    }
}

// Determinant Calculation
function calculateDeterminant(matrixName) {
    let matrix = getMatrix(matrixName);
    try {
        let determinant = math.det(matrix);
        document.getElementById('result').innerHTML = `<strong>Determinant of Matrix ${matrixName}:</strong> ${determinant.toFixed(2)}`;
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error: Determinant can only be calculated for square matrices.';
    }
}

// Inverse Calculation with determinant check
function calculateInverse(matrixName) {
    let matrix = getMatrix(matrixName);
    try {
        let det = math.det(matrix);
        if (det === 0) {
            document.getElementById('result').innerHTML = `<strong>Inverse of Matrix ${matrixName}:</strong> Matrix is singular, so inverse does not exist.`;
            return;
        }
        let inverse = math.inv(matrix);
        displayResult(inverse, `Inverse of Matrix ${matrixName}`);
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error: Inverse can only be calculated for square matrices.';
    }
}

// Eigenvalues Calculation
function calculateEigenvalues(matrixName) {
    let matrix = getMatrix(matrixName);

    try {
        let eigenvalues = math.eigs(matrix).values;
        document.getElementById('result').innerHTML = `<strong>Eigenvalues of Matrix ${matrixName}:</strong> ${eigenvalues.map(v => v.toFixed(2)).join(', ')}`;
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error: Eigenvalues can only be calculated for square matrices.';
    }
}

// LaTeX Output Generation
function generateLaTeX(matrixName) {
    let matrix = getMatrix(matrixName);
    let latex = `\\[\\begin{bmatrix}${matrix.map(row => row.join(' & ')).join(' \\\\ ')}\\end{bmatrix}\\]`;
    document.getElementById('result').innerHTML = `<strong>LaTeX Matrix ${matrixName}:</strong> ${latex}`;
}
