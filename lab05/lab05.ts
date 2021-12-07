import prompt from 'prompt-sync'

import { createEvenNewtonPolynom, createEvenNewtonPolynomStr } from './evenInterpolation'
import { createPiecewisePolynom, createPiecewisePolynomStr } from './interpolation'
import task from "./task"
import { polinomialTable_T } from './types';

const main = () => {
  const pt = prompt({ sigint: true });
  const n = +pt("Enter n (amount of pieces): ");

  const evTable = task.genEvenlyTable(n + 1);
  console.log(evTable);
  let poly = createPiecewisePolynom(evTable);
  let polyStr = createPiecewisePolynomStr(evTable);
  console.log(polyStr);

  while (true) {
    let x = +pt("Enter x (point to test): ");
    let f_x = task.f(x);
    let l_x = poly(x);
    console.log(`f(${x}) = ${f_x}`);
    console.log(`L(${x}) = ${l_x}`);
    console.log(`Error is ${Math.abs(f_x - l_x)}`);
    console.log('\n');
  }
}

const test = () => {
  const evTable = task.genEvenlyTable(10 + 1);
  let poly = createPiecewisePolynom(evTable);
  let polyStr = createPiecewisePolynomStr(evTable);

  console.log(task.f(0));
  console.log(poly(0));
  console.log(task.f(1));
  console.log(poly(1));
  console.log(task.f(2));
  console.log(poly(2));
  
  console.log(polyStr);
  
}

//test();

main();