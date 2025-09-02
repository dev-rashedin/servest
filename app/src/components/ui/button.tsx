interface ButtonProps {
  label: string;
  type: string;
  onClick?: () => void;
}
const Button = ({ label, type, onClick }: ButtonProps) => {
  let buttonClass = 'px-4 py-2 rounded-lg text-pure-white text-sm lg:text-base';

  if (type === 'primary') {
    buttonClass += ' bg-yellow-sunshine hover:bg-yellow-dusk';
  } else if (type === 'secondary') {
    buttonClass += '  bg-deep-ocean hover:bg-faded-pearl';
  } else if (type === 'theme') {
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
