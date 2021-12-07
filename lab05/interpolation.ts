import { BigDecimal } from "./bigdecimal";
import { fixPrec } from "./fix";
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

const calcDivDif = (divDifs : Array<number>, points : Array<number> , pow : number) : Array<number> => {
  let res = new Array<number>();

  for (let i = 0; i < divDifs.length - 1; i++) {
    let num = new BigDecimal(fixPrec(divDifs[i+1])).subtract(fixPrec(divDifs[i]));
    let denom = new BigDecimal(points[i+pow]).subtract(points[i]);
    res.push(num.divide(denom).toNumber());
  }

  return res;
}

const divDifCoefs = (poliTable : polinomialTable_T) : Array<number> => {
  const { points, f_vals } = poliTable;
  let divDifTable = new Array<Array<number>>();
  divDifTable.push(f_vals);

  for (let i = 0; i < f_vals.length - 1; i++) {
    divDifTable.push(calcDivDif(divDifTable[i], points, i+1));
  }

  let coefs =  new Array<number>();
  divDifTable.forEach(row => {
    coefs.push(row[0])
  });
  return coefs;
}

export const createNewtonPolynom = (poliTable : polinomialTable_T) : ((x : number) => number) => {
  const { points } = poliTable;
  const difCoefs = divDifCoefs(poliTable);
  
  return (x : number) => {
    let res = new BigDecimal(0);

    for (let i = 0; i < points.length; i++) {
      let addition = new BigDecimal(difCoefs[i]);

      for (let j = 0; j < i; j++) {
        addition = addition.multiply(new BigDecimal(x).subtract(points[j]));
      }
      res = res.add(addition);
    }

    return res.toNumber();
  }
}

export const createNewtonPolynomStr = (poliTable : polinomialTable_T) : string => {
  const { points } = poliTable;
  const difCoefs = divDifCoefs(poliTable);
  
  let res = "";

  for (let i = 0; i < points.length; i++) {
    let num = difCoefs[i];
    let addition = (num < 0 ? "" : "+") + num.toFixed(5);

    for (let j = 0; j < i; j++) {
      let numNeg = points[j] < 0;
      addition += `*(x${numNeg ? "+" : "-"}${Number.parseFloat(Math.abs(points[j]).toFixed(5))})`;
    }
    res += addition;
  }
  return res;
}
