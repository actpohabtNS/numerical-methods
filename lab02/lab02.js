import { printMatrix, printVector } from './print.js';
import { solveGauss } from './gauss.js';
import { genMatrix, genVector } from './generators.js';

const m = genMatrix(10);
const testM = [[10, 0, 3], [3, -1, 0], [-2, 4, 1]];
const b = [7, 2, 1];
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
