import React from 'react';

// import { CollapseTable } from '../../../common/CollapseTable';
// import { useSelector } from '../../../../hooks';
// import { useHistory } from 'react-router-dom';
// import { routePaths } from '../../../../../routes/routePaths';

// import { useService } from './useService';

// import { camelCaseToParagraph } from '../../../../../utils';
// import { DEFAULT_WORKSPACE_NAME } from '../../../../../constants';
// import {
//   workspaceSelectors,
//   // stackComponentSelectors,
//   flavorSelectors,
// } from '../../../../../redux/selectors';
import {
  Box,
  FlexBox,
  // Paragraph,
  // SearchInputField,
  // Row,
  H2,
  FormTextField,
  H3,
} from '../../../../components';
import { ToggleField } from '../../../common/FormElement';
// import { PaginationWithPageSize } from '../../../common/PaginationWithPageSize';
import { StackBox } from '../../../common/StackBox';
import { CustomStackBox } from '../../../common/CustomStackBox';
import logo from '../../../../assets/logo.svg'
// import { callActionForFlavorsForPagination } from '../useService';
// import { SidePopup } from '../../../common/SidePopup';

interface Props {
  // type: string;
  // filter: any;
  // pagination?: boolean;
  // id?: string;
  // isExpended?: boolean;
}

export const ListForAll: React.FC<Props> = () => {
  // const { dispatchFlavorsData } = callActionForFlavorsForPagination();
  // const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // const flavorsPaginated = useSelector(flavorSelectors.myFlavorsPaginated);
  // const [text, setText] = useState('');
  // const [selectedFlavor, setSelectedFlavor] = useState() as any;
  // const [selectedComponentId, setSelectedComponentId] = useState('');
  // const [showModal, setShowModal] = useState(false);
  // const history = useHistory();
  // const { fetching, allFlavors } = useService();

  // function handleValueFieldChangeOnSearch(value: string) {
  //   dispatchFlavorsData(1, flavorsPaginated.size, type, value);
  // }
  // const onSelectFlavor = (flavor: any) => {
  //   setSelectedFlavor(flavor);
  //   setShowModal(true);
  // };
  // const handleSelectedFlavor = (selectedFlavor: any) => {
  //   setShowModal(false);
  //   history.push(
  //     routePaths.stackComponents.configureComponent(
  //       type,
  //       selectedWorkspace,
  //       selectedFlavor?.id,
  //     ),
  //   );
  // };

  const helperTextStyle = {
    fontSize: '16px', 
    color: '#A8A8A8', 
    marginLeft: '10px',
    marginTop: '-3px'
  };
  
  return (
    <Box style={{ width: '100%' }}>
      <Box>
        <H2 style={{ fontWeight: 'bolder' }} >Register a Stack</H2>
      </Box>
    
      <Box marginTop='lg'>
        <FlexBox.Row>
          <Box style={{ width: '30%' }}>
            <FormTextField
                onChange={(e: any) => {}}
                placeholder="Stack Name"
                label={'Enter Stack Name'}
                value=""
              />
          </Box>
          <Box marginLeft='xxxl' marginTop='md' style={{ width: '30%' }}>
              <ToggleField
                label={'Share Stack with public'}
                onHandleChange={(key: any, value: any) => {}}
              />
          </Box>
        </FlexBox.Row>
      </Box>
    
    <Box marginTop='md' style={{ overflowX: 'auto' }}>
      <FlexBox.Row alignItems='center'>
        <H3 style={{ fontWeight: 'bold' }}>Orchestrator</H3><span style={helperTextStyle}>&#40;8 Components&#41;</span>
      </FlexBox.Row>
      <FlexBox.Row>
        <Box style={{ width: '171px' }} >
          <StackBox stackName='Create' stackDesc='Create a stack' />
        </Box>
        {Array(8).fill(null)?.map(() => 
          <Box marginLeft='md'>
            <CustomStackBox image={logo} stackName='Sample' stackDesc='example text' />
          </Box>
        )}
      </FlexBox.Row>
    </Box>

    <Box marginTop='lg' style={{ overflowX: 'auto' }}>
      <FlexBox.Row alignItems='center'>
        <H3 style={{ fontWeight: 'bold' }}>Artifact Store</H3><span style={helperTextStyle}>&#40;5 Components&#41;</span>
      </FlexBox.Row>
      <FlexBox.Row>
        <Box style={{ width: '171px' }} >
          <StackBox stackName='Create' stackDesc='Create a stack' />
        </Box>
        {Array(5).fill(null)?.map(() => 
          <Box marginLeft='md'>
            <CustomStackBox image={logo} stackName='Sample' stackDesc='example text' />
          </Box>
        )}
      </FlexBox.Row>
    </Box>

    <Box marginTop='lg' style={{ overflowX: 'auto' }}>
      <FlexBox.Row alignItems='center'>
        <H3 style={{ fontWeight: 'bold' }}>Secret Manager</H3><span style={helperTextStyle}>&#40;7 Components&#41;</span>
      </FlexBox.Row>
      <FlexBox.Row>
        <Box style={{ width: '171px' }} >
          <StackBox stackName='Create' stackDesc='Create a stack' />
        </Box>
        {Array(7).fill(null)?.map(() => 
          <Box marginLeft='md'>
            <CustomStackBox image={logo} stackName='Sample' stackDesc='example text' />
          </Box>
        )}
      </FlexBox.Row>
    </Box>

  
  </Box>
  );
};
