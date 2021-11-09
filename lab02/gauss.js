import { printVector, printMatrix } from "./print.js";
import { eye, swapRows, fixPrec, mmul, mvmul } from "./helpers.js";

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

const makeM = (matrix, col) => {
  const n = matrix.length;
  let m = eye(n);

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

export const solveGauss = (a, b) => {
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
  console.log("");

  return solveTriangular(matrA, b)
}