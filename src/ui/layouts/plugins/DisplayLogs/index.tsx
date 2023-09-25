import React, { useEffect, useState } from 'react';
import { routePaths } from '../../../../routes/routePaths';
import { AuthenticatedLayout } from '../../common/layouts/AuthenticatedLayout';
import { useParams } from '../../../hooks';
import { PluginsLayout } from '../shared/Layout';
import { Box, FullWidthSpinner, Paragraph } from '../../../components';
import { getVersion } from '../api';
import styles from './styles.module.scss';
import { Plugin } from '../pluginsTypes';

const DisplayPluginLogs = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [plugin, setPlugin] = useState(null as null | Plugin);
  const { pluginVersionID } = useParams<{ pluginVersionID: string }>();
  useEffect(() => {
    setIsFetching(true);
    getVersion(pluginVersionID)
      .then((data) => {
        setPlugin(data);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [pluginVersionID]);
  return (
    <AuthenticatedLayout
      breadcrumb={[
        {
          name: 'My Plugins',
          clickable: true,
          to: routePaths.settings.myPlugins,
        },
      ]}
    >
      <PluginsLayout title="Build Logs">
        <Box>
          <Paragraph>
            When you submit your code to the ZenML Hub, it gets built into a
            python wheel. <br />
            This process can fail for a multitude of reasons. <br />
            Please make sure you follow our docs when creating and submitting a
            plugin.
          </Paragraph>
          {isFetching ? (
            <FullWidthSpinner size="md" color="black" />
          ) : (
            <div>
              {plugin ? (
                <pre className={styles.displayLogs}>{plugin.build_logs}</pre>
              ) : (
                <Paragraph>Nothing to show</Paragraph>
              )}
            </div>
          )}
        </Box>
      </PluginsLayout>
    </AuthenticatedLayout>
  );
};

export default DisplayPluginLogs;
