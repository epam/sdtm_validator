import { PropsWithChildren } from 'react';

import { CloseIcon, IconButton } from '@ui-kit';

import { Header, Title, Wrapper } from './parts';

type ModalProps = PropsWithChildren<{
  open: boolean;
  title?: string;
  handleClose?: () => void;
}>;

export const Modal = ({ open, title, handleClose, children }: ModalProps) => (
  <Wrapper maxWidth={false} open={open} disableEscapeKeyDown>
    <Header>
      <Title>{title}</Title>
      {handleClose && <IconButton icon={<CloseIcon />} onClick={handleClose} />}
    </Header>
    {children}
  </Wrapper>
);
