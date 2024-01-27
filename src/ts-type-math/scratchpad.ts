import * as R from 'ramda';

console.log(
  JSON.stringify(
    R.mergeAll(
      R.range(0, 16)
        .map(i => {
          const outerKey = i.toString(16)
          const outerValue = R.mergeAll(
            R.range(0, 16)
            .map(j => {
              const innerKey = j.toString(16);

              // change the desired bitwise operation here
              //                    v
              const innerValue = (~j).toString(16)
              return {
                [innerKey]: innerValue
              }
            })
          )

          return {
            [outerKey]: outerValue
          }
        }
      )
    ),
    null,
    2
  )
)

