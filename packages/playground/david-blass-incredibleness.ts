// @ts-nocheck
import { entry } from 'conformance-tests/from-c/uppercase'; import type { ReadStringFromMemory } from 'ts-type-math';
type e=entry<[97], true, 15>// =>
type r=e['result'] // =>
type s=e['stack']  // =>
type s0=s[0]       // =>
type s1=s[1]       // =>
type s2=s[2]       // =>
type s3=s[3]       // =>
type sl=s['length']// =>
// type rsfm=ReadStringFromMemory<e>// =>

type c=e['count']// =>

type al=e['activeLocals']  // =>
type af=e['activeFuncId']  // =>
type ab=e['activeBranches']// =>

type ec=e['executionContexts']
type c0f=ec[0]['funcId']  // =>
type c0l=ec[0]['locals']  // =>
type c0b=ec[0]['branches']// =>

type c1f=ec[1]['funcId']  // =>
type c1l=ec[1]['locals']  // =>
type c1b=ec[1]['branches']// =>

type c3=ec[2]// =>
type c4=ec[3]// =>

type m=e['memory']// =>

type i=e['instructions']
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
