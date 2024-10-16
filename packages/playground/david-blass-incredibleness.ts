// @ts-nocheck
import { entry } from 'conformance-tests/from-wat/return-extra-stack'; import type { ReadStringFromMemory } from 'ts-type-math';
type e=entry<[], true, 23>// =>
// import { executeInstruction } from "../wasm-to-typescript-types/program.ts"
// import { PlaygroundResult_00000951 as result } from  "./evaluate/results/result-00000951.ts"
// type e = executeInstruction<result, true, 982> // =>
type r=e['result'] // =>
type s=e['stack']  // =>
type s0=s[0]       // =>
type s1=s[1]       // =>
type s2=s[2]       // =>
type s3=s[3]       // =>
type sl=s['length']// =>
// type rsfm=ReadStringFromMemory<e>// =>

type c=e['count']// =>

type al=e['activeLocals']    // =>
type af=e['activeFuncId']    // =>
type ab=e['activeBranches']  // =>
type as=e['activeStackDepth']// =>

type ec=e['executionContexts']
type c0=ec[0]['funcId']// =>
type c1=ec[1]['funcId']// =>
type c2=ec[2]['funcId']// =>
type c3=ec[3]['funcId']// =>
type f = 1;
type cff=ec[f]['funcId']    // =>
type cfl=ec[f]['locals']    // =>
type cfb=ec[f]['branches']  // =>
type cfs=ec[f]['stackDepth']// =>

type m=e['memory']// =>

type  i=e['instructions']
type i0=e['instructions'][0]// =>
type i1=e['instructions'][1]// =>
type i2=e['instructions'][2]// =>
type i3=e['instructions'][3]// =>
type i4=e['instructions'][4]// =>
type i5=e['instructions'][5]// =>
type i6=e['instructions'][6]// =>
type i7=e['instructions'][7]// =>
type i8=e['instructions'][8]// =>
type i9=e['instructions'][9]// =>

type d=i0['stuff']// =>

type g=e['globals']// =>

type b0=ec[1]['branches']['$B0']// =>
type b1=ec[1]['branches']['$B1']// =>
type b2=ec[1]['branches']['$B2']// =>
type b3=ec[1]['branches']['$B3']// =>
