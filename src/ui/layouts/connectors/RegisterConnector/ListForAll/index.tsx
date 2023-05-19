import React, { useState } from 'react';

// import { CollapseTable } from '../../../common/CollapseTable';
import { useSelector } from '../../../../hooks';
import { useHistory } from 'react-router-dom';
import { routePaths } from '../../../../../routes/routePaths';

// import { useService } from './useService';

// import { camelCaseToParagraph } from '../../../../../utils';
// import { DEFAULT_WORKSPACE_NAME } from '../../../../../constants';
import {
  workspaceSelectors,
  // stackComponentSelectors,
  flavorSelectors,
} from '../../../../../redux/selectors';
import {
  // Box,
  FlexBox,
  // FullWidthSpinner,
  // Paragraph,
  SearchInputField,
  // Row,
} from '../../../../components';
// import { PaginationWithPageSize } from '../../../common/PaginationWithPageSize';
// import { FlavourBox } from '../../../common/FlavourBox';
// import { CustomConnectorBox } from '../../../common/CustomConnectorBox';
import { callActionForConnectorsTypesForPagination } from '../useService';
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
    dispatchConnectorsTypesData,
  } = callActionForConnectorsTypesForPagination();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const flavorsPaginated = useSelector(flavorSelectors.myFlavorsPaginated);
  const [text, setText] = useState('');
  // eslint-disable-next-line
  const [selectedFlavor, setSelectedFlavor] = useState() as any;
  // const [selectedComponentId, setSelectedComponentId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  // const { fetching, allConnectorsTypes } = useService();

  function handleValueFieldChangeOnSearch(value: string) {
    dispatchConnectorsTypesData(1, flavorsPaginated.size, type, value);
  }
  // const onSelectFlavor = (flavor: any) => {
  //   setSelectedFlavor(flavor);
  //   setShowModal(true);
  // };
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

  // const textStyle = {
  //   color: 'rgba(66, 66, 64, 0.5)',
  //   fontSize: '18px',
  //   lineHeight: '22px',
  // };
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
        {/* {fetching ? (
          <FullWidthSpinner color="black" size="md" />
        ) : (
          data?.length && (
            <>
              <FlexBox>
                <Row>
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
                </Row>
              </FlexBox>
              <div style={{ marginTop: '-10px' }}>
                <PaginationWithPageSize
                  flavors={allConnectorsTypes}
                  type={type}
                  paginated={flavorsPaginated}
                  pagination={allConnectorsTypes?.length ? true : false}
                ></PaginationWithPageSize>
              </div>
            </>
          )
        )} */}
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

// const data = [
//   {
//     name: 'Kubernetes Service Connector',
//     connector_type: 'kubernetes',
//     description:
//       '\nThis ZenML Kubernetes service connector facilitates authenticating and\nconnecting to a Kubernetes cluster.\n\nThe connector can be used to access to any generic Kubernetes cluster by\nproviding pre-authenticated Kubernetes python clients and also\nallows configuration of local Kubernetes clients.\n',
//     resource_types: [
//       {
//         name: 'Kubernetes cluster',
//         resource_type: 'kubernetes-cluster',
//         description:
//           '\nKubernetes cluster resource. When used by connector consumers, they are provided\na Kubernetes client pre-configured with credentials required to access a\nKubernetes cluster.\n',
//         auth_methods: ['password', 'token'],
//         supports_instances: false,
//         logo_url:
//           'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/orchestrator/kubernetes.png',
//         emoji: ':cyclone:',
//       },
//     ],
//     supports_auto_configuration: true,
//     logo_url:
//       'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/orchestrator/kubernetes.png',
//     emoji: ':cyclone:',
//     docs_url: null,
//     sdk_docs_url: null,
//     local: true,
//     remote: false,
//   },
//   {
//     name: 'Docker Service Connector',
//     connector_type: 'docker',
//     description:
//       '\nThe ZenML Docker Service Connector allows authenticating with a Docker or OCI\ncontainer registry and managing Docker clients for the registry. \n\nThe connector provides pre-authenticated python-docker clients.\n',
//     resource_types: [
//       {
//         name: 'Docker/OCI container registry',
//         resource_type: 'docker-registry',
//         description:
//           '\nAllows users to access a Docker or OCI compatible container registry as a\nresource. When used by connector consumers, they are provided a\npre-authenticated python-docker client instance.\n\nThe resource name identifies a Docker/OCI registry using one of the following\nformats (the repository name is optional).\n            \n- DockerHub: docker.io or [https://]index.docker.io/v1/[/<repository-name>]\n- generic OCI registry URI: http[s]://host[:port][/<repository-name>]\n',
//         auth_methods: ['password'],
//         supports_instances: false,
//         logo_url:
//           'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/container_registry/docker.png',
//         emoji: ':whale:',
//       },
//     ],
//     supports_auto_configuration: false,
//     logo_url:
//       'https://public-flavor-logos.s3.eu-central-1.amazonaws.com/container_registry/docker.png',
//     emoji: ':whale:',
//     docs_url: null,
//     sdk_docs_url: null,
//     local: true,
//     remote: false,
//   },
// ];
