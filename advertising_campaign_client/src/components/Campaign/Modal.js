import './Modal.css';

const Modal = ({ handleClose, show, children, submit }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button type="button" onClick={submit}>
                    Submit
                </button>
                <button type="button" onClick={handleClose}>
                    Close
                </button>
            </section>
        </div>
    );
};
export default Modal