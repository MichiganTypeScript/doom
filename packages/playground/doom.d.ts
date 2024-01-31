import type  Pixel_000 } from "./constants.d.ts";
import type  CreateCanvas } from "./helpers.d.ts";

// need to figure out how to increase limit.  https://stackoverflow.com/questions/53113031/how-to-see-a-fully-expanded-typescript-type-without-n-more-and has ideas
type DoomCanvas = CreateCanvas<320, 200, Pixel_000>;
