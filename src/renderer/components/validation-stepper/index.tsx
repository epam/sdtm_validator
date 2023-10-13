import { VALIDATION_STEPS } from '@constants';
import { useAppSelector } from '@hooks';

import { Label, StepItem, Wrapper } from './parts';

export const ValidationStepper = () => {
  const validationStep = useAppSelector((state) => state.validation.step);

  return (
    <Wrapper activeStep={validationStep}>
      {VALIDATION_STEPS.map(({ step, label }) => (
        <StepItem key={step}>
          <Label>{label}</Label>
        </StepItem>
      ))}
    </Wrapper>
  );
};
