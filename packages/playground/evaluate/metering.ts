// this is a micro metering library

const metrics = [
  'createFile',
  'getProgram',
  'getSourceFile',
  'getTypeAlias',
  'checker',
  'getTypeAtLocation',
  'typeToString',
  'formatter',
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

const metering = metrics.reduce((acc, metric) => ({
  ...acc,
  [metric]: null,
}), {} as Metering);

export const resetMeter = () => {
  for (const metric in metering) {
    metering[metric as Metric] = null;
  }
}

export const meter = (metric: Metric) => ({
  start: () => {
    if (metering[metric] !== null) {
      throw new Error(`bro.  come on.  metering ${metric} was already started!`);
    }
    metering[metric] = performance.now();
  },
  stop: () => {
    const start = metering[metric];
    if (start === null) {
      throw new Error(`metering ${metric} was not started.  get your shit together.`);
    }
    const result = performance.now() - start;
    metering[metric] = result;
    totals[metric] += result;
  },
})

export const finalizeMeter = () => {
  for (const metric in metering) {
    if (metering[metric as keyof Metering] === null) {
      throw new Error(`hey dumb dumb.  you forgot to stop measurement for ${metric}`)
    }
  }
  return metering as MeteringDefinite
}

const totals = metrics.reduce((acc, metric) => ({
  ...acc,
  [metric]: 0,
}), {} as MeteringDefinite);
