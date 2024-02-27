
// // import type { Add } from "ts-type-math"; // the hotscript implementation

// // import type { Sum as Add } from "./ch3cknull-dimitri"; // dummy implementation, as a baseline

// // import type { AddBinary as Add } from "../../ts-type-math/add"
// import type { Wasm } from "../../ts-type-math/wasm";
// type Add<a extends string, b extends string> = Wasm.I32Add<a, b>
// import type { Convert } from "../../ts-type-math/conversion"


// type One = Convert.TSNumber.ToWasmValue<1, 'i32'>;

// type v = [
//   Convert.TSNumber.ToWasmValue<1234, 'i64'>,
//   Convert.TSNumber.ToWasmValue<1234567, 'i64'>,
//   Convert.TSNumber.ToWasmValue<1234567890, 'i64'>,
//   Convert.TSNumber.ToWasmValue<1234567890123, 'i64'>,
// ]

// export type e =
// Add<
//   One,
//   Add<
//     Add<
//       Add<
//         Add<
//           v[0],
//           Add<
//             v[1],
//             Add<
//               v[2],
//               v[3]
//             >
//           >
//         >,
//         Add<
//           v[0],
//           Add<
//             v[1],
//             Add<
//               v[2],
//               v[3]
//             >
//           >
//         >
//       >,
//       Add<
//         Add<
//           v[0],
//           Add<
//             v[1],
//             Add<
//               v[2],
//               v[3]
//             >
//           >
//         >,
//         Add<
//           v[0],
//           Add<
//             v[1],
//             Add<
//               v[2],
//               v[3]
//             >
//           >
//         >
//       >
//     >,
//     Add<
//       Add<
//         Add<
//           v[0],
//           Add<
//             v[1],
//             Add<
//               v[2],
//               v[3]
//             >
//           >
//         >,
//         Add<
//           v[0],
//           Add<
//             v[1],
//             Add<
//               v[2],
//               v[3]
//             >
//           >
//         >
//       >,
//       Add<
//         Add<
//           v[0],
//           Add<
//             v[1],
//             Add<
//               v[2],
//               v[3]
//             >
//           >
//         >,
//         Add<
//           v[0],
//           Add<
//             v[1],
//             Add<
//               v[2],
//               Add<
//                 v[0],
//                 Add<
//                   v[1],
//                   Add<
//                     v[2],
//                     Add<
//                       v[0],
//                       Add<
//                         v[1],
//                         Add<
//                           v[2],
//                           Add<
//                             v[0],
//                             Add<
//                               v[1],
//                               Add<
//                                 v[2],
//                                 Add<
//                                   v[0],
//                                   Add<
//                                     v[1],
//                                     Add<
//                                       v[2],
//                                       Add<
//                                         v[0],
//                                         Add<
//                                           v[1],
//                                           Add<
//                                             v[2],
//                                             Add<
//                                               v[0],
//                                               Add<
//                                                 v[1],
//                                                 Add<
//                                                   v[2],
//                                                   Add<
//                                                     v[0],
//                                                     Add<
//                                                       v[1],
//                                                       Add<
//                                                         v[2],
//                                                         Add<
//                                                           v[0],
//                                                           Add<
//                                                             v[1],
//                                                             Add<
//                                                               v[2],
//                                                               Add<
//                                                                 v[0],
//                                                                 Add<
//                                                                   v[1],
//                                                                   Add<
//                                                                     v[2],
//                                                                     v[3]
//                                                                   >
//                                                                 >
//                                                               >
//                                                             >
//                                                           >
//                                                         >
//                                                       >
//                                                     >
//                                                   >
//                                                 >
//                                               >
//                                             >
//                                           >
//                                         >
//                                       >
//                                     >
//                                   >
//                                 >
//                               >
//                             >
//                           >
//                         >
//                       >
//                     >
//                   >
//                 >
//               >
//             >
//           >
//         >
//       >
//     >
//   >
// >
