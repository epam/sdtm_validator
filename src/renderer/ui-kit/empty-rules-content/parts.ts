import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.offset(1)};
    align-items: center;
    color: ${theme.colors.neutral['15L']};

    svg {
      min-width: 69px;
      max-width: 7vw;
      min-height: 70px;
      max-height: 10vh;
    }
  `}
`;

export const Title = styled.h3`
  ${({ theme }) => css`
    margin-top: ${theme.offset(1)};
    color: ${theme.colors.neutral['70L']};
    font-weight: 500;
    font-size: ${theme.fontSize.h2};
    line-height: ${theme.lineHeight.h2};
  `}
`;

export const Message = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.neutral['70L']};
  `}
`;
