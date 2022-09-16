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
  onSuccess?: () => void;
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
  email: string;
  organizationId: TId;
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
  createdAt: Date;
}

interface TMember {
  id: TId;
  organizationId: string;
  fullName: string;
  email: string;
  created_at: Date;
  active: boolean;
  activation_token: string
}

interface TWorkspace {
  id: TId;
  name: string;
  createdAt: Date;
}

interface TPipeline {
  id: TId;
  name: string;
  createdAt: Date;
  workspaceId: TId;
  pipelineConfig: any;
  userId: TId;
}

type TRunStatus = 'Succeeded' | 'Running' | 'Failed';

interface TRun {
  id: TId;
  status: TRunStatus;
  kubeflowStartTime: Date;
  kubeflowEndTime: Date;
  pipelineRunType: string;
  datasourceCommitId: TId;
  workspaceId: TId;
  pipelineId: TId;
  userId: TId;
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
