import { printMatrix } from "../lab02/print.js";
import { continuousMNorm, continuousVNorm, fixPrec, vsubt } from "./helpers.js";
import { jacobiMatrix } from "./jacobiMatrix.js";

const nextIterX = (x, y, z) => {
  return fixPrec(Math.sqrt(1/3 * (-1.5*y**2 - z**2 + 5)));
}

const nextIterY = (x, y, z) => {
  return fixPrec((x - 3*z) / (6*x*z + 5));
}

const nextIterZ = (x, y, z) => {
  return fixPrec(1 / (5*x - y));
}

export const solveSimpleIteration = (x0, epsilon) => {
  const q = continuousMNorm(jacobiMatrix(...x0));
  if (q >= 1) {
    console.log("Simple iteration condition didn't pass! q =", q);
    return {};
  }
  
  console.log("Simple iteration condition passed! q =", q);

  let iter_fact = 0;
  let sol_prev, sol_curr = x0;

  do {
    sol_prev = [...sol_curr];
    iter_fact++;
    
    sol_curr[0] = nextIterX(...sol_prev);
    sol_curr[1] = nextIterY(...sol_prev);
    sol_curr[2] = nextIterZ(...sol_prev);
  } while (continuousVNorm(vsubt(sol_curr, sol_prev)) > epsilon);

  return { solution: sol_curr, iter_fact };
}