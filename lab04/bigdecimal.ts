export class BigDecimal {
  // Configuration: constants
  static DECIMALS = 18; // number of decimals on all instances
  static ROUNDED = true; // numbers are truncated (false) or rounded (true)
  static SHIFT = BigInt("1" + "0".repeat(BigDecimal.DECIMALS)); // derived constant
  _n! : bigint;
  constructor(value : BigDecimal | string | number) {
      if (value instanceof BigDecimal) return value;
      let [ints, decis] = String(value).split(".").concat("");
      this._n = BigInt(ints + decis.padEnd(BigDecimal.DECIMALS, "0")
                                   .slice(0, BigDecimal.DECIMALS)) 
                + BigInt(BigDecimal.ROUNDED && decis[BigDecimal.DECIMALS] >= "5");
  }
  static fromBigInt(bigint : bigint) {
      return Object.assign(Object.create(BigDecimal.prototype), { _n: bigint });
  }
  add(num : string | number) {
      return BigDecimal.fromBigInt(this._n + new BigDecimal(num)._n);
  }
  subtract(num : string) {
      return BigDecimal.fromBigInt(this._n - new BigDecimal(num)._n);
  }
  static _divRound(dividend : bigint, divisor : bigint) {
      return BigDecimal.fromBigInt(dividend / divisor 
          + (BigDecimal.ROUNDED ? dividend  * BigInt(2) / divisor % BigInt(2) : BigInt(0)));
  }
  multiply(num : string) {
      return BigDecimal._divRound(this._n * new BigDecimal(num)._n, BigDecimal.SHIFT);
  }
  divide(num : string) {
      return BigDecimal._divRound(this._n * BigDecimal.SHIFT, new BigDecimal(num)._n);
  }
  toString() {
      const s = this._n.toString().padStart(BigDecimal.DECIMALS+1, "0");
      return s.slice(0, -BigDecimal.DECIMALS) + "." + s.slice(-BigDecimal.DECIMALS)
              .replace(/\.?0+$/, "");
  }
  toNumber() {
    return Number.parseFloat(this.toString());
  }
}