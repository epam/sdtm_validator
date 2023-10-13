import { useState } from 'react';

import { ErrorType, IPC_CONNECTOR_NAME } from '@common';
import { AppHelp, ErrorModal } from '@components';
import { getError } from '@utils';

export const AppHelpConnector = () => {
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>();

  const showErrorModal = (error: ErrorType) => {
    setError(error);
    setOpenErrorModal(true);
  };

  const closeErrorModal = () => {
    setOpenErrorModal(false);
  };

  const openUserGuide = async () => {
    try {
      await window[IPC_CONNECTOR_NAME].openUserGuide();
    } catch (e) {
      showErrorModal(getError(e));
    }
  };

  return (
    <>
      <AppHelp openUserGuide={openUserGuide} />
      <ErrorModal error={error} handleClose={closeErrorModal} open={openErrorModal} />
    </>
  );
};
