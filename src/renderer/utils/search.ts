import { RuleKeyType, RuleType } from '@types';

type SearchOptionsType<T> = {
  searchProp: '' | T;
  searchString: string;
};

export const parseSearchRequest = <T extends string | number | symbol>(
  searchRequest: string,
  labels: Record<T, string>
): SearchOptionsType<T> => {
  const separatedSearchRequest = searchRequest.split(':');
  const searchTag = (separatedSearchRequest.length > 1 && separatedSearchRequest.at(0)) || '';
  const searchProp =
    searchTag &&
    (Object.entries(labels)
      .find(([, value]) => (value as string).toLowerCase().trim() === searchTag.toLowerCase().trim())
      ?.at(0) as T);

  const searchString = (searchProp ? searchRequest.replace(`${searchTag}:`, '') : searchRequest).toLowerCase().trim();

  return { searchProp, searchString };
};

export const searchRules = (rules: RuleType[], searchOptions: SearchOptionsType<RuleKeyType>): RuleType[] => {
  const { searchProp, searchString } = searchOptions;

  return rules.filter((rule) =>
    searchProp
      ? rule[searchProp].toLowerCase().includes(searchString)
      : Object.values(rule).filter((value) => value.toLowerCase().includes(searchString)).length
  );
};
