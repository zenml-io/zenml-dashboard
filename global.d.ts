declare module 'json2yaml';

type TId = string;

type TToasterTypes = 'success' | 'failure';

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
}

interface TWorkspace {
  id: TId;
  name: string;
  createdAt: Date;
}

interface TPipeline {
  id: TId;
  name: string;
  created: Date;
  creationDate: Date;
  projectName: string;
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
}
interface TStack {
  id: TId;
  name: string;
  creationDate: Date;
  created: Date;
  projectName: string;
  components: any;
  userName: string;
  pipelineConfig: any;
  userId: TId;
  createdAt: Date;
  type?: string;
  flavor?: string;
  configuration?: any;
  project?: string;
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
