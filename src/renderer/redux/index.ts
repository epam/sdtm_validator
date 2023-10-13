import { configureStore } from '@reduxjs/toolkit';

import { appInfoReducer } from './app-info-slice';
import { cdiscRulesReducer } from './cdisc-rules-slice';
import { datasetsReducer } from './datasets-slice';
import { defineXmlReducer } from './define-xml-slice';
import { dictionariesReducer } from './dictionaries-slice';
import { rulesReducer } from './rules-slice';
import { uiReducer } from './ui-slice';
import { validationReducer } from './validation-slice';

export * from './validation-slice';
export * from './cdisc-rules-slice';
export * from './datasets-slice';
export * from './ui-slice';
export * from './define-xml-slice';
export * from './dictionaries-slice';
export * from './app-info-slice';
export * from './rules-slice';

export const store = configureStore({
  reducer: {
    validation: validationReducer,
    datasets: datasetsReducer,
    cdiscRules: cdiscRulesReducer,
    ui: uiReducer,
    defineXml: defineXmlReducer,
    dictionaries: dictionariesReducer,
    appInfo: appInfoReducer,
    rules: rulesReducer
  },
  devTools: process.env.NODE_ENV === 'development'
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
