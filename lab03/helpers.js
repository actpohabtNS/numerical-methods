export const fixPrec = (n) => Number.parseFloat(Number(n).toFixed(15))
export const fixArrPrec = (arr) => arr.map((el) => fixPrec(el))
export const fixMatrPrec = (matr) => matr.map((arr) => fixArrPrec(arr))

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

export const continuousMNorm = (m) => {
  let max = -Infinity;

  for (let row = 0; row < m.length; row++) {
    const sum = m[row].reduce((acc, curr) => acc + curr);

    if (sum > max) {
      max = sum;
    }
  }

  return max;
}

export const continuousVNorm = (vec) => {
  return vec.reduce((max, val) => Math.abs(val) > max ? Math.abs(val) : max, -Infinity)
}
