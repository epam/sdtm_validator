import { INIT_RULES_COUNT } from '@constants';
import { startNewValidationAction } from '@redux';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RulesCountType, RulesGroupType } from '@types';

type RulesState = {
  search: string;
  rulesCount: RulesCountType;
};

const initialState: RulesState = {
  search: '',
  rulesCount: INIT_RULES_COUNT
};

const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    setRulesSearchAction: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setRulesCountAction: (
      state,
      { payload: { ruleGroup, ruleCount } }: PayloadAction<{ ruleGroup: RulesGroupType; ruleCount: number }>
    ) => {
      state.rulesCount[ruleGroup] = ruleCount;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(startNewValidationAction, () => initialState);
  }
});

export const {
  reducer: rulesReducer,
  actions: { setRulesSearchAction, setRulesCountAction }
} = rulesSlice;
