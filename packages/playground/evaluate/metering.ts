// this is a micro metering library
const metrics = [
  'getSourceFile',
  'getTypeAlias',
  'checker',
  'getTypeAtLocation',
  'typeToString',
  'newFilePrep',
  'createVirtualFile',
  'diagnostics',
  'writeResults',
  'total',
] as const;

export type Metric = typeof metrics[number];

export type Metering = Record<
  Metric,
  number | null
>;

export type MeteringDefinite = Record<
  Metric,
  number
>;

export class Meter {
  metering: Metering = metrics.reduce((acc, metric) => ({
    ...acc,
    [metric]: null,
  }), {} as Metering);

  totals: MeteringDefinite = metrics.reduce((acc, metric) => ({
    ...acc,
    [metric]: 0,
  }), {} as MeteringDefinite);

  creationTime = performance.now();
  lifetime = () => performance.now() - this.creationTime;

  start = (metric: Metric) => {
    if (this.metering[metric] !== null) {
      throw new Error(`bro.  come on.  metering ${metric} was already started!`);
    }
    this.metering[metric] = performance.now();
  }

  stop = (metric: Metric) => {
    const start = this.metering[metric];
    if (start === null) {
      throw new Error(`metering ${metric} was not started.  get your shit together.`);
    }
    const result = performance.now() - start;
    this.metering[metric] = result;
    this.totals[metric] += result;
  }

  finalize = () => {
    for (const metric in this.metering) {
      if (this.metering[metric as keyof Metering] === null) {
        throw new Error(`hey dumb dumb.  you forgot to stop measurement for ${metric}`)
      }
    }
    return this.metering as MeteringDefinite
  }
}
