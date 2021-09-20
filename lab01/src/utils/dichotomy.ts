export function dichotomy(x0: number, a: number, b: number, epsilon: number, f: (x: number) => number) {
  if (a > b) {
    throw new Error("a must be equal or bigger that b! ([a, b])");
  }

  if (b <= x0 || x0 <= a) {
    throw new Error("x must be in between a and b!");
  }

  if (f(a) * f(b) > 0) {
    console.log(`f(a): ${f(a)}, f(b): ${f(b)}`);
    
    throw new Error("f(a) * f(b) must be less or equal than 0! ([a, x, b])");
  }

  do {
    if (f(a) * f(b) === 0) {
      return (f(a) === 0) ? a : b;
    }

    console.log(`a: ${a}, b: ${b}, x0: ${x0}, f(x0): ${f(x0)}`);
    

    a = (f(a) * f(x0) > 0) ? x0 : a;
    b = (f(b) * f(x0) > 0) ? x0 : b;
    x0 = (a + b) / 2;
  } while (Math.abs(f(x0)) > epsilon);

  console.log(`a: ${a}, b: ${b}, x0: ${x0}, f(x0): ${f(x0)}`);

  return x0;
}