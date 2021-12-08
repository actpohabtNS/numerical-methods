import prompt from 'prompt-sync'

import { createSplinePolynom, createSplinePolynomStr } from './spline'
import { createPiecewisePolynom, createPiecewisePolynomStr } from './interpolation'
import task from "./task"
import { polinomialTable_T } from './types';

const main = () => {
  const pt = prompt({ sigint: true });
  const n = +pt("Enter n (amount of pieces): ");

  const evTable = task.genEvenlyTable(n + 1);
  console.log(evTable);
  console.log('\n================================= Piecewise Polynom =================================');
  let pwPoly = createPiecewisePolynom(evTable);
  let pwPolyStr = createPiecewisePolynomStr(evTable);
  console.log(pwPolyStr);

  console.log('\n================================= Spline Polynom =================================');
  let spPoly = createSplinePolynom(evTable);
  let spPolyStr = createSplinePolynomStr(evTable);
  console.log(spPolyStr);

  
  while (true) {
    let x = +pt("Enter x (point to test): ");
    let f_x = task.f(x);
    let pwl_x = pwPoly(x);
    let spl_x = spPoly(x);
    console.log(`f(${x}) = ${f_x}`);
    console.log(`--- Piecewise ---`);
    console.log(`L(${x}) = ${pwl_x}`);
    console.log(`Deviation is ${Math.abs(f_x - pwl_x)}`);
    console.log(`--- Spline ---`);
    console.log(`L(${x}) = ${spl_x}`);
    console.log(`Deviation is ${Math.abs(f_x - spl_x)}`);

    console.log('\n');
  }
}

const test = () => {
  const evTable = task.genEvenlyTable(1 + 1);
  let poly = createSplinePolynom(evTable);
  let polyStr = createSplinePolynomStr(evTable);
  
  console.log(polyStr);
  
}

//test();

main();