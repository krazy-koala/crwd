import './Button.react.css';

/**
 * Component interface:
 * 
 * type ButtonProps = {
 *  type: 'primary' | 'secondary' | 'light',
 *  onClick: (event: HTMLEvent) => void,
 *  children?: React.Component,
 *  ariaLabel?: string,
 *  className?: string,
 * }
 */

const classNameByType = {
  'primary': 'button-primary',
  'secondary': 'button-secondary',
  'light': 'button-light',
};

function Button(props) {
  const {
    type,
    onClick,
    children,
    ariaLabel,
    className,
  } = props;
  return (
    <button
      className={['button', classNameByType[type], className].join(' ')}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export default Button;