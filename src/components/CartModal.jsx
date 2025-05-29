import { createPortal } from "react-dom";
import { useRef, useEffect} from "react";
import Cart from "./Cart";

export default function CartModal({ modalState, onClose }) {
    const dialog = useRef();

    useEffect(() => {
        if (modalState) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [modalState]);

    return createPortal(
        <dialog className='modal' ref={dialog}>
            <h2>Your Cart</h2>
            <Cart />
            <div className='modal-actions'>
                <button className='text-button' onClick={onClose}>Cancel</button>
                <button className='button'>Go to Checkout</button>
            </div>
        </dialog>, document.getElementById('modal')
    );
}