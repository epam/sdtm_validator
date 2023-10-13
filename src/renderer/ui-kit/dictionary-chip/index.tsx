import { DICTIONARY_LABELS } from '@common';
import { DictionaryChipType } from '@types';
import { CancelIcon } from '@ui-kit';

import { RemoveButton, Title, Version, Wrapper } from './parts';

type DictionaryChipProps = DictionaryChipType & {
  handleRemove: () => void;
};

export const DictionaryChip = ({ type, version, handleRemove }: DictionaryChipProps) => (
  <Wrapper>
    <Title>
      {DICTIONARY_LABELS[type]}: <Version>{version}</Version>
    </Title>
    <RemoveButton onClick={handleRemove}>
      <CancelIcon />
    </RemoveButton>
  </Wrapper>
);
