import _ from 'lodash';

const showPopup = (state: any): string | null =>
  _.get(state, 'persisted.hubPrompt.showPopup');

const hubPromptSelectors = { showPopup };
export { hubPromptSelectors };
