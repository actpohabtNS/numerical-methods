import prompt from 'prompt-sync'

import task from "./task"

const main = () => {
  const pt = prompt({ sigint: true });
  const n = +pt("Enter n: ");
  console.log(task.genEvenlyTable(n));
}

main();