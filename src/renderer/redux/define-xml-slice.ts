import { startNewValidationAction } from '@redux';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type DefineXmlState = string;

const initialState: DefineXmlState = '';

const defineXmlSlice = createSlice({
  name: 'defineXml',
  initialState,
  reducers: {
    addDefineXmlAction: (_, { payload }: PayloadAction<string>) => payload,
    removeDefineXmlAction: () => ''
  },
  extraReducers: (builder) => {
    builder.addCase(startNewValidationAction, () => initialState);
  }
});

export const {
  reducer: defineXmlReducer,
  actions: { addDefineXmlAction, removeDefineXmlAction }
} = defineXmlSlice;
