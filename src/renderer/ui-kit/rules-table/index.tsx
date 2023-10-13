import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import orderBy from 'lodash/orderBy';

import { RULES_TABLE_IDS } from '@constants';
import { RuleKeyType, RuleType, SelectChangeEvent, SortOrderType, TableHeaderType } from '@types';
import { Checkbox, RuleSeverityChip, TablePagination, Tooltip } from '@ui-kit';
import { sortRulesBy } from '@utils';

import {
  BodyCell,
  BodyCheckboxCell,
  BodyRow,
  DescriptionLabel,
  HeadCell,
  HeadCheckboxCell,
  HeadLabel,
  IdLabel,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Wrapper
} from './parts';

type RulesTableHeaderRowProps = Omit<TableHeaderType, 'id'> & {
  direction: SortOrderType;
  active: boolean;
  handleSort: () => void;
};

const RulesTableHeaderRow = ({ direction, label, minWidth, width, additionalProps, active, handleSort }: RulesTableHeaderRowProps) => (
  <HeadCell $minWidth={minWidth} $width={width} {...additionalProps}>
    <HeadLabel active={active} direction={direction} onClick={handleSort}>
      {label}
    </HeadLabel>
  </HeadCell>
);

type RulesTableHeaderProps = {
  headers: TableHeaderType[];
  checked: boolean;
  indeterminate: boolean;
  order: SortOrderType;
  sortBy?: RuleKeyType;
  handleSort: (id: RuleKeyType) => () => void;
  handleSelectAll: (event: ChangeEvent<HTMLInputElement>) => void;
};

const RulesTableHeader = ({ headers, checked, indeterminate, order, sortBy, handleSort, handleSelectAll }: RulesTableHeaderProps) => {
  const renderRulesTableHeaderRows = (headers: TableHeaderType[]) =>
    headers.map(({ id, ...header }) => (
      <RulesTableHeaderRow
        key={id}
        active={sortBy === id}
        direction={sortBy === id ? order : 'asc'}
        handleSort={handleSort(id as RuleKeyType)}
        {...header}
      />
    ));

  return (
    <TableHead>
      <TableRow>
        <HeadCheckboxCell>
          <Checkbox checked={checked} indeterminate={indeterminate} disableRipple onChange={handleSelectAll} />
        </HeadCheckboxCell>
        {renderRulesTableHeaderRows(headers)}
      </TableRow>
    </TableHead>
  );
};

type RulesTableBodyRowProps = RuleType & {
  handleSelect: (id: string, isSelected: boolean) => () => void;
  isSelected: boolean;
};

const RulesTableBodyRow = memo(({ id, description, severity, handleSelect, isSelected }: RulesTableBodyRowProps) => (
  <BodyRow hover onClick={handleSelect(id, isSelected)}>
    <BodyCheckboxCell>
      <Checkbox checked={isSelected} disableRipple />
    </BodyCheckboxCell>
    <BodyCell>
      <Tooltip title={id}>
        <IdLabel>{id}</IdLabel>
      </Tooltip>
    </BodyCell>
    <BodyCell>
      <Tooltip title={description}>
        <DescriptionLabel>{description}</DescriptionLabel>
      </Tooltip>
    </BodyCell>
    <BodyCell>
      <RuleSeverityChip severity={severity} />
    </BodyCell>
  </BodyRow>
));

RulesTableBodyRow.displayName = 'RulesTableBodyRow';

type RulesTableBodyProps = {
  rules: RuleType[];
  isRuleSelected: (id: string) => boolean;
  handleSelect: (id: string, isSelected: boolean) => () => void;
};

const RulesTableBody = ({ rules, isRuleSelected, handleSelect }: RulesTableBodyProps) => {
  const renderRulesTableBodyRows = (rules: RuleType[]) =>
    rules.map(({ id, ...rest }) => {
      const isSelected = isRuleSelected(id);

      return <RulesTableBodyRow key={id} handleSelect={handleSelect} id={id} isSelected={isSelected} {...rest} />;
    });

  return <TableBody>{renderRulesTableBodyRows(rules)}</TableBody>;
};

type RulesTableProps = {
  headers: TableHeaderType[];
  rules: RuleType[];
  selectedRules: string[];
  handleSelectRules: () => void;
  handleSelectRule: (id: string) => void;
  handleUnselectRules: () => void;
  handleUnselectRule: (id: string) => void;
};

export const RulesTable = ({
  rules,
  headers,
  handleSelectRules,
  handleSelectRule,
  handleUnselectRules,
  handleUnselectRule,
  selectedRules
}: RulesTableProps) => {
  const tableRef = useRef<HTMLTableElement>(null);
  let scrollTop: NodeJS.Timeout;

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [order, setOrder] = useState<SortOrderType>('asc');
  const [sortBy, setSortBy] = useState<RuleKeyType>();
  const [checked, setChecked] = useState<boolean>(false);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);

  const handleSort = (id: RuleKeyType) => () => {
    const isDesc = order === 'desc';
    const isSame = sortBy === id;

    setOrder(isDesc || !isSame ? 'asc' : 'desc');
    setSortBy(isDesc && isSame ? undefined : id);
  };

  const isRuleSelected = (id: string) => selectedRules.indexOf(id) !== -1;

  const handleChangePage = (page: number) => () => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<unknown>) => {
    setRowsPerPage(event.target.value as number);
    setPage(0);
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      handleSelectRules();

      return;
    }

    handleUnselectRules();
  };

  const handleSelect = useCallback(
    (id: string, isSelected: boolean) => () => {
      if (isSelected) {
        handleUnselectRule(id);

        return;
      }

      handleSelectRule(id);
    },
    []
  );

  useEffect(() => {
    setPage(0);
  }, [rules]);

  useEffect(() => {
    const ruleIds = rules.map(({ id }) => id);
    const actualSelectedRules = selectedRules.filter((id) => ruleIds.includes(id));

    setChecked(ruleIds.length === actualSelectedRules.length);
    setIndeterminate(actualSelectedRules.length !== 0 && ruleIds.length !== actualSelectedRules.length);
  }, [rules, selectedRules]);

  useEffect(() => {
    clearTimeout(scrollTop);

    scrollTop = setTimeout(() => {
      tableRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);

    return () => clearTimeout(scrollTop);
  }, [tableRef, page, rowsPerPage]);

  return (
    <Wrapper>
      <TableContainer>
        <Table ref={tableRef} stickyHeader>
          <RulesTableHeader
            checked={checked}
            handleSelectAll={handleSelectAll}
            handleSort={handleSort}
            headers={headers}
            indeterminate={indeterminate}
            order={order}
            sortBy={sortBy}
          />
          <RulesTableBody
            handleSelect={handleSelect}
            isRuleSelected={isRuleSelected}
            rules={orderBy(rules, [sortRulesBy(sortBy), RULES_TABLE_IDS.id], [order, 'asc']).slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
          />
        </Table>
      </TableContainer>
      <TablePagination
        count={rules.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Wrapper>
  );
};
