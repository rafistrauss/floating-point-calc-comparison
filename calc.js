function func_result(foo) {
  return 10 ** (foo / 20);
}

function outputResultDiff(result1, result2) {
  if (result1 === result2) {
    console.log(`Results are equal: ${result1}`);
  } else {
    console.log('Results differ:');
    // Output like git diff: - (red), + (green)
    console.log(`\x1b[31m- ${result1}\x1b[0m`);
    console.log(`\x1b[32m+ ${result2}\x1b[0m`);
  }
}


outputResultDiff(func_result(0), 10 ** (0 / 20));
outputResultDiff(func_result(-1), 10 ** (-1 / 20));
