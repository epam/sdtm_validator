import { PropsWithChildren, useCallback, useEffect, useRef } from 'react';

import { SideMenu } from '@components';
import { useAppDispatch } from '@hooks';
import { setOpenSideMenuAction } from '@redux';

import { Wrapper } from './part';

const SIDE_MENU_BREAKPOINT = 1280;

export const AppLayout = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  const layoutRef = useRef<HTMLDivElement>();

  const controlSideMenu = useCallback(() => {
    if (layoutRef.current) {
      dispatch(setOpenSideMenuAction(layoutRef.current.offsetWidth >= SIDE_MENU_BREAKPOINT));
    }
  }, [layoutRef.current]);

  useEffect(() => {
    controlSideMenu();

    window.addEventListener('resize', controlSideMenu);

    return () => window.removeEventListener('resize', controlSideMenu);
  }, []);

  return (
    <Wrapper ref={layoutRef}>
      <SideMenu />
      {children}
    </Wrapper>
  );
};
