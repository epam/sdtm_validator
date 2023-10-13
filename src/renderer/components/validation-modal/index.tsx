import { DictionaryCommonType, ERROR_STATUSES, ErrorType } from '@common';
import { CorruptContent, ErrorContent, InstallContent } from '@components';
import { Modal, Spinner } from '@ui-kit';

import { Loading, Wrapper } from './parts';

type ValidationModalProps = {
  open: boolean;
  error?: ErrorType;
  corruptedDictionary?: DictionaryCommonType;
  handleClose: () => void;
  handleReplace: (dictionary: DictionaryCommonType) => () => Promise<void>;
  isInstallingDictionary: boolean;
};

export const ValidationModal = ({
  open,
  error,
  corruptedDictionary,
  handleClose,
  handleReplace,
  isInstallingDictionary
}: ValidationModalProps) => {
  if (!error) {
    return (
      <Modal open={open} title="Validation">
        <Loading>
          <Spinner size={80} />
        </Loading>
      </Modal>
    );
  }

  return (
    <Modal open={open}>
      <Wrapper>
        {error.status === ERROR_STATUSES.dictionaryCorruptedError ? (
          isInstallingDictionary ? (
            <InstallContent />
          ) : (
            <CorruptContent dictionary={corruptedDictionary!} handleCancel={handleClose} handleReplace={handleReplace} />
          )
        ) : (
          <ErrorContent error={error} handleClose={handleClose} />
        )}
      </Wrapper>
    </Modal>
  );
};
