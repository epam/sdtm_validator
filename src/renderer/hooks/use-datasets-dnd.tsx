import { DragEvent } from 'react';

import { useAppSelector } from '@hooks';

export const useDatasetsDnd = (callback: (datasetPaths: string[]) => Promise<void>) => {
  const isDisabled = useAppSelector((state) => state.ui.isDisabledDrop);

  const onDragOver = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDrop = async (e: DragEvent) => {
    onDragOver(e);

    if (isDisabled) {
      return;
    }

    const droppedDatasetPaths = Object.values(e.dataTransfer.files).map(({ path }) => path);

    await callback(droppedDatasetPaths);
  };

  return { onDragOver, onDrop };
};
