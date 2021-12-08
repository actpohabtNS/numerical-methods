import { BigDecimal } from "./bigdecimal";
import { polinomialTable_T } from "./types";

export const getHostSegmentNumber = (point : number, points : Array<number>) : number => {
  let num = -1;
  for (let i = 0; i < points.length; i++, num++) {
    if (point < points[i]) {
      return num;
    }
  }

  if (point === points[points.length - 1]) {
    return --num;
  }

  return -1;
}

export const createPiecewisePolynom = (poliTable : polinomialTable_T) : ((x : number) => number) => {
  const { points, f_vals } = poliTable;
  const pieceFuncts: ((x: number) => number)[] = [];

  for (let i = 1; i < points.length; i++) {
    pieceFuncts.push(
      (x : number) => {
        return new BigDecimal(f_vals[i-1]).multiply(
            new BigDecimal(points[i]).subtract(x)
          ).add(
            new BigDecimal(f_vals[i]).multiply(
              new BigDecimal(x).subtract(points[i-1])
            )
          ).divide(
            new BigDecimal(points[i]).subtract(points[i-1])
          ).toNumber();
      }
    );
  }

  return (x : number) => {
    let pieceFunctNum = getHostSegmentNumber(x, points);
    return pieceFuncts[pieceFunctNum](x);
  }
}


export const createPiecewisePolynomStr = (poliTable : polinomialTable_T) : string => {
  const { points, f_vals } = poliTable;
  let res = "";

  for (let i = 1; i < points.length; i++) {
    res += "y = { " + points[i-1].toFixed(4).toString() + " <= x <= " + points[i].toFixed(4).toString() + ":" +
      "(" + f_vals[i-1].toFixed(4).toString() +
      "*(" + points[i].toFixed(4).toString() + " - x) + " +
      f_vals[i].toFixed(4).toString() +
      "*(x - " + points[i-1].toFixed(4).toString() + ")) / " +
      new BigDecimal(points[i]).subtract(points[i-1]).toString() + " }" +
      "\n";
  }

  return res;
}
