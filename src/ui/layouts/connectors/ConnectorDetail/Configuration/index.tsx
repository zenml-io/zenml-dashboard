import React, { useState } from 'react';

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  FlexBox,
  Box,
  // FormTextField,
  // FormDropdownField,
  // PrimaryButton,
  FullWidthSpinner,
  PrimaryButton,
  // H4,
  // GhostButton,
  // icons,
  // Row,
  // FullWidthSpinner,
  // Container,
  // EditField,
  // Paragraph,
} from '../../../../components';
// import SelectorDisabled from '../../Selector/SelectorDisabled';
// import { iconColors, iconSizes } from '../../../../../constants';

// import { useDispatch } from '../../../../hooks';
// import { showToasterAction } from '../../../../../redux/actions';
// import { toasterTypes } from '../../../../../constants';

// import { translate } from '../translate';

import styles from './index.module.scss';
// import { useService } from './useService';
// import { routePaths } from '../../../../../routes/routePaths';
// import { useHistory, useSelector } from '../../../../hooks';
// import { workspaceSelectors } from '../../../../../redux/selectors';
// import { StackBox } from '../../../common/StackBox';
// import { SidePopup } from '../../RegisterSecret/ListForAll/SidePopup';
// import { NonEditableConfig } from '../../../NonEditableConfig';
// import {
// useDispatch,
// useHistory,
// useLocation,
//   useSelector,
// } from '../../../../hooks';
// import {
// sessionSelectors,
// userSelectors,
//   workspaceSelectors,
// } from '../../../../../redux/selectors';
// import {
//   showToasterAction,
//   stackComponentsActions,
//   secretsActions,
// } from '../../../../../redux/actions';
// import { toasterTypes } from '../../../../../constants';
// import axios from 'axios';
// import { routePaths } from '../../../../../routes/routePaths';
// import { ToggleField } from '../../../common/FormElement';
// import { SidePopup } from '../../../common/SidePopup';
import ServicesSelector from '../../ServicesSelectorComponent';

export const Configuration: React.FC<{
  connectorId: TId;
  tiles?: any;
  fetching?: boolean;
}> = ({ connectorId, fetching }) => {
  // const dispatch = useDispatch();
  // const { connector } = useService({ connectorId });
  // const history = useHistory();

  // const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const [name, setName] = useState('');
  const [selectMethods, setSelectMethods] = useState<any>([]);

  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  const data = [
    {
      name: 'Generic AWS resource',
      resource_type: 'aws-generic',
      description:
        '\nMulti-purpose AWS resource type. It allows consumers to use the connector to\nconnect to any AWS service. When used by connector consumers, they are provided\na generic boto3 session instance pre-configured with AWS credentials. This\nsession can then be used to create boto3 clients for any particular AWS service.\n\nThe resource name represents the AWS region that the connector is authorized to\naccess.\n',
      auth_methods: [
        'implicit',
        'secret-key',
        'sts-token',
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
  ];

  return (
    <>
      {/* <Box marginTop="md">
        <SelectorDisabled inputFields={secret.values} width="30vw" />
      </Box> */}
      <ServicesSelector
        name={name}
        setName={setName}
        selectMethods={selectMethods}
        setSelectMethods={setSelectMethods}
        data={data}
      />

      <FlexBox
        style={{
          position: 'fixed',
          right: '0',
          bottom: '0',
          marginRight: '45px',
        }}
      >
        <Box marginBottom="lg">
          <PrimaryButton
            // onClick={() =>
            //   history.push(
            //     routePaths.connectors.updateConnector(
            //       connector.id,
            //       selectedWorkspace,
            //     ),
            //   )
            // }
            className={styles.updateButton}
          >
            Update Secret
          </PrimaryButton>
        </Box>
      </FlexBox>
    </>
    // <FlexBox.Column marginLeft="xl">
    //   <Box marginTop="lg" style={{ width: '30vw' }}>
    //     <FormTextField
    //       label={'Secret name'}
    //       labelColor="rgba(66, 66, 64, 0.5)"
    //       placeholder={'Ex.John Doe'}
    //       value={connector?.name}
    //       disabled
    //       onChange={() => {}}
    //       style={{
    //         background: 'rgb(233, 234, 236)',
    //         border: 'none',
    //         borderRadius: '4px',
    //       }}
    //     />
    //   </Box>
    //   <Box marginTop="lg" style={{ width: '30vw' }}>
    //     <FormDropdownField
    //       label={'Scope'}
    //       labelColor="rgba(66, 66, 64, 0.5)"
    //       placeholder={'Choose a scope'}
    //       value={connector?.scope}
    //       onChange={() => {}}
    //       disabled
    //       options={[] as any}
    //       style={{
    //         paddingLeft: '10px',
    //         background: 'rgba(233, 234, 236, 0.5)',
    //         color: '#a1a4ab',
    //         border: 'none',
    //         borderRadius: '4px',
    //       }}
    //     />
    //   </Box>

    //   {/* <Box marginTop="md">
    //     <SelectorDisabled inputFields={connector.values} width="30vw" />
    //   </Box> */}

    //   <FlexBox
    //     style={{
    //       position: 'fixed',
    //       right: '0',
    //       bottom: '0',
    //       marginRight: '45px',
    //     }}
    //   >
    //     <Box marginBottom="lg">
    //       {/* <PrimaryButton
    //         onClick={() =>
    //           history.push(
    //             routePaths.connector.updateSecret(connector.id, selectedWorkspace),
    //           )
    //         }
    //         className={styles.updateButton}
    //       >
    //         Update Secret
    //       </PrimaryButton> */}
    //     </Box>
    //   </FlexBox>
    // </FlexBox.Column>
  );
};
