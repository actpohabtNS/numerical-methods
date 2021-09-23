import { resultType } from "./resultType";

export default function iteration(x0: number,
                                  a: number,
                                  b: number,
                                  epsilon: number,
                                  sigma: (x: number) => number,
                                  sigmaArgInBounds: (x: number) => boolean,
                                  maxModDerSig: (a: number, b: number) => number) : resultType {
    if (!sigmaArgInBounds(a) || !sigmaArgInBounds(b)) {
        throw new Error("a and b must be in bounds of sigma!");
    }

    const delta = Math.max(b - x0, x0 - a);
    const q = maxModDerSig(a, b);

    if (q >= 1) {
        throw new Error("q must be < 1! Unable to continue! Choose other sigma or [a, b]!");
    }

    if (Math.abs(sigma(x0) - x0) > (1 - q) * delta) {
        throw new Error("Condition (|sigma(x0) - x0| <= (1 - q) * delta) has not been met! Choose other sigma, [a, b] or x0!");
    }

    let x_prev: number;
    let iterations = 1;
    
    const formulaIters = Math.ceil(Math.log(Math.abs(sigma(x0) - x0) / (1 - q) * epsilon) / Math.log(1 / q)) + 1;

    do {
        x_prev = x0;
        x0 = sigma(x0);
        iterations++;
    } while (Math.abs(x_prev - x0) > epsilon);

    return { res: x0, iterations, formulaIters };
}