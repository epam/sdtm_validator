import { PropsWithChildren, useEffect, useState } from 'react';

import { ErrorType, IPC_CONNECTOR_NAME } from '@common';
import { ErrorModal } from '@components';
import { useAppDispatch } from '@hooks';
import { setAppInfoAction, setDictionariesAction } from '@redux';
import { Loading } from '@ui-kit';
import { getError } from '@utils';

export const AppConnector = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const showErrorModal = (error: ErrorType) => {
    setError(error);
    setOpenErrorModal(true);
  };

  const closeErrorModal = () => {
    setOpenErrorModal(false);
  };

  const getAppState = async () => {
    try {
      const dictionaries = await window[IPC_CONNECTOR_NAME].getDictionaries();
      const appInfo = await window[IPC_CONNECTOR_NAME].getAppInfo();

      dispatch(setDictionariesAction(dictionaries));
      dispatch(setAppInfoAction(appInfo));
    } catch (e) {
      showErrorModal(getError(e));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };

  useEffect(() => {
    getAppState();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {children}
      <ErrorModal error={error} handleClose={closeErrorModal} open={openErrorModal} />
    </>
  );
};
