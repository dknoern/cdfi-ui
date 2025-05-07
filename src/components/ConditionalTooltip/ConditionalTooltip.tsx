import React, { FC } from 'react';
import { Tooltip } from 'antd';
import { TooltipProps } from 'antd/lib/tooltip';
import { getPopupContainer } from 'tools/antConfig';

type ConditionalTooltipProps = {
  condition: boolean;
  tooltipTitle?: TooltipProps['title'];
  arrowPointAtCenter?: TooltipProps['arrowPointAtCenter'];
  placement?: TooltipProps['placement'];
};

export const ConditionalTooltip: FC<ConditionalTooltipProps> = ({
  condition,
  tooltipTitle,
  arrowPointAtCenter,
  placement = 'top',
  children,
}): any => {
  if (condition) {
    return (
      <Tooltip
        title={tooltipTitle}
        arrowPointAtCenter={arrowPointAtCenter}
        placement={placement}
        getPopupContainer={getPopupContainer}
      >
        {children as any}
      </Tooltip>
    );
  }

  return children;
};
