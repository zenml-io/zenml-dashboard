import { pipelinePagesSelectors } from './pipelinePages';
import { selectorsTestHelpers } from './utils';

const stateStructure = 'persisted.pipelinePages';

selectorsTestHelpers.keyFromStore({
  selector: pipelinePagesSelectors.currentWorkspace,
  stateStructure: stateStructure,
  stateKey: 'currentWorkspace',
});

selectorsTestHelpers.keyFromStore({
  selector: pipelinePagesSelectors.selectedRunIds,
  stateStructure: stateStructure,
  stateKey: 'selectedRunIds',
});

selectorsTestHelpers.keyFromStore({
  selector: pipelinePagesSelectors.fetching,
  stateStructure: stateStructure,
  stateKey: 'fetching',
});
