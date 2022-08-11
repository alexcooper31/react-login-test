import { fireEvent, render, screen } from '@testing-library/react';
import InputGroup from '../';


describe('InputGroup', () => {
  const expectedTitle = 'bogus-label';
  const mockedPlaceholder = 'bogus-placeholder';

  let value = '';

  render(
    <InputGroup
      placeholder={mockedPlaceholder}
      inputValue={value}
      title={expectedTitle}
      setChange={(event) => {
        event.preventDefault();
        value = event.target.value;
      }}
    />,
  );

  const getInput = (): HTMLInputElement => {
    return screen.getByPlaceholderText(mockedPlaceholder);
  };

  it('should change the value if input changed', () => {
    const testValue = 'bogus-value';

    fireEvent.change(
      getInput(),
      { target: { value: testValue } },
    );

    expect(getInput().value).toBe(testValue);
  });
});

