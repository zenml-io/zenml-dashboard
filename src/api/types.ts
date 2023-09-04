import { components } from '../../schema';

//Pipelines
export type Pipeline = components['schemas']['PipelineResponseModel'];

//stacks
export type Stack = components['schemas']['StackResponseModel'];

// Flavor
export type Flavor = components['schemas']['FlavorResponseModel'];

//components
export type StackComponent = components['schemas']['ComponentResponseModel'];

//service connector
export type ServiceConnector = components['schemas']['ServiceConnectorResponseModel'];

export type ServiceConnectorTypes = components['schemas']['ServiceConnectorTypeModel'];

//secrets
export type Secret = components['schemas']['SecretResponseModel'];

//runs
export type Run = components['schemas']['PipelineRunResponseModel'];

// //Repository
export type Repository = components['schemas']['CodeRepositoryResponseModel'];

//workspace
export type Workspace = components['schemas']['WorkspaceResponseModel'];

//user
export type User = components['schemas']['UserResponseModel'];
export type UpdateUser = components['schemas']['UserUpdateModel'];
