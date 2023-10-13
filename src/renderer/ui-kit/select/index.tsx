import { OptionType, SelectChangeEvent } from '@types';

import { Error, FormControl, Input, Label, Option, Required } from './parts';

export { Option };

const MenuProps = {
  PaperProps: {
    style: {
      boxShadow: '0px 1px 6px 0px #0000001A, 0px 4px 10px 0px #0000001F',
      paddingTop: 4,
      paddingBottom: 4,
      maxHeight: 240
    }
  }
};

type SelectProps = {
  label: string;
  value: string;
  options: OptionType[];
  required?: boolean;
  error?: string;
  disabled?: boolean;
  handleChange: (event: SelectChangeEvent<unknown>) => void;
};

export const Select = ({ label, value, handleChange, options, required, error, disabled }: SelectProps) => {
  const labelSpace = required ? label + '*' : label;

  const renderOptions = (options: OptionType[]) =>
    options.map(({ value, label }) => (
      <Option key={label} value={value} disableRipple>
        {label}
      </Option>
    ));

  return (
    <FormControl disabled={disabled} error={!!error} fullWidth>
      <Label>
        {label}
        {required && <Required>*</Required>}
      </Label>
      <Input MenuProps={MenuProps} label={labelSpace} value={value} onChange={handleChange}>
        {renderOptions(options)}
      </Input>
      {error && <Error>{error}</Error>}
    </FormControl>
  );
};
