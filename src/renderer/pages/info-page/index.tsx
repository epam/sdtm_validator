import { AppInfo } from '@components';
import { AppHelpConnector } from '@connectors';
import { LogoIcon } from '@ui-kit';

import { About, AboutTitle, Content, Copyright, Description, Help, Info, Logo, Title, Wrapper } from './part';

export const InfoPage = () => (
  <Wrapper>
    <Title>Info</Title>
    <Content>
      <AboutTitle>About Us</AboutTitle>
      <About>
        <Logo>
          <LogoIcon />
        </Logo>
        <Info>
          <AppInfo />
        </Info>
        <Description>Short explanation text about App. How often it is synced with CDISC by default.</Description>
        <Copyright>Copyright © 2022-2023 EPAM. All rights reserved</Copyright>
        <Help>
          <AppHelpConnector />
        </Help>
      </About>
    </Content>
  </Wrapper>
);
