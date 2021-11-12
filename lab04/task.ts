import { BigDecimal } from './bigdecimal';
import { fixPrec } from './fix';
import { polinomialTable_T } from './types';

const f = (x : number) => Math.E**(-(x**2))

const LOWER_LIMIT =  -2;
const UPPER_LIMIT = 2;

const genTable = (n : number) : polinomialTable_T => {
  let points = new Array();
  let f_vals = new Array();

  for (let k = 0; k < n; k++) {
    const p = fixPrec(Math.cos(((2*k + 1) * Math.PI ) / (2 * n)));
    points.push(p);
    f_vals.push(f(p));
  }

  return { points, f_vals };
}

const genEvenlyTable = (n : number) : polinomialTable_T => {
  const step = (Math.abs(LOWER_LIMIT) + Math.abs(UPPER_LIMIT)) / (n - 1);
  let points = new Array();
  let f_vals = new Array();

  for (let p = new BigDecimal(LOWER_LIMIT); p <= new BigDecimal(UPPER_LIMIT); p = p.add(step)) {
    points.push(p.toNumber());
    f_vals.push(f(p.toNumber()));
  }

  return { points, f_vals };
}

export default {
  LOWER_LIMIT,
  UPPER_LIMIT,
  f,
  genTable,
  genEvenlyTable,
}