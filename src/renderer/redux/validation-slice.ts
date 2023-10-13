import { VALIDATION_STEPS } from '@constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type ValidationState = {
  step: number;
  reportId: string;
};

const initialState: ValidationState = {
  step: 0,
  reportId: ''
};

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    nextValidationStepAction: (state) => {
      state.step += 1;
    },
    prevValidationStepAction: (state) => {
      state.step -= 1;
    },
    lastValidationStepAction: (state) => {
      state.step = VALIDATION_STEPS.length;
    },
    startNewValidationAction: () => initialState,
    setReportIdAction: (state, { payload }: PayloadAction<string>) => {
      state.reportId = payload;
    }
  }
});

export const {
  reducer: validationReducer,
  actions: { nextValidationStepAction, prevValidationStepAction, startNewValidationAction, setReportIdAction, lastValidationStepAction }
} = validationSlice;
