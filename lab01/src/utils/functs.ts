export const functs = {
    f: (x : number) => x ** 3 + 4 * Math.sin(x),
    der1F: (x : number) => 3 * x ** 2 + 4 * Math.cos(x),
    sigma: (x: number) => Math.asin(- (x**3) / 4),
    sigmaStr: "arcsin(-(x^3) / 4)",
    sigmaArgInBounds: (x: number) => {
        const _3root4 = Math.pow(4, 1/3);
        return -_3root4 <= x && x <= _3root4;
    },
    derSigma: (x: number) => - (3 * x**2) / (4 * Math.sqrt(1 - (x**6) / 16)),
    maxModDerSig: (a: number, b: number) => {
        if (a > b) {
            throw new Error("a must be less or equal than b! ([a, b])");
        }

        if (a === b) {
            return Math.abs(functs.derSigma(a));
        }

        if (b <= 0) {
            return Math.abs(functs.derSigma(a));
        }

        if (a >= 0) {
            return Math.abs(functs.derSigma(b));
        }

        return (Math.abs(a) < b) ? Math.abs(functs.derSigma(b)) : Math.abs(functs.derSigma(a));
    }
  }