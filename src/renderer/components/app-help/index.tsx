import { SUPPORT_EMAIL } from '@constants';
import { LinkButton } from '@ui-kit';

import { Additional, Link, Support, Wrapper } from './part';

type AppHelpProps = {
  openUserGuide: () => Promise<void>;
};

export const AppHelp = ({ openUserGuide }: AppHelpProps) => (
  <Wrapper>
    <Support>
      Support e-mail: <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link>
    </Support>
    <LinkButton title="User Guide" onClick={openUserGuide} />
    <Additional>
      <LinkButton title="Terms of service" />
      <LinkButton title="Acknowledgements" />
    </Additional>
  </Wrapper>
);
