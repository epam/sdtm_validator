import { useEffect } from 'react';

import { CdiscRulesOptionsType } from '@common';
import { CDISC_RULES_CT_OPTIONS, CDISC_RULES_STANDARDS_OPTIONS, CDISC_RULES_VERSIONS_OPTIONS } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks';
import { setCdiscRulesCtAction, setCdiscRulesStandardAction, setCdiscRulesVersionAction } from '@redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { SelectChangeEvent } from '@types';
import { Select, TextButton } from '@ui-kit';

import { Group, GroupDivider, Wrapper } from './parts';

type CdiscRulesMenuContentProps = {
  getCdiscRules: (cdiscOptions: CdiscRulesOptionsType) => void;
};

export const CdiscRulesMenuContent = ({ getCdiscRules }: CdiscRulesMenuContentProps) => {
  const dispatch = useAppDispatch();

  const standard = useAppSelector((state) => state.cdiscRules.standard) || CDISC_RULES_STANDARDS_OPTIONS[0].value;
  const version = useAppSelector((state) => state.cdiscRules.version) || CDISC_RULES_VERSIONS_OPTIONS[0].value;
  const ct = useAppSelector((state) => state.cdiscRules.ct) || CDISC_RULES_CT_OPTIONS[0].value;
  const isLoading = useAppSelector((state) => state.cdiscRules.isLoading);

  const handleChange =
    (action: ActionCreatorWithPayload<string>) =>
    (event: SelectChangeEvent<unknown>): void => {
      dispatch(action(event.target.value as string));
    };

  const handleAddToList = () => {
    getCdiscRules({ standard, version });
  };

  useEffect(() => {
    dispatch(setCdiscRulesStandardAction(CDISC_RULES_STANDARDS_OPTIONS[0].value));
    dispatch(setCdiscRulesVersionAction(CDISC_RULES_VERSIONS_OPTIONS[0].value));
    dispatch(setCdiscRulesCtAction(CDISC_RULES_CT_OPTIONS[0].value));
  }, []);

  return (
    <Wrapper>
      <Group>
        <Select
          disabled={isLoading}
          handleChange={handleChange(setCdiscRulesStandardAction)}
          label="Data Model"
          options={CDISC_RULES_STANDARDS_OPTIONS}
          value={standard}
        />
        <Select
          disabled={isLoading}
          handleChange={handleChange(setCdiscRulesVersionAction)}
          label="Model IG Version"
          options={CDISC_RULES_VERSIONS_OPTIONS}
          value={version}
        />
      </Group>
      <GroupDivider flexItem />
      <Group>
        <Select
          disabled={isLoading}
          handleChange={handleChange(setCdiscRulesCtAction)}
          label="CDISC CT"
          options={CDISC_RULES_CT_OPTIONS}
          value={ct}
        />
      </Group>
      <TextButton disabled={isLoading} title="Add to List" onClick={handleAddToList} />
    </Wrapper>
  );
};
