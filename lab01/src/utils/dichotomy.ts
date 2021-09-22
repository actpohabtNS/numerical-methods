import { resultType } from "./resultType";

export default function dichotomy(x0: number, a: number, b: number, epsilon: number, f: (x: number) => number) : resultType {
  if (a > b) {
    throw new Error("a must be equal or bigger that b! ([a, b])");
  }

  if (b <= x0 || x0 <= a) {
    throw new Error("x must be in between a and b!");
  }

  if (f(a) * f(b) > 0) {
    throw new Error("f(a) * f(b) must be less or equal than 0! ([a, x, b])");
  }

  let iterations = 1;
  const formulaIters = Math.ceil(Math.log2((b-a)/epsilon)) + 1;

  do {
    if (f(a) * f(b) === 0) {
      const res = (f(a) === 0) ? a : b;

      return { res , iterations, formulaIters}
    }

    a = (f(a) * f(x0) > 0) ? x0 : a;
    b = (f(b) * f(x0) > 0) ? x0 : b;
    x0 = (a + b) / 2;

    iterations++;
  } while (Math.abs(f(x0)) > epsilon);

  return { res: x0, iterations, formulaIters };
}