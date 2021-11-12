const f = (x : number) => Math.E**(-(x**2))

const LOWER_LIMIT =  -2;
const UPPER_LIMIT = 2;

type polinomialTable_T = {
  points: Array<number>,
  f_vals: Array<number>,
}

const genEvenlyTable = (n : number) : polinomialTable_T => {
  const step = (Math.abs(LOWER_LIMIT) + Math.abs(UPPER_LIMIT)) / (n - 1);
  let points = new Array();
  let f_vals = new Array();

  for (let p = LOWER_LIMIT; p < UPPER_LIMIT; p += step) {
    points.push(p);
    f_vals.push(f(p));
  }

  return { points, f_vals };
}

export default {
  LOWER_LIMIT,
  UPPER_LIMIT,
  f,
  genEvenlyTable,
}