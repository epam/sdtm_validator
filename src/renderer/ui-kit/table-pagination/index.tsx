import { SelectChangeEvent } from '@types';
import { ChevronLeftIcon, ChevronRightIcon, IconButton, Option } from '@ui-kit';

import { FromTo, Input, Label, MenuProps, RowsPerPageSelect, Toolbar, Wrapper } from './parts';

type TablePaginationProps = {
  count: number;
  rowsPerPage: number;
  page: number;
  rowsPerPageOptions: number[];
  onPageChange: (page: number) => () => void;
  onRowsPerPageChange: (event: SelectChangeEvent<unknown>) => void;
};

export const TablePagination = ({
  count,
  rowsPerPage,
  page,
  onPageChange,
  rowsPerPageOptions,
  onRowsPerPageChange
}: TablePaginationProps) => {
  const totalPages = Math.ceil(count / rowsPerPage) - 1;
  const from = page * rowsPerPage + 1;
  const to = rowsPerPage * (page + 1);

  const renderOptions = (options: number[]) =>
    options.map((value) => (
      <Option key={value} value={value} disableRipple>
        {value}
      </Option>
    ));

  return (
    <Wrapper>
      <RowsPerPageSelect style={{ flexDirection: 'row', gap: '4px' }}>
        <Label>Rows per page:</Label>
        <Input MenuProps={MenuProps} value={rowsPerPage} onChange={onRowsPerPageChange}>
          {renderOptions(rowsPerPageOptions)}
        </Input>
      </RowsPerPageSelect>
      <FromTo>{`${from} - ${to < count ? to : count} of ${count}`}</FromTo>
      <Toolbar>
        <IconButton disabled={page === 0} icon={<ChevronLeftIcon />} onClick={onPageChange(page - 1)} />
        <IconButton disabled={page === totalPages || count < rowsPerPage} icon={<ChevronRightIcon />} onClick={onPageChange(page + 1)} />
      </Toolbar>
    </Wrapper>
  );
};
