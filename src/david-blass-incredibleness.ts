import type { entry } from './test/from-wat/loop.actual.js';
type e = entry<[3], true> // =>

type stack = e['stack']; // =>

type ec = e['executionContexts'];
type c0f = ec[0]['funcId']; // =>
type c0l = ec[0]['locals']; // =>
type c0b = ec[0]['branches']; // =>

type c1f = ec[1]['funcId']; // =>
type c1l = ec[1]['locals']; // =>
type c1b = ec[1]['branches']; // =>

type c3 = ec[2]; // =>
type c4 = ec[3]; // =>

type memory = e['memory']; // =>

type c = e['count'] // =>
type i=e['instructions'];
type i0= e['instructions'][0]; // =>
type i1= e['instructions'][1]; // =>
type i2= e['instructions'][2]; // =>
type i3= e['instructions'][3]; // =>
type i4= e['instructions'][4]; // =>
type i5= e['instructions'][5]; // =>
type i6= e['instructions'][6]; // =>
type i7= e['instructions'][7]; // =>
type i8= e['instructions'][8]; // =>
type i9= e['instructions'][9]; // =>
type i10=e['instructions'][10];// =>
type i11=e['instructions'][11];// =>
type i12=e['instructions'][12];// =>
type i13=e['instructions'][13];// =>
type i14=e['instructions'][14];// =>
type i15=e['instructions'][15];// =>
type i16=e['instructions'][16];// =>s
type i17=e['instructions'][17];// =>
type i18=e['instructions'][18];// =>
type i19=e['instructions'][19];// =>
type i20=e['instructions'][20];// =>

type g = e['globals']; // =>
