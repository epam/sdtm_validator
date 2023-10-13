import { Dispatch, SetStateAction, useState } from 'react';

import { ERROR_MESSAGES, ErrorType, IPC_CONNECTOR_NAME } from '@common';
import { DefineXml, ErrorModal } from '@components';
import { useAppDispatch } from '@hooks';
import { addDefineXmlAction, removeDefineXmlAction, setDisableDrop, setDisableNext } from '@redux';
import { getError } from '@utils';

type DefineXmlConnectorProps = {
  defineXmlErrors: string[];
  setDefineXmlErrors: Dispatch<SetStateAction<string[]>>;
};

export const DefineXmlConnector = ({ defineXmlErrors, setDefineXmlErrors }: DefineXmlConnectorProps) => {
  const dispatch = useAppDispatch();

  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>();
  const [isValidating, setValidating] = useState<boolean>(false);

  const showErrorModal = (error: ErrorType) => {
    setError(error);
    setOpenErrorModal(true);
  };

  const closeErrorModal = () => {
    setOpenErrorModal(false);
  };

  const validateDefineXml = async (defineXmlPath: string) => {
    try {
      setDefineXmlErrors([]);
      setValidating(true);

      const errors = await window[IPC_CONNECTOR_NAME].validateDefineXml(defineXmlPath);

      setDefineXmlErrors(errors);
    } catch (e) {
      setDefineXmlErrors([ERROR_MESSAGES.defineValidationError]);

      throw e;
    }
  };

  const chooseDefineXml = async () => {
    try {
      dispatch(setDisableDrop(true));

      const defineXmlPath = await window[IPC_CONNECTOR_NAME].chooseDefineXml();

      dispatch(setDisableDrop(false));

      if (defineXmlPath) {
        dispatch(setDisableNext(true));
        dispatch(addDefineXmlAction(defineXmlPath));

        await validateDefineXml(defineXmlPath);
      }
    } catch (e) {
      dispatch(setDisableDrop(false));
      showErrorModal(getError(e));
    } finally {
      setValidating(false);
      dispatch(setDisableNext(false));
    }
  };

  const removeDefineXml = () => {
    setDefineXmlErrors([]);
    dispatch(removeDefineXmlAction());
  };

  return (
    <>
      <DefineXml chooseDefineXml={chooseDefineXml} errors={defineXmlErrors} isValidating={isValidating} removeDefineXml={removeDefineXml} />
      <ErrorModal error={error} handleClose={closeErrorModal} open={openErrorModal} />
    </>
  );
};
