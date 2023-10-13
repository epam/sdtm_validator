import { useState } from 'react';

import { CdiscRulesOptionsType, ErrorType, IPC_CONNECTOR_NAME } from '@common';
import { CdiscRulesMenuContent, ErrorModal } from '@components';
import { useAppDispatch } from '@hooks';
import { selectCdiscRulesAction, setCdiscRulesAction, setCdiscRulesLoadingAction } from '@redux';
import { getError, getFormattedCdiscRules } from '@utils';

export const CdiscRulesMenuContentConnector = () => {
  const dispatch = useAppDispatch();

  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>();

  const showErrorModal = (error: ErrorType) => {
    setError(error);
    setOpenErrorModal(true);
  };

  const closeErrorModal = () => {
    setOpenErrorModal(false);
  };

  const getCdiscRules = async (cdiscRulesOptions: CdiscRulesOptionsType) => {
    try {
      dispatch(setCdiscRulesLoadingAction(true));

      const rawCdiscRules = await window[IPC_CONNECTOR_NAME].getCdiscRules(cdiscRulesOptions);
      const formattedCdiscRules = getFormattedCdiscRules(rawCdiscRules);

      dispatch(setCdiscRulesAction(formattedCdiscRules));
      dispatch(selectCdiscRulesAction(formattedCdiscRules));
    } catch (e) {
      showErrorModal(getError(e));
    } finally {
      dispatch(setCdiscRulesLoadingAction(false));
    }
  };

  return (
    <>
      <CdiscRulesMenuContent getCdiscRules={getCdiscRules} />
      <ErrorModal error={error} handleClose={closeErrorModal} open={openErrorModal} />
    </>
  );
};
