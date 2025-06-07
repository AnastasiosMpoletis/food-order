import { createPortal } from "react-dom";
import { useRef, useEffect, use } from "react";
import { MealsContext } from '../store/meals-context.jsx';
import ClearOrder from "./ClearOrder.jsx";
import Cart from "./Cart.jsx";
import Form from "./Form.jsx";
import Success from "./Success.jsx";
import Error from "./Error.jsx";
import Orders from "./Orders.jsx";

export default function Modal() {
    const { modalState, updateModalState, clearOrder, reloadOrders } = use(MealsContext);
    const dialog = useRef();

    useEffect(() => {
        if (modalState.isOpen) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [modalState]);

    function handleOnClose() {
        if (modalState.state === "SUCCESS") {
            onSuccessClose();
        }
    }

    function onSuccessClose() {
        updateModalState(false, null);
        reloadOrders();
        clearOrder();
    }

    return createPortal(
        <dialog className='modal' ref={dialog} onClose={handleOnClose}>
            {(modalState.state === "CLEAR" || modalState.state === "DELETE") && <ClearOrder />}
            {modalState.state === "CART" && <Cart />}
            {modalState.state === "FORM" && <Form />}
            {modalState.state === "ERROR" && <Error />}
            {modalState.state === "SUCCESS" && <Success modalState={modalState} onSuccess={onSuccessClose} />}
            {modalState.state === "ORDERS" && <Orders />}
        </dialog>, document.getElementById('modal')
    );
}