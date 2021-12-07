import { BigDecimal } from './bigdecimal';
import { fixPrec } from './fix';
import { polinomialTable_T } from './types';

const f = (x : number) => Math.E**(-(x**2))

const LOWER_LIMIT =  -2;
const UPPER_LIMIT = 2;

const genEvenlyTable = (n : number) : polinomialTable_T => {
  let points = new Array();
  let f_vals = new Array();

  if (n === 1) {
    points.push(0);
    f_vals.push(f(0));
  } else {
    const step = (Math.abs(LOWER_LIMIT) + Math.abs(UPPER_LIMIT)) / (n - 1);
  
    for (let p = new BigDecimal(LOWER_LIMIT); p <= new BigDecimal(UPPER_LIMIT); p = p.add(step)) {
      points.push(p.toNumber());
      f_vals.push(f(p.toNumber()));
    }
    points[n - 1] = UPPER_LIMIT;
    f_vals[n - 1] = f(UPPER_LIMIT);
  }

  return { points, f_vals };
}

export default {
  LOWER_LIMIT,
  UPPER_LIMIT,
  f,
  genEvenlyTable,
}