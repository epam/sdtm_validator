import { SyntheticEvent, useEffect, useState } from 'react';

import { ValidationOptionsType } from '@common';
import { RulesMenu, RulesSearch, RulesTabs } from '@components';
import { DictionariesConnector } from '@connectors';
import { RULES_CONTENT, RULES_MENU_ITEMS } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks';
import { prevValidationStepAction } from '@redux';
import { RulesGroupType } from '@types';
import { ChevronLeftIcon, PrimaryButton, TextButton } from '@ui-kit';
import { getDatasetPaths, getFilteredDictionaries, getTotalRulesCount } from '@utils';

import {
  BackStep,
  Count,
  DictionariesContent,
  Menu,
  RuleCount,
  RulesContent,
  RulesCount,
  RulesFrame,
  Title,
  Toolbar,
  ValidateStep,
  Wrapper
} from './parts';

type RuleSectionProps = {
  runValidation: (validationOptions: ValidationOptionsType) => Promise<void>;
};

export const RulesSection = ({ runValidation }: RuleSectionProps) => {
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<RulesGroupType>(RULES_MENU_ITEMS[0].id);
  const [expandedMenu, setExpandedMenu] = useState<RulesGroupType | false>(RULES_MENU_ITEMS[0].id);
  const [totalSelectedRules, setTotalSelectedRules] = useState<number>(0);
  const [totalRules, setTotalRules] = useState<number>(0);

  const isDisabledNext = useAppSelector((state) => state.ui.isDisabledNext);
  const standard = useAppSelector((state) => state.cdiscRules.standard);
  const version = useAppSelector((state) => state.cdiscRules.version);
  const ct = useAppSelector((state) => state.cdiscRules.ct);
  const datasets = useAppSelector((state) => state.datasets);
  const defineXmlPath = useAppSelector((state) => state.defineXml);
  const selectedCdiscRules = useAppSelector((state) => state.cdiscRules.selectedRules);
  const cdiscRules = useAppSelector((state) => state.cdiscRules.rules);
  const selectedDictionaries = useAppSelector((state) => state.dictionaries.selected);

  const handleChangeMenu = (id: RulesGroupType) => (_: SyntheticEvent, newExpanded: boolean) => {
    setActiveTab(id);
    setExpandedMenu(newExpanded ? id : false);
  };

  const handleChangeTab = (_: SyntheticEvent, id: RulesGroupType) => {
    setActiveTab(id);
    setExpandedMenu(id);
  };

  const onBack = () => {
    dispatch(prevValidationStepAction());
  };

  const onValidate = () => {
    const datasetPaths = getDatasetPaths(datasets);

    const validationOptions: ValidationOptionsType = {
      datasetPaths,
      standard,
      version,
      ct,
      defineXmlPath,
      selectedCdiscRules,
      selectedDictionaries: getFilteredDictionaries(selectedDictionaries)
    };

    runValidation(validationOptions);
  };

  useEffect(() => {
    setTotalRules(getTotalRulesCount(cdiscRules));
  }, [cdiscRules]);

  useEffect(() => {
    setTotalSelectedRules(getTotalRulesCount(selectedCdiscRules));
  }, [selectedCdiscRules]);

  return (
    <Wrapper>
      <Title>Choose Rules</Title>
      <Menu>
        <RulesMenu expandedMenu={expandedMenu} handleChange={handleChangeMenu} />
      </Menu>
      <RulesContent>
        <RulesFrame>
          <Toolbar>
            <RulesSearch />
          </Toolbar>
          <RulesTabs activeTab={activeTab} handleChange={handleChangeTab} />
          {RULES_CONTENT[activeTab]}
        </RulesFrame>
        <RulesCount>
          <RuleCount>
            Total Rules <Count>{totalRules}</Count>
          </RuleCount>
          <RuleCount>
            Total Selected Rules <Count>{totalSelectedRules}</Count>
          </RuleCount>
        </RulesCount>
      </RulesContent>
      <DictionariesContent>
        <DictionariesConnector />
      </DictionariesContent>
      <ValidateStep>
        <PrimaryButton disabled={isDisabledNext} title="Validate" onClick={onValidate} />
      </ValidateStep>
      <BackStep>
        <TextButton disabled={isDisabledNext} startIcon={<ChevronLeftIcon />} title="Back" onClick={onBack} />
      </BackStep>
    </Wrapper>
  );
};
