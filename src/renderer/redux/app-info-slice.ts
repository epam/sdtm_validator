import { AppInfoType } from '@common';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type AppInfoState = AppInfoType;

const initialState: AppInfoState = {
  name: '',
  version: 'N/A',
  cdiscVersion: 'N/A'
};

const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers: {
    setAppInfoAction: (_, { payload }: PayloadAction<AppInfoType>) => payload
  }
});

export const {
  reducer: appInfoReducer,
  actions: { setAppInfoAction }
} = appInfoSlice;
