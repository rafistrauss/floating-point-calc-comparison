# Floating Point Calc Comparison

This repository demonstrates a bug with Bun where mathematical expressions can yield different results depending on whether the calculation is performed inside a function or directly in the global scope.

Bug reported here: https://github.com/oven-sh/bun/issues/19695

This has now been solved; will archive this repo

![alt text](image.png)

## The Problem

In some cases, Bun produces different floating-point results for the same mathematical expression when it is evaluated inside a function versus outside a function. This behavior is not observed in Node.js or Deno, which produce consistent results in both cases.

## Example

See `calc.js`:

```js
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
```

## How to Reproduce

This repository includes a GitHub Actions workflow that runs `calc.js` using Bun, Deno, and Node.js. You can also run the script locally:

```
# With Bun
bun calc.js

# With Deno
deno run --allow-read calc.js

# With Node.js
node calc.js
```

## Expected Output

Node.js and Deno will always print "Results are equal" for each test. Bun may print "Results differ" for some cases, showing a discrepancy between the function and global-scope calculation.

## Why This Matters

Consistent floating-point behavior is critical for cross-platform JavaScript/TypeScript code. This bug can lead to subtle and hard-to-diagnose issues in mathematical or scientific applications.

---

If you encounter this issue or have more information, please open an issue or contribute to the discussion.
