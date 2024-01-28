Initial State

```
Stack: []
Frames: []
```

## calling `$entry`

if externally, entry is called like `entry(10, 20, 30)`, then those values are put into the stack such that the last value of the function call is the first value on the stack (if by "first" we're talking about it like it's an array).


as part of starting the program, we seed the global stack

```
Stack: [10, 20, 30]
Frames: []
```

Then, to call our first function, we drain as many items from the stack as their are in the stack.  we start with the last value (in this case $third) and pop values off the stack.

```
Stack: [10, 20]
Frames: [
  { $entry: { $third: 30 } }
]
```

then the $second parameter

```
Stack: [10]
Frames: [
  { $entry: { $second: 20, $third: 30 } }
]
```

then the $first parameter


```
Stack: []
Frames: [
  { $entry: { $first: 10, $second: 20, $third: 30 } }
]
```

## `local.get $third`

this pushes `ActiveFrame.parameters.$entry.$third` onto the stack

```
Stack: [30]
Frames: [
  { $entry: { $first: 10, $second: 20, $third: 30 } }
]
```

## `call $test`

again, we create a new frame and drain as many values from the stack as there are in the parameters of the function we're calling

```
Stack: []
Frames: [
  { $entry: { $first: 10, $second: 20, $third: 30 } }
  { $test: { $a: 30 } }
]
```

## `local.get $a`

then we take the value in `ActiveFrame.$a` and push it onto the stack.

```
Stack: [30]
Frames: [
  { $entry: { $first: 10, $second: 20, $third: 30 } }
  { $test: { $a: 30 } }
]
```

## `$test` runs out of instructions

we hit the end of the `$test`, so we remove its frame

```
Stack: [30]
Frames: [
  { $entry: { $first: 10, $second: 20, $third: 30 } }
]
```

## `$entry` runs out of instructions

we hit the end of the `$entry`, so we remove its frame

```
Stack: [30]
Frames: []
```

## `$entry` runs out of instructions

we hit the end of the `$entry`, so we remove its frame


## program exit

we've run out of frames, so we can exit the program and return whatever is on the stack