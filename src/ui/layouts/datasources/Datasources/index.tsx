import React from 'react';
import { EmptyStagePage } from '../../common/EmptyStatePage';

import { getTranslateByScope } from '../../../../services';
import { H3, Box } from '../../../components';
import { CommandBox } from '../../common/CommandBox';

export const translate = getTranslateByScope('ui.layouts.Datasources');

const TABS = [
  {
    title: translate('tabs.cli.text'),
    Component: () => (
      <>
        <Box paddingBottom="lg">
          <H3 bold>{translate('tabs.cli.content.title.text')}</H3>
        </Box>
        <Box paddingBottom="lg">
          <CommandBox command={translate('tabs.cli.content.commandOne.text')} />
        </Box>
        <Box paddingBottom="lg">
          <CommandBox command={translate('tabs.cli.content.commandTwo.text')} />
        </Box>
        <Box paddingBottom="lg">
          <CommandBox
            command={translate('tabs.cli.content.commandThree.text')}
          />
        </Box>
      </>
    ),
  },
  {
    title: translate('tabs.pythonSDK.text'),
    Component: () => (
      <>
        <Box paddingBottom="lg">
          <H3 bold>{translate('tabs.pythonSDK.content.title.text')}</H3>
        </Box>
        <Box paddingBottom="lg">
          <CommandBox
            command={translate('tabs.pythonSDK.content.commandOne.text')}
          />
        </Box>
        <Box paddingBottom="lg">
          <CommandBox
            command={translate('tabs.pythonSDK.content.commandTwo.text')}
          />
        </Box>
        <Box paddingBottom="lg">
          <CommandBox
            command={translate('tabs.pythonSDK.content.commandThree.text')}
          />
        </Box>
      </>
    ),
  },
  {
    title: translate('tabs.ceDashboard.text'),
    Component: () => (
      <>
        <Box paddingBottom="lg">
          <H3 bold>{translate('tabs.ceDashboard.content.title.text')}</H3>
        </Box>
        <Box paddingBottom="lg">
          <CommandBox
            command={translate('tabs.ceDashboard.content.commandOne.text')}
          />
        </Box>
        <Box paddingBottom="lg">
          <CommandBox
            command={translate('tabs.ceDashboard.content.commandTwo.text')}
          />
        </Box>
        <Box paddingBottom="lg">
          <CommandBox
            command={translate('tabs.ceDashboard.content.commandThree.text')}
          />
        </Box>
      </>
    ),
  },
];

export const Datasources: React.FC = () => {
  return (
    <EmptyStagePage
      tabs={TABS}
      title={translate('title.text')}
      paragraph={translate('paragraph.text')}
      button={{
        text: translate('button.text'),
        href: translate('button.href'),
      }}
    />
  );
};

export default Datasources;
