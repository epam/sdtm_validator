import { setCdiscRulesLoadingAction } from '@redux';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type UiState = {
  isDisabledDrop: boolean;
  isDisabledNext: boolean;
  isOpenSideMenu: boolean;
  search: string;
};

const initialState: UiState = {
  isDisabledDrop: false,
  isDisabledNext: false,
  isOpenSideMenu: true,
  search: ''
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDisableDrop: (state, { payload }: PayloadAction<boolean>) => {
      state.isDisabledDrop = payload;
    },
    setDisableNext: (state, { payload }: PayloadAction<boolean>) => {
      state.isDisabledNext = payload;
    },
    setOpenSideMenuAction: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpenSideMenu = payload;
    },
    toggleSideMenuAction: (state) => {
      state.isOpenSideMenu = !state.isOpenSideMenu;
    },
    setSearchAction: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setCdiscRulesLoadingAction, (state, { payload }: PayloadAction<boolean>) => {
      state.isDisabledNext = payload;
    });
  }
});

export const {
  reducer: uiReducer,
  actions: { setDisableDrop, setDisableNext, toggleSideMenuAction, setSearchAction, setOpenSideMenuAction }
} = uiSlice;
