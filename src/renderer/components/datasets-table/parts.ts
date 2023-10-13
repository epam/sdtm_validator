import styled, { css } from 'styled-components';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export { Table, TableBody, TableContainer, TableHead, TableRow };

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const HeadCell = styled(TableCell)<{ $width: string; $minWidth: string }>`
  ${({ theme, $width, $minWidth }) => css`
    width: ${$width};
    min-width: ${$minWidth};
    padding: ${theme.offset(1)} ${theme.offset(2)};
    color: ${theme.colors.brandColor['5D']};
    border-bottom: 1px solid ${theme.colors.neutral['15L']};
  `}
`;

export const FilesLabel = styled.span`
  font-weight: 400;
`;

export const BodyRow = styled(TableRow)`
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
    padding: ${theme.offset(0.5)} ${theme.offset(2)};
    overflow: hidden;
    color: ${theme.colors.brandColor['5D']};
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid ${theme.colors.neutral['5L']};
  `}
`;

export const Label = styled.span`
  display: block;
  width: max-content;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.offset(0.5)};
`;
