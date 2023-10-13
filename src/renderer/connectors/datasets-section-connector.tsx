import { useState } from 'react';

import { ERROR_MESSAGES, ERROR_STATUSES, ErrorType, IPC_CONNECTOR_NAME } from '@common';
import { DatasetsSection, ErrorModal } from '@components';
import { useAppDispatch } from '@hooks';
import { addDatasetsAction, setDisableDrop, setDisableNext } from '@redux';
import { getError } from '@utils';

export const DatasetsSectionConnector = () => {
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

  const addDatasets = async (datasetPaths: string[]) => {
    try {
      dispatch(setDisableDrop(true));
      dispatch(setDisableNext(true));
      setValidating(true);

      const validDatasets = await window[IPC_CONNECTOR_NAME].validateDatasetPaths(datasetPaths);

      if (validDatasets.length !== datasetPaths.length) {
        showErrorModal({ status: ERROR_STATUSES.datasetsInvalidFormatError, message: ERROR_MESSAGES.datasetsInvalidFormatError });
      }

      if (!validDatasets.length) {
        return;
      }

      const datasetsMetadata = await window[IPC_CONNECTOR_NAME].getDatasetsMetadata(validDatasets);

      dispatch(addDatasetsAction(datasetsMetadata));
    } catch (e) {
      showErrorModal(getError(e));
    } finally {
      setValidating(false);
      dispatch(setDisableDrop(false));
      dispatch(setDisableNext(false));
    }
  };

  const chooseDatasets = async () => {
    try {
      dispatch(setDisableDrop(true));

      const datasetPaths = await window[IPC_CONNECTOR_NAME].chooseDatasets();

      if (datasetPaths.length) {
        await addDatasets(datasetPaths);
      }
    } catch (e) {
      showErrorModal(getError(e));
    } finally {
      dispatch(setDisableDrop(false));
    }
  };

  return (
    <>
      <DatasetsSection chooseDatasets={chooseDatasets} isValidating={isValidating} onDropDatasets={addDatasets} />
      <ErrorModal error={error} handleClose={closeErrorModal} open={openErrorModal} />
    </>
  );
};
