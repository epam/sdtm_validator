import { DatasetType } from '@common';
import { DATASETS_TABLE_HEADERS, DATASETS_TABLE_IDS } from '@constants';
import { TableHeaderType } from '@types';
import { CloseIcon, IconButton, TextButton, Tooltip } from '@ui-kit';

import {
  BodyCell,
  BodyRow,
  FilesLabel,
  HeadCell,
  Label,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Wrapper
} from './parts';

const filesLabelFormatter = (label: string, count: number) => (
  <>
    <FilesLabel>{`${label}: `}</FilesLabel>
    {count}
  </>
);

type DatasetsTableHeaderProps = TableHeaderType & {
  datasetsCount: number;
};

const DatasetsTableHeader = ({ id, label, minWidth, width, additionalProps, datasetsCount }: DatasetsTableHeaderProps) => (
  <HeadCell $minWidth={minWidth} $width={width} {...additionalProps}>
    {id === DATASETS_TABLE_IDS.files ? filesLabelFormatter(label, datasetsCount) : label}
  </HeadCell>
);

type DatasetsTableRowProps = DatasetType & {
  handleRemoveDataset: (path: string) => () => void;
};

const DatasetsTableRow = ({ name, path, domain, handleRemoveDataset }: DatasetsTableRowProps) => (
  <BodyRow hover>
    <BodyCell component="th" scope="row">
      <Tooltip title={name}>
        <Label>{name}</Label>
      </Tooltip>
    </BodyCell>
    <BodyCell>{domain}</BodyCell>
    <BodyCell>
      <Tooltip title={path}>
        <Label>{path}</Label>
      </Tooltip>
    </BodyCell>
    <BodyCell align="right">
      <Tooltip title="Remove Item">
        <IconButton icon={<CloseIcon />} onClick={handleRemoveDataset(path)} />
      </Tooltip>
    </BodyCell>
  </BodyRow>
);

type DatasetsTableProps = {
  datasets: DatasetType[];
  handleRemoveDataset: (path: string) => () => void;
  handleRemoveAllDatasets: () => void;
  handleChooseDatasets: () => void;
};

export const DatasetsTable = ({ datasets, handleRemoveDataset, handleRemoveAllDatasets, handleChooseDatasets }: DatasetsTableProps) => {
  const renderDatasetsTableRows = (datasets: DatasetType[]) =>
    datasets.map((dataset) => <DatasetsTableRow key={dataset.path} handleRemoveDataset={handleRemoveDataset} {...dataset} />);

  const renderDatasetsTableHeaders = (headers: TableHeaderType[]) =>
    headers.map((header) => <DatasetsTableHeader key={header.id} {...header} datasetsCount={datasets.length} />);

  return (
    <Wrapper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>{renderDatasetsTableHeaders(DATASETS_TABLE_HEADERS)}</TableRow>
          </TableHead>
          <TableBody>{renderDatasetsTableRows(datasets)}</TableBody>
        </Table>
      </TableContainer>
      <Toolbar>
        <TextButton title="Add Files" onClick={handleChooseDatasets} />
        <TextButton title="Remove All" onClick={handleRemoveAllDatasets} />
      </Toolbar>
    </Wrapper>
  );
};
