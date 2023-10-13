import { COMMON_ERROR, ERROR_MESSAGES, ERROR_STATUSES, ErrorType } from '@common';
import { ERROR_SUPPORT, ERROR_TITLES, SUPPORT_EMAIL } from '@constants';
import { Modal, OutlinedButton } from '@ui-kit';

import { Content, ErrorWrapper, Link, Title, Wrapper } from './parts';

type ErrorContentProps = {
  error: ErrorType;
  handleClose: () => void;
  okText?: string;
};

export const ErrorContent = ({ error, handleClose, okText = 'OK' }: ErrorContentProps) => {
  const { status = ERROR_STATUSES.commonError, message = ERROR_MESSAGES.commonError } = error;

  const title = ERROR_TITLES[status];
  const support = ERROR_SUPPORT.includes(status);
  const formattedContent = support ? message.split('support') : [message];

  return (
    <ErrorWrapper>
      <Title>{title}</Title>
      <Content>
        {formattedContent[0]}
        {support && <Link href={`mailto:${SUPPORT_EMAIL}`}>support</Link>}
        {formattedContent[1]}
      </Content>
      <OutlinedButton title={okText} onClick={handleClose} />
    </ErrorWrapper>
  );
};

type ErrorModalProps = {
  open: boolean;
  error?: ErrorType;
  okText?: string;
  handleClose: () => void;
};

export const ErrorModal = ({ open, error = COMMON_ERROR, handleClose, okText }: ErrorModalProps) => (
  <Modal open={open}>
    <Wrapper>
      <ErrorContent error={error} handleClose={handleClose} okText={okText} />
    </Wrapper>
  </Modal>
);
