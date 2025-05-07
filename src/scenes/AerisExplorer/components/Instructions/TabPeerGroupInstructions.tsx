import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Typography } from 'antd';

type PeerGroupInstructionProps = {
  subscriberId: number | undefined;
  cdfiId: number | undefined;
  isAdmin: boolean;
  isStaff: boolean;
};

export const TabPeerGroupInstructions: FC<PeerGroupInstructionProps> = observer(
  (props: PeerGroupInstructionProps) => {
    const { cdfiId, subscriberId, isAdmin, isStaff } = props;
    return (
      <>
        {cdfiId === undefined && subscriberId === undefined && (
          <Typography.Paragraph>
            The following list shows all of the global peer groups that Aeris
            has created. When an investor with an All subscription with peer
            groups enabled first access their cloud they will have access to a
            copy of these as their initial list. Click on the name to view the
            report for the peers listed. Once in that report you can update the
            list of peers if desired.
          </Typography.Paragraph>
        )}
        {cdfiId !== undefined && (
          <Typography.Paragraph>
            The following list shows the peer groups created for this CDFI.
            Click on the name to view the report for the peers listed. Once in
            that report you can update the list of peers if desired.
          </Typography.Paragraph>
        )}
        {subscriberId !== undefined && cdfiId === undefined && (
          <>
            <Typography.Paragraph>
              Here you can view all of Aeris standard peer groups, and the
              custom peer groups your organization has created and saved in the
              past 12 months. If none of them fits your purpose, you can create
              a new peer group in one of two ways:
            </Typography.Paragraph>
            {(isAdmin || isStaff) && (
              <Typography.Paragraph>
                • Using the “Edit” icon next to an existing peer group, bring
                the peer group up, edit it as you need and save under a
                name; or
              </Typography.Paragraph>
            )}
            <Typography.Paragraph>
              • Using the “Clone” icon next to an existing peer group, bring the
              peer group up, edit it as you need and save under a different
              name; or
            </Typography.Paragraph>
            <Typography.Paragraph>
              • Using the “Create New Peer Group” button, navigate to the next
              page and create a new peer group from scratch.
            </Typography.Paragraph>
            <Typography.Paragraph>
              Peer groups must consist of at least 5 CDFIs.
            </Typography.Paragraph>
          </>
        )}
      </>
    );
  },
);
