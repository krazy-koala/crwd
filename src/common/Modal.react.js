import Button from './Button.react';

import './Modal.react.css';

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

// TODO: Press ESC key should close modal.
// TODO: When modal is open, focus should be trapped inside (e.g. tabbing should not go outside of the modal).
function Modal(props) {
  const {
    isVisible,
    onCancel,
    onConfirm,
    title,
    children,
  } = props;
  return isVisible && (
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
  );
}

export default Modal;