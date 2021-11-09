import { printVector } from './print.js';
import { solveGauss } from './gauss.js';
import { genMatrix, genVector } from './generators.js';

const m = genMatrix(10);
const testM = [[10, 0, 3], [3, -1, 0], [-2, 4, 1]];
const b = [7, 2, 1];
printVector(solveGauss(testM, b), false);
console.log("");
