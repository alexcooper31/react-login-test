import './style.scss';

interface IStyledButton {
  title: string;
  type?: string | any;
  submit?: () => void;
}

const PrimaryButton = ({ title, submit, type }: IStyledButton) => {

  return (
    <button className='Primary' onClick={submit} type={type} >
      { title }
    </button>
  );
};

const SecondaryButton = ({ title, submit }: IStyledButton) => (
  <button className='Secondary' onClick={submit}>
    { title }
  </button>
);

export {
  PrimaryButton,
  SecondaryButton,
};
