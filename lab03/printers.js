export const printVector = (v, row = true) => {
  v.forEach(el => row ? process.stdout.write(`${el}  `) : console.log(el))
}
