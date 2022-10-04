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

import Pipelines from '../ui/layouts/pipelines/Pipelines';
import stacks from '../ui/layouts/stacks/Stacks';
import Datasources from '../ui/layouts/datasources/Datasources';
import Deployments from '../ui/layouts/deployments/Deployments';
import Functions from '../ui/layouts/functions/Functions';
import Models from '../ui/layouts/models/Models';
import Workspaces from '../ui/layouts/workspaces/Workspaces';
import stackComponents from '../ui/layouts/stackComponents/Stacks';
import PipelineDetail from '../ui/layouts/pipelines/PipelineDetail/index';
import StackDetail from '../ui/layouts/stacks/StackDetail/index';
import stackComponentsDetail from '../ui/layouts/stackComponents/StackDetail/index';
import PipelineRunDetail from '../ui/layouts/pipelines/RunDetail';
import StacksRunDetail from '../ui/layouts/stacks/RunDetail';
import RunsRunDetail from '../ui/layouts/runs/RunDetail';
import ComponentRunDetail from '../ui/layouts/stackComponents/RunDetail';
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
    path: routePaths.userEmail(':userId'),
    Component: UserEmail,
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
    path: routePaths.run.pipeline.base(':id', ':pipelineId'),
    Component: PipelineRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.pipeline.statistics(':id', ':pipelineId'),
    Component: PipelineRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.pipeline.results(':id', ':pipelineId'),
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
    path: routePaths.run.stack.statistics(':id', ':stackId'),
    Component: StacksRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.stack.results(':id', ':stackId'),
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
    path: routePaths.run.run.statistics(':runId'),
    Component: RunsRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.run.results(':runId'),
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
    path: routePaths.run.component.base(':id', ':stackId'),
    Component: ComponentRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.component.statistics(':type', ':id', ':stackId'),
    Component: ComponentRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.component.statistics(':type', ':id', ':stackId'),
    Component: ComponentRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.component.results(':id', ':stackId'),
    Component: ComponentRunDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.run.component.tensorboard(':id', ':stackId'),
    Component: ComponentRunDetail,
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
    path: routePaths.stackComponents.base(':type'),
    Component: stackComponents,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stackComponents.configuration(':type', ':id'),
    Component: stackComponentsDetail,
    visibility: {
      authentication: RouteVisibilityAuthentication.authenticatedOnly,
    },
    exact: true,
  },
  {
    path: routePaths.stackComponents.runs(':type', ':id'),
    Component: stackComponentsDetail,
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
