import { SyntheticEvent, useState } from 'react';

import { CloseIcon, SearchIcon, Tooltip } from '@ui-kit';

import { Autocomplete, InputAdornment, SearchInput, Wrapper } from './parts';

const MAX_SEARCH_STRING_LENGTH = 300;

type SearchProps = {
  initValue?: string;
  handleSearch: (value: string) => void;
  options: string[];
};

export const Search = ({ initValue = '', handleSearch, options }: SearchProps) => {
  const [inputValue, setInputValue] = useState<string>(initValue);

  const onChange = (_: SyntheticEvent<Element, Event>, value: unknown) => {
    const formattedValue = (value as string).slice(0, MAX_SEARCH_STRING_LENGTH);

    setInputValue(formattedValue);
    handleSearch(formattedValue);
  };

  return (
    <Wrapper>
      <Autocomplete
        clearIcon={
          <Tooltip title="Clear">
            <CloseIcon />
          </Tooltip>
        }
        clearText=""
        inputValue={inputValue}
        options={options.map((option) => `${option}: `)}
        renderInput={(params) => (
          <SearchInput
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start" disablePointerEvents>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            placeholder="Type to search"
          />
        )}
        clearOnEscape
        disablePortal
        freeSolo
        fullWidth
        onInputChange={onChange}
      />
    </Wrapper>
  );
};
