import { fieldValidation } from './validations';

const validCaseForRequired = (value: any): void => {
  it(`for + ${value}`, () => {
    expect(fieldValidation(value).required()).toEqual(true);
  });
};

const notValidCaseForRequired = (value: any): void => {
  it(`for + ${value}`, () => {
    expect(fieldValidation(value).required()).toEqual(false);
  });
};

const testRequired = {
  validCase: validCaseForRequired,
  notValidCase: notValidCaseForRequired,
};

describe('fieldValidation.required', () => {
  describe('valid cases', () => {
    testRequired.validCase(1);
    testRequired.validCase('Any String');
    testRequired.validCase({});
    testRequired.validCase(['some-array']);
    testRequired.validCase(true);
    testRequired.validCase(false);
  });

  describe('not valid cases', () => {
    testRequired.notValidCase(null);
    testRequired.notValidCase(undefined);
    testRequired.notValidCase('');
    testRequired.notValidCase('   ');
  });

  describe('false is valid', () => {
    testRequired.validCase(true);
  });
});

const validCaseForMaxLength = (value: any, maxLength: number): void => {
  it(`for + ${value}`, () => {
    expect(fieldValidation(value).maxLength(maxLength)).toEqual(true);
  });
};

const notValidCaseForMaxLength = (value: any, maxLength: number): void => {
  it(`for + ${value}`, () => {
    expect(fieldValidation(value).maxLength(maxLength)).toEqual(false);
  });
};

const testMaxLength = {
  validCase: validCaseForMaxLength,
  notValidCase: notValidCaseForMaxLength,
};

describe('fieldValidation.maxLength', () => {
  describe('valid cases', () => {
    testMaxLength.validCase('test1', 5);
    testMaxLength.validCase('Any String', 10);
    testMaxLength.validCase(null, 3);
    testMaxLength.validCase(undefined, 4);
  });

  describe('not valid cases', () => {
    testMaxLength.notValidCase('hallo', 4);
  });
});

const validCaseForMinLength = (value: any, minLength: number): void => {
  it(`for + ${value}`, () => {
    expect(fieldValidation(value).minLength(minLength)).toEqual(true);
  });
};

const notValidCaseForMinLength = (value: any, minLength: number): void => {
  it(`for + ${value}`, () => {
    expect(fieldValidation(value).minLength(minLength)).toEqual(false);
  });
};

const testMinLength = {
  validCase: validCaseForMinLength,
  notValidCase: notValidCaseForMinLength,
};

describe('fieldValidation.minLength', () => {
  describe('valid cases', () => {
    testMinLength.validCase('666666', 5);
    testMinLength.validCase('A lot of text is provided here', 10);
    testMinLength.validCase('hall', 4);
  });

  describe('not valid cases', () => {
    testMinLength.notValidCase(undefined, 4);
    testMinLength.notValidCase(null, 3);
    testMinLength.notValidCase('hal', 4);
  });
});

describe('validateEmail', () => {
  const expectvalidateEmailWith = ({
    email,
    returns,
  }: {
    email: string | null | undefined;
    returns: boolean;
  }): void => {
    const isValid = fieldValidation(email).isEmail();
    expect(isValid).toEqual(returns);
  };

  it('given a null email then returns as invalid', () => {
    expectvalidateEmailWith({ email: null, returns: false });
    expectvalidateEmailWith({ email: undefined, returns: false });
  });

  it('given a non valid email then returns as invalid', () => {
    expectvalidateEmailWith({ email: 'test', returns: false });
  });

  it('given a valid email returns as valid', () => {
    expectvalidateEmailWith({ email: 'test@test.de', returns: true });
  });
});
