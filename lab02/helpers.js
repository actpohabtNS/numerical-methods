export const printMatrix = (m, precision = 1) => {
  m.forEach(row => {
    printVector(row, true, precision)
    console.log("");
  });
}

export const printVector = (v, row = true, precision = 1) => {
  v.forEach(el => row ? process.stdout.write(`${Number.parseFloat(el).toFixed(precision)}  `) : console.log(Number.parseFloat(el).toFixed(precision)))
}

