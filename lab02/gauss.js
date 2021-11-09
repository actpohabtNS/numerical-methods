import { printVector, printMatrix } from "./print.js";
import { eye, swapRows, fixPrec, mmul, mvmul, firstMNorm } from "./helpers.js";
import { Matrix } from "ml-matrix";

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

const solveMatricies = (a, b) => {
  const matrB = new Matrix(b);
  const x_cols = []

  for (let col = 0; col < matrB.columns; col++) {
    x_cols.push(solveTriangular(a, matrB.getColumn(col)))
  }

  const x_trans = new Matrix(x_cols)
  return x_trans.transpose().to2DArray()
}

export const solveGauss = (a, b) => {
  let matrA = a
  let l = 0;
  let acc_det = 1;
  let e = eye(b.length);

  for (let itr = 0; itr < a.length; itr++) {
    const biggestElemIdx = findBiggestColumn(matrA, itr);
    if (biggestElemIdx != itr) {
      l++;
      swapRows(matrA, biggestElemIdx, itr);
      swapRows(e, biggestElemIdx, itr);
      [b[biggestElemIdx], b[itr]] = [b[itr], b[biggestElemIdx]];
    }
    acc_det *= matrA[itr][itr];

    const m = makeM(matrA, itr);

    matrA = mmul(m, matrA)
    b = mvmul(m, b);
    e = mmul(m, e);
  }

  // printMatrix(matrA);
  // console.log("");
  // printVector(b, false);
  // console.log("");

  const detA = (-1)**l * acc_det;
  const invA = solveMatricies(matrA, e);
  const solution = solveTriangular(matrA, b);
  const condA = firstMNorm(a) * firstMNorm(invA);

  return { solution, detA, invA, condA }
}