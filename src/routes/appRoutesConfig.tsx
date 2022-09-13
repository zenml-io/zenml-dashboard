import { routePaths } from './routePaths';
import {
  RouteInterface,
  RouteVisibilityAuthentication,
} from './RouteVisibility';
import Login from '../ui/layouts/session/Login';
import Signup from '../ui/layouts/session/Signup';
import ForgotPassword from '../ui/layouts/session/ForgotPassword';
import Home from '../ui/layouts/Home';

import Pipelines from '../ui/layouts/pipelines/Pipelines';
import stacks from '../ui/layouts/stacks/Pipelines';
import Datasources from '../ui/layouts/datasources/Datasources';
import Deployments from '../ui/layouts/deployments/Deployments';
import Functions from '../ui/layouts/functions/Functions';
import Models from '../ui/layouts/models/Models';
import Workspaces from '../ui/layouts/workspaces/Workspaces';
import PipelineDetail from '../ui/layouts/pipelines/PipelineDetail/index';
import StackDetail from '../ui/layouts/stacks/StackDetail/index';
import RunDetail from '../ui/layouts/pipelines/RunDetail';
import SettingsPage from '../ui/layouts/settings/SettingsPage';

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
    path: routePaths.forgot,
    Component: ForgotPassword,
    visibility: {
      authentication: RouteVisibilityAuthentication.unauthenticatedOnly,
    },
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
    path: routePaths.pipelines.base,
    Component: Pipelines,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.pipelines.list,
    Component: Pipelines,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.pipelines.allRuns,
    Component: Pipelines,
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
    path: routePaths.pipeline.configuration(':id'),
    Component: PipelineDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.pipeline.runs(':id'),
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
    path: routePaths.stacks.list,
    Component: stacks,
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
    path: routePaths.stack.configuration(':id'),
    Component: StackDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stack.runs(':id'),
    Component: StackDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.base(':id', ':pipelineId'),
    Component: RunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.statistics(':id', ':pipelineId'),
    Component: RunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.results(':id', ':pipelineId'),
    Component: RunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.tensorboard(':id', ':pipelineId'),
    Component: RunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.workspaces.base,
    Component: Workspaces,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.workspaces.list,
    Component: Workspaces,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.datasources,
    Component: Datasources,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
  },
  {
    path: routePaths.functions,
    Component: Functions,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
  },
  {
    path: routePaths.models,
    Component: Models,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
  },
  {
    path: routePaths.deployments,
    Component: Deployments,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
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
    path: routePaths.settings.yourPlan,
    Component: SettingsPage,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.settings.billing,
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
];

export const appRoutesConfig = [...routes] as RouteInterface[];
