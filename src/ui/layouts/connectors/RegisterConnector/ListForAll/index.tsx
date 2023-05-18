import React, { useState } from 'react';

// import { CollapseTable } from '../../../common/CollapseTable';
import { useSelector } from '../../../../hooks';
import { useHistory } from 'react-router-dom';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';

// import { camelCaseToParagraph } from '../../../../../utils';
// import { DEFAULT_WORKSPACE_NAME } from '../../../../../constants';
import {
  workspaceSelectors,
  // stackComponentSelectors,
  flavorSelectors,
} from '../../../../../redux/selectors';
import {
  Box,
  FlexBox,
  FullWidthSpinner,
  Paragraph,
  SearchInputField,
  Row,
} from '../../../../components';
import { PaginationWithPageSize } from '../../../common/PaginationWithPageSize';
// import { FlavourBox } from '../../../common/FlavourBox';
import { CustomConnectorBox } from '../../../common/CustomConnectorBox';
import { callActionForConnectorsListForPagination } from '../useService';
import { SidePopup } from '../../../common/SidePopup';
// import { routePaths } from '../../../../../routes/routePaths';

interface Props {
  type: string;
  // filter: any;
  // pagination?: boolean;
  // id?: string;
  // isExpended?: boolean;
}

export const ListForAll: React.FC<Props> = ({ type }: Props) => {
  const {
    dispatchConnectorsListData,
  } = callActionForConnectorsListForPagination();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const flavorsPaginated = useSelector(flavorSelectors.myFlavorsPaginated);
  const [text, setText] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState() as any;
  const [selectedComponentId, setSelectedComponentId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const { fetching, allConnectorsList } = useService();

  function handleValueFieldChangeOnSearch(value: string) {
    dispatchConnectorsListData(1, flavorsPaginated.size, type, value);
  }
  const onSelectFlavor = (flavor: any) => {
    setSelectedFlavor(flavor);
    setShowModal(true);
  };
  const handleSelectedFlavor = (selectedFlavor: any) => {
    setShowModal(false);
    history.push(
      routePaths.stackComponents.configureComponent(
        type,
        selectedWorkspace,
        selectedFlavor?.id,
      ),
    );
  };

  const textStyle = {
    color: 'rgba(66, 66, 64, 0.5)',
    fontSize: '18px',
    lineHeight: '22px',
  };
  const routeExsiting = () => {
    setShowModal(false);
    history.push(routePaths.stackComponents.base(type, selectedWorkspace), {
      state: selectedFlavor.name,
    });
  };

  return (
    <>
      <FlexBox.Column fullWidth>
        <SearchInputField
          fromRegisterComponent={true}
          placeholder={'Search'}
          value={text}
          // disabled={applyFilter || showInBar}
          onChange={(value: string) => {
            setText(value);
            handleValueFieldChangeOnSearch(`${'contains:' + value}`);
          }}
        />
        {fetching ? (
          <FullWidthSpinner color="black" size="md" />
        ) : (
          allConnectorsList?.length && (
            <>
              <FlexBox>
                {/* <Row>
                {data?.map((item: any, index: number) => {
                  return (
                    <Row key={index} style={{ marginLeft: '15px' }}>
                      <Box marginVertical={'sm'} marginHorizontal={'md'}>
                        <CustomConnectorBox
                          connectorDesc={item.description}
                          connectorName={item.name}
                          logoUrl={item.logo_url}
                          onSelectFlavor={() => onSelectFlavor(item)}
                          resourceTypes={item?.resource_types}
                        />
                      </Box>
                    </Row>
                  );
                })}
              </Row> */}
              </FlexBox>
              <div style={{ marginTop: '-10px' }}>
                <PaginationWithPageSize
                  flavors={allConnectorsList}
                  type={type}
                  paginated={flavorsPaginated}
                  pagination={allConnectorsList?.length ? true : false}
                ></PaginationWithPageSize>
              </div>
            </>
          )
        )}
      </FlexBox.Column>
      {showModal && (
        <SidePopup
          onSeeExisting={() => routeExsiting()}
          onSelectFlavor={() => handleSelectedFlavor(selectedFlavor)}
          flavor={selectedFlavor}
          onClose={() => setShowModal(false)}
        ></SidePopup>
      )}
    </>
  );
};

const data = [
  {
    name: 'Kubernetes Service Connector',
    connector_type: 'kubernetes',
    description:
      '\nThis ZenML Kubernetes service connector facilitates authenticating and\nconnecting to a Kubernetes cluster.\n\nThe connector can be used to access to any generic Kubernetes cluster by\nproviding pre-authenticated Kubernetes python clients and also\nallows configuration of local Kubernetes clients.\n',
    resource_types: [
      {
        name: 'Kubernetes cluster',
        resource_type: 'kubernetes-cluster',
        description:
          '\nKubernetes cluster resource. When used by connector consumers, they are provided\na Kubernetes client pre-configured with credentials required to access a\nKubernetes cluster.\n',
        auth_methods: ['password', 'token'],
        supports_instances: false,
        logo_url:
          'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/orchestrator/kubernetes.png',
        emoji: ':cyclone:',
      },
    ],
    supports_auto_configuration: true,
    logo_url:
      'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/orchestrator/kubernetes.png',
    emoji: ':cyclone:',
    docs_url: null,
    sdk_docs_url: null,
    local: true,
    remote: false,
  },
  {
    name: 'Docker Service Connector',
    connector_type: 'docker',
    description:
      '\nThe ZenML Docker Service Connector allows authenticating with a Docker or OCI\ncontainer registry and managing Docker clients for the registry. \n\nThe connector provides pre-authenticated python-docker clients.\n',
    resource_types: [
      {
        name: 'Docker/OCI container registry',
        resource_type: 'docker-registry',
        description:
          '\nAllows users to access a Docker or OCI compatible container registry as a\nresource. When used by connector consumers, they are provided a\npre-authenticated python-docker client instance.\n\nThe resource name identifies a Docker/OCI registry using one of the following\nformats (the repository name is optional).\n            \n- DockerHub: docker.io or [https://]index.docker.io/v1/[/<repository-name>]\n- generic OCI registry URI: http[s]://host[:port][/<repository-name>]\n',
        auth_methods: ['password'],
        supports_instances: false,
        logo_url:
          'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/container_registry/docker.png',
        emoji: ':whale:',
      },
    ],
    supports_auto_configuration: false,
    logo_url:
      'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/container_registry/docker.png',
    emoji: ':whale:',
    docs_url: null,
    sdk_docs_url: null,
    local: true,
    remote: false,
  },
  {
    name: 'AWS Service Connector',
    connector_type: 'aws',
    description:
      '\nThis ZenML AWS service connector facilitates connecting to, authenticating to\nand accessing managed AWS services, such as S3 buckets, ECR repositories and EKS\nclusters. Explicit long-lived AWS credentials are supported, as well as\ntemporary STS security tokens. The connector also supports auto-configuration\nby discovering and using credentials configured on a local environment.\n\nThe connector can be used to access to any generic AWS service, such as S3, ECR,\nEKS, EC2, etc. by providing pre-authenticated boto3 sessions for these services.\nIn addition to authenticating to AWS services, the connector is able to manage\nspecialized authentication for Docker and Kubernetes Python clients and also\nallows configuration of local Docker and Kubernetes clients.\n',
    resource_types: [
      {
        name: 'Generic AWS resource',
        resource_type: 'aws-generic',
        description:
          '\nMulti-purpose AWS resource type. It allows consumers to use the connector to\nconnect to any AWS service. When used by connector consumers, they are provided\na generic boto3 session instance pre-configured with AWS credentials. This\nsession can then be used to create boto3 clients for any particular AWS service.\n\nThe resource name represents the AWS region that the connector is authorized to\naccess.\n',
        auth_methods: [
          'implicit',
          'secret-key',
          'sts-token',
          'iam-role',
          'session-token',
          'federation-token',
        ],
        supports_instances: false,
        logo_url:
          'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/container_registry/aws.png',
        emoji: ':large_orange_diamond:',
      },
      {
        name: 'AWS S3 bucket',
        resource_type: 's3-bucket',
        description:
          '\nAllows users to connect to S3 buckets. When used by connector consumers, they\nare provided a pre-configured boto3 S3 client instance.\n\nThe configured credentials must have at least the following S3 permissions:\n\n- s3:ListBucket\n- s3:GetObject\n- s3:PutObject\n- s3:DeleteObject\n- s3:ListAllMyBuckets\n\nIf set, the resource name must identify an S3 bucket using one of the following\nformats:\n\n- S3 bucket URI: s3://<bucket-name>\n- S3 bucket ARN: arn:aws:s3:::<bucket-name>\n- S3 bucket name: <bucket-name>\n',
        auth_methods: [
          'implicit',
          'secret-key',
          'sts-token',
          'iam-role',
          'session-token',
          'federation-token',
        ],
        supports_instances: true,
        logo_url:
          'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/container_registry/aws.png',
        emoji: ':package:',
      },
      {
        name: 'AWS EKS Kubernetes cluster',
        resource_type: 'kubernetes-cluster',
        description:
          "\nAllows users to access an EKS registry as a standard Kubernetes cluster\nresource. When used by connector consumers, they are provided a\npre-authenticated python-kubernetes client instance.\n\nThe configured credentials must have at least the following EKS permissions:\n\n- eks:ListClusters\n- eks:DescribeCluster\n\nIn addition to the above permissions, if the credentials are not associated\nwith the same IAM user or role that created the EKS cluster, the IAM principal\nmust be manually added to the EKS cluster's `aws-auth` ConfigMap, otherwise the\nKubernetes client will not be allowed to access the cluster's resources. This\nmakes it more challenging to use the AWS Implicit and AWS Federation Token\nauthentication method for this resource. For more information, see:\nhttps://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html\n\nIf set, the resource name must identify an EKS cluster using one of the\nfollowing formats:\n\n- EKS cluster name: <cluster-name>\n- EKS cluster ARN: arn:aws:eks:<region>:<account-id>:cluster/<cluster-name>\n\nEKS cluster names are region scoped. The connector can only be used to access\nEKS clusters in the AWS region that it is configured to use.\n",
        auth_methods: [
          'implicit',
          'secret-key',
          'sts-token',
          'iam-role',
          'session-token',
          'federation-token',
        ],
        supports_instances: true,
        logo_url:
          'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/orchestrator/kubernetes.png',
        emoji: ':cyclone:',
      },
      {
        name: 'AWS ECR container registry',
        resource_type: 'docker-registry',
        description:
          '\nAllows users to access one or more ECR repositories as a standard Docker\nregistry resource. When used by connector consumers, they are provided a\npre-authenticated python-docker client instance.\n\nThe configured credentials must have at least the following ECR permissions for\none or more ECR repositories:\n\n- ecr:DescribeRegistry\n- ecr:DescribeRepositories\n- ecr:ListRepositories\n- ecr:BatchGetImage\n- ecr:DescribeImages\n- ecr:BatchCheckLayerAvailability\n- ecr:GetDownloadUrlForLayer\n- ecr:InitiateLayerUpload\n- ecr:UploadLayerPart\n- ecr:CompleteLayerUpload\n- ecr:PutImage\n- ecr:GetAuthorizationToken\n\nThis resource type is not scoped to a single ECR repository. Instead,\na connector configured with this resource type will grant access to all the\nECR repositories that the credentials are allowed to access under the configured\nAWS region (i.e. all repositories under the Docker registry URL\n`<account-id>.dkr.ecr.<region>.amazonaws.com`).\n\nThe resource name associated with this resource type uniquely identifies an ECR\nregistry using one of the following formats (the repository name is ignored,\nonly the registry URL/ARN is used):\n            \n- ECR repository URI: https://<account-id>.dkr.ecr.<region>.amazonaws.com[/<repository-name>]\n- ECR repository ARN: arn:aws:ecr:<region>:<account-id>:repository[/<repository-name>]\n\nECR repository names are region scoped. The connector can only be used to access\nECR repositories in the AWS region that it is configured to use.\n',
        auth_methods: [
          'implicit',
          'secret-key',
          'sts-token',
          'iam-role',
          'session-token',
          'federation-token',
        ],
        supports_instances: false,
        logo_url:
          'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/container_registry/docker.png',
        emoji: ':whale:',
      },
    ],
    supports_auto_configuration: true,
    logo_url:
      'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/container_registry/aws.png',
    emoji: ':large_orange_diamond:',
    docs_url: null,
    sdk_docs_url: null,
    local: true,
    remote: false,
  },
  {
    name: 'GCP Service Connector',
    connector_type: 'gcp',
    description:
      '\nThis ZenML GCP service connector facilitates connecting to, authenticating to\nand accessing managed GCP services, such as GCS buckets, GCR repositories and\nGKE clusters. GCP user accounts, service accounts and a few other authentication\nmethods and credentials are supported, from which temporary OAuth 2.0 security\ntokens are automatically generated and distributed to clients. The connector\nalso supports auto-configuration by discovering and using credentials configured\non a local environment.\n\nThe connector can be used to access to any generic GCP service, such as GCS,\nGCR, GKE, etc. by providing generic GCP OAuth 2.0 credentials for these\nservices. In addition to authenticating to GCP services, the connector is able\nto manage specialized authentication for Docker and Kubernetes Python clients\nand also allows configuration of local Docker and Kubernetes clients.\n',
    resource_types: [
      {
        name: 'Generic GCP resource',
        resource_type: 'gcp-generic',
        description:
          '\nMulti-purpose GCP resource type. It allows consumers to use the connector to\nconnect to any GCP service. When used by connector consumers, they are provided\ngeneric GCP OAuth 2.0 tokens which can be used to create google cloud clients\nfor any particular GCP service.\n\nThe resource name represents the GCP project that the connector is authorized to\naccess.\n',
        auth_methods: [
          'implicit',
          'user-account',
          'service-account',
          'oauth2-token',
          'impersonation',
        ],
        supports_instances: false,
        logo_url:
          'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/artifact_store/gcp.png',
        emoji: ':blue_circle:',
      },
      {
        name: 'GCP GCS bucket',
        resource_type: 'gcs-bucket',
        description:
          '\nAllows users to connect to GCS buckets. When used by connector consumers, they\nare provided a pre-configured GCS client instance.\n\nThe configured credentials must have at least the following GCP permissions\nassociated with the GCS buckets that it can access:\n\n- storage.buckets.list\n- storage.buckets.get\n- storage.objects.create\t\n- storage.objects.delete\t\n- storage.objects.get\t\n- storage.objects.list\t\n- storage.objects.update\n\nThe GCP Storage Object Admin role includes all of the required permissions, but\nit also includes additional permissions that are not required by the connector.\n\nIf set, the resource name must identify a GCS bucket using one of the following\nformats:\n\n- GCS bucket URI: gs://<bucket-name>\n- GCS bucket name: <bucket-name>\n',
        auth_methods: [
          'implicit',
          'user-account',
          'service-account',
          'oauth2-token',
          'impersonation',
        ],
        supports_instances: true,
        logo_url:
          'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/artifact_store/gcp.png',
        emoji: ':package:',
      },
      {
        name: 'GCP GKE Kubernetes cluster',
        resource_type: 'kubernetes-cluster',
        description:
          '\nAllows users to access a GKE registry as a standard Kubernetes cluster\nresource. When used by connector consumers, they are provided a\npre-authenticated python-kubernetes client instance.\n\nThe configured credentials must have at least the following GCP permissions\nassociated with the GKE clusters that it can access:\n\n- container.clusters.list\n- container.clusters.get\n\nIn addition to the above permissions, the credentials should include permissions\nto connect to and use the GKE cluster (i.e. some or all permissions in the\nKubernetes Engine Developer role).\n\nIf set, the resource name must identify an GKE cluster using one of the\nfollowing formats:\n\n- GKE cluster name: <cluster-name>\n\nGKE cluster names are project scoped. The connector can only be used to access\nGKE clusters in the GCP project that it is configured to use.\n',
        auth_methods: [
          'implicit',
          'user-account',
          'service-account',
          'oauth2-token',
          'impersonation',
        ],
        supports_instances: true,
        logo_url:
          'https://public-flavor-logos.gcs.eu-central-1.amazongcp.com/orchestrator/kubernetes.png',
        emoji: ':cyclone:',
      },
      {
        name: 'GCP GCR container registry',
        resource_type: 'docker-registry',
        description:
          '\nAllows users to access one or more GCR repositories as a standard Docker\nregistry resource. When used by connector consumers, they are provided a\npre-authenticated python-docker client instance.\n\nThe configured credentials must have at least the following GCR permissions:\n\n- storage.buckets.get\n- storage.multipartUploads.abort\n- storage.multipartUploads.create\n- storage.multipartUploads.list\n- storage.multipartUploads.listParts\n- storage.objects.create\n- storage.objects.delete\n- storage.objects.list\n\nThe Storage Legacy Bucket Writer role includes all of the above permissions\nwhile at the same time restricting access to only the GCR buckets.\n\nThe resource name associated with this resource type identifies the GCR\ncontainer registry associated with the GCP project:\n\n- GCR repository URI: [https://]gcr.io/<project-id>[/<repository-name>]\n',
        auth_methods: [
          'implicit',
          'user-account',
          'service-account',
          'oauth2-token',
          'impersonation',
        ],
        supports_instances: false,
        logo_url:
          'https://public-flavor-logos.gcs.eu-central-1.amazongcp.com/container_registry/docker.png',
        emoji: ':whale:',
      },
    ],
    supports_auto_configuration: true,
    logo_url:
      'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/artifact_store/gcp.png',
    emoji: ':blue_circle:',
    docs_url: null,
    sdk_docs_url: null,
    local: true,
    remote: false,
  },
];
