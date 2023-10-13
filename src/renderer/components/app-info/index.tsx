import { useAppSelector } from '@hooks';

import { Name, Version, Wrapper } from './part';

export const AppInfo = () => {
  const { name, version, cdiscVersion } = useAppSelector((state) => state.appInfo);

  return (
    <Wrapper>
      <Name>{name}</Name>
      <Version>{`Version ${version}`}</Version>
      <Version>{`CDISC Rules Engine Version ${cdiscVersion}`}</Version>
    </Wrapper>
  );
};
