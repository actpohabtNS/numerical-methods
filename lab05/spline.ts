const tdma = require('tdma');

import { BigDecimal } from "./bigdecimal";
import { getHostSegmentNumber } from "./interpolation";
import { fixPrec } from "./fix";
import { polinomialTable_T } from "./types";

const getHVec = (points : Array<number>) : Array<number> => {
  let hVec = new Array<number>();
  
  for (let i = 1; i < points.length; i++) {
    hVec.push(Math.abs(new BigDecimal(points[i]).subtract(points[i-1]).toNumber()));
  }

  return hVec;
}

const getAMatr = (hVec : Array<number>) : Array<Array<number>> => {
  let n = hVec.length;
  let A = [];
  for (let i = 0; i < n-1; i++) {
    A.push(new Array(n-1));
  }

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      switch (i - j) {
        case 1:
          A[i][j] = new BigDecimal(hVec[i]).divide(6).toNumber();
          break;

        case 0:
          A[i][j] = new BigDecimal(hVec[i]).add(hVec[i+1]).divide(3).toNumber();
          break;

        case -1:
          A[i][j] = new BigDecimal(hVec[i+1]).divide(6).toNumber();
          break;
      
        default:
          A[i][j] = 0;
          break;
      }
    }
  }

  return A;
}

const getHMatr = (hVec : Array<number>) : Array<Array<number>> => {
  let n = hVec.length;
  let H = [];
  for (let i = 0; i < n-1; i++) {
    H.push(new Array(n-1));
  }

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j <= n; j++) {
      switch (i - j) {
        case 0:
          H[i][j] = new BigDecimal(1).divide(hVec[i]).toNumber();
          break;

        case -1:
          H[i][j] = new BigDecimal(-1).divide(hVec[i]).subtract(new BigDecimal(1).divide(hVec[i+1])).toNumber();
          break;
      
        case -2:
          H[i][j] = new BigDecimal(1).divide(hVec[i+1]).toNumber();
          break;
  
        default:
          H[i][j] = 0;
          break;
      }
    }
  }

  return H;
}

const matrVecMul = (m : Array<Array<number>>, v : Array<number>): Array<number> => {
  let res = new Array<number>();

  for (let row of m) {
    let num = new BigDecimal(0);
    for (let i = 0; i < row.length; i++) {
      num = num.add(new BigDecimal(row[i]).multiply(v[i]));
    }
    res.push(num.toNumber());
  }

  return res;
}

const getMVec = (points : Array<number>, f_vals : Array<number>) : Array<number> => {
  const hVec = getHVec(points);
  
  return [0, ...tdma.solver(getAMatr(hVec), matrVecMul(getHMatr(hVec), f_vals)), 0];
}

export const createSplinePolynom = (poliTable : polinomialTable_T) : ((x : number) => number) => {
  const { points, f_vals } = poliTable;
  const mVec = getMVec(points, f_vals);
  const hVec = getHVec(points);

  const pieceFuncts: ((x: number) => number)[] = [];

  for (let i = 1; i < points.length; i++) {
    pieceFuncts.push(
      (x : number) => {
        return new BigDecimal(mVec[i-1]).multiply(
            new BigDecimal(points[i]).subtract(x).multiply(new BigDecimal(points[i]).subtract(x)).multiply(new BigDecimal(points[i]).subtract(x))
            .divide(new BigDecimal(6).multiply(hVec[i-1]))
          ).add(
            new BigDecimal(mVec[i]).multiply(
              new BigDecimal(x).subtract(points[i-1]).multiply(new BigDecimal(x).subtract(points[i-1])).multiply(new BigDecimal(x).subtract(points[i-1]))
              .divide(new BigDecimal(6).multiply(hVec[i-1]))
          )).add(
            new BigDecimal(f_vals[i-1]).subtract(new BigDecimal(mVec[i-1]).multiply(hVec[i-1]).multiply(hVec[i-1]).divide(6))
            .multiply(new BigDecimal(points[i]).subtract(x).divide(hVec[i-1]))
          ).add(
            new BigDecimal(f_vals[i]).subtract(new BigDecimal(mVec[i]).multiply(hVec[i-1]).multiply(hVec[i-1]).divide(6))
            .multiply(new BigDecimal(x).subtract(points[i-1]).divide(hVec[i-1]))
          ).toNumber();
      }
    );
  }

  return (x : number) => {
    let pieceFunctNum = getHostSegmentNumber(x, points);
    return pieceFuncts[pieceFunctNum](x);
  }
}

export const createSplinePolynomStr = (poliTable : polinomialTable_T) : string => {
  const { points, f_vals } = poliTable;
  const mVec = getMVec(points, f_vals);
  const hVec = getHVec(points);

  let res = "";

  for (let i = 1; i < points.length; i++) {
    res += "y = { " + points[i-1].toFixed(4) + " <= x <= " + points[i].toFixed(4) + ":" +
      `(${mVec[i-1].toFixed(4)}*((${points[i].toFixed(4)} - x)^3) / (6*${hVec[i-1].toFixed(4)})) + (${mVec[i].toFixed((4))}*((x - ${points[i-1].toFixed(4)})^3) / (6*${hVec[i-1].toFixed(4)})) + ` +
      `((${f_vals[i-1].toFixed(4)} - (${mVec[i-1].toFixed(4)}*(${hVec[i-1].toFixed(4)})^2) / 6)*((${points[i].toFixed(4)} - x) / ${hVec[i-1].toFixed(4)})) + ` +
      `((${f_vals[i].toFixed(4)} - (${mVec[i].toFixed(4)}*(${hVec[i-1].toFixed(4)})^2) / 6)*((x - ${points[i-1].toFixed(4)}) / ${hVec[i-1].toFixed(4)})) }` +
      '\n';
  }

  return res;
}
