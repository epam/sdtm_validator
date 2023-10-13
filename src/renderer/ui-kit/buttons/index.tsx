import { Loading, StyledIconButton, StyledLinkButton, StyledOutlinedButton, StyledPrimaryButton, StyledTextButton } from './parts';

type ButtonProps = {
  endIcon?: JSX.Element;
  startIcon?: JSX.Element;
  title?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  icon?: JSX.Element;
};

export const TextButton = ({ disabled, endIcon, startIcon, onClick, title, loading }: ButtonProps) => (
  <StyledTextButton
    disabled={disabled || loading}
    endIcon={!loading && endIcon}
    startIcon={loading ? <Loading size={14} /> : startIcon}
    disableRipple
    onClick={onClick}>
    {title}
  </StyledTextButton>
);

export const PrimaryButton = ({ disabled, endIcon, startIcon, onClick, title, loading }: ButtonProps) => (
  <StyledPrimaryButton
    disabled={disabled || loading}
    endIcon={!loading && endIcon}
    startIcon={loading ? <Loading size={14} /> : startIcon}
    disableRipple
    onClick={onClick}>
    {title}
  </StyledPrimaryButton>
);

export const OutlinedButton = ({ disabled, endIcon, startIcon, onClick, title, loading }: ButtonProps) => (
  <StyledOutlinedButton
    disabled={disabled || loading}
    endIcon={!loading && endIcon}
    startIcon={loading ? <Loading size={14} /> : startIcon}
    disableRipple
    onClick={onClick}>
    {title}
  </StyledOutlinedButton>
);

export const LinkButton = ({ disabled, onClick, title }: ButtonProps) => (
  <StyledLinkButton disabled={disabled} disableRipple onClick={onClick}>
    {title}
  </StyledLinkButton>
);

export const IconButton = ({ disabled, onClick, icon, loading }: ButtonProps) => (
  <StyledIconButton disabled={disabled || loading} disableRipple onClick={onClick}>
    {loading ? <Loading size={14} /> : icon}
  </StyledIconButton>
);
