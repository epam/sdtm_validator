export type DictionaryType = 'meddra' | 'whodrug';

export type DictionaryCommonType = { type: DictionaryType; version: string };

export type AddDictionaryType = DictionaryCommonType & { replace?: boolean };

export type DictionariesVersionsType = Partial<Record<DictionaryType, string[]>>;

export type SelectedDictionariesType = Partial<Record<DictionaryType, string>>;
