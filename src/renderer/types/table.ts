export type TableHeaderType = {
  id: string;
  label: string;
  minWidth: string;
  width: string;
  additionalProps?: {
    align: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined;
  };
};

export type SortOrderType = 'asc' | 'desc';
