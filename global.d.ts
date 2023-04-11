declare module 'json2yaml';

type TId = string;

type TToasterTypes = 'success' | 'failure';

type DateString = string;

interface TApiActionsTypes {
  request: string;
  success: string;
  failure: string;
}

interface TRequestActionPayload {
  apiMethod: TApiMethod;
  isAuthenticated: boolean;
  failureActionType?: string;
  successActionType?: string;
  params?: Record<string, unknown>;
  onSuccess?: (res: any) => void;
  onFailure?: (errorText: string) => void;
}

interface TRequestAction {
  type: string;
  payload: TRequestActionPayload;
}

interface TAction {
  type: string;
  payload: any;
}

type TClickEvent = (arg1: React.MouseEvent) => void;

interface TUser {
  id: TId;
  fullName: string;
  name: string;
  email: string;
  organizationId: TId;
  userName: string;
  email_opted_in: any;
  emailOptedIn: any;
  roles: Array<any>;
  created: any;
}

interface THubUser {
  id: TId;
  website: string;
  bio: string;
}

interface TOrganization {
  id: TId;
  name: string;
}

interface TInvite {
  id: TId;
  organizationId: string;
  organizationName: string;
  code: string;
  email: string;
  name: string;
  createdAt: Date;
}

interface TMember {
  id: TId;
  organizationId: string;
  fullName: string;
  email: string;
  name: string;
  created: Date;
  active: boolean;
  activation_token: string;
  user: {
    id: TId;
    organizationId: any;
    fullName: any;
    email: any;
    name: any;
    created: Date;
    active: boolean;
    activation_token: any;
  };
  roles: [
    {
      id: string;
      name: string;
    },
  ];
}

interface TWorkspace {
  id: TId;
  name: string;
  createdAt: Date;
}
interface Workspaces {
  id: TId;
  created: Date;
  updated: Date;
  name: string;
  description: string;
}
interface TPipeline {
  id: TId;
  name: string;
  created: Date;
  creationDate: Date;
  workspaceName: string;
  components: any;
  owner: string;
  pipelineConfig: any;
  userId: TId;
  creationDate: Date;
  isShared: boolean;
  userName: string;
  user: any;
  runs: Array;
  status: Array;
  configuration: object;
  spec?: any;
  version: string;
}
interface TStack {
  id: TId;
  name: string;
  creationDate: Date;
  created: Date;
  workspaceName: string;
  components: any;
  userName: string;
  pipelineConfig: any;
  userId: TId;
  createdAt: Date;
  type?: string;
  flavor?: any;
  configuration?: any;
  workspace?: string;
  user?: any;
  isShared?: Boolean;
}
interface Roles {
  id: TId;
  created: Date;
  updated: Date;
  name: string;
  permissions: Array;
}
type TRunStatus =
  | 'finished'
  | 'In Progress'
  | 'completed'
  | 'running'
  | 'failed'
  | 'cached';

interface TRun {
  pipelineConfiguration?: any;
  id: TId;
  stackComponentId: TId;
  status: TRunStatus;
  kubeflowStartTime: Date;
  kubeflowEndTime: Date;
  pipelineRunType: string;
  datasourceCommitId: TId;
  pipelineId: TId;
  pipeline_id: TId;
  userId: TId;
  stack?: any;
  pipeline?: any;
  duration?: string;
  owner?: any;
  userName?: any;
  user?: any;
  creationDate?: any;
  // status?: string;
  graph?: any;
  created: Date;
  name?: string;
}

interface TBreadcrumb {
  name: string;
  clickable?: boolean;
  to?: string;
}

interface TDatasourceCommit {
  id: TId;
  message: string;
}

interface TabPage {
  text: string;
  Component: React.FC;
  path: string;
  externalPath?: string;
  locked?: boolean;
  lockedClickHandler?: () => void;
}

interface TBilling {
  id: TId;
  trainingCost: string;
  savedCost: string;
  computeCost: string;
  pipelineRunId: TId;
}

interface TOrganizationBilling {
  totalProcessedDatapoints: number;
  costTotal: number;
  processedDatapointsThisMonth: number;
  costThisMonth: number;
}

interface TPaymentMethod {
  id: TId;
  billingDetails: {
    name: string;
    address: {
      city: string;
      country: string;
      line1: string;
      postal_code: string;
    };
  };
  card: {
    exp_month: number;
    exp_year: number;
    last4: number;
  };
}

interface TSubscription {
  id: TId;
  planType: TSubscriptionPlanType;
}

type TSubscriptionPlanType = 'unlimited' | 'explorer';

interface TInvoice {
  id: TId;
  invoicePdf: string;
  total: number;
  status: TInvoiceStatus;
  created: number;
}

type TInvoiceStatus = 'draft' | 'open' | 'paid' | 'uncollectible';

interface TPlugin {
  id: TId;
  name: name;
  author: name;
  // from the plugin's Readme
  description?: string;
  version: name;
  tags: string[];
  logo_url?: string;
  index_url?: string;
  package_name: string;
  created: DateString;
  updated: DateString;
  user: { id: string; username: string };
  // upvotes: string;
  // downloads: string;
  // popularity: string;
}

interface TPluginDetail extends TPlugin {
  plugin_id: TId;
  version_id: string;
  logo_url?: string;
  index_url?: string;
  canonical_url: string;
  release_notes: string | null;
  repository_url: string;
  repository_subdirectory?: string;
  repository_branch?: string;
  repository_commit?: string;
}

interface TPluginVersion {
  id: TId;
  version: string;
  plugin_id: TId;
  author: string;
  status: 'pending' | 'failed' | 'available' | 'yanked';
  repository_url: string;
  repository_subdirectory?: string;
  repository_branch?: string;
  repository_commit?: string;
  canonical_url: string;
  readme_url?: string;
  logo_url?: string;
  index_url?: string;
  release_notes: string | null;
  package_name: string;
  requirements: string[];
  build_logs?: string;
  created: DateString;
  updated: DateString;
}
