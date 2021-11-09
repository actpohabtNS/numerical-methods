import { printJacobi } from "./jacobiMatrix.js"
import { printVector } from "./printers.js";
import { solveSimpleIteration } from "./simpleIteration.js";

const main = () => {
  // NOTE: 5x != y
  const x0 = [1.25, 0, 0.25];

  console.log("System to be solved:");
  console.log("3x^2 + 1.5y^2 + z^2 - 5 = 0");
  console.log("6xyz - x + 5y + 3z = 0");
  console.log("5xz - yz - 1 = 0");
  console.log("");

  console.log("Variables:");
  console.log("x = sqrt(1/3 * (-1.5y^2 - z^2 + 5))");
  console.log("y = (x - 3z)  (6xz + 5)");
  console.log("z = 1 / (5x - y)");
  console.log("");

  printJacobi(...x0);
  const { solution, iter_fact } = solveSimpleIteration(x0, 0.001);

  console.log("Solution");
  printVector(solution, false);
  console.log("");

  console.log("Iteration count:");
  console.log(iter_fact);
}

main();
