import { components } from '../../appserverSchema';

//Pipelines
export type Pipeline = components['schemas']['PipelineResponse'];

//stacks
export type Stack = components['schemas']['StackResponse'];

// Flavor
export type Flavor = components['schemas']['FlavorResponse'];

//components
export type StackComponent = components['schemas']['ComponentResponse'];

//service connector
export type ServiceConnector = components['schemas']['ServiceConnectorResponse'];

export type ServiceConnectorTypes = components['schemas']['ServiceConnectorTypeModel'];

//secrets
export type Secret = components['schemas']['SecretResponse'];

//runs
export type Run = components['schemas']['PipelineRunResponse'];

// //Repository
export type Repository = components['schemas']['CodeRepositoryResponse'];

// ServerInfo

export type ServerInfo = components['schemas']['ServerModel'];

export type SSOResponse = {
  /** Authorization Url */
  authorization_url?: string;
  /** Access Token */
  access_token?: string;
  /** Token Type */
  token_type?: string;
};
//workspace
export type Workspace = components['schemas']['WorkspaceResponse'];

//user
export type User = components['schemas']['UserResponse'];
export type UpdateUser = components['schemas']['UserUpdate'];

//devices
export type Device = components['schemas']['OAuthDeviceResponse'];
