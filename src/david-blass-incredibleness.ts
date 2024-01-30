import type { entry } from './test/from-c/hello-world.actual.js'
import { ReadMemory } from './ts-type-math/store.js'
type e = entry<[4], true> // =>

type stack = e['stack'] // =>
type m = ReadMemory<e> // =>

type ec = e['executionContexts']
type c0f = ec[0]['funcId'] // =>
type c0l = ec[0]['locals'] // =>
type c0b = ec[0]['branches'] // =>

type c1f = ec[1]['funcId'] // =>
type c1l = ec[1]['locals'] // =>
type c1b = ec[1]['branches'] // =>

type c3 = ec[2] // =>
type c4 = ec[3] // =>

type memory = e['memory'] // =>

type c = e['count'] // =>
type i=e['instructions']
type i0= e['instructions'][0] // =>
type i1= e['instructions'][1] // =>
type i2= e['instructions'][2] // =>
type i3= e['instructions'][3] // =>
type i4= e['instructions'][4] // =>
type i5= e['instructions'][5] // =>
type i6= e['instructions'][6] // =>
type i7= e['instructions'][7] // =>
type i8= e['instructions'][8] // =>
type i9= e['instructions'][9] // =>
type i10=e['instructions'][10]// =>
type i11=e['instructions'][11]// =>
type i12=e['instructions'][12]// =>
type i13=e['instructions'][13]// =>
type i14=e['instructions'][14]// =>
type i15=e['instructions'][15]// =>
type i16=e['instructions'][16]// =>
type i17=e['instructions'][17]// =>
type i18=e['instructions'][18]// =>
type i19=e['instructions'][19]// =>
type i20=e['instructions'][20]// =>

type g = e['globals'] // =>

type b0 = ec[1]['branches']['$B0'] // =>
type b1 = ec[1]['branches']['$B1'] // =>
type b2 = ec[1]['branches']['$B2'] // =>
type b3 = ec[1]['branches']['$B3'] // =>