import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-areas:
      'title'
      'content';
    grid-template-rows: max-content 1fr;
    grid-template-columns: 1fr;
    gap: ${theme.offset(3)};
    width: 100%;
    height: 100%;
    padding: ${theme.offset(3)} ${theme.offset(2)} ${theme.offset(4)};
  `}
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    grid-area: title;
    color: ${theme.colors.brandColor['60D']};
    font-weight: 500;
    font-size: ${theme.fontSize.h1};
    line-height: ${theme.lineHeight.h1};
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-area: content;
    grid-template-areas:
      'about-title'
      'about';
    grid-template-rows: max-content 1fr;
    grid-template-columns: 1fr;
    gap: ${theme.offset(3)};
    padding: ${theme.offset(3)};
    border-radius: ${theme.offset(2.5)};
    box-shadow: ${theme.shadow.cards};
  `}
`;

export const AboutTitle = styled.h2`
  ${({ theme }) => css`
    grid-area: about-title;
    color: ${theme.colors.brandColor['5D']};
    font-weight: 500;
    font-size: ${theme.fontSize.h2};
    line-height: ${theme.lineHeight.h2};
  `}
`;

export const About = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-area: about;
    grid-template-areas:
      'logo'
      'info'
      'description'
      'copyright'
      'help';
    grid-template-rows: repeat(5, max-content);
    grid-template-columns: 368px;
    gap: ${theme.offset(3)};
    justify-self: center;
  `}
`;

export const Logo = styled.div`
  display: flex;
  grid-area: logo;
  justify-content: center;
`;

export const Info = styled.div`
  grid-area: info;
`;

export const Description = styled.span`
  ${({ theme }) => css`
    grid-area: description;
    font-weight: 500;
    font-size: ${theme.fontSize.h2};
    line-height: ${theme.lineHeight.h2};
  `}
`;

export const Copyright = styled.span`
  ${({ theme }) => css`
    grid-area: copyright;
    margin-top: ${theme.offset(1)};
  `}
`;

export const Help = styled.div`
  grid-area: help;
`;
