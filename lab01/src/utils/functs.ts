export const functs = {
    f: (x : number) => x ** 3 + 4 * Math.sin(x),
    der1F: (x : number) => 3 * x ** 2 + 4 * Math.cos(x),
    sigma: (x: number) => Math.asin(- (x**3) / 4),
    sigmaStr: "arcsin(-(x^3) / 4)",
    derSigma: (x: number) => - (3 * x**2) / (4 * Math.sqrt(1 - (x**6) / 16)),
    maxModDerSig: (a: number, b: number) => {
        if (a > b) {
            throw new Error("a must be less or equal than b! ([a, b])");
        }

        if (a === b) {
            return functs.derSigma(a);
        }

        if (b <= 0) {
            return functs.derSigma(a);
        }

        if (a >= 0) {
            return functs.derSigma(b);
        }

        return (Math.abs(a) < b) ? functs.derSigma(b) : functs.derSigma(a);
    }
  }