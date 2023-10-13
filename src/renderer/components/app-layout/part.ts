import styled from 'styled-components';

export const Wrapper = styled.div.attrs(({ ref }: { ref: React.MutableRefObject<HTMLDivElement | undefined> }) => ({
  ref: ref
}))`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 1000px;
  height: 100vh;
  min-height: 700px;
  overflow: auto;
`;
