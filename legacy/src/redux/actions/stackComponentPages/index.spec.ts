import { pipelinePagesActionTypes } from '../../actionTypes';
import { stackComponentPagesActions } from './index';

describe(pipelinePagesActionTypes.setSelectedRunIds, () => {
  const runIds = ['id'];

  const onAction = () =>
    stackComponentPagesActions.setSelectedRunIds({ runIds });

  it('has correct type', () => {
    expect(onAction().type).toEqual(pipelinePagesActionTypes.setSelectedRunIds);
  });

  it('has correct payload', () => {
    expect(onAction().payload).toEqual({ runIds });
  });
});

describe(pipelinePagesActionTypes.setFetching, () => {
  const onAction = () =>
    stackComponentPagesActions.setFetching({ fetching: true });

  it('has correct type', () => {
    expect(onAction().type).toEqual(pipelinePagesActionTypes.setFetching);
  });

  it('has correct payload', () => {
    expect(onAction().payload).toEqual({ fetching: true });
  });
});
