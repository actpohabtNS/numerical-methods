import { BigDecimal } from "./bigdecimal";
import { fixPrec } from "./fix";
import { polinomialTable_T } from "./types";

export const createLagrangePolynom = (poliTable : polinomialTable_T) : ((x : number) => number) => {
  const { points, f_vals } = poliTable;
  return (x : number) => {
    let res = new BigDecimal(0);

    for (let i = 0; i < points.length; i++) {
      let addition = new BigDecimal(f_vals[i]);
      let numerator = new BigDecimal(1),
          denominator = new BigDecimal(1);

      for (let j = 0; j < points.length; j++) {
        if (i === j) {
          continue;
        }
        numerator = numerator.multiply(new BigDecimal(x).subtract(points[j]));
        denominator = denominator.multiply(new BigDecimal(points[i]).subtract(points[j]));
      }

      addition = addition.multiply(numerator.divide(denominator));
      res = res.add(addition);
    }

    return res.toNumber();
  }
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
