document.addEventListener("DOMContentLoaded", function () {
    let matrixA = [];
    let matrixB = [];

    // Generate Matrix A
    document.getElementById("generateMatrixA").addEventListener("click", function () {
        generateMatrix("A");
    });

    // Generate Matrix B
    document.getElementById("generateMatrixB").addEventListener("click", function () {
        generateMatrix("B");
    });

    // Matrix Operations
    document.getElementById("add").addEventListener("click", function () {
        performOperation("add");
    });

    document.getElementById("subtract").addEventListener("click", function () {
        performOperation("subtract");
    });

    document.getElementById("multiply").addEventListener("click", function () {
        performOperation("multiply");
    });

    // Advanced Operations
    document.getElementById("determinantA").addEventListener("click", function () {
        calculateDeterminant(matrixA, "A");
    });

    document.getElementById("determinantB").addEventListener("click", function () {
        calculateDeterminant(matrixB, "B");
    });

    document.getElementById("inverseA").addEventListener("click", function () {
        calculateInverse(matrixA, "A");
    });

    document.getElementById("inverseB").addEventListener("click", function () {
        calculateInverse(matrixB, "B");
    });

    document.getElementById("generateLaTeX_A").addEventListener("click", function () {
        generateLaTeX(matrixA, "A");
    });

    document.getElementById("generateLaTeX_B").addEventListener("click", function () {
        generateLaTeX(matrixB, "B");
    });

    // Generate matrix dynamically
    function generateMatrix(matrixName) {
        const rows = parseInt(document.getElementById(`rows${matrixName}`).value);
        const cols = parseInt(document.getElementById(`cols${matrixName}`).value);
        const matrixDiv = document.getElementById(`matrix${matrixName}`);
        matrixDiv.innerHTML = "";

        const table = document.createElement("table");
        const matrix = [];

        for (let i = 0; i < rows; i++) {
            const row = document.createElement("tr");
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement("td");
                const input = document.createElement("input");
                input.type = "number";
                input.value = Math.floor(Math.random() * 10);
                input.addEventListener("input", function () {
                    matrix[i][j] = parseFloat(input.value);
                });
                cell.appendChild(input);
                row.appendChild(cell);
                matrix[i][j] = parseFloat(input.value);
            }
            table.appendChild(row);
        }
        matrixDiv.appendChild(table);

        if (matrixName === "A") matrixA = matrix;
        else matrixB = matrix;
    }

    // Perform Matrix Operations
    function performOperation(operation) {
        if (!validateMatrices(matrixA, matrixB)) return;

        let result;
        switch (operation) {
            case "add":
                result = matrixA.map((row, i) => row.map((val, j) => (val + matrixB[i][j]).toFixed(3)));
                displayResult(result, "Addition Result:");
                break;
            case "subtract":
                result = matrixA.map((row, i) => row.map((val, j) => (val - matrixB[i][j]).toFixed(3)));
                displayResult(result, "Subtraction Result:");
                break;
            case "multiply":
                if (matrixA[0].length !== matrixB.length) {
                    alert("Matrix multiplication not possible, column of A must match row of B.");
                    return;
                }
                result = multiplyMatrices(matrixA, matrixB);
                displayResult(result, "Multiplication Result:");
                break;
        }
    }

    // Matrix Multiplication
    function multiplyMatrices(A, B) {
        const result = Array.from({ length: A.length }, () =>
            Array(B[0].length).fill(0)
        );
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < B[0].length; j++) {
                for (let k = 0; k < A[0].length; k++) {
                    result[i][j] += A[i][k] * B[k][j];
                }
                result[i][j] = parseFloat(result[i][j].toFixed(3));
            }
        }
        return result;
    }

    // Validate Matrices
    function validateMatrices(A, B) {
        if (A.length === 0 || B.length === 0) {
            alert("Please generate matrices first.");
            return false;
        }
        if (A.length !== B.length || A[0].length !== B[0].length) {
            alert("Matrices must be of the same dimensions.");
            return false;
        }
        return true;
    }

    // Display Results in Grid
    function displayResult(matrix, operationName) {
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `<strong>${operationName}</strong>`;
        const table = document.createElement("table");

        matrix.forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(value => {
                const td = document.createElement("td");
                td.innerText = value;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });

        resultDiv.appendChild(table);
    }

    // Calculate Determinant
    function calculateDeterminant(matrix, matrixName) {
        if (matrix.length !== matrix[0].length) {
            alert(`Matrix ${matrixName} must be square to calculate determinant.`);
            return;
        }
        const det = math.det(matrix).toFixed(3);
        document.getElementById("result").innerHTML = `Determinant of Matrix ${matrixName}: ${det}`;
    }

    // Calculate Inverse
    function calculateInverse(matrix, matrixName) {
        if (matrix.length !== matrix[0].length) {
            alert(`Matrix ${matrixName} must be square to calculate inverse.`);
            return;
        }
        try {
            const inv = math.inv(matrix);
            displayResult(inv.map(row => row.map(val => val.toFixed(3))), `Inverse of Matrix ${matrixName}:`);
        } catch (error) {
            document.getElementById("result").innerHTML = `Matrix ${matrixName} is not invertible.`;
        }
    }

    // Generate LaTeX
    function generateLaTeX(matrix, matrixName) {
        let latex = "\\[\\begin{bmatrix}";
        for (let i = 0; i < matrix.length; i++) {
            latex += matrix[i].join(" & ");
            if (i !== matrix.length - 1) latex += " \\\\ ";
        }
        latex += "\\end{bmatrix}\\]";
        document.getElementById("latexResult").innerHTML = `LaTeX Matrix ${matrixName}: ${latex}`;
    }
});
