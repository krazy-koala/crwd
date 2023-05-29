import FocusTrap from 'focus-trap-react';

import Button from './Button.react';

import './Modal.react.css';
import { useEffect } from 'react';

/**
 * Component Interface:
 * 
 * type ModalProps = {
 *  isVisible: boolean,
 *  onCancel: () => void,
 *  onConfirm: () => void,
 *  title?: string,
 * }
 */

function Modal(props) {
  const {
    isVisible,
    onCancel,
    onConfirm,
    title,
    children,
  } = props;

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') {
        onCancel()
      }
    }
  
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [onCancel]);

  return isVisible && (
    <FocusTrap>
      <div className="modal-overlay">
        <div className="modal">
          <section className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <button
              class="modal-close-button"
              onClick={onCancel}
              aria-label="Close"
            >
              X
            </button>
          </section>
          <section className="modal-body">{children}</section>
          <section className="modal-footer">
            <Button
              className="modal-action-button"
              type="secondary"
              onClick={onCancel}
              ariaLabel="Cancel"
            >
              Cancel
            </Button>
            <Button
              className="modal-action-button"
              type="primary"
              onClick={onConfirm}
              aria-label="Confirm"
            >
              Confirm
            </Button>
          </section>
        </div>
      </div>
    </FocusTrap>
  );
}

export default Modal;