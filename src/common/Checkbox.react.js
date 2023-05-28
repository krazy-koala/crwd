import { useEffect, useRef } from 'react';

/**
 * Component interface:
 * 
 * type CheckboxProps = {
 *  checked: boolean,
 *  onChange: (e: HTMLEvent) => void,
 *  label?: string,
 *  indeterminate?: boolean,
 * }
 */

function Checkbox(props) {
  const {
    checked,
    indeterminate,
    onChange,
    label
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
      />
      {label}
    </label>
  );
}

export default Checkbox;
