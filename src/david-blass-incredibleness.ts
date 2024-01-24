import type { entry } from './test/from-wat/memory.actual.d.ts';

type e = entry<[2], true>
//   ^?

type stack = e['stack'];
//   ^?

type executionContexts = e['executionContexts'];

type c_0 = executionContexts[0]; // =>
type c_1 = executionContexts[1]; // =>
type c_2 = executionContexts[2]; // =>
type c_3 = executionContexts[3]; // =>

type memory = e['memory'];
//   ^?

type instructions = e['instructions'];
//   ^?
