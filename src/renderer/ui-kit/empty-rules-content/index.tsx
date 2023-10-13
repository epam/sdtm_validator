import { NoRulesIcon } from '@ui-kit';

import { Message, Title, Wrapper } from './parts';

export const EmptyRulesContent = () => (
  <Wrapper>
    <NoRulesIcon />
    <Title>No Rules Yet</Title>
    <Message>Please choose rules</Message>
  </Wrapper>
);
