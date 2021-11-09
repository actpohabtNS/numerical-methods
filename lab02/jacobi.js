import { continuousVNorm, fixPrec, vsubt } from "./helpers.js";

export const hasDiagonalAdvantage = (matr) => {
  let maxCoef = -Infinity;
  for (let row = 0; row < matr.length; row++) {
    let diag = Math.abs(matr[row][row]), rowSum = 0;
    for (let col = 0; col < matr.length; col++) {
      if (row !== col) {
        rowSum += Math.abs(matr[row][col])
      }
    }

    if (diag < rowSum) {
      return { passed: false };
    }
    let coef = rowSum / diag;
    maxCoef = coef > maxCoef ? coef : maxCoef;
  }

  return { passed: true, q: maxCoef };
}

export const solveJacobi = (a, b, x0, epsilon) => {
  const { passed, q } = hasDiagonalAdvantage(a);
  if (!passed) {
    console.log("Jacobi diagonal advantage condition didn't pass!");
    return {}
  }
  console.log("Jacobi diagonal advantage condition passed!");

  if (q === 1) {
    console.log("Warning! q = 1, theoretical iteration count impossible!");
  } else {
    console.log("q =", q, '\n');
  }

  let x_prev, x_curr = x0;
  let iter_fact = 0;

  do {
    // To print all x_curr during iteration process
    //console.log(x_curr);
    x_prev = [...x_curr];
    iter_fact++;
    
    for (let i = 0; i < x_prev.length; i++) {
      x_curr[i] = b[i];
      for (let col = 0; col < a.length; col++) {
        if (i !== col) {
          x_curr[i] += - a[i][col] * x_prev[col];
        }
      }
      x_curr[i] /= a[i][i];
    }

  } while (continuousVNorm(vsubt(x_curr, x_prev)) > epsilon);

  const iter_theor = Math.floor(Math.log((fixPrec(1 - q)) * epsilon) / Math.log(q)) + 1;

  return { solution: x_curr, iter_fact, iter_theor };
}
