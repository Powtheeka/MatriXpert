document.addEventListener('DOMContentLoaded', function () {
    let matrixA = [];
    let matrixB = [];

    // Generate Matrix Inputs
    function generateMatrix(containerId, rows, cols, matrix) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('tr');
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.style.width = '50px';
                input.style.margin = '2px';
                input.id = `${containerId}-${i}-${j}`;
                input.value = matrix[i][j] || '';
                row.appendChild(cell);
                cell.appendChild(input);
            }
            table.appendChild(row);
        }
        container.appendChild(table);
    }

    document.getElementById('generateMatrixA').addEventListener('click', function () {
        const rowsA = parseInt(document.getElementById('rowsA').value);
        const colsA = parseInt(document.getElementById('colsA').value);
        generateMatrix('matrixA', rowsA, colsA, matrixA);
    });

    document.getElementById('generateMatrixB').addEventListener('click', function () {
        const rowsB = parseInt(document.getElementById('rowsB').value);
        const colsB = parseInt(document.getElementById('colsB').value);
        generateMatrix('matrixB', rowsB, colsB, matrixB);
    });

    // Get Matrix Values
    function getMatrixValues(containerId, rows, cols) {
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                const value = parseFloat(document.getElementById(`${containerId}-${i}-${j}`).value);
                row.push(isNaN(value) ? 0 : value);
            }
            matrix.push(row);
        }
        return matrix;
    }

    // Display Matrix as Grid
    function displayMatrixAsGrid(matrix, resultContainer) {
        const container = document.getElementById(resultContainer);
        container.innerHTML = '';
        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        for (let i = 0; i < matrix.length; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < matrix[i].length; j++) {
                const cell = document.createElement('td');
                cell.innerText = matrix[i][j].toFixed(3);
                cell.style.border = '1px solid white';
                cell.style.padding = '5px';
                cell.style.textAlign = 'center';
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        container.appendChild(table);
    }

    // Display LaTeX Matrix
    function displayLaTeXMatrix(matrix, elementId) {
        let latex = '\\[\\begin{bmatrix}';
        for (let i = 0; i < matrix.length; i++) {
            latex += matrix[i].map((val) => val.toFixed(3)).join(' & ');
            if (i !== matrix.length - 1) latex += ' \\\\ ';
        }
        latex += '\\end{bmatrix}\\]';
        document.getElementById(elementId).innerHTML = latex;
        MathJax.typesetPromise([document.getElementById(elementId)]);
    }

    // Matrix Operations
    document.getElementById('addMatrices').addEventListener('click', function () {
        const rowsA = parseInt(document.getElementById('rowsA').value);
        const colsA = parseInt(document.getElementById('colsA').value);
        const rowsB = parseInt(document.getElementById('rowsB').value);
        const colsB = parseInt(document.getElementById('colsB').value);

        if (rowsA !== rowsB || colsA !== colsB) {
            alert('Matrix dimensions do not match for addition.');
            return;
        }

        matrixA = getMatrixValues('matrixA', rowsA, colsA);
        matrixB = getMatrixValues('matrixB', rowsB, colsB);
        const result = math.add(matrixA, matrixB);
        displayMatrixAsGrid(result, 'result');
        displayLaTeXMatrix(result, 'latexResult');
    });

    document.getElementById('subtractMatrices').addEventListener('click', function () {
        const rowsA = parseInt(document.getElementById('rowsA').value);
        const colsA = parseInt(document.getElementById('colsA').value);
        const rowsB = parseInt(document.getElementById('rowsB').value);
        const colsB = parseInt(document.getElementById('colsB').value);

        if (rowsA !== rowsB || colsA !== colsB) {
            alert('Matrix dimensions do not match for subtraction.');
            return;
        }

        matrixA = getMatrixValues('matrixA', rowsA, colsA);
        matrixB = getMatrixValues('matrixB', rowsB, colsB);
        const result = math.subtract(matrixA, matrixB);
        displayMatrixAsGrid(result, 'result');
        displayLaTeXMatrix(result, 'latexResult');
    });

    document.getElementById('multiplyMatrices').addEventListener('click', function () {
        const rowsA = parseInt(document.getElementById('rowsA').value);
        const colsA = parseInt(document.getElementById('colsA').value);
        const rowsB = parseInt(document.getElementById('rowsB').value);
        const colsB = parseInt(document.getElementById('colsB').value);

        if (colsA !== rowsB) {
            alert('Number of columns in Matrix A must equal number of rows in Matrix B for multiplication.');
            return;
        }

        matrixA = getMatrixValues('matrixA', rowsA, colsA);
        matrixB = getMatrixValues('matrixB', rowsB, colsB);
        const result = math.multiply(matrixA, matrixB);
        displayMatrixAsGrid(result, 'result');
        displayLaTeXMatrix(result, 'latexResult');
    });

    document.getElementById('inverseA').addEventListener('click', function () {
        const rowsA = parseInt(document.getElementById('rowsA').value);
        const colsA = parseInt(document.getElementById('colsA').value);

        if (rowsA !== colsA) {
            alert('Matrix A must be square to calculate its inverse.');
            return;
        }

        matrixA = getMatrixValues('matrixA', rowsA, colsA);
        try {
            const inverse = math.inv(matrixA);
            displayMatrixAsGrid(inverse, 'result');
            displayLaTeXMatrix(inverse, 'latexResult');
        } catch (error) {
            alert('Matrix A is singular or not invertible.');
        }
    });

    document.getElementById('determinantA').addEventListener('click', function () {
        const rowsA = parseInt(document.getElementById('rowsA').value);
        const colsA = parseInt(document.getElementById('colsA').value);

        if (rowsA !== colsA) {
            alert('Matrix A must be square to calculate its determinant.');
            return;
        }

        matrixA = getMatrixValues('matrixA', rowsA, colsA);
        const determinant = math.det(matrixA).toFixed(3);
        document.getElementById('result').innerText = `Determinant of Matrix A: ${determinant}`;
    });
});
