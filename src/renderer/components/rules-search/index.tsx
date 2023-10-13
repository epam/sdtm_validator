import { RULES_TABLE_LABELS } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks';
import { setRulesSearchAction } from '@redux';
import { Search } from '@ui-kit';

export const RulesSearch = () => {
  const dispatch = useAppDispatch();

  const initSearchValue = useAppSelector((state) => state.rules.search);

  const handleSearch = (value: string) => {
    dispatch(setRulesSearchAction(value.trim()));
  };

  return <Search handleSearch={handleSearch} initValue={initSearchValue} options={Object.values(RULES_TABLE_LABELS)} />;
};
