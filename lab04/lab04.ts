import prompt from 'prompt-sync'

import { createEvenNewtonPolynom, createEvenNewtonPolynomStr } from './evenInterpolation'
import { createLagrangePolynom, createLagrangePolynomStr, createNewtonPolynom, createNewtonPolynomStr } from './interpolation'
import task from "./task"
import { polinomialTable_T } from './types';

const main = () => {
  const pt = prompt({ sigint: true });
  const n = +pt("Enter n: ");
  const table = task.genTable(n);
  const evTable = task.genEvenlyTable(n);
  console.log(table);
  console.log(evTable);

  //upto n = 54 (number decimals overflows)
  const lpl = createLagrangePolynom(table);
  const npl = createNewtonPolynom(table);
  //upto n = 23 (factorial overflows)
  const nepl = createEvenNewtonPolynom(evTable);

  const x = +pt("Enter x [-2, 2]: ");
  const f_x     = task.f(x),
        lpl_x   = lpl(x),
        npl_x   = npl(x);
  //upto n = 23
  const nepl_x  = nepl(x);

  console.log(`\nf(${x}) =`, f_x);
  console.log(`F_Lagrange(${x}) =`, lpl_x, `, deviation is ${Math.abs(f_x - lpl_x)}`);
  console.log(`F_Newton(${x}) =`, npl_x, `, deviation is ${Math.abs(f_x - npl_x)}`);
  //upto n = 23
  console.log(`F_EvenlyNewton(${x}) =`, nepl_x, `, deviation is ${Math.abs(f_x - nepl_x)}`);

  //check function interpolation accuracy using graphs
  graphs(table, evTable);
}

const graphs = (table : polinomialTable_T, evTable : polinomialTable_T) => {
  console.log("\nGraphs: ");
  
  console.log("Lagrange:");
  console.log(createLagrangePolynomStr(table));

  //also can be used as inverted interpolation
  console.log("\nNewton:");
  console.log(createNewtonPolynomStr(table));
  
  console.log("\nNewton Evenly Distributed:");
  console.log(createEvenNewtonPolynomStr(evTable));
}

const test = () => {
  
  const table = task.genTable(15);
  const evTable = task.genEvenlyTable(5);
  console.log(table);
  console.log(createLagrangePolynomStr(table));
  // console.log(createEvenNewtonPolynomStr(evTable));
}

//test();

main();