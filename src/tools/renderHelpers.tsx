import React, { ReactNode } from 'react';
import { Tooltip } from 'antd';
import { TooltipProps } from 'antd/lib/tooltip';
import { getPopupContainer } from './antConfig';

export const renderWithTooltip = (
  text: ReactNode,
  tooltipText?: string,
  placement: TooltipProps['placement'] = 'top',
): ReactNode => {
  const innerText = <span>{text}</span>;

  return tooltipText ? (
    <Tooltip
      title={tooltipText}
      placement={placement}
      getPopupContainer={getPopupContainer}
    >
      {innerText}
    </Tooltip>
  ) : (
    innerText
  );
};
