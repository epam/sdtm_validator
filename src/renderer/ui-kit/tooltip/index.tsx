import { PropsWithChildren, ReactElement } from 'react';

import { theme } from '@style';

import { MuiTooltip, TooltipLabel } from './parts';

type TooltipProps = PropsWithChildren<{
  title: string;
  arrow?: boolean;
  followCursor?: boolean;
  fullWidth?: boolean;
  placement?:
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start';
}>;

export const Tooltip = ({ title, placement = 'top', arrow = true, followCursor, fullWidth, children }: TooltipProps) => {
  const formattedTitle = title.length > 702 ? `${title.slice(0, 700)}...` : title;

  return (
    <MuiTooltip
      PopperProps={{
        sx: {
          '.MuiTooltip-tooltip': {
            background: theme.colors.neutral['80L'],
            maxWidth: 500,
            fontSize: theme.fontSize.hint,
            lineHeight: theme.lineHeight.hint,
            fontWeight: 400
          },
          '.MuiTooltip-arrow': {
            color: theme.colors.neutral['80L']
          }
        }
      }}
      arrow={arrow}
      enterDelay={450}
      enterNextDelay={450}
      followCursor={followCursor}
      placement={placement}
      title={formattedTitle}
      disableInteractive>
      <TooltipLabel $fullWidth={fullWidth}>{children as ReactElement}</TooltipLabel>
    </MuiTooltip>
  );
};

type ComingSoonTooltipProps = PropsWithChildren<{
  hide?: boolean;
  fullWidth?: boolean;
}>;

export const ComingSoonTooltip = ({ children, hide, fullWidth }: ComingSoonTooltipProps) => (
  <Tooltip arrow={false} fullWidth={fullWidth} title={hide ? '' : 'Coming soon'} followCursor>
    {children as ReactElement}
  </Tooltip>
);
