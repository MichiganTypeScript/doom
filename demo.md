# Demo

## Overall Demo

- [the spark](./packages/playground/conway-stateless/conway-types.ts)
- [proof of concept](./packages/playground/doom/doom-frame.ts)
- [Conway's in C](./packages/conformance-tests/from-c/conway.c)
- [Conway's ported to WASM](./packages/conformance-tests/from-c/conway.wat)
- [Rust code](./src/handle_module.rs)
- [TypeScript Types Result](./packages/conformance-tests/from-c/c-add.actual.ts)
- [working type](./packages/playground/evaluate/results/results.ts)

## Testing Demo

- [instruction checklist](./README.md)
- [Add instruction implementation](./packages/ts-type-math/add.ts)
- [arithmetic](./packages/ts-type-math/test-cases/arithmetic.ts)
  - [many more like this](./packages/ts-type-math/test-cases/comparison.ts)
- Tested many times!
  1. [JavaScript Decimal](./packages/ts-type-math/add-decimal.test.ts)
  2. [TypeScript Decimal](./packages/ts-type-math/add-decimal.test.ts)
  3. [JavaScript Binary](./packages/ts-type-math/add-binary.test.ts)
  4. [TypeScript Binary](./packages/ts-type-math/add-binary.test.ts)
  5. WASM
     - [hand-written WASM](./packages/conformance-tests/from-wat/add.wat)
     - [running the WASM](./packages/conformance-tests/utils.ts)
     - [types result](./packages/conformance-tests/from-wat/add.actual.ts)
     - [testing the WASM](./packages/conformance-tests/from-wat/add.test.ts)
  6. [entry](from-wat/add.test.ts)
  7. Bonus: [C version](./packages/conformance-tests/from-c/c-add.c)
     - [compiled types](./packages/conformance-tests/from-c/c-add.wat)
     - [tests](./packages/conformance-tests/from-c/c-add.test.ts)

## Program Demo

- [Dashboard](./packages/playground/david-blass-incredibleness.ts)
- [the Loop instruction](./packages/conformance-tests/from-wat/loop.actual.ts)
  - (uncomment `{ kind: 'Halt', reason: 'in the name of the law!' },`)
- [the Loop instruction implementation](./packages/wasm-to-typescript-types/instructions/control-flow.ts)
  - uncomment Debug
- [instruction counter stop](./packages/playground/david-blass-incredibleness.ts)

## Back to Conway

- [playground entrypoint](./packages/playground/evaluate/playground.ts)
- [first result](./packages/playground/evaluate/results/results-000000.ts)
- [last result](./packages/playground/evaluate/results/results-187800.ts)
- [program finish](./packages/playground/evaluate/results/results.ts)
- Stats
  - [individual run stats](./packages/playground/evaluate/results/stats/stats-041000.json)
  - [program stats](./packages/playground/evaluate/results/stats/program-stats.json)

