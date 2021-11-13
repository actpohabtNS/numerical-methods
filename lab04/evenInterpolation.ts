import { BigDecimal } from "./bigdecimal";
import { fixPrec } from "./fix";
import { polinomialTable_T } from "./types";

const calcFinDif = (finDifs : Array<number>) : Array<number> => {
  let res = new Array<number>();

  for (let i = 0; i < finDifs.length - 1; i++) {
    let dif : BigDecimal = new BigDecimal(finDifs[i+1]).subtract(finDifs[i]);
    res.push(fixPrec(dif.toNumber()));
  }

  return res;
}

const finiteDifCoefs = (f_val : Array<number>) : Array<number> => {
  let finDifTable = new Array<Array<number>>();
  finDifTable.push(f_val);

  for (let i = 0; i < f_val.length - 1; i++) {
    finDifTable.push(calcFinDif(finDifTable[i]));
  }

  let coefs =  new Array<number>();
  finDifTable.forEach(row => {
    coefs.push(row[0])
  });
  return coefs;
}

const factorial = (n : number) : number => {
  if (n === 0)
    { return 1; }
  else
    { return n * factorial( n - 1 ); }
}

export const createEvenNewtonPolynom = (poliTable : polinomialTable_T) : ((x : number) => number) => {
  const { points, f_vals } = poliTable;
  const difCoefs = finiteDifCoefs(f_vals);
  const h = new BigDecimal(points[1]).subtract(points[0]).toNumber();
  
  return (x : number) => {
    const t = new BigDecimal(x).subtract(points[0]).divide(h);

    let res = new BigDecimal(0);
    for (let i = 0; i < points.length; i++) {
      let addition = new BigDecimal(fixPrec(difCoefs[i])).divide(factorial(i));
      for (let j = 0; j < i; j++) {
        addition = addition.multiply(t.subtract(j));
      }
      res = res.add(addition);
    }

    return res.toNumber();
  }
}

export const createEvenNewtonPolynomStr = (poliTable : polinomialTable_T) : string => {
  const { points, f_vals } = poliTable;
  const difCoefs = finiteDifCoefs(f_vals);
  const h = new BigDecimal(points[1]).subtract(points[0]).toNumber().toFixed(5);
  
  let p0 = points[0];
  const t = "((x" + (p0 < 0 ? "" : "+") + p0.toFixed(5) + ") /" + h + ")";

  let res = "";
  for (let i = 0; i < points.length; i++) {
    let addition = "+(" + difCoefs[i].toFixed(5) + "/" + factorial(i) + ")";
    for (let j = 0; j < i; j++) {
      addition += `*(${t}-${j})`;
    }
    res += addition;
  }

  return `(${res})*${h} - ${p0}`;
}
