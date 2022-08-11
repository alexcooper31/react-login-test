import { ChangeEvent, useEffect, useState } from 'react';
import './style.scss';

interface IInputGroup {
  title: string;
  inputValue: string | number;
  type?: string;
  placeholder: string;
  error?: boolean;
  errorMessage?: string;
  setChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup = ({ title, inputValue, type, placeholder, setChange, error, errorMessage }: IInputGroup) => {
  const [realValue, setRealValue] = useState(String(inputValue));

  const setValue = (ev: ChangeEvent<HTMLInputElement>) => {
    setRealValue(ev.target.value);
    setChange(ev);
  };

  useEffect(() => {
    if (inputValue === '') {
      setRealValue('');
    }
  }, [inputValue]);

  return (
    <div className='inputGroupContainer'>
      <div className='inputTitle'>{ title }</div>
      <div className='inputContainer'>
        <input value={realValue} type={type || 'text'} onChange={setValue} placeholder={placeholder} />
      </div>
      <div className='errorContainer'>
        { !error || errorMessage }
      </div>
    </div>
  );
};
export default InputGroup;
