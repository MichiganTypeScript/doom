import { Pixel_000, ThreeTwentyRows } from "./constants";
import { Table, TablePrecalc } from "./helpers";

type DoomCanvas = Table<320, 200, Pixel_000>;

// need to figure out how to increase limit.  https://stackoverflow.com/questions/53113031/how-to-see-a-fully-expanded-typescript-type-without-n-more-and has ideas
type DoomPrecalc = TablePrecalc<ThreeTwentyRows, 200, Pixel_000>;
