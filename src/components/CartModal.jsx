import { createPortal } from "react-dom";
import { useRef, useEffect, use } from "react";
import { MealsContext } from '../store/meals-context.jsx';
import Cart from "./Cart";

export default function CartModal() {
    const { modalState, updateModalState } = use(MealsContext);
    const dialog = useRef();

    useEffect(() => {
        if (modalState.isOpen) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [modalState]);

    return createPortal(
        <dialog className='modal' ref={dialog}>
            {modalState && modalState.state === "CART" && (
                <>
                    <h2>Your Cart</h2>
                    <Cart />
                    <div className='modal-actions'>
                        <button className='text-button' onClick={() => updateModalState(false, null)}>Cancel</button>
                        <button className='button' onClick={() => updateModalState(true, "FORM")}>Go to Checkout</button>
                    </div>
                </>
            )}
            {modalState && modalState.state === "FORM" && (
                <>
                    <button className='text-button' onClick={() => updateModalState(true, "CART")}>Cancel</button>
                </>
            )}
        </dialog>, document.getElementById('modal')
    );
}