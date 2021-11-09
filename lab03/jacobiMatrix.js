import { printMatrix } from "../lab02/print.js";
import { fixMatrPrec } from "./helpers.js";

export const jacobiMatrix = (x, y, z) => {
  let jac = new Array(3);
  jac[0] = [0, - Math.sqrt(3)/2 * y / (Math.sqrt(-1.5*y**2 - z**2 + 5)), - z / (Math.sqrt(-1.5*y**2 - z**2 + 5))];
  jac[1] = [(18*z**2 + 5)/((6*x*z + 5)**2), 0, (6*x**2 + 15)/((6*x*z + 5)**2)];
  jac[2] = [-5/((5*x - y)**2), 1/((5*x - y)**2), 0];

  return fixMatrPrec(jac);
}

export const printJacobi = (x, y, z) => {
  console.log("Jacobi matrix formulas:");
  console.log("           0                 sqrt(3)/2 * y/sqrt(-1.5y^2 - z^2 + 5)       -z/sqrt(-1.5y^2 - z^2 + 5)");
  console.log("(18z^2 + 5)/(6xz + 5)^2                        0                         -(6X^2 + 15)/(6xz + 5)^2");
  console.log("    -5/(5x - y)^2                        1/(5x - y)^2                                0");
  console.log("");
  
  console.log("Jacobi matrix:");
  printMatrix(jacobiMatrix(x, y, z));
  console.log("");
}
