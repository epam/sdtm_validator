import { RuleSeverityType } from '@types';

import { Wrapper } from './parts';

export const RuleSeverityChip = ({ severity }: { severity: RuleSeverityType }) => <Wrapper $severity={severity}>{severity}</Wrapper>;
