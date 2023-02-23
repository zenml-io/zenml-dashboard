import React, { useState } from 'react';

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


  const HelperText = ({componentLength}: any) => (
    <span style={{
      fontSize: '16px', 
      color: '#A8A8A8', 
      marginLeft: '10px',
      marginTop: '-3px'
    }}>
    &#40;{componentLength} Components&#41;</span>
  )

  const [selectedStack, setSelectedStack] = useState<any>([])
  const [selectedStackBox, setSelectedStackBox] = useState<any>()


  const data = [
    { image:logo, stackName:'Sample', stackDesc: 'example text'},
    { image:logo, stackName:'Sample', stackDesc: 'example text'},
    { image:logo, stackName:'Sample', stackDesc: 'example text'},
    { image:logo, stackName:'Sample', stackDesc: 'example text'},
    { image:logo, stackName:'Sample', stackDesc: 'example text'},
    { image:logo, stackName:'Sample', stackDesc: 'example text'},
    { image:logo, stackName:'Sample', stackDesc: 'example text'},
    { image:logo, stackName:'Sample', stackDesc: 'example text'}
  ]

  return (
    <Box style={{ width: '100%' }}>
      <Box>
        <H2 style={{ fontWeight: 'bolder'}} >Register a Stack</H2>
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

      {selectedStack?.length >= 0 && 
        <FlexBox.Row marginTop='md'>
          {selectedStack?.map((e: any) => (
              <Box onClick={() => setSelectedStackBox(e.stackName)} marginLeft='sm' style={{ height: '60px', width: '60px', backgroundColor: '#fff', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', cursor: 'pointer', border: selectedStackBox === e.stackName ? '2px solid #431E93':  '2px solid #fff', borderRadius: '6px'}} >
                <img src={e.image} alt={e.stackName} style={{ height: '100%', width: '100%', padding: '20px 3px' }} />
              </Box>
          ))}
        </FlexBox.Row>
       } 

    <Box marginTop='md' style={{ overflowX: 'auto' }}>
      <FlexBox.Row alignItems='center'>
        <H3 style={{ fontWeight: 'bold' }}>Orchestrator</H3><HelperText componentLength={8} />
      </FlexBox.Row>
      <FlexBox.Row>
        <Box style={{ width: '171px' }} >
          <StackBox stackName='Create' stackDesc='Create a stack' />
        </Box>
        {data?.map((e) => 
          <Box marginLeft='md'>
            <CustomStackBox 
              image={e.image} 
              stackName={e.stackName} 
              stackDesc={e.stackDesc} 
              value={false} 
              onCheck={() => setSelectedStack([...selectedStack, e])} 
            />
          </Box>
        )}
      </FlexBox.Row>
    </Box>

    <Box marginTop='lg' style={{ overflowX: 'auto' }}>
      <FlexBox.Row alignItems='center'>
        <H3 style={{ fontWeight: 'bold' }}>Artifact Store</H3><HelperText componentLength={data?.slice(0, 5)?.length} />
      </FlexBox.Row>
      <FlexBox.Row>
        <Box style={{ width: '171px' }} >
          <StackBox stackName='Create' stackDesc='Create a stack' />
        </Box>
        {data?.slice(0, 5)?.map((e) => 
          <Box marginLeft='md'>
            <CustomStackBox 
              image={e.image} 
              stackName={e.stackName} 
              stackDesc={e.stackDesc} 
              value={false} 
              onCheck={() => setSelectedStack([...selectedStack, e])} 
            />
          </Box>
        )}
      </FlexBox.Row>
    </Box>

    <Box marginTop='lg' style={{ overflowX: 'auto' }}>
      <FlexBox.Row alignItems='center'>
        <H3 style={{ fontWeight: 'bold' }}>Secret Manager</H3><HelperText componentLength={data?.slice(0, 7)?.length} />
      </FlexBox.Row>
      <FlexBox.Row>
        <Box style={{ width: '171px' }} >
          <StackBox stackName='Create' stackDesc='Create a stack' />
        </Box>
        {data?.slice(0, 7)?.map((e) => 
          <Box marginLeft='md'>
            <CustomStackBox 
              image={e.image} 
              stackName={e.stackName} 
              stackDesc={e.stackDesc} 
              value={false} 
              onCheck={() => setSelectedStack([...selectedStack, e])} 
            />
          </Box>
        )}
      </FlexBox.Row>
    </Box>

  
  </Box>
  );
};
