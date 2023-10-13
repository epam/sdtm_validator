import styled, { css } from 'styled-components';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

export { Table, TableBody, TableContainer, TableHead, TableRow };

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const HeadCell = styled(TableCell)<{ $width: string; $minWidth: string }>`
  ${({ theme, $width, $minWidth }) => css`
    width: ${$width};
    min-width: ${$minWidth};
    padding: ${theme.offset(1.5)} ${theme.offset(2.5)} ${theme.offset(1.5)} ${theme.offset(1)};
    color: ${theme.colors.brandColor['5D']};
    border-bottom: 1px solid ${theme.colors.neutral['15L']};

    :last-of-type {
      padding-right: ${theme.offset(1)};
    }
  `}
`;

export const HeadCheckboxCell = styled(TableCell)`
  ${({ theme }) => css`
    width: 0%;
    min-width: 30px;
    padding: ${theme.offset(0.75)} ${theme.offset(0)} ${theme.offset(0.75)} ${theme.offset(1.5)};
    border-bottom: 1px solid ${theme.colors.neutral['15L']};

    span {
      top: -1px;
    }
  `}
`;

export const HeadLabel = styled(TableSortLabel)`
  ${({ theme }) => css`
    color: ${theme.colors.brandColor['5D']};

    .MuiTableSortLabel-icon {
      color: ${theme.colors.brandColor['5D']};
      opacity: 0;
    }

    :focus,
    :active {
      color: ${theme.colors.brandColor['5D']};

      .MuiTableSortLabel-icon {
        color: ${theme.colors.brandColor['5D']};
        opacity: 0;
      }
    }

    :hover {
      color: ${theme.colors.brandColor['5D']};

      .MuiTableSortLabel-icon {
        color: ${theme.colors.brandColor['5D']};
        opacity: 0.5;
      }
    }

    :focus-visible {
      color: ${theme.colors.brandColor['5D']};

      .MuiTableSortLabel-icon {
        opacity: 0.5;
      }
    }

    &.Mui-active {
      color: ${theme.colors.brandColor['5D']};

      .MuiTableSortLabel-icon {
        color: ${theme.colors.brandColor['5D']};
        opacity: 1;
      }
    }
  `}
`;

export const BodyRow = styled(TableRow)`
  vertical-align: top;
  cursor: pointer;

  :last-child td,
  :last-child th {
    border: 0;
  }

  &.MuiTableRow-hover:hover {
    background: ${({ theme }) => theme.colors.brandColor['3L']};
  }
`;

export const BodyCell = styled(TableCell)`
  ${({ theme }) => css`
    max-width: 0;
    padding: ${theme.offset(0.75)} ${theme.offset(2.5)} ${theme.offset(0.75)} ${theme.offset(1)};
    color: ${theme.colors.brandColor['5D']};
    border-bottom: 1px solid ${theme.colors.neutral['5L']};

    :last-of-type {
      padding-right: ${theme.offset(1)};
    }
  `}
`;

export const BodyCheckboxCell = styled(BodyCell)`
  ${({ theme }) => css`
    padding: ${theme.offset(0.75)} ${theme.offset(0)} ${theme.offset(0.75)} ${theme.offset(1.5)};
  `}
`;

export const IdLabel = styled.span`
  display: -webkit-box;
  width: max-content;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const DescriptionLabel = styled.span`
  display: -webkit-box;
  width: max-content;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
