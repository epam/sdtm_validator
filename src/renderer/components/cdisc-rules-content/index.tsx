import { useEffect, useState } from 'react';

import { RULES_TABLE_HEADERS, RULES_TABLE_LABELS } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  selectCdiscRuleAction,
  selectCdiscRulesAction,
  setRulesCountAction,
  unselectCdiscRuleAction,
  unselectCdiscRulesAction
} from '@redux';
import { RuleType } from '@types';
import { EmptyRulesContent, NotFoundRulesSearch, RulesTable, Spinner } from '@ui-kit';
import { parseSearchRequest, searchRules } from '@utils';

import { Wrapper } from './parts';

export const CdiscRulesContent = () => {
  const dispatch = useAppDispatch();

  const rules = useAppSelector((state) => state.cdiscRules.rules);
  const isLoading = useAppSelector((state) => state.cdiscRules.isLoading);
  const selectedRules = useAppSelector((state) => state.cdiscRules.selectedRules);
  const rulesSearch = useAppSelector((state) => state.rules.search);

  const [searchedRules, setSearchedRules] = useState<RuleType[]>([]);

  const handleSelectRule = (id: string) => {
    dispatch(selectCdiscRuleAction(id));
  };

  const handleUnselectRule = (id: string) => {
    dispatch(unselectCdiscRuleAction(id));
  };

  const handleSelectRules = () => {
    dispatch(selectCdiscRulesAction(searchedRules));
  };

  const handleUnselectRules = () => {
    dispatch(unselectCdiscRulesAction(searchedRules));
  };

  useEffect(() => {
    if (rules.length) {
      const searchOptions = parseSearchRequest(rulesSearch, RULES_TABLE_LABELS);
      const foundRules = searchRules(rules, searchOptions);

      setSearchedRules(foundRules);
      dispatch(setRulesCountAction({ ruleGroup: 'cdisc', ruleCount: foundRules.length }));
    }
  }, [rules, rulesSearch]);

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : searchedRules.length ? (
        <RulesTable
          handleSelectRule={handleSelectRule}
          handleSelectRules={handleSelectRules}
          handleUnselectRule={handleUnselectRule}
          handleUnselectRules={handleUnselectRules}
          headers={RULES_TABLE_HEADERS}
          rules={searchedRules}
          selectedRules={selectedRules}
        />
      ) : rules.length ? (
        <NotFoundRulesSearch searchRequest={rulesSearch} />
      ) : (
        <EmptyRulesContent />
      )}
    </Wrapper>
  );
};
