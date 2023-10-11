import { routePaths } from './routePaths';
import {
  RouteInterface,
  RouteVisibilityAuthentication,
} from './RouteVisibility';
import Login from '../ui/layouts/session/Login';
import Signup from '../ui/layouts/session/Signup';
import UserEmail from '../ui/layouts/session/UserEmail';
import ForgotPassword from '../ui/layouts/session/ForgotPassword';
import Home from '../ui/layouts/Home';
import DashBoard from '../ui/layouts/DashBoard';

import Pipelines from '../ui/layouts/pipelines/Pipelines';
import AllRuns from '../ui/layouts/AllRuns/Runs';
import stacks from '../ui/layouts/stacks/Stacks';
import secrets from '../ui/layouts/secrets/Secrets';
import Connectors from '../ui/layouts/connectors/Connectors';

import stackComponents from '../ui/layouts/stackComponents/Stacks';
import registerComponents from '../ui/layouts/stackComponents/RegisterComponents';
import CreateStack from '../ui/layouts/stacks/CreateStack';
import UpdateStack from '../ui/layouts/stacks/UpdateStack';
import RegisterSecrets from '../ui/layouts/secrets/RegisterSecret';
import PipelineDetail from '../ui/layouts/pipelines/PipelineDetail/index';
import StackDetail from '../ui/layouts/stacks/StackDetail/index';
import secretDetail from '../ui/layouts/secrets/SecretDetail/index';
import UpdateSecret from '../ui/layouts/secrets/UpdateSecret/index';
import UpdateComponent from '../ui/layouts/stackComponents/UpdateComponent/index';
import UpdateConnector from '../ui/layouts/connectors/UpdateConnector/index';
import stackComponentsDetail from '../ui/layouts/stackComponents/StackDetail/index';
import ConfigureComponent from '../ui/layouts/stackComponents/ConfigureComponent/index';

import PipelineRunDetail from '../ui/layouts/pipelines/RunDetail';
import RepositoryRunDetail from '../ui/layouts/repositories/RunDetail';

import StacksRunDetail from '../ui/layouts/stacks/RunDetail';
import RunsRunDetail from '../ui/layouts/runs/RunDetail';

import SettingsPage from '../ui/layouts/settings/SettingsPage';

import connectorDetail from '../ui/layouts/connectors/ConnectorDetail/index';
import RegisterConnectors from '../ui/layouts/connectors/RegisterConnector';
import ConnectorTypes from '../ui/layouts/connectors/ConnectorTypes';
import ListPlugins from '../ui/layouts/plugins/ListPlugins';
import CreatePlugin from '../ui/layouts/plugins/CreatePlugin';
import UpdatePlugin from '../ui/layouts/plugins/UpdatePlugin';
import PluginDetail from '../ui/layouts/plugins/PluginDetail';

import RepositoriesList from '../ui/layouts/repositories/RepositoriesList';
import CreateRepository from '../ui/layouts/repositories/RepositoryCreate';
import RepositoryDetail from '../ui/layouts/repositories/RepositoryDetail';

import VerifyDevicesPage from '../ui/layouts/devices/verify/page';

import { Logout } from '../ui/components/Logout';
import DisplayPluginLogs from '../ui/layouts/plugins/DisplayLogs';

