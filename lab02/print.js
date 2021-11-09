export const printMatrix = (m) => {
  m.forEach(row => {
    printVector(row, true)
    console.log("");
  });
}

export const printVector = (v, row = true) => {
  v.forEach(el => row ? process.stdout.write(`${el}  `) : console.log(el))
}

