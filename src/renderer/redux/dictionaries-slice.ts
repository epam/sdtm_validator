import { AddDictionaryType, DictionariesVersionsType, DictionaryType, SelectedDictionariesType } from '@common';
import { NOT_SELECTED_DICTIONARY } from '@constants';
import { startNewValidationAction } from '@redux';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type DictionariesState = {
  selected: SelectedDictionariesType;
  all: DictionariesVersionsType;
};

const initialState: DictionariesState = {
  selected: {},
  all: {}
};

const dictionariesSlice = createSlice({
  name: 'dictionaries',
  initialState,
  reducers: {
    addDictionaryAction: (state, { payload: { type, version, replace } }: PayloadAction<AddDictionaryType>) => {
      if (replace) return;

      if (state.all[type]) {
        state.all[type]!.push(version);
      } else {
        state.all[type] = [version];
      }
    },
    selectDictionariesAction: (state, { payload }: PayloadAction<SelectedDictionariesType>) => {
      state.selected = payload;
    },
    unselectDictionaryAction: (state, { payload }: PayloadAction<DictionaryType>) => {
      state.selected[payload] = NOT_SELECTED_DICTIONARY;
    },
    setDictionariesAction: (state, { payload }: PayloadAction<DictionariesVersionsType>) => {
      state.all = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(startNewValidationAction, (state) => {
      state.selected = initialState.selected;
    });
  }
});

export const {
  reducer: dictionariesReducer,
  actions: { addDictionaryAction, selectDictionariesAction, unselectDictionaryAction, setDictionariesAction }
} = dictionariesSlice;
