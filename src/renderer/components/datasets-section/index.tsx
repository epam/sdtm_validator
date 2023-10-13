import { useEffect, useState } from 'react';

import { DatasetType, ERROR_MESSAGES, MAX_DATASETS_COUNT, MAX_DATASETS_SIZE } from '@common';
import { DatasetsTable } from '@components';
import { DefineXmlConnector } from '@connectors';
import { useAppDispatch, useAppSelector, useDatasetsDnd } from '@hooks';
import { nextValidationStepAction, removeAllDatasetsAction, removeDatasetAction } from '@redux';
import { ChevronRightIcon, Spinner, TextButton, UploadDatasetsIcon } from '@ui-kit';
import { getDatasetsSize } from '@utils';

import {
  BrowseButton,
  DatasetsContent,
  DatasetsDrop,
  DefineXmlContent,
  EmptyMessageWrapper,
  Error,
  Errors,
  LoadingBackdrop,
  Message,
  NextStep,
  Title,
  Wrapper
} from './parts';

const EmptyMessage = ({ handleChooseDatasets }: { handleChooseDatasets: () => void }) => (
  <EmptyMessageWrapper>
    <UploadDatasetsIcon />
    <Message>
      Drag and drop, or <BrowseButton onClick={handleChooseDatasets}>browse</BrowseButton> your files
    </Message>
  </EmptyMessageWrapper>
);

type DatasetsSectionsProps = {
  chooseDatasets: () => Promise<void>;
  onDropDatasets: (datasetsPath: string[]) => Promise<void>;
  isValidating: boolean;
};

export const DatasetsSection = ({ chooseDatasets, onDropDatasets, isValidating }: DatasetsSectionsProps) => {
  const dispatch = useAppDispatch();
  const { onDragOver, onDrop } = useDatasetsDnd(onDropDatasets);

  const datasets = useAppSelector((state) => state.datasets);
  const isDisabledNext = useAppSelector((state) => state.ui.isDisabledNext);

  const [datasetsErrors, setDatasetsErrors] = useState<string[]>([]);
  const [defineXmlErrors, setDefineXmlErrors] = useState<string[]>([]);

  const removeDataset = (path: string) => () => {
    dispatch(removeDatasetAction(path));
  };

  const removeAllDatasets = () => {
    dispatch(removeAllDatasetsAction());
  };

  const onNext = () => {
    if (!datasets.length) {
      setDatasetsErrors([ERROR_MESSAGES.minDatasetsCountError]);

      return;
    }

    if (datasetsErrors.length || defineXmlErrors.length) return;

    dispatch(nextValidationStepAction());
  };

  const validateDatasets = (datasets: DatasetType[]) => {
    const errors: string[] = [];

    const datasetsSize = getDatasetsSize(datasets);

    if (datasetsSize > MAX_DATASETS_SIZE) {
      errors.push(ERROR_MESSAGES.maxDatasetsSizeError);
    }

    if (datasets.length > MAX_DATASETS_COUNT) {
      errors.push(ERROR_MESSAGES.maxDatasetsCountError);
    }

    setDatasetsErrors(errors);
  };

  const renderErrors = (errors: string[]) => errors.map((error) => <Error key={error}>{error}</Error>);

  useEffect(() => {
    validateDatasets(datasets);
  }, [datasets]);

  return (
    <Wrapper>
      <Title>Choose Datasets</Title>
      <DatasetsContent>
        <DatasetsDrop $empty={!datasets.length} $error={!!datasetsErrors.length} onDragOver={onDragOver} onDrop={onDrop}>
          <LoadingBackdrop open={isValidating}>
            <Spinner />
          </LoadingBackdrop>
          {datasets.length ? (
            <DatasetsTable
              datasets={datasets}
              handleChooseDatasets={chooseDatasets}
              handleRemoveAllDatasets={removeAllDatasets}
              handleRemoveDataset={removeDataset}
            />
          ) : (
            <EmptyMessage handleChooseDatasets={chooseDatasets} />
          )}
        </DatasetsDrop>
        <Errors>{renderErrors(datasetsErrors)}</Errors>
      </DatasetsContent>
      <DefineXmlContent>
        <DefineXmlConnector defineXmlErrors={defineXmlErrors} setDefineXmlErrors={setDefineXmlErrors} />
      </DefineXmlContent>
      <NextStep>
        <TextButton disabled={isDisabledNext} endIcon={<ChevronRightIcon />} title="Next" onClick={onNext} />
      </NextStep>
    </Wrapper>
  );
};
