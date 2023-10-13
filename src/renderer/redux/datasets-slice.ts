import unionBy from 'lodash/unionBy';

import { DatasetType } from '@common';
import { startNewValidationAction } from '@redux';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type DatasetsState = DatasetType[];

const initialState: DatasetsState = [];

const datasetsSlice = createSlice({
  name: 'datasets',
  initialState,
  reducers: {
    addDatasetsAction: (state, { payload }: PayloadAction<DatasetType[]>) => unionBy(state, payload, 'path'),
    removeDatasetAction: (state, { payload }: PayloadAction<string>) => state.filter((dataset) => dataset.path !== payload),
    removeAllDatasetsAction: () => []
  },
  extraReducers: (builder) => {
    builder.addCase(startNewValidationAction, () => initialState);
  }
});

export const {
  reducer: datasetsReducer,
  actions: { addDatasetsAction, removeDatasetAction, removeAllDatasetsAction }
} = datasetsSlice;