const routes = [
  {
    path: routePaths.login,
    Component: Login,
    visibility: {
      authentication: RouteVisibilityAuthentication.unauthenticatedOnly,
    },
  },
  {
    path: routePaths.signup,
    Component: Signup,
    visibility: {
      authentication: RouteVisibilityAuthentication.unauthenticatedOnly,
    },
  },
  {
    path: routePaths.userEmail,
    Component: UserEmail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
  },
  {
    path: routePaths.forgot,
    Component: ForgotPassword,
    visibility: {
      authentication: RouteVisibilityAuthentication.unauthenticatedOnly,
    },
  },
  {
    path: routePaths.dashboard(':string'),
    Component: DashBoard,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.home,
    Component: Home,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.devices.verify,
    Component: VerifyDevicesPage,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.pipelines.base,
    Component: Pipelines,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.pipelines.list(':string'),
    Component: Pipelines,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.run.list(':string'),
    Component: AllRuns,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.pipeline.base(':id'),
    Component: PipelineDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.pipeline.configuration(':id', ':string'),
    Component: PipelineDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.pipeline.runs(':string', ':id'),
    Component: PipelineDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stacks.base,
    Component: stacks,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stacks.list(':string'),
    Component: stacks,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },

  {
    path: routePaths.secrets.base,
    Component: secrets,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.secrets.list(':string'),
    Component: secrets,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.secret.base(':id'),
    Component: secretDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.secret.configuration(':id', ':string'),
    Component: secretDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.secret.updateSecret(':id', ':string'),
    Component: UpdateSecret,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.secret.metaData(':id', ':string'),
    Component: secretDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },

  {
    path: routePaths.stacks.createStack(':string'),
    Component: CreateStack,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },

  {
    path: routePaths.stacks.UpdateStack(':string', ':id'),
    Component: UpdateStack,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.secrets.registerSecrets(':string'),
    Component: RegisterSecrets,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stacks.allRuns,
    Component: stacks,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stack.base(':id'),
    Component: StackDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stack.configuration(':id', ':string'),
    Component: StackDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stack.components(':id', ':string'),
    Component: StackDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },

  {
    path: routePaths.repositories.list(':workspace'),
    Component: RepositoriesList,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.repositories.create(':workspace'),
    Component: CreateRepository,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.repositories.overview(':workspace', ':repositoryID'),
    Component: RepositoryDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.repositories.runs(':workspace', ':repositoryID'),
    Component: RepositoryDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },

  {
    path: routePaths.run.repository.statistics(
      ':string',
      ':id',
      ':repositoryID',
    ),
    Component: RepositoryRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.repository.results(':string', ':id', ':repositoryID'),
    Component: RepositoryRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.repository.details(':string', ':id', ':repositoryID'),
    Component: RepositoryRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.repository.tensorboard(':id', ':repositoryID'),
    Component: RepositoryRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },

  {
    path: routePaths.stack.runs(':string', ':id'),
    Component: StackDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.pipeline.base(':id', ':pipelineId'),
    Component: PipelineRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.pipeline.statistics(':string', ':id', ':pipelineId'),
    Component: PipelineRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.pipeline.results(':string', ':id', ':pipelineId'),
    Component: PipelineRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.pipeline.details(':string', ':id', ':pipelineId'),
    Component: PipelineRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.pipeline.tensorboard(':id', ':pipelineId'),
    Component: PipelineRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.stack.base(':id', ':stackId'),
    Component: StacksRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.stack.statistics(':string', ':id', ':stackId'),
    Component: StacksRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.stack.results(':string', ':id', ':stackId'),
    Component: StacksRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.stack.details(':string', ':id', ':stackId'),
    Component: StacksRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.stack.tensorboard(':id', ':stackId'),
    Component: StacksRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.run.statistics(':string', ':runId'),
    Component: RunsRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.run.results(':string', ':runId'),
    Component: RunsRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.run.details(':string', ':runId'),
    Component: RunsRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.run.tensorboard(':runId'),
    Component: RunsRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },

  {
    path: routePaths.stackComponents.base(':type', ':string'),
    Component: stackComponents,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },

  {
    path: routePaths.stackComponents.registerComponents(':type', ':string'),
    Component: registerComponents,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stackComponents.configureComponent(
      ':type',
      ':string',
      ':id',
    ),
    Component: ConfigureComponent,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stackComponents.configuration(':type', ':id', ':string'),
    Component: stackComponentsDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stackComponents.updateComponent(':type', ':id', ':string'),
    Component: UpdateComponent,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stackComponents.runs(':type', ':id', ':string'),
    Component: stackComponentsDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stackComponents.stacks(':type', ':id', ':string'),
    Component: stackComponentsDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },

  {
    path: routePaths.settings.base,
    Component: SettingsPage,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.settings.personalDetails,
    Component: SettingsPage,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.settings.organizationSettings,
    Component: SettingsPage,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.settings.starredPlugins,
    Component: SettingsPage,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.settings.myPlugins,
    Component: SettingsPage,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.logout,
    Component: Logout,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },

  {
    path: routePaths.plugins.list(':workspace'),
    Component: ListPlugins,
    visibility: {
      authentication: RouteVisibilityAuthentication.always,
    },
    exact: true,
  },
  {
    path: routePaths.plugins.buildLogs(':workspace', ':pluginVersionID'),
    Component: DisplayPluginLogs,
    visibility: {
      authentication: RouteVisibilityAuthentication.always,
    },
    exact: true,
  },
  {
    path: routePaths.plugins.create(':workspace'),
    Component: CreatePlugin,
    visibility: {
      // auth handled separately through HubConnectPrompt; need to be able to auth-restrict actions like starring on the list plugins page so needs to be more granular than just page-level
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.plugins.detail.base(':workspace', ':pluginId'),
    Component: PluginDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.always,
    },
    exact: true,
  },
  {
    path: routePaths.plugins.detail.overview(':workspace', ':pluginId'),
    Component: PluginDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.always,
    },
    exact: true,
  },
  {
    path: routePaths.plugins.detail.changelogs(':workspace', ':pluginId'),
    Component: PluginDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.always,
    },
    exact: true,
  },
  {
    path: routePaths.plugins.detail.requirements(':workspace', ':pluginId'),
    Component: PluginDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.always,
    },
    exact: true,
  },
  {
    path: routePaths.plugins.detail.usage(':workspace', ':pluginId'),
    Component: PluginDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.always,
    },
    exact: true,
  },
  {
    path: routePaths.plugins.update(':workspace', ':pluginId'),
    Component: UpdatePlugin,
    visibility: {
      authentication: RouteVisibilityAuthentication.always,
    },
    exact: true,
  },

  {
    path: routePaths.connectors.base,
    Component: Connectors,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.connectors.list(':string'),
    Component: Connectors,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.connectors.configuration(':id', ':string'),
    Component: connectorDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },

  {
    path: routePaths.connectors.connectorComponents(':id', ':string'),
    Component: connectorDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.connectors.registerConnectors(':type', ':workspace'),
    Component: RegisterConnectors,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.connectors.connectorTypes(':string'),
    Component: ConnectorTypes,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.connectors.updateConnector(':id', ':string'),
    Component: UpdateConnector,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
];

export const appRoutesConfig = [...routes] as RouteInterface[];
