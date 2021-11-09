import { Matrix } from 'ml-matrix'

export const fixPrec = (n) => Number.parseFloat(Number(n).toFixed(15))
export const fixArrPrec = (arr) => arr.map((el) => fixPrec(el))
export const fixMatrPrec = (matr) => matr.map((arr) => fixArrPrec(arr))

export const eye = (n) => {
  return Matrix.eye(n, n).to2DArray();
}


export const swapRows = (m, r1, r2) => {
  [m[r1], m[r2]] = [m[r2], m[r1]];
  return m;
}

export const mmul = (m1, m2) => {
  const matr1 = new Matrix(m1)
  const matr2 = new Matrix(m2)
  const matr3 = matr1.mmul(matr2)

  return fixMatrPrec(matr3.to2DArray());
}

export const vsubt = (v1, v2) => {
  if (v1.length != v2.length) {
    throw new Error("Vectors must have equal length when subtracting!");
  }
  let res = new Array(v1.length);
  for (let i = 0; i < v1.length; i++) {
    res[i] = fixPrec(v1[i] - v2[i]);
  }
  return res;
}

export const mvmul = (m, v) => {
  const matr = new Matrix(m)
  const vec = Matrix.columnVector(v)
  const res = matr.mmul(vec)

  return fixArrPrec(res.to2DArray());
}

export const firstMNorm = (m) => {
  const matrM = new Matrix(m);
  let max = -Infinity;

  for (let col = 0; col < matrM.columns; col++) {
    const sum = matrM.getColumn(col).reduce((acc, curr) => acc + curr);

    if (sum > max) {
      max = sum;
    }
  }

  return max;
}

export const continuousVNorm = (vec) => {
  return vec.reduce((max, val) => Math.abs(val) > max ? Math.abs(val) : max, -Infinity)
}
