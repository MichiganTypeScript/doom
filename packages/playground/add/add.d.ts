
// import type { Add } from "ts-type-math"; // the hotscript implementation

// import type {Add} from "ts-arithmetic"

import type { Sum as Add } from "./dummy"; // dummy implementation, as a baseline

type v = [
  1_234,
  1_234_567,
  1_234_567_890,
  1_234_567_890_123,
]

// type m<
//   Recursions extends number,
//   Count extends number = 0,
//   Accumulator extends number = 0
// > =
//   `${Count}` extends Recursions
//     ? Accumulator
//     : m<
//         Recursions,
//         Add<Count, 1>,
//         Add<Accumulator, 1>
//       >

// export type e = Add<1, 1>
//          ^?

export type e =
Add<
  // m<1000>,
  1,
  Add<
    Add<
      Add<
        Add<
          v[0],
          Add<
            v[1],
            Add<
              v[2],
              v[3]
            >
          >
        >,
        Add<
          v[0],
          Add<
            v[1],
            Add<
              v[2],
              v[3]
            >
          >
        >
      >,
      Add<
        Add<
          v[0],
          Add<
            v[1],
            Add<
              v[2],
              v[3]
            >
          >
        >,
        Add<
          v[0],
          Add<
            v[1],
            Add<
              v[2],
              v[3]
            >
          >
        >
      >
    >,
    Add<
      Add<
        Add<
          v[0],
          Add<
            v[1],
            Add<
              v[2],
              v[3]
            >
          >
        >,
        Add<
          v[0],
          Add<
            v[1],
            Add<
              v[2],
              v[3]
            >
          >
        >
      >,
      Add<
        Add<
          v[0],
          Add<
            v[1],
            Add<
              v[2],
              v[3]
            >
          >
        >,
        Add<
          v[0],
          Add<
            v[1],
            Add<
              v[2],
              Add<
                v[0],
                Add<
                  v[1],
                  Add<
                    v[2],
                    Add<
                      v[0],
                      Add<
                        v[1],
                        Add<
                          v[2],
                          Add<
                            v[0],
                            Add<
                              v[1],
                              Add<
                                v[2],
                                Add<
                                  v[0],
                                  Add<
                                    v[1],
                                    Add<
                                      v[2],
                                      Add<
                                        v[0],
                                        Add<
                                          v[1],
                                          Add<
                                            v[2],
                                            Add<
                                              v[0],
                                              Add<
                                                v[1],
                                                Add<
                                                  v[2],
                                                  Add<
                                                    v[0],
                                                    Add<
                                                      v[1],
                                                      Add<
                                                        v[2],
                                                        Add<
                                                          v[0],
                                                          Add<
                                                            v[1],
                                                            Add<
                                                              v[2],
                                                              Add<
                                                                v[0],
                                                                Add<
                                                                  v[1],
                                                                  Add<
                                                                    v[2],
                                                                    v[3]
                                                                  >
                                                                >
                                                              >
                                                            >
                                                          >
                                                        >
                                                      >
                                                    >
                                                  >
                                                >
                                              >
                                            >
                                          >
                                        >
                                      >
                                    >
                                  >
                                >
                              >
                            >
                          >
                        >
                      >
                    >
                  >
                >
              >
            >
          >
        >
      >
    >
  >
>
