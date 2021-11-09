import { Matrix } from 'ml-matrix';
import { printVector, printMatrix } from './helpers.js';

const fixPrec = (n) => Number.parseFloat(Number(n).toFixed(15))
const fixArrPrec = (arr) => arr.map((el) => fixPrec(el))
const fixMatrPrec = (matr) => matr.map((arr) => fixArrPrec(arr))

const genMatrix = (n) => {
  let matrix = new Array();

  for (let i = 0; i < n; i++) {
    let row = new Array(n);
    row.fill(0);
    for (let j = 0; j < n; j++) {
      switch (j) {
        case 0:
        case i - 1:
          row[j] = 1;
          break;
        case i:
          row[j] = fixPrec(1 + j * 0.1);
          break;
        default:
          break;
      }
    }
    matrix[i] = row
  }

  matrix[0][n-1] = 1;
  return matrix;
}

const genVector = (n) => {
  let vec = [];
  for (let i = 0; i < n; i++) {
    vec[i] = Math.sin(Math.PI / n - i)
  }
  return vec
}

const ones = (n) => {
  return Matrix.eye(n, n).to2DArray();
}

const findBiggestColumn = (matrix, col) => {
  if (matrix.length - 1 < col) {
    throw new Error(`Matrix \n${matrix}\n has no column with number ${col}`)
  }

  let biggestIdx = col;
  let biggest = matrix[col][col];
  
  for (let i = col; i < matrix.length; i++) {
    const row = matrix[i];
    if (row[col] > biggest) {
      biggestIdx = i;
    }
  }

  return biggestIdx;
}

const swapRows = (m, r1, r2) => {
  [m[r1], m[r2]] = [m[r2], m[r1]];
  return m;
}

const mmul = (m1, m2) => {
  const matr1 = new Matrix(m1)
  const matr2 = new Matrix(m2)
  const matr3 = matr1.mmul(matr2)

  return fixMatrPrec(matr3.to2DArray());
}

const mvmul = (m, v) => {
  const matr = new Matrix(m)
  const vec = Matrix.columnVector(v)
  const res = matr.mmul(vec)

  return fixArrPrec(res.to2DArray());
}

const makeM = (matrix, col) => {
  const n = matrix.length;
  let m = ones(n);

  const biggestElem = matrix[col][col];
  m[col][col] = 1 / biggestElem;

  for (let i = col + 1; i < n; i++) {
    m[i][col] = - matrix[i][col] / biggestElem;
  }

  return m;
}

const solveTriangular = (a, b) => {
  let x = new Array(b.length)

  for (let row = a.length - 1; row >= 0; row--) {
    let acc_sum = 0;

    for (let col = a.length - 1; col >= row + 1; col--) {
      acc_sum += x[col] * a[row][col]
    }

    x[row] = fixPrec(b[row] - acc_sum);
  }

  return x
}

const solveGauss = (a, b) => {
  let matrA = a
  let l = 0;
  let acc_det = 1;
  for (let itr = 0; itr < a.length; itr++) {
    const biggestElemIdx = findBiggestColumn(matrA, itr);
    if (biggestElemIdx != itr) {
      l++;
      swapRows(matrA, biggestElemIdx, itr);
      [b[biggestElemIdx], b[itr]] = [b[itr], b[biggestElemIdx]];
    }
    acc_det *= matrA[itr][itr];

    const m = makeM(matrA, itr);

    matrA = mmul(m, matrA)
    b = mvmul(m, b);
  }

  printMatrix(matrA);
  console.log("");
  printVector(b, false);
  console.log("");

  console.log('det(A) equals', (-1)**l * acc_det);

  return solveTriangular(matrA, b)
}

const m = genMatrix(10);
const testM = [[10, 0, 3], [3, -1, 0], [-2, 4, 1]];
const b = [7, 2, 1];
printVector(solveGauss(testM, b));
console.log("");
