import React from 'react';
import { EmptyStagePage } from '../../common/EmptyStatePage';

import { getTranslateByScope } from '../../../../services';

export const translate = getTranslateByScope('ui.layouts.Deployments');

export const Deployments: React.FC = () => {
  return (
    <EmptyStagePage
      tabs={null}
      title={translate('title.text')}
      paragraph={translate('paragraph.text')}
      button={{
        text: translate('button.text'),
        href: translate('button.href'),
      }}
    />
  );
};

export default Deployments;
