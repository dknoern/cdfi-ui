import { FC } from 'react';
import { observer } from 'mobx-react';
import { useWindowSize } from 'tools';
import { tablePageHeightAdjuster } from 'tools/sizeMaker';

/*
  Used only for pages with PageSectionWrapper
 */

interface TablePlaceProps {
  hasHeader?: boolean;
  hasActionLine?: boolean;
  children: (tableHeight: number) => JSX.Element;
}
export const TablePlace: FC<TablePlaceProps> = observer(
  ({ children, hasActionLine = true, hasHeader = true }) => {
    const { height: tableHeight } = useWindowSize(
      tablePageHeightAdjuster({ hasActionLine, hasHeader }),
    );

    return children(tableHeight);
  },
);
