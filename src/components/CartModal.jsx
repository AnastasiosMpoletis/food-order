import { createPortal } from "react-dom";
import { useRef, useEffect, use } from "react";
import { MealsContext } from '../store/meals-context.jsx';
import Cart from "./Cart.jsx";
import ClearOrder from "./ClearOrder.jsx";

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
            {modalState.state === "CLEAR" && <ClearOrder />}
            {modalState.state === "CART" && <Cart />}
            {modalState.state === "FORM" && (
                <>
                    <button className='text-button' onClick={() => updateModalState(true, "CART")}>Cancel</button>
                </>
            )}
        </dialog>, document.getElementById('modal')
    );
}