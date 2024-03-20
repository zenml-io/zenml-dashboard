export const testApiAction = ({
  onAction,
  type,
  payload,
}: {
  onAction: any;
  type: string;
  payload: {
    apiMethod: any;
    isAuthenticated: boolean;
    failureActionType?: string;
    successActionType?: string;
    params?: any;
    onSuccess?: any;
    onFailure?: any;
  };
}): void => {
  describe(type, () => {
    it('has correct type', () => {
      expect(onAction().type).toEqual(type);
    });
    it('isAuthenticated requested', () => {
      expect(onAction().payload.isAuthenticated).toEqual(
        payload.isAuthenticated,
      );
    });
    it('has correct successActionType', () => {
      expect(onAction().payload.successActionType).toEqual(
        payload.successActionType,
      );
    });
    it('has correct failureActionType', () => {
      expect(onAction().payload.failureActionType).toEqual(
        payload.failureActionType,
      );
    });
    it('has correct apiMethod', () => {
      expect(onAction().payload.apiMethod).toEqual(payload.apiMethod);
    });

    it('has correct onSuccess', () => {
      expect(onAction().payload.onSuccess).toEqual(payload.onSuccess);
    });

    it('has correct onFailure', () => {
      expect(onAction().payload.onFailure).toEqual(payload.onFailure);
    });
  });
};
