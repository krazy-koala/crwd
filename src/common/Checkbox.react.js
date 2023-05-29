import { useEffect, useRef } from 'react';

/**
 * Component interface:
 * 
 * type CheckboxProps = {
 *  checked: boolean,
 *  onChange: (e: HTMLEvent) => void,
 *  label?: string,
 *  indeterminate?: boolean,
 *  ariaLabel?: string,
 * }
 */

function Checkbox(props) {
  const {
    checked,
    indeterminate,
    onChange,
    label,
    ariaLabel,
  } = props;
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label>
      <input
        className="checkbox"
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        ariaLabel={ariaLabel}
      />
      {label}
    </label>
  );
}

export default Checkbox;
