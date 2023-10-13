import union from 'lodash/union';

import { startNewValidationAction } from '@redux';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RuleType } from '@types';

type CdiscRulesState = {
  isLoading: boolean;
  standard: string;
  version: string;
  ct: string;
  rules: RuleType[];
  selectedRules: string[];
};

const initialState: CdiscRulesState = {
  isLoading: false,
  standard: '',
  version: '',
  ct: '',
  rules: [],
  selectedRules: []
};

const cdiscRulesSlice = createSlice({
  name: 'cdiscRules',
  initialState,
  reducers: {
    setCdiscRulesStandardAction: (state, { payload }: PayloadAction<string>) => {
      state.standard = payload;
    },
    setCdiscRulesVersionAction: (state, { payload }: PayloadAction<string>) => {
      state.version = payload;
    },
    setCdiscRulesCtAction: (state, { payload }: PayloadAction<string>) => {
      state.ct = payload;
    },
    setCdiscRulesLoadingAction: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setCdiscRulesAction: (state, { payload }: PayloadAction<RuleType[]>) => {
      state.rules = payload;
    },
    selectCdiscRuleAction: (state, { payload }: PayloadAction<string>) => {
      state.selectedRules = [...state.selectedRules, payload];
    },
    unselectCdiscRuleAction: (state, { payload }: PayloadAction<string>) => {
      state.selectedRules = state.selectedRules.filter((id) => id !== payload);
    },
    selectCdiscRulesAction: (state, { payload }: PayloadAction<RuleType[]>) => {
      const selectedIds = payload.map(({ id }) => id);
      state.selectedRules = union(state.selectedRules, selectedIds);
    },
    unselectCdiscRulesAction: (state, { payload }: PayloadAction<RuleType[]>) => {
      const unselectedIds = payload.map(({ id }) => id);
      state.selectedRules = state.selectedRules.filter((id) => !unselectedIds.includes(id));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(startNewValidationAction, () => initialState);
  }
});

export const {
  reducer: cdiscRulesReducer,
  actions: {
    setCdiscRulesStandardAction,
    setCdiscRulesVersionAction,
    setCdiscRulesCtAction,
    setCdiscRulesLoadingAction,
    setCdiscRulesAction,
    selectCdiscRuleAction,
    unselectCdiscRuleAction,
    selectCdiscRulesAction,
    unselectCdiscRulesAction
  }
} = cdiscRulesSlice;
