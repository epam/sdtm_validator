import { ValidationStepper } from '@components';
import { VALIDATION_CONTENT } from '@constants';
import { useAppSelector } from '@hooks';

import { Content, Stepper, Title, Wrapper } from './part';

export const ValidationPage = () => {
  const validationStep = useAppSelector((state) => state.validation.step);

  return (
    <Wrapper>
      <Title>Validation</Title>
      <Stepper>
        <ValidationStepper />
      </Stepper>
      <Content>{VALIDATION_CONTENT[validationStep]}</Content>
    </Wrapper>
  );
};
