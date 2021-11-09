import { printMatrix, printVector } from './print.js';
import { solveGauss } from './gauss.js';
import { hasDiagonalAdvantage, solveJacobi } from './jacobi.js';
import { genMatrix, genVector, genXFirst } from './generators.js';
import { continuousVNorm } from './helpers.js';

const gaussTask = () => {
  const m = genMatrix(10);
  const testA = [[10, 0, 3], [3, -1, 0], [-2, 4, 1]];
  const testB = [7, 2, 1];
  const { solution, detA, invA, condA } = solveGauss(genMatrix(10), genVector(10));
  console.log("Solution:");
  printVector(solution, false);
  console.log("");
  
  console.log("Det(A):");
  console.log(detA);
  console.log("");
  
  console.log("Inversed A:");
  printMatrix(invA);
  console.log("");
  
  console.log("cond(A):");
  console.log(condA);
  console.log("");
}

const jacobiTask = () => {
  const testA = [[3, -1, 1],[-1,2,0.5],[1,0.5,3]];
  const testB = [1, 1.75, 2.5];
  const testXFirst = [0,0,0];
  printMatrix(genMatrix(10, 2));
  console.log("");
  const { solution, iter_fact, iter_theor } = solveJacobi(genMatrix(10, 2), genVector(10), genXFirst(10), 0.001);
  printVector(solution, false);
  console.log("");

  console.log("Iteration count: ");
  console.log(iter_fact);
  console.log("");

  console.log("Theoretical iteration count: ");
  console.log(iter_theor);
  console.log("");
}

const main = () => {
  //gaussTask();
  jacobiTask();
}

main();
