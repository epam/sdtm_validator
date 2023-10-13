import { DatasetType } from '@common';

export const getDatasetsSize = (datasets: DatasetType[]) => datasets.reduce((acc, { size }) => (acc += size), 0);

export const getDatasetPaths = (datasets: DatasetType[]) => datasets.map(({ path }) => path);
